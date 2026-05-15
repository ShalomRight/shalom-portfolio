// ============================================================
// SHALOM SUTHERLAND — PORTFOLIO TYPE SYSTEM
// ============================================================
//
// THREE PAGE TYPES
// ─────────────────────────────────────────────────────────────
//
//  1. PROJECT PAGE  (standard | deep)
//     Individual work with its own dedicated URL and detail page.
//     standard → overview, tools, gallery, outcome
//     deep     → full case study: brief, process phases, metrics
//
//  2. GALLERY PAGE  (logos | social-kits | motion)
//     A category-level showcase page — scrollable grid of work.
//     Items have NO individual pages. Click/hover reveals a brief
//     description and optional secondary images in a lightbox.
//     Used for: logo work, social media kits, motion reel.
//
//  3. ABOUT PAGE    (work history + small gallery)
//     Not typed here — static content managed separately.
//     Contains: Discovery Works, Right Stuff, IKTV, Skye Investment.
//
// ============================================================


// ── SHARED PRIMITIVES ─────────────────────────────────────────

export type MediaType = "image" | "video" | "gif" | "embed" | "lottie";

export interface MediaAsset {
  type:        MediaType;
  src:         string;         // URL or path
  alt?:        string;
  caption?:    string;
  poster?:     string;         // Video thumbnail
  aspectRatio?: string;        // e.g. "16/9", "1/1"
}

export interface Tag {
  label:    string;
  category: "tool" | "skill" | "industry" | "type";
}


// ════════════════════════════════════════════════════════════
// 1. PROJECT PAGES
// ════════════════════════════════════════════════════════════

export type ProjectCategory =
  | "motion"
  | "web-design"
  | "interactive"
  | "app"
  | "branding";

export type DetailLevel = "standard" | "deep";


// ── STANDARD PROJECT ─────────────────────────────────────────
// Has its own page. Mid-depth: overview, tools, gallery, outcome.
// No process breakdown.

export interface StandardProject {
  id:          string;
  detailLevel: "standard";
  title:       string;
  category:    ProjectCategory[];
  year:        number;
  slug:        string;          // URL slug — e.g. "kimya-glasgow-paradise"

  thumbnail:   MediaAsset;
  tagline:     string;          // 1 punchy line — shown on cards and page header
  description: string;          // 2–4 sentences: what it is, what you did
  tags:        Tag[];

  client?:     string;
  role?:       string;
  duration?:   string;
  tools:       string[];

  gallery:     MediaAsset[];    // 2–6 images/videos
  outcome?:    string;          // 1–2 sentences on result or impact
  liveUrl?:    string;
  hidden?:     boolean;
}


// ── DEEP PROJECT (full case study) ───────────────────────────
// Has its own page. Full narrative: brief, process phases, metrics.

export interface ProcessStep {
  phase:   string;              // e.g. "Pre-Production", "Identity Development"
  summary: string;              // 2–3 sentences
  media?:  MediaAsset[];        // Supporting visuals for this phase
}

export interface DeepProject {
  id:          string;
  detailLevel: "deep";
  title:       string;
  category:    ProjectCategory[];
  year:        number;
  slug:        string;

  thumbnail:   MediaAsset;
  heroMedia?:  MediaAsset;      // Full-width page hero (can differ from thumbnail)
  tagline:     string;
  tags:        Tag[];

  client?:            string;
  clientDescription?: string;   // 1 line about the client
  role:               string;
  team?:              string;   // e.g. "Solo", "2-person team"
  duration:           string;
  tools:              string[];

  brief:   string;              // The problem — 2–4 sentences
  process: ProcessStep[];       // Ordered phases

  gallery:   MediaAsset[];      // 4–12 assets
  outcome:   string;            // What shipped and its impact
  metrics?:  string[];          // e.g. ["↑ 40% engagement", "3 editions delivered"]

  liveUrl?:       string;
  caseStudyUrl?:  string;
  hidden?:        boolean;
}


// ── BRANDING PROJECT (deep + brand system) ───────────────────
// Extends DeepProject with brand identity specifics.

export interface BrandingProject extends Omit<DeepProject, "detailLevel" | "category"> {
  detailLevel: "deep";
  category:    ["branding"];

  brandSystem: {
    colorPalette?: {
      name:  string;
      hex:   string;
      usage: string;
    }[];
    typography?: {
      role:    "display" | "heading" | "body" | "accent";
      family:  string;
      weight?: string;
      usage:   string;
    }[];
    logoVariants?:   MediaAsset[];
    motionLanguage?: string;
    deliverables?:   string[];
  };
}

// Union type for all project pages
export type PortfolioProject =
  | StandardProject
  | DeepProject
  | BrandingProject;


// ════════════════════════════════════════════════════════════
// 2. GALLERY PAGES
// ════════════════════════════════════════════════════════════
//
// Items live ONLY on the gallery page — no individual routes.
// Clicking/hovering opens a lightbox with description + images.
//
// Three gallery page types:
//   "logos"       → logo work across clients
//   "social-kits" → social media content and kits
//   "motion"      → motion graphics reel / archive
// ════════════════════════════════════════════════════════════

export type GalleryPageType = "logos" | "social-kits" | "motion";


// ── GALLERY ITEM ─────────────────────────────────────────────
// A single entry in any gallery page.
// Thumbnail in the grid. Description + secondaryMedia in lightbox.

export interface GalleryItem {
  id:          string;
  title:       string;          // Client or project name
  year:        number;
  thumbnail:   MediaAsset;      // What shows in the grid

  // Lightbox content (shown on click)
  description?:   string;       // 1–2 sentences max
  secondaryMedia?: MediaAsset[]; // Additional images/variants shown in lightbox

  // Optional metadata shown in lightbox
  client?:   string;
  industry?: string;
  tags?:     Tag[];

  // If this logo/kit was part of a full project, link to it
  projectSlug?: string;
}


// ── GALLERY PAGE ─────────────────────────────────────────────
// The page itself — title, description, and its collection of items.

export interface GalleryPage {
  id:       GalleryPageType;
  title:    string;
  subtitle?: string;
  items:    GalleryItem[];
}


// ════════════════════════════════════════════════════════════
// TOP-LEVEL PORTFOLIO
// ════════════════════════════════════════════════════════════

export interface Portfolio {
  owner: {
    name:    string;
    title:   string;             // e.g. "Brand · Motion · UI/UX · Web"
    tagline: string;             // Hero statement — 1 line
    bio:     string;             // About section — 3–5 sentences
    email:   string;
    socials: {
      platform: string;
      url:      string;
    }[];
    resumeUrl?: string;
  };

  // Individual project pages — each gets its own URL
  projects: PortfolioProject[];

  // Category gallery pages — each is a scrollable showcase grid
  // Keyed by GalleryPageType for easy lookup: galleries["logos"]
  galleries: Partial<Record<GalleryPageType, GalleryPage>>;
}


// ════════════════════════════════════════════════════════════
// TYPE GUARDS
// ════════════════════════════════════════════════════════════

export const isStandard = (p: PortfolioProject): p is StandardProject =>
  p.detailLevel === "standard";

export const isDeep = (p: PortfolioProject): p is DeepProject =>
  p.detailLevel === "deep";

export const isBrandingProject = (p: PortfolioProject): p is BrandingProject =>
  p.detailLevel === "deep" &&
  "brandSystem" in p &&
  (p as BrandingProject).category[0] === "branding";

export const isGalleryPage = (x: unknown): x is GalleryPage =>
  typeof x === "object" && x !== null && "items" in x;


// ════════════════════════════════════════════════════════════
// ROUTING REFERENCE
// ════════════════════════════════════════════════════════════
//
//  /                        → Home / featured projects
//  /work                    → All project pages (grid)
//  /work/[slug]             → Individual ProjectPage (standard | deep)
//  /logos                   → GalleryPage — logos
//  /social-kits             → GalleryPage — social media kits
//  /motion                  → GalleryPage — motion graphics
//  /about                   → About page (work history, small gallery)
//
// ════════════════════════════════════════════════════════════
