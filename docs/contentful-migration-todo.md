# Contentful Migration: Next Steps & To-Do List

Now that the core data (Projects, Tags, and Process Steps) has been successfully imported into Contentful, here is the actionable checklist to complete the migration and fully integrate the CMS into your Next.js frontend.

---

## 1. Content Management (Manual Tasks)
*These tasks must be done inside the Contentful web UI.*

- [ ] **Upload Project Media:** Go through each imported "Project" and upload the actual images/videos for the `Thumbnail`, `Hero Media`, and `Gallery` fields.
- [ ] **Create the "Portfolio Owner" Entry:** Create a single entry for the `Portfolio Owner` content type. Fill in your bio, tagline, socials, and resume URL (this powers the global header/footer).
- [ ] **Create the "Gallery Page" Entries:** Create the 3 top-level gallery pages (`logos`, `social-kits`, and `motion`).
- [ ] **Create the "Gallery Items":** Add your individual gallery items (like "The Reef Logo" or "Paradise Title Sequence") and link them to their respective Gallery Pages and Parent Projects.

---

## 2. Infrastructure Setup (Codebase)
*Setting up the connection between Next.js and Contentful.*

- [ ] **Create the Fetch Utility:** Create `src/lib/contentful.ts` to house the GraphQL querying logic (or REST client) using your `.env.local` credentials.
- [ ] **Define GraphQL Queries:** Write the necessary queries to fetch:
  - All Projects (for the `/work` main index)
  - Single Project by Slug (for `/work/[slug]` detail pages)
  - Single Gallery by Page ID (for `/work/logos`, `/work/motion`)
  - Portfolio Owner (for global layout data)

---

## 3. Frontend Refactoring
*Replacing static imports with dynamic API calls.*

- [ ] **Update `/work` Index:** Refactor `src/pages/portfolio/work-main.tsx` to fetch projects from Contentful rather than importing `portfolio.projects` from the local file.
- [ ] **Update `/work/[slug]` Detail Pages:** Refactor the dynamic routing page to fetch the specific project based on the slug, and pass the data down to the appropriate layout component (`DetailTree`, `Showcase`, `Video`, etc.).
- [ ] **Update Galleries:** Refactor `/work/logos`, `/work/motion`, etc., to fetch their specific `Gallery Page` data.
- [ ] **Update Global Layout:** Fetch the `Portfolio Owner` data in your Root Layout (or Context) to populate the navigation and footer.

---

## 4. Cleanup & Optimization

- [ ] **Verify Caching Strategy:** Ensure Next.js is correctly caching the Contentful queries (using `next: { tags: ['contentful'] }`) so the site remains blazing fast.
- [ ] **Delete Local Data:** Once the site is 100% running on Contentful, delete `src/data/portfolio.data.ts` and its related static type definitions to clean up the repository.
