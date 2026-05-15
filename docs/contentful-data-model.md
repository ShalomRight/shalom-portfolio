# Contentful Data Model: Liko Portfolio

This document maps the TypeScript interfaces from `src/data/portfolio.types.ts` into a complete, developer-ready Contentful Data Model. Based on Contentful content modeling best practices, we have consolidated some types and utilized specific Contentful field types to best serve the Next.js App Router architecture.

---

## Overview of Content Types

1. **Portfolio Owner** (`portfolioOwner`) - Global site data.
2. **Project** (`project`) - Consolidated model for Standard, Deep, and Branding projects.
3. **Process Step** (`processStep`) - Reusable blocks for case study phases.
4. **Gallery Page** (`galleryPage`) - Top-level pages for galleries.
5. **Gallery Item** (`galleryItem`) - Individual items inside a gallery.
6. **Tag** (`tag`) - Taxonomy for categorizing projects and gallery items.
7. **Media Wrapper** (`mediaWrapper`) - *(Optional)* Enhances standard Contentful Assets with properties like aspect ratio and poster images.

---

## 1. Portfolio Owner
**ID:** `portfolioOwner`
**Description:** Global configuration and profile information for the portfolio. (Single entry expected).

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Name** | `name` | Short text | Required |
| **Title** | `title` | Short text | Required (e.g. "Brand · Motion · UI/UX · Web") |
| **Tagline** | `tagline` | Short text | Required |
| **Bio** | `bio` | Long text | Required |
| **Email** | `email` | Short text | Required, Match Regex (Email) |
| **Socials** | `socials` | JSON Object | Array of `{ platform, url }` |
| **Resume URL** | `resumeUrl` | Short text | URL |

---

## 2. Project
**ID:** `project`
**Description:** Represents all projects (Standard, Deep, and Branding). Validation or Frontend logic determines required fields based on the `detailLevel`.

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Title** | `title` | Short text | Required |
| **Slug** | `slug` | Short text | Required, Unique |
| **Detail Level** | `detailLevel` | Short text | Required, In list: `standard`, `deep` |
| **Page Layout** | `detailPageLayout` | Short text | In list: `detail-tree`, `showcase-detail`, `detail-video`, `detail-one`, `detail-two` |
| **Category** | `category` | Short text (List) | In list: `motion`, `web-design`, `interactive`, `app`, `branding` |
| **Year** | `year` | Number (Integer) | Required |
| **Tagline** | `tagline` | Short text | Required |
| **Thumbnail** | `thumbnail` | Media | Required, 1 file |
| **Hero Media** | `heroMedia` | Media | 1 file (Used for Deep projects) |
| **Description** | `description` | Long text | Required |
| **Client** | `client` | Short text | |
| **Client Description** | `clientDescription`| Short text | (Used for Deep projects) |
| **Role** | `role` | Short text | |
| **Team** | `team` | Short text | (Used for Deep projects) |
| **Duration** | `duration` | Short text | |
| **Tools** | `tools` | Short text (List) | |
| **Gallery** | `gallery` | Media (List) | Or Reference (List) to `mediaWrapper` |
| **Tags** | `tags` | Reference (List) | Must reference `tag` |
| **Outcome** | `outcome` | Long text | |
| **Metrics** | `metrics` | Short text (List) | |
| **Live URL** | `liveUrl` | Short text | URL |
| **Case Study URL** | `caseStudyUrl` | Short text | URL (Used for Deep projects) |
| **Hidden** | `hidden` | Boolean | Default: `false` |
| **Brief** | `brief` | Long text | Required if `detailLevel` is `deep` |
| **Process Steps** | `process` | Reference (List) | Must reference `processStep` |
| **Brand System** | `brandSystem` | JSON Object | For Branding projects (palette, typography, etc.) |

---

## 3. Process Step
**ID:** `processStep`
**Description:** A phase within a deep project case study (e.g., "Pre-Production", "Identity Development").

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Phase Name** | `phase` | Short text | Required |
| **Summary** | `summary` | Long text | Required |
| **Media** | `media` | Media (List) | Optional supporting visuals |

---

## 4. Gallery Page
**ID:** `galleryPage`
**Description:** Defines a specific gallery page route (e.g., /work/logos).

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Page Type (ID)** | `pageId` | Short text | Required, Unique, In list: `logos`, `social-kits`, `motion` |
| **Title** | `title` | Short text | Required |
| **Subtitle** | `subtitle` | Short text | |
| **Items** | `items` | Reference (List) | Required, Must reference `galleryItem` |

---

## 5. Gallery Item
**ID:** `galleryItem`
**Description:** A single entry inside a Gallery Page.

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Internal Title** | `internalTitle` | Short text | Required (for Contentful UI only) |
| **Display Title** | `title` | Short text | Required (e.g., Client/Project name) |
| **Year** | `year` | Number (Integer) | Required |
| **Thumbnail** | `thumbnail` | Media | Required, 1 file |
| **Description** | `description` | Long text | Lightbox description |
| **Secondary Media** | `secondaryMedia` | Media (List) | Lightbox extra images/videos |
| **Client** | `client` | Short text | |
| **Industry** | `industry` | Short text | |
| **Tags** | `tags` | Reference (List) | Must reference `tag` |
| **Linked Project** | `projectLink` | Reference | Must reference `project` |

---

## 6. Tag
**ID:** `tag`
**Description:** Taxonomy for filtering and badging.

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Label** | `label` | Short text | Required |
| **Category** | `category` | Short text | Required, In list: `tool`, `skill`, `industry`, `type` |

---

## 7. Media Wrapper (Optional but Recommended)
**ID:** `mediaWrapper`
**Description:** If your frontend requires explicit control over Lottie files, specific poster images for videos, or manual aspect ratio definitions, standard Contentful Assets may fall short. Use this component in place of "Media" fields above.

| Field Name | Field ID | Contentful Type | Validations / Settings |
| :--- | :--- | :--- | :--- |
| **Internal Name** | `internalName` | Short text | Required |
| **Media Type** | `type` | Short text | Required, In list: `image`, `video`, `gif`, `embed`, `lottie` |
| **Asset / File** | `asset` | Media | Required |
| **Poster Image** | `poster` | Media | Optional (For video thumbnails) |
| **Caption** | `caption` | Short text | Optional |
| **Aspect Ratio** | `aspectRatio` | Short text | Optional (e.g., "16/9", "1/1") |

---

## Best Practices for Implementation

1. **Rich Text vs Long Text:** We mapped descriptions and briefs to "Long text" based on the TypeScript model string types. If you plan to include bolding, links, or inline images, upgrade these to **Rich Text** fields in Contentful.
2. **References:** The `galleryItem` references the `project` directly rather than using a hardcoded `projectSlug` string. This guarantees that links won't break if a project slug changes.
3. **JSON Fields:** For complex nested objects like `BrandSystem` and `Socials` where you don't need Contentful searchability, `JSON Object` fields are ideal and align perfectly with Next.js parsing.
