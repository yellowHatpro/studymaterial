const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const WORKSPACE_ID = process.env.NOTION_WORKSPACE_ID;

async function syncFromNotion() {
  try {
    // Get all pages from workspace
    const pages = await getAllPages();
    
    for (const page of pages) {
      // Skip if page is in Study Material Reading List
      if (page.parent.type === 'page_id' && page.parent.page_id === process.env.NOTION_READING_LIST_ID) {
        continue;
      }

      const title = page.properties?.title?.title?.[0]?.plain_text;
      if (!title) continue;

      // Get the page content
      const content = await getPageContent(page.id);
      
      // Convert Notion path to file path
      const filePath = `${title}.md`;
      
      // Only process if it should be in a docs directory
      if (!shouldBeInDocs(filePath)) continue;
      
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write content to file
      fs.writeFileSync(filePath, content);
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
    if (block.type === 'paragraph') {
      content += block.paragraph.rich_text.map(t => t.plain_text).join('') + '\n\n';
    } else if (block.type === 'heading_1') {
      content += '# ' + block.heading_1.rich_text.map(t => t.plain_text).join('') + '\n\n';
    } else if (block.type === 'heading_2') {
      content += '## ' + block.heading_2.rich_text.map(t => t.plain_text).join('') + '\n\n';
    } else if (block.type === 'heading_3') {
      content += '### ' + block.heading_3.rich_text.map(t => t.plain_text).join('') + '\n\n';
    } else if (block.type === 'code') {
      content += '```' + (block.code.language || '') + '\n';
      content += block.code.rich_text.map(t => t.plain_text).join('') + '\n';
      content += '```\n\n';
    } else if (block.type === 'bulleted_list_item') {
      content += '- ' + block.bulleted_list_item.rich_text.map(t => t.plain_text).join('') + '\n';
    } else if (block.type === 'numbered_list_item') {
      content += '1. ' + block.numbered_list_item.rich_text.map(t => t.plain_text).join('') + '\n';
    }
  }

  return content.trim();
}

function shouldBeInDocs(filePath) {
  // Check if the path contains a topic folder and should be in docs
  const parts = filePath.split('/');
  return parts.length >= 2 && !parts.includes('code');
}

syncFromNotion().catch(console.error); 