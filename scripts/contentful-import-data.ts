import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import * as contentful from 'contentful-management';
import { portfolio } from '../src/data/portfolio.data';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('Error: Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local');
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: MANAGEMENT_TOKEN
});

// Helper to structure fields correctly for Contentful (requires the 'en-US' locale wrapper)
function formatFields(obj: Record<string, any>) {
  const fields: any = {};
  for (const [key, val] of Object.entries(obj)) {
    // Only include fields that have actual values
    if (val !== undefined && val !== null && (Array.isArray(val) ? val.length > 0 : val !== '')) {
      fields[key] = { 'en-US': val };
    }
  }
  return fields;
}

async function runImport() {
  try {
    console.log(`Connecting to Space: ${SPACE_ID}...`);
    const space = await client.getSpace(SPACE_ID as string);
    const env = await space.getEnvironment('master');

    console.log('--- STARTING BULK IMPORT ---');

    // 1. EXTRACT AND CREATE ALL TAGS
    console.log('\nProcessing Tags...');
    const createdTags: Record<string, string> = {};
    
    // We fetch existing tags first to avoid duplicates if you run this twice
    const existingTagsResponse = await env.getEntries({ content_type: 'tag', limit: 1000 });
    existingTagsResponse.items.forEach(item => {
      createdTags[item.fields.label['en-US']] = item.sys.id;
    });

    for (const proj of portfolio.projects) {
      if (proj.tags) {
        for (const tag of proj.tags) {
          if (!createdTags[tag.label]) {
             try {
                const entry = await env.createEntry('tag', {
                  fields: formatFields({
                    label: tag.label,
                    category: tag.category
                  })
                });
                await entry.publish();
                createdTags[tag.label] = entry.sys.id;
                console.log(`  + Created Tag: ${tag.label}`);
             } catch(e) {
                console.error(`  x Failed to create tag: ${tag.label}`);
             }
          }
        }
      }
    }

    // 2. CREATE PROJECTS
    console.log('\nProcessing Projects...');
    for (const proj of portfolio.projects) {
      console.log(`\nImporting Project: ${proj.title}`);
      
      // Step A: Create Process Steps (if any) and get their references
      const processRefs = [];
      if ('process' in proj && proj.process) {
        for (const step of proj.process) {
          try {
            const stepEntry = await env.createEntry('processStep', {
               fields: formatFields({
                 phase: step.phase,
                 summary: step.summary
               })
            });
            await stepEntry.publish();
            processRefs.push({ sys: { type: 'Link', linkType: 'Entry', id: stepEntry.sys.id } });
            console.log(`  + Created Process Step: ${step.phase}`);
          } catch(e) {
            console.error(`  x Failed to create process step: ${step.phase}`);
          }
        }
      }
      
      // Step B: Get Tag references
      const tagRefs = (proj.tags || []).map(t => ({
         sys: { type: 'Link', linkType: 'Entry', id: createdTags[t.label] }
      })).filter(ref => ref.sys.id); // Only include if tag was found/created
      
      // Step C: Create the Project itself
      try {
        const projectEntry = await env.createEntry('project', {
          fields: formatFields({
            title: proj.title,
            slug: proj.slug,
            detailLevel: proj.detailLevel,
            detailPageLayout: proj.detailPageLayout,
            category: proj.category,
            year: proj.year,
            tagline: proj.tagline,
            // Fallback description to brief if standard description is missing
            description: 'description' in proj ? proj.description : ('brief' in proj ? proj.brief : 'Pending description'),
            client: proj.client,
            clientDescription: ('clientDescription' in proj) ? proj.clientDescription : undefined,
            role: proj.role,
            team: ('team' in proj) ? proj.team : undefined,
            duration: proj.duration,
            tools: proj.tools,
            outcome: proj.outcome,
            metrics: proj.metrics,
            liveUrl: proj.liveUrl,
            caseStudyUrl: ('caseStudyUrl' in proj) ? proj.caseStudyUrl : undefined,
            hidden: proj.hidden,
            brief: ('brief' in proj) ? proj.brief : undefined,
            brandSystem: ('brandSystem' in proj) ? proj.brandSystem : undefined,
            tags: tagRefs.length > 0 ? tagRefs : undefined,
            process: processRefs.length > 0 ? processRefs : undefined,
          })
        });
        await projectEntry.publish();
        console.log(`  ✅ Successfully imported: ${proj.title}`);
      } catch(e: any) {
        console.error(`  ❌ Failed to import Project: ${proj.title}`);
        if (e.message) {
          console.error(`     Reason: ${e.message}`);
        } else {
           console.error(e);
        }
      }
    }

    console.log('\n🎉 ALL DONE! Your text data and relationships have been successfully ported over.');
    console.log('You can now log into Contentful and manually add the Media files to your new Projects!');

  } catch (error) {
    console.error('A critical error occurred:', error);
  }
}

runImport();
