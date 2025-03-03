const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function syncToNotion() {
  // Read all markdown files
  const files = getAllMarkdownFiles('.');
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative('.', file);
    
    // Create or update page in Notion
    await createOrUpdateNotionPage(relativePath, content);
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

async function createOrUpdateNotionPage(title, content) {
  // Search for existing page
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Title',
      title: {
        equals: title,
      },
    },
  });

  if (response.results.length > 0) {
    // Update existing page
    await notion.pages.update({
      page_id: response.results[0].id,
      properties: {
        Content: {
          rich_text: [
            {
              text: {
                content: content,
              },
            },
          ],
        },
      },
    });
  } else {
    // Create new page
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
        Content: {
          rich_text: [
            {
              text: {
                content: content,
              },
            },
          ],
        },
      },
    });
  }
}

syncToNotion().catch(console.error); 