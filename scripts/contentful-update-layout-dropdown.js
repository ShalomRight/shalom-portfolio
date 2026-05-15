/**
 * contentful-update-layout-dropdown.js
 *
 * Updates the existing "project" content type in Contentful so that
 * the "detailPageLayout" field becomes a validated dropdown
 * (only the 5 known layout values are selectable).
 *
 * Run: node scripts/contentful-update-layout-dropdown.js
 */

const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

const SPACE_ID         = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌  Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN');
  process.exit(1);
}

const LAYOUT_VALUES = [
  'detail-tree',
  'showcase-detail',
  'detail-video',
  'detail-one',
  'detail-two',
];

async function run() {
  console.log('🔗  Connecting to Contentful...');
  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN });
  const space  = await client.getSpace(SPACE_ID);
  const env    = await space.getEnvironment('master');

  console.log('📋  Fetching "project" content type...');
  const ct = await env.getContentType('project');

  // Find the detailPageLayout field and add in-validation
  const field = ct.fields.find(f => f.id === 'detailPageLayout');
  if (!field) {
    console.error('❌  Field "detailPageLayout" not found on project content type.');
    process.exit(1);
  }

  field.validations = [{ in: LAYOUT_VALUES }];
  console.log('✏️   Setting validations:', LAYOUT_VALUES);

  const updated = await ct.update();
  await updated.publish();

  console.log('✅  Content type updated and published.');
  console.log('    The "Page Layout" field is now a dropdown in Contentful with these options:');
  LAYOUT_VALUES.forEach(v => console.log(`    • ${v}`));
}

run().catch(err => {
  console.error('❌  Error:', err.message ?? err);
  process.exit(1);
});
