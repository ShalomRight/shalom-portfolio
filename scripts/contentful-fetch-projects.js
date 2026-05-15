/**
 * contentful-fetch-projects.js
 *
 * Diagnostic script — fetches ALL PUBLISHED "project" entries from Contentful
 * and pretty-prints a summary of each one.
 *
 * Uses the Management API (no Delivery token needed yet).
 * Run: node scripts/contentful-fetch-projects.js
 */

const contentful = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

const SPACE_ID          = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN  = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌  Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local');
  process.exit(1);
}

const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN });

function field(entry, key) {
  const f = entry.fields[key];
  if (!f) return undefined;
  return f['en-US'];
}

async function fetchPublishedProjects() {
  console.log(`\n🔗  Connecting to Contentful space: ${SPACE_ID} …\n`);

  const space = await client.getSpace(SPACE_ID);
  const env   = await space.getEnvironment('master');

  // Only published entries have sys.publishedVersion set.
  // We pull all projects then filter locally.
  const response = await env.getEntries({
    content_type: 'project',
    limit: 1000,
  });

  const all       = response.items;
  const published = all.filter(e => e.sys.publishedVersion);

  console.log(`📦  Total project entries found : ${all.length}`);
  console.log(`✅  Published projects          : ${published.length}`);
  console.log(`🚧  Draft / unpublished         : ${all.length - published.length}`);
  console.log('\n' + '─'.repeat(60));

  if (published.length === 0) {
    console.log('\n⚠️  No published projects found in this space.');
    console.log('   Go to Contentful → Content → select a Project → click Publish.\n');
    return;
  }

  published.forEach((entry, i) => {
    const title       = field(entry, 'title')           ?? '(no title)';
    const slug        = field(entry, 'slug')            ?? '(no slug)';
    const detailLevel = field(entry, 'detailLevel')     ?? '—';
    const layout      = field(entry, 'detailPageLayout') ?? '(fallback)';
    const category    = (field(entry, 'category') ?? []).join(', ') || '—';
    const year        = field(entry, 'year')            ?? '—';
    const hidden      = field(entry, 'hidden')          ?? false;
    const tagline     = field(entry, 'tagline')         ?? '—';
    const tags        = field(entry, 'tags');
    const gallery     = field(entry, 'gallery');
    const liveUrl     = field(entry, 'liveUrl')         ?? '—';

    console.log(`\n[${i + 1}] ${title}`);
    console.log(`    id           : ${entry.sys.id}`);
    console.log(`    slug         : /work/${slug}`);
    console.log(`    detailLevel  : ${detailLevel}`);
    console.log(`    layout       : ${layout}`);
    console.log(`    category     : ${category}`);
    console.log(`    year         : ${year}`);
    console.log(`    hidden       : ${hidden}`);
    console.log(`    tagline      : ${tagline}`);
    console.log(`    tags         : ${tags ? tags.length + ' linked' : '0'}`);
    console.log(`    gallery      : ${gallery ? gallery.length + ' items' : '0 items'}`);
    console.log(`    liveUrl      : ${liveUrl}`);
    console.log(`    published at : ${entry.sys.publishedAt ?? 'n/a'}`);
  });

  console.log('\n' + '─'.repeat(60));
  console.log('\n📋  SLUGS SUMMARY (for routing):');
  published.forEach(e => {
    const slug   = field(e, 'slug') ?? '?';
    const hidden = field(e, 'hidden') ?? false;
    const vis    = hidden ? '🔒 hidden' : '🟢 visible';
    console.log(`    ${vis}  /work/${slug}`);
  });
  console.log('');
}

fetchPublishedProjects().catch(err => {
  console.error('\n❌  Error:', err.message ?? err);
  process.exit(1);
});
