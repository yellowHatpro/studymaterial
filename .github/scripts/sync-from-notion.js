const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function syncFromNotion() {
  // Get all pages from Notion database
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  for (const page of response.results) {
    const title = page.properties.Title.title[0]?.plain_text;
    const content = page.properties.Content.rich_text[0]?.plain_text;

    if (title && content) {
      // Create directory if it doesn't exist
      const dir = path.dirname(title);
      if (dir !== '.') {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write content to file
      fs.writeFileSync(title, content);
    }
  }
}

syncFromNotion().catch(console.error); 