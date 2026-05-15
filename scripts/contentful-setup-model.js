const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

// This script will create the structure (Content Types) in Contentful.
// It DOES NOT upload your data yet. This just builds the database "tables".

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Error: Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local');
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: MANAGEMENT_TOKEN
});

async function runSetup() {
  try {
    console.log(`Connecting to Space: ${SPACE_ID}...`);
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    console.log('Environment selected. Creating Content Types...');

    // 1. Create Tag Content Type
    console.log('Creating "Tag"...');
    let tagType;
    try {
      tagType = await environment.getContentType('tag');
      console.log('Tag already exists, skipping creation.');
    } catch (e) {
      tagType = await environment.createContentTypeWithId('tag', {
        name: 'Tag',
        displayField: 'label',
        fields: [
          { id: 'label', name: 'Label', type: 'Symbol', required: true },
          { 
            id: 'category', 
            name: 'Category', 
            type: 'Symbol', 
            required: true,
            validations: [{ in: ['tool', 'skill', 'industry', 'type'] }] 
          }
        ]
      });
      await tagType.publish();
      console.log('✅ Tag published.');
    }

    // 2. Create Process Step Content Type
    console.log('Creating "Process Step"...');
    let processStepType;
    try {
      processStepType = await environment.getContentType('processStep');
      console.log('Process Step already exists, skipping.');
    } catch(e) {
      processStepType = await environment.createContentTypeWithId('processStep', {
        name: 'Process Step',
        displayField: 'phase',
        fields: [
          { id: 'phase', name: 'Phase Name', type: 'Symbol', required: true },
          { id: 'summary', name: 'Summary', type: 'Text', required: true },
          { id: 'media', name: 'Media', type: 'Array', items: { type: 'Link', linkType: 'Asset' } }
        ]
      });
      await processStepType.publish();
      console.log('✅ Process Step published.');
    }

    // 3. Create Project Content Type
    console.log('Creating "Project"...');
    let projectType;
    try {
      projectType = await environment.getContentType('project');
      console.log('Project already exists, skipping.');
    } catch(e) {
      projectType = await environment.createContentTypeWithId('project', {
        name: 'Project',
        displayField: 'title',
        fields: [
          { id: 'title', name: 'Title', type: 'Symbol', required: true },
          { id: 'slug', name: 'Slug', type: 'Symbol', required: true, validations: [{ unique: true }] },
          { id: 'detailLevel', name: 'Detail Level', type: 'Symbol', required: true, validations: [{ in: ['standard', 'deep'] }] },
          { id: 'detailPageLayout', name: 'Page Layout', type: 'Symbol' },
          { id: 'category', name: 'Category', type: 'Array', items: { type: 'Symbol', validations: [{ in: ['motion', 'web-design', 'interactive', 'app', 'branding'] }] } },
          { id: 'year', name: 'Year', type: 'Integer', required: true },
          { id: 'tagline', name: 'Tagline', type: 'Symbol', required: true },
          { id: 'description', name: 'Description', type: 'Text', required: true },
          { id: 'client', name: 'Client', type: 'Symbol' },
          { id: 'clientDescription', name: 'Client Description', type: 'Symbol' },
          { id: 'role', name: 'Role', type: 'Symbol' },
          { id: 'team', name: 'Team', type: 'Symbol' },
          { id: 'duration', name: 'Duration', type: 'Symbol' },
          { id: 'tools', name: 'Tools', type: 'Array', items: { type: 'Symbol' } },
          { id: 'thumbnail', name: 'Thumbnail', type: 'Link', linkType: 'Asset' },
          { id: 'heroMedia', name: 'Hero Media', type: 'Link', linkType: 'Asset' },
          { id: 'gallery', name: 'Gallery', type: 'Array', items: { type: 'Link', linkType: 'Asset' } },
          { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['tag'] }] } },
          { id: 'outcome', name: 'Outcome', type: 'Text' },
          { id: 'metrics', name: 'Metrics', type: 'Array', items: { type: 'Symbol' } },
          { id: 'liveUrl', name: 'Live URL', type: 'Symbol' },
          { id: 'caseStudyUrl', name: 'Case Study URL', type: 'Symbol' },
          { id: 'hidden', name: 'Hidden', type: 'Boolean' },
          { id: 'brief', name: 'Brief', type: 'Text' },
          { id: 'process', name: 'Process Steps', type: 'Array', items: { type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['processStep'] }] } },
          { id: 'brandSystem', name: 'Brand System', type: 'Object' }
        ]
      });
      await projectType.publish();
      console.log('✅ Project published.');
    }

    console.log('🎉 Setup complete! Check your Contentful UI to see the new Content Types.');

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runSetup();
