const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const READING_LIST_ID = process.env.NOTION_READING_LIST_ID;
const WORKSPACE_ID = process.env.NOTION_WORKSPACE_ID;

// Split content into chunks of max 2000 characters
function splitContentIntoBlocks(content) {
  const blocks = [];
  const maxLength = 2000;
  
  // Split by newlines to preserve formatting
  const lines = content.split('\n');
  let currentBlock = '';
  
  for (const line of lines) {
    if ((currentBlock + line).length > maxLength) {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = line;
    } else {
      currentBlock += (currentBlock ? '\n' : '') + line;
    }
  }
  
  if (currentBlock) {
    blocks.push(currentBlock);
  }
  
  return blocks;
}

async function syncToNotion() {
  console.log('Starting sync to Notion...');
  console.log('Using Reading List ID:', READING_LIST_ID);
  console.log('Using Workspace ID:', WORKSPACE_ID);
  
  const files = getAllMarkdownFiles('.');
  console.log('Found files:', files);
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative('.', file);
    
    // Only process files in docs directories
    if (!relativePath.includes('/docs/')) continue;
    
    console.log('Processing file:', relativePath);
    
    // Create or update the page in Notion
    const pageId = await createOrUpdateNotionPage(relativePath, content);
    console.log('Synced file:', relativePath, 'Page ID:', pageId);
    
    // Add to Study Material Reading List if it's a new page
    if (pageId) {
      await addToReadingList(relativePath, pageId);
      console.log('Added to reading list:', relativePath);
    }
  }
}

function getAllMarkdownFiles(dir) {
  const files = [];
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules') continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function createOrUpdateNotionPage(filePath, content) {
  try {
    // Split the path into parts and remove 'docs' from the path
    const parts = filePath.split('/').filter(part => part !== 'docs');
    const fileName = parts.pop(); // Get the file name
    const title = path.basename(fileName, '.md'); // Remove .md extension
    
    // Create the full path for the page title
    const pageTitle = parts.join('/') + '/' + title;
    console.log('Creating/updating page:', pageTitle);

    // Search for existing page
    const response = await notion.search({
      query: pageTitle,
      filter: {
        property: 'object',
        value: 'page'
      }
    });

    const existingPage = response.results.find(p => 
      p.properties?.title?.title?.[0]?.plain_text === pageTitle
    );

    if (existingPage) {
      console.log('Found existing page:', existingPage.id);
      // Delete existing blocks
      const blocks = await notion.blocks.children.list({
        block_id: existingPage.id
      });
      
      for (const block of blocks.results) {
        await notion.blocks.delete({
          block_id: block.id
        });
      }
      
      // Add new content in chunks
      const contentBlocks = splitContentIntoBlocks(content);
      for (const block of contentBlocks) {
        await notion.blocks.children.append({
          block_id: existingPage.id,
          children: [
            {
              type: 'paragraph',
              paragraph: {
                rich_text: [{ type: 'text', text: { content: block } }]
              }
            }
          ]
        });
      }
      console.log('Updated existing page:', pageTitle);
      return existingPage.id;
    } else {
      // Create new page
      const newPage = await notion.pages.create({
        parent: { page_id: WORKSPACE_ID },
        properties: {
          title: {
            title: [{ text: { content: pageTitle } }]
          }
        },
        children: [
          {
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content: content.slice(0, 2000) } }]
            }
          }
        ]
      });
      
      // Add remaining content in chunks
      const contentBlocks = splitContentIntoBlocks(content.slice(2000));
      for (const block of contentBlocks) {
        await notion.blocks.children.append({
          block_id: newPage.id,
          children: [
            {
              type: 'paragraph',
              paragraph: {
                rich_text: [{ type: 'text', text: { content: block } }]
              }
            }
          ]
        });
      }
      
      console.log('Created new page:', pageTitle);
      return newPage.id;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

async function addToReadingList(filePath, pageId) {
  try {
    // Get the Study Material GitHub list block
    const blocks = await notion.blocks.children.list({
      block_id: READING_LIST_ID
    });
    
    let githubListId = blocks.results.find(
      block => block.type === 'toggle' && 
      block.toggle?.rich_text?.[0]?.plain_text === 'Study Material GitHub'
    )?.id;

    // Create the list if it doesn't exist
    if (!githubListId) {
      const newToggle = await notion.blocks.children.append({
        block_id: READING_LIST_ID,
        children: [{
          type: 'toggle',
          toggle: {
            rich_text: [{ type: 'text', text: { content: 'Study Material GitHub' } }]
          }
        }]
      });
      githubListId = newToggle.results[0].id;
      console.log('Created Study Material GitHub list');
    }

    // Add the page to the list
    await notion.blocks.children.append({
      block_id: githubListId,
      children: [{
        type: 'link_to_page',
        link_to_page: {
          type: 'page_id',
          page_id: pageId
        }
      }]
    });
    console.log('Added page to list:', filePath);
  } catch (error) {
    console.error('Error adding to reading list:', error);
  }
}

syncToNotion().catch(console.error); 