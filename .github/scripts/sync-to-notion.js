const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
const marked = require('marked'); // Add this package for markdown parsing
const crypto = require('crypto'); // For generating content hashes

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const PARENT_PAGE_ID = '1ab535d7772c8081a7edfb3141ef4a62'; // Your Study Material page ID
const MAX_BLOCK_LENGTH = 2000;

// Cache for folder page IDs and content hashes
const folderPageCache = new Map();
const contentHashCache = new Map();

// Generate hash for content
function getContentHash(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

// Get content hash from Notion page
async function getNotionPageHash(pageId) {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId
    });

    // Look for a comment block with our hash
    const hashBlock = blocks.results.find(
      block => block.type === 'paragraph' && 
      block.paragraph?.rich_text?.[0]?.text?.content?.startsWith('<!-- content-hash: ')
    );

    if (hashBlock) {
      const hashMatch = hashBlock.paragraph.rich_text[0].text.content.match(/<!-- content-hash: ([a-f0-9]+) -->/);
      if (hashMatch) {
        return hashMatch[1];
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting page hash:', error);
    return null;
  }
}

async function getFolderPageId(folderPath, parentId) {
  const cacheKey = `${parentId}:${folderPath}`;
  if (folderPageCache.has(cacheKey)) {
    return folderPageCache.get(cacheKey);
  }

  // Get the folder name (last part of the path)
  const folderName = path.basename(folderPath);

  // Search for the folder in the parent
  const response = await notion.search({
    query: folderName,
    filter: {
      property: 'object',
      value: 'page'
    }
  });

  const existingPage = response.results.find(p => 
    p.properties?.title?.title?.[0]?.plain_text === folderName &&
    p.parent?.page_id === parentId
  );

  if (existingPage) {
    folderPageCache.set(cacheKey, existingPage.id);
    return existingPage.id;
  }

  // Create folder page
  const newPage = await notion.pages.create({
    parent: { page_id: parentId },
    properties: {
      title: {
        title: [{ text: { content: folderName } }]
      }
    }
  });

  folderPageCache.set(cacheKey, newPage.id);
  return newPage.id;
}

// Convert markdown to Notion blocks
function markdownToBlocks(content) {
  const tokens = marked.lexer(content);
  const blocks = [];

  // Helper function to process inline tokens
  function processInlineTokens(text) {
    if (!text) return [];
    const inlineTokens = marked.lexer(text);
    let richText = [];

    for (const token of inlineTokens) {
      if (token.type === 'text') {
        // Process inline code within text
        const parts = token.text.split('`');
        for (let i = 0; i < parts.length; i++) {
          if (parts[i]) {
            if (i % 2 === 0) {
              // Regular text
              richText.push({
                type: 'text',
                text: { content: parts[i] }
              });
            } else {
              // Inline code
              richText.push({
                type: 'text',
                text: { content: parts[i] },
                annotations: {
                  code: true
                }
              });
            }
          }
        }
      } else if (token.type === 'codespan') {
        richText.push({
          type: 'text',
          text: { content: token.text },
          annotations: {
            code: true
          }
        });
      } else if (token.type === 'strong') {
        richText.push({
          type: 'text',
          text: { content: token.text },
          annotations: {
            bold: true
          }
        });
      } else if (token.type === 'em') {
        richText.push({
          type: 'text',
          text: { content: token.text },
          annotations: {
            italic: true
          }
        });
      } else if (token.type === 'link') {
        richText.push({
          type: 'text',
          text: { content: token.text, link: { url: token.href } }
        });
      } else {
        richText.push({
          type: 'text',
          text: { content: token.raw }
        });
      }
    }
    return richText;
  }

  for (const token of tokens) {
    switch (token.type) {
      case 'heading':
        blocks.push({
          type: 'heading_' + token.depth,
          ['heading_' + token.depth]: {
            rich_text: processInlineTokens(token.text)
          }
        });
        break;
      case 'paragraph':
        blocks.push({
          type: 'paragraph',
          paragraph: {
            rich_text: processInlineTokens(token.text)
          }
        });
        break;
      case 'code':
        blocks.push({
          type: 'code',
          code: {
            rich_text: [{ type: 'text', text: { content: token.text } }],
            language: token.lang || 'plain text'
          }
        });
        break;
      case 'list':
        const listType = token.ordered ? 'numbered_list_item' : 'bulleted_list_item';
        for (const item of token.items) {
          blocks.push({
            type: listType,
            [listType]: {
              rich_text: processInlineTokens(item.text)
            }
          });
        }
        break;
      case 'blockquote':
        blocks.push({
          type: 'quote',
          quote: {
            rich_text: processInlineTokens(token.text)
          }
        });
        break;
      case 'space':
        blocks.push({
          type: 'paragraph',
          paragraph: {
            rich_text: []
          }
        });
        break;
      // Add more cases for other markdown elements as needed
    }
  }

  return blocks;
}

async function syncToNotion() {
  console.log('Starting sync to Notion...');
  console.log('Using Parent Page ID:', PARENT_PAGE_ID);
  
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
    let currentParentId = PARENT_PAGE_ID;
    
    // Create nested folder structure
    // For example: android/fragments/safe_args.md
    // Should create: android -> fragments -> safe_args
    const fileName = parts[parts.length - 1];
    const folders = parts.slice(0, -1);
    
    // Create each folder in the hierarchy
    for (let i = 0; i < folders.length; i++) {
      const folderPath = folders.slice(0, i + 1).join('/');
      currentParentId = await getFolderPageId(folderPath, currentParentId);
      console.log(`Created/found folder: ${folderPath} with ID: ${currentParentId}`);
    }

    // Get just the name without .md extension
    const pageName = path.basename(fileName, '.md');
    console.log('Creating/updating page:', pageName, 'in folder:', currentParentId);

    // Generate content hash
    const contentHash = getContentHash(content);

    // Search for existing page with exact path match
    const response = await notion.search({
      query: pageName,
      filter: {
        property: 'object',
        value: 'page'
      }
    });

    const existingPage = response.results.find(p => 
      p.properties?.title?.title?.[0]?.plain_text === pageName &&
      p.parent?.page_id === currentParentId
    );

    if (existingPage) {
      // Check if content has changed
      const existingHash = await getNotionPageHash(existingPage.id);
      if (existingHash === contentHash) {
        console.log('Content unchanged, skipping update for:', pageName);
        return existingPage.id;
      }

      console.log('Content changed, updating page:', pageName);
      // Delete existing blocks
      const blocks = await notion.blocks.children.list({
        block_id: existingPage.id
      });
      
      for (const block of blocks.results) {
        await notion.blocks.delete({
          block_id: block.id
        });
      }
      
      // Convert markdown and add hash comment
      const notionBlocks = [
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: `<!-- content-hash: ${contentHash} -->` } }]
          }
        },
        ...markdownToBlocks(content)
      ];

      // Add new blocks
      await notion.blocks.children.append({
        block_id: existingPage.id,
        children: notionBlocks
      });
      
      console.log('Updated existing page:', pageName);
      return existingPage.id;
    } else {
      // Convert markdown and add hash comment
      const notionBlocks = [
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [{ type: 'text', text: { content: `<!-- content-hash: ${contentHash} -->` } }]
          }
        },
        ...markdownToBlocks(content)
      ];

      // Create new page
      const newPage = await notion.pages.create({
        parent: { page_id: currentParentId },
        properties: {
          title: {
            title: [{ text: { content: pageName } }]
          }
        },
        children: notionBlocks
      });
      console.log('Created new page:', pageName);
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
      block_id: PARENT_PAGE_ID
    });
    
    let githubListId = blocks.results.find(
      block => block.type === 'toggle' && 
      block.toggle?.rich_text?.[0]?.plain_text === 'Study Material GitHub'
    )?.id;

    // Create the list if it doesn't exist
    if (!githubListId) {
      const newToggle = await notion.blocks.children.append({
        block_id: PARENT_PAGE_ID,
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