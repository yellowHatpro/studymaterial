const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const PARENT_PAGE_ID = '1ab535d7772c8081a7edfb3141ef4a62';

// Cache for page paths
const pagePathCache = new Map();

// Generate hash for content
function getContentHash(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

async function getNotionPagePath(pageId) {
  const cacheKey = pageId;
  if (pagePathCache.has(cacheKey)) {
    return pagePathCache.get(cacheKey);
  }

  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const title = page.properties?.title?.title?.[0]?.plain_text || '';

    // If this is a direct child of the parent page, it's a top-level folder
    if (page.parent.page_id === PARENT_PAGE_ID) {
      pagePathCache.set(cacheKey, title);
      return { path: title, isFolder: true };
    }

    // Get the parent's path
    const parentPath = await getNotionPagePath(page.parent.page_id);
    if (!parentPath) return null;

    // If parent is a folder, this is content
    if (parentPath.isFolder) {
      const fullPath = `${parentPath.path}/${title}`;
      pagePathCache.set(cacheKey, fullPath);
      return { path: fullPath, isFolder: false };
    }

    // Otherwise, this is another folder in the hierarchy
    const fullPath = `${parentPath.path}/${title}`;
    pagePathCache.set(cacheKey, fullPath);
    return { path: fullPath, isFolder: true };
  } catch (error) {
    console.error(`Error getting page path for ${pageId}:`, error);
    return null;
  }
}

async function syncFromNotion() {
  try {
    console.log('Starting sync from Notion...');
    const pages = await getAllPages();
    
    for (const page of pages) {
      try {
        // Get the page path
        const pathInfo = await getNotionPagePath(page.id);
        if (!pathInfo) continue;

        console.log('Processing page:', pathInfo.path);

        // Skip folder pages - we only want to sync content
        if (pathInfo.isFolder) {
          console.log('Skipping folder page:', pathInfo.path);
          continue;
        }

        // Get the page content
        const { content, hash } = await getPageContent(page.id);
        
        // Convert Notion path to file path
        // Example: "android/fragments/safe_args" -> "android/fragments/docs/safe_args.md"
        const pathParts = pathInfo.path.split('/');
        const fileName = pathParts.pop(); // Get the file name
        const folderPath = pathParts.join('/'); // Get the folder path
        const mdFilePath = path.join(folderPath, 'docs', `${fileName}.md`);
        
        // Check if file exists and compare hashes
        if (fs.existsSync(mdFilePath)) {
          const existingContent = fs.readFileSync(mdFilePath, 'utf8');
          const existingHash = getContentHash(existingContent);
          
          if (existingHash === hash) {
            console.log('Content unchanged, skipping:', mdFilePath);
            continue;
          }
        }

        // Ensure directory exists
        const dirPath = path.dirname(mdFilePath);
        fs.mkdirSync(dirPath, { recursive: true });

        // Write content to file
        fs.writeFileSync(mdFilePath, content);
        console.log('Updated file:', mdFilePath);
      } catch (error) {
        console.error('Error processing page:', error);
      }
    }
  } catch (error) {
    console.error('Error syncing from Notion:', error);
  }
}

async function getAllPages(startCursor = undefined) {
  const response = await notion.search({
    filter: {
      property: 'object',
      value: 'page'
    },
    start_cursor: startCursor,
    page_size: 100
  });

  let pages = response.results;

  if (response.has_more) {
    pages = pages.concat(await getAllPages(response.next_cursor));
  }

  return pages;
}

async function getPageContent(pageId) {
  const blocks = await notion.blocks.children.list({
    block_id: pageId
  });

  let content = '';
  
  for (const block of blocks.results) {
    // Skip the content hash block
    if (block.type === 'paragraph' && 
        block.paragraph?.rich_text?.[0]?.text?.content?.startsWith('<!-- content-hash:')) {
      continue;
    }

    switch (block.type) {
      case 'paragraph':
        const text = block.paragraph.rich_text.map(t => t.plain_text).join('');
        if (text.trim()) {
          content += text + '\n\n';
        }
        break;
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'heading_4':
      case 'heading_5':
      case 'heading_6':
        const level = block.type.split('_')[1];
        const heading = block[block.type].rich_text.map(t => t.plain_text).join('');
        content += '#'.repeat(parseInt(level)) + ' ' + heading + '\n\n';
        break;
      case 'code':
        content += '```' + (block.code.language || '') + '\n';
        content += block.code.rich_text.map(t => t.plain_text).join('') + '\n';
        content += '```\n\n';
        break;
      case 'bulleted_list_item':
        content += '- ' + block.bulleted_list_item.rich_text.map(t => t.plain_text).join('') + '\n';
        break;
      case 'numbered_list_item':
        content += '1. ' + block.numbered_list_item.rich_text.map(t => t.plain_text).join('') + '\n';
        break;
      case 'quote':
        content += '> ' + block.quote.rich_text.map(t => t.plain_text).join('') + '\n\n';
        break;
      case 'divider':
        content += '---\n\n';
        break;
      // Add more block types as needed
    }
  }

  content = content.trim();
  return {
    content,
    hash: getContentHash(content)
  };
}

syncFromNotion().catch(console.error); 