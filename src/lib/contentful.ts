/**
 * src/lib/contentful.ts
 *
 * Contentful Delivery API client.
 * Uses the read-only Delivery token to fetch PUBLISHED content only.
 * Called exclusively from Next.js Server Components / generateStaticParams.
 */

import { createClient, Asset, Entry, EntrySkeletonType } from "contentful";
import type {
  PortfolioProject,
  StandardProject,
  DeepProject,
  BrandingProject,
  MediaAsset,
  Tag,
  ProcessStep,
  DetailPageLayout,
  ProjectCategory,
  GalleryItem,
  GalleryPage,
  GalleryPageType,
} from "@/data";

// ─── Client ────────────────────────────────────────────────────────────────

const SPACE_ID       = process.env.CONTENTFUL_SPACE_ID ?? "";
const DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN ?? "";

/**
 * True only when both env vars are set and the token isn't the placeholder string.
 * When false, all fetch functions return empty arrays / null instead of crashing.
 */
const isConfigured =
  !!SPACE_ID &&
  !!DELIVERY_TOKEN &&
  DELIVERY_TOKEN !== "ADD_YOUR_DELIVERY_TOKEN_HERE";

export const contentfulClient = isConfigured
  ? createClient({ space: SPACE_ID, accessToken: DELIVERY_TOKEN })
  : null;

// ─── Raw Contentful field types ─────────────────────────────────────────────

/** Shape of a raw "project" entry's fields straight from Contentful */
interface RawProjectFields {
  title:             string;
  slug:              string;
  detailLevel:       "standard" | "deep";
  detailPageLayout?: DetailPageLayout;
  category?:         ProjectCategory[];
  year:              number;
  tagline:           string;
  description?:      string;
  client?:           string;
  clientDescription?: string;
  role?:             string;
  team?:             string;
  duration?:         string;
  tools?:            string[];
  thumbnail?:        Asset;
  heroMedia?:        Asset;
  gallery?:          Asset[];
  tags?:             Entry<EntrySkeletonType>[];
  outcome?:          string;
  metrics?:          string[];
  liveUrl?:          string;
  caseStudyUrl?:     string;
  hidden?:           boolean;
  brief?:            string;
  process?:          Entry<EntrySkeletonType>[];
  brandSystem?:      Record<string, unknown>;
}

// ─── Mapper helpers ──────────────────────────────────────────────────────────

function mapAsset(asset: Asset | undefined): MediaAsset | null {
  if (!asset?.fields?.file) return null;
  const file = asset.fields.file as {
    url: string;
    contentType: string;
    details?: { image?: { width: number; height: number } };
  };
  const url  = `https:${file.url}`;
  const ct   = (file.contentType as string) ?? "";
  const type: MediaAsset["type"] = ct.startsWith("video") ? "video"
    : ct.startsWith("image") ? "image"
    : "image";

  // Compute aspect ratio from image dimensions when available
  let aspectRatio: string | undefined;
  const imgDetails = file.details?.image;
  if (imgDetails && imgDetails.width && imgDetails.height) {
    // Simplify to nearest common ratio
    const ratio = imgDetails.width / imgDetails.height;
    if (Math.abs(ratio - 16 / 9) < 0.05)       aspectRatio = "16/9";
    else if (Math.abs(ratio - 4 / 3) < 0.05)   aspectRatio = "4/3";
    else if (Math.abs(ratio - 1) < 0.05)        aspectRatio = "1/1";
    else if (Math.abs(ratio - 3 / 2) < 0.05)   aspectRatio = "3/2";
    else if (Math.abs(ratio - 9 / 16) < 0.05)  aspectRatio = "9/16";
    // else leave undefined — MediaBlock will render naturally
  }

  return {
    type,
    src:         url,
    alt:         (asset.fields.description as string | undefined) ??
                 (asset.fields.title       as string | undefined) ??
                 "",
    poster:      undefined,
    aspectRatio,
  };
}

function mapAssets(assets: Asset[] | undefined): MediaAsset[] {
  if (!assets) return [];
  return assets.map(mapAsset).filter(Boolean) as MediaAsset[];
}

function mapTag(entry: Entry<EntrySkeletonType>): Tag {
  const f = entry.fields as { label: string; category: Tag["category"] };
  return { label: f.label, category: f.category };
}

function mapProcessStep(entry: Entry<EntrySkeletonType>): ProcessStep {
  const f = entry.fields as { phase: string; summary: string; media?: Asset[] };
  return {
    phase:   f.phase,
    summary: f.summary,
    media:   mapAssets(f.media),
  };
}

/** Fallback placeholder used when a required asset is missing */
const PENDING_ASSET: MediaAsset = { type: "image", src: "PENDING", alt: "" };

// ─── Main mapper ─────────────────────────────────────────────────────────────

function mapProjectEntry(
  entry: Entry<EntrySkeletonType>
): PortfolioProject | null {
  const f = entry.fields as unknown as RawProjectFields;

  // Guard: must have a slug to be routable
  if (!f.slug) return null;

  const detailLevel      = f.detailLevel ?? "standard";
  const detailPageLayout = f.detailPageLayout;
  const category         = f.category ?? [];
  const tags             = (f.tags ?? []).map(mapTag);
  const thumbnail        = mapAsset(f.thumbnail) ?? PENDING_ASSET;
  const gallery          = mapAssets(f.gallery);
  // Strip "PENDING" placeholder strings — they're import artifacts, not real data
  const isPending        = (v?: string) => !v || v.trim().toUpperCase() === "PENDING";
  const tools            = (f.tools ?? []).filter(t => !isPending(t));
  const duration         = isPending(f.duration) ? undefined : f.duration;
  const liveUrl          = isPending(f.liveUrl)  ? undefined : f.liveUrl;

  const base = {
    id:               entry.sys.id,
    title:            f.title,
    slug:             f.slug,
    year:             f.year,
    tagline:          f.tagline,
    category,
    tags,
    thumbnail,
    tools,
    client:           f.client,
    role:             f.role,
    duration,
    liveUrl,
    hidden:           f.hidden ?? false,
    detailPageLayout,
  };

  if (detailLevel === "deep") {
    const heroMedia = mapAsset(f.heroMedia) ?? undefined;
    const process   = (f.process ?? []).map(mapProcessStep);
    const isBranding =
      category.includes("branding") &&
      !!f.brandSystem &&
      Object.keys(f.brandSystem).length > 0;

    const deep: DeepProject = {
      ...base,
      detailLevel:        "deep",
      heroMedia,
      role:               f.role ?? "",
      duration:           f.duration ?? "",
      clientDescription:  f.clientDescription,
      team:               f.team,
      brief:              f.brief ?? "",
      process,
      gallery,
      outcome:            f.outcome ?? "",
      metrics:            f.metrics,
      caseStudyUrl:       f.caseStudyUrl,
    };

    if (isBranding) {
      return { ...deep, brandSystem: f.brandSystem } as BrandingProject;
    }
    return deep;
  }

  // Standard project
  const standard: StandardProject = {
    ...base,
    detailLevel:  "standard",
    description:  f.description ?? "",
    gallery,
    outcome:      f.outcome,
    metrics:      f.metrics,
  };
  return standard;
}

// ─── Public fetch functions ──────────────────────────────────────────────────

/**
 * Fetch all PUBLISHED, non-hidden projects.
 * Used by the /work index page.
 */
export async function getAllProjects(): Promise<PortfolioProject[]> {
  if (!contentfulClient) {
    console.warn("[contentful] Delivery token not configured — returning empty project list.");
    return [];
  }

  const res = await contentfulClient.getEntries({
    content_type: "project",
    limit:        1000,
    order:        ["-fields.year"] as any,
  });

  return res.items
    .map(mapProjectEntry)
    .filter((p): p is PortfolioProject => p !== null && !p.hidden);
}

/**
 * Fetch a single PUBLISHED project by slug.
 * Used by /work/[slug] detail pages.
 * Returns null if not found.
 */
export async function getProjectBySlug(
  slug: string
): Promise<PortfolioProject | null> {
  if (!contentfulClient) {
    console.warn("[contentful] Delivery token not configured — cannot fetch project.");
    return null;
  }

  const res = await contentfulClient.getEntries({
    content_type:  "project",
    "fields.slug": slug,
    limit:         1,
  } as any);

  if (!res.items.length) return null;
  const project = mapProjectEntry(res.items[0]);
  if (!project || project.hidden) return null;
  return project;
}

/**
 * Returns all slugs for published, non-hidden projects.
 * Used by generateStaticParams.
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  if (!contentfulClient) {
    console.warn("[contentful] Delivery token not configured — returning empty slug list.");
    return [];
  }

  const res = await contentfulClient.getEntries({
    content_type: "project",
    select:       ["fields.slug", "fields.hidden"] as any,
    limit:        1000,
  });

  return res.items
    .filter((e) => {
      const f = e.fields as { slug?: string; hidden?: boolean };
      return f.slug && !f.hidden;
    })
    .map((e) => (e.fields as { slug: string }).slug);
}

// ─── Gallery helpers ─────────────────────────────────────────────────────────

function mapGalleryItemAsset(asset: Asset | undefined): MediaAsset | null {
  return mapAsset(asset);
}

function mapGalleryItemEntry(entry: Entry<EntrySkeletonType>): GalleryItem | null {
  const f = entry.fields as {
    title?: string;
    year?: number;
    thumbnail?: Asset;
    description?: string;
    client?: string;
    industry?: string;
    projectSlug?: string;
    secondaryMedia?: Asset[];
    tags?: Entry<EntrySkeletonType>[];
  };

  if (!f.title) return null;

  return {
    id:             entry.sys.id,
    title:          f.title,
    year:           f.year ?? new Date().getFullYear(),
    thumbnail:      mapGalleryItemAsset(f.thumbnail) ?? { type: "image", src: "PENDING", alt: "" },
    description:    f.description,
    client:         f.client,
    industry:       f.industry,
    projectSlug:    f.projectSlug,
    secondaryMedia: mapAssets(f.secondaryMedia),
    tags:           (f.tags ?? []).map(mapTag),
  };
}

/**
 * Fetch a gallery page (logos | social-kits | motion) from Contentful.
 * Falls back to local portfolio.data if Contentful is not configured
 * or if there are no gallery items in Contentful yet.
 */
export async function getGalleryPage(
  pageType: GalleryPageType
): Promise<GalleryPage | null> {
  // ── Contentful path ────────────────────────────────────────
  if (contentfulClient) {
    try {
      // Try fetching a "galleryPage" content type keyed by pageType id
      const pageRes = await contentfulClient.getEntries({
        content_type:  "galleryPage",
        "fields.id":   pageType,
        limit:         1,
        include:       2,   // resolve linked gallery items
      } as any);

      if (pageRes.items.length) {
        const pf = pageRes.items[0].fields as {
          title?: string;
          subtitle?: string;
          items?: Entry<EntrySkeletonType>[];
        };
        const items = (pf.items ?? []).map(mapGalleryItemEntry).filter(Boolean) as GalleryItem[];
        return {
          id:       pageType,
          title:    pf.title ?? pageType,
          subtitle: pf.subtitle,
          items,
        };
      }
    } catch (err: any) {
      // If content type doesn't exist yet or other fetch error, just fallback to local data.
      console.warn(`[contentful] Failed to fetch galleryPage '${pageType}':`, err?.message || err);
    }
  }

  // ── Local fallback (until gallery items are in Contentful) ─
  const { portfolio } = await import("@/data");
  return portfolio.galleries[pageType] ?? null;
}
