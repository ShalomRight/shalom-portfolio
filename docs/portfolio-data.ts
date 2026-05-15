// ============================================================
// SHALOM SUTHERLAND — PORTFOLIO DATA
// All projects processed through rant-clear system prompt.
// PENDING flags = items awaiting your confirmation or media.
// ============================================================

import type {
  Portfolio,
  DeepProject,
  StandardProject,
  BrandingProject,
} from "./portfolio-types";

export const portfolio: Portfolio = {

  // ── OWNER ─────────────────────────────────────────────────
  owner: {
    name: "Shalom Sutherland",
    title: "Brand · Motion · UI/UX · Web",
    tagline: "Designed to move. Built to last.",
    bio: "Multidisciplinary designer based in Saint Vincent and the Grenadines. I work across brand identity, motion, UI/UX, and front-end development — from initial concept to shipped product. Over a decade of work spanning fashion, hospitality, broadcast, and software.",
    email: "shalom.sutherland@gmail.com",
    socials: [],
    resumeUrl: "PENDING",
  },

  projects: [

    // ════════════════════════════════════════════════════════
    // MOTION & BRAND
    // ════════════════════════════════════════════════════════

    // ── 1. PARADISE — KIMYA GLASGOW FRAGRANCE LAUNCH ─────────
    // Detail: DEEP
    // Strongest motion piece. Director, editor, motion graphics.
    {
      id: "proj-001",
      detailLevel: "deep",
      title: "Paradise",
      category: ["motion", "branding"],
      year: 2024, // CONFIRM: gov.vc article says October 6th — which year?
      slug: "kimya-glasgow-paradise",
      thumbnail: { type: "image", src: "PENDING", alt: "Paradise Fragrance Launch" },
      heroMedia: { type: "video", src: "PENDING", poster: "PENDING", caption: "Paradise — launch film" },
      tagline: "Directing the launch of a Caribbean luxury fragrance.",
      tags: [
        { label: "After Effects",   category: "tool"     },
        { label: "DaVinci Resolve", category: "tool"     },
        { label: "Direction",       category: "skill"    },
        { label: "Video Production",category: "skill"    },
        { label: "Motion Graphics", category: "skill"    },
        { label: "Fashion",         category: "industry" },
      ],
      client:            "Kimya Glasgow Inc.",
      clientDescription: "SVG-born, Caribbean-based luxury fashion and lifestyle brand. The first fashion house in the Caribbean to launch its own signature fragrance.",
      role:     "Creative Director, Director & Editor",
      team:     "Axton John (camera), additional operator (drone)", // CONFIRM: drone operator name when remembered
      duration: "PENDING", // CONFIRM: how long was pre-production and post?
      tools:    ["Adobe After Effects", "DaVinci Resolve"],

      brief: "After establishing the Caribbean's first fashion-house fragrance with Vanilla Orchid, Kimya Glasgow was ready to launch her second: Paradise. The concept centred on the Caribbean woman — her beauty, her presence, her environment. The brief called for a launch film worthy of the brand's regional stature: intimate, elevated, and genuinely rooted in place.",

      process: [
        {
          phase: "Pre-Production",
          summary: "Developed the shot list from scratch. Kimya sourced the location — Spirit of the Valley, Vermont, Saint Vincent. Brought in Axton John as the primary camera operator and a second operator for drone coverage.",
        },
        {
          phase: "Production",
          summary: "Captured women arriving at the event, interacting with the fragrance, sharing a dinner, and delivering individual on-camera interviews about what Paradise meant to them — and what it means to be a Caribbean woman.",
        },
        {
          phase: "Post-Production",
          summary: "Handled the full edit in DaVinci Resolve. Designed and animated motion graphics in After Effects for the main launch film and each interview cut. Colour graded the full project.",
        },
      ],

      gallery: [
        { type: "video", src: "PENDING", poster: "PENDING", caption: "Paradise — main launch film" },
        { type: "video", src: "PENDING", poster: "PENDING", caption: "Short-form promo cuts" },
        { type: "video", src: "PENDING", poster: "PENDING", caption: "Interview series — individual cuts" },
        { type: "image", src: "PENDING", alt: "Product photography — Paradise bottle" },
        { type: "image", src: "PENDING", alt: "Behind-the-scenes — shoot day" },
        { type: "image", src: "PENDING", alt: "Motion graphics frame — After Effects" },
      ],

      outcome: "Delivered a full launch package: main film, short-format promos, individual interview cuts, and product photography — all with motion graphics. Content ran across social and at the launch event itself.",
      metrics: [
        "Main launch film",
        "Short-format promo cuts",
        "Individual interview series (one per subject)",
        "Behind-the-scenes footage",
        "Product photography with motion overlay",
      ],
      liveUrl: "PENDING",
    } as DeepProject,


    // ── 2. KIMYA GLASGOW — SUSTAINABILITY SOCIAL ─────────────
    // Detail: STANDARD
    // Carousel series on sustainable/ethical fashion
    {
      id: "proj-002",
      detailLevel: "standard",
      title: "Kimya Glasgow — Sustainability Campaign",
      category: ["branding", "motion"],
      year: 2023,
      slug: "kimya-glasgow-sustainability",
      thumbnail: { type: "image", src: "PENDING", alt: "Kimya Glasgow Sustainability Carousels" },
      tagline: "Giving a slow-fashion brand a voice online.",
      tags: [
        { label: "Social Media",     category: "type"     },
        { label: "Carousel Design",  category: "skill"    },
        { label: "Brand Strategy",   category: "skill"    },
        { label: "Sustainability",   category: "industry" },
        { label: "Fashion",          category: "industry" },
      ],
      client:   "Kimya Glasgow Inc.",
      role:     "Designer & Content Strategist",
      duration: "PENDING", // CONFIRM: was this a one-off campaign or ongoing?
      tools:    ["Adobe Illustrator", "Figma", "After Effects"],

      description: "Kimya Glasgow's commitment to sustainable and ethical fashion had been core to the brand for years — but it hadn't translated into content that could move an audience. After researching the sustainable fashion space, the output was a 5–6 part carousel series that explained why slow fashion matters and positioned Kimya Glasgow as a brand worth buying into, not just wearing. Engagement spiked — conversations started, DMs came in, and direct sales followed.",

      gallery: [
        { type: "image", src: "PENDING", alt: "Carousel slide — why sustainable fashion matters" },
        { type: "image", src: "PENDING", alt: "Carousel slide — the Kimya Glasgow approach" },
        { type: "image", src: "PENDING", alt: "Carousel slide — fast fashion vs slow fashion" },
      ],

      outcome: "Drove measurable engagement growth on the brand's social channels — including conversations with new followers and direct sales attributed to the campaign.",
      metrics: [
        "PENDING — confirm follower growth or engagement numbers if available",
      ],
    } as StandardProject,


    // ── 3. BOTANICAL — 3D / AI PRODUCT VISUALS ───────────────
    // Detail: STANDARD
    // Phone photos → Cinema 4D → AI rendering → social growth
    {
      id: "proj-003",
      detailLevel: "standard",
      title: "Botanical — Product Visuals & Social",
      category: ["motion", "branding"],
      year: 2024,
      slug: "botanical-social",
      thumbnail: { type: "image", src: "PENDING", alt: "Botanical product visuals" },
      tagline: "From phone photos to premium 3D product shots.",
      tags: [
        { label: "Cinema 4D",    category: "tool"  },
        { label: "AI Rendering", category: "tool"  },
        { label: "3D Design",    category: "skill" },
        { label: "Social Media", category: "type"  },
      ],
      client:   "Botanical",
      role:     "Designer & Content Strategist",
      duration: "PENDING",
      tools:    ["Cinema 4D", "AI image tools", "Adobe Illustrator"],

      description: "Botanical makes small-batch natural oils — the product quality was there, the visuals weren't. Starting with phone photos, each bottle was modelled in Cinema 4D to create high-fidelity 3D assets that could be repositioned freely without losing product accuracy. AI rendering then placed those models into lifestyle environments — transforming functional product shots into aspirational content. Alongside the photography, a carousel series educated the audience on what each oil does and why it matters. The result was a rebuilt social presence, audience growth, and sales.",

      gallery: [
        { type: "image", src: "PENDING", alt: "Before — original phone photo" },
        { type: "image", src: "PENDING", alt: "After — AI-rendered 3D lifestyle shot" },
        { type: "image", src: "PENDING", alt: "3D model in Cinema 4D — wireframe view" },
        { type: "image", src: "PENDING", alt: "Carousel — product benefits series" },
      ],

      outcome: "Built a social media presence from near zero. Product photography raised brand perception and contributed to direct sales.",
      metrics: [
        "PENDING — confirm follower/engagement growth numbers",
        "PENDING — confirm sales attributed to content",
      ],
    } as StandardProject,


    // ════════════════════════════════════════════════════════
    // BRANDING + EVENTS — THE REEF
    // ════════════════════════════════════════════════════════

    // ── 4. THE REEF — BRAND IDENTITY ─────────────────────────
    // Detail: DEEP / Branding
    // Rebrand: custom typography, nautical theme, menus
    {
      id: "proj-004",
      detailLevel: "deep",
      title: "The Reef — Brand Identity",
      category: ["branding"],
      year: 2022,
      slug: "the-reef-brand",
      thumbnail: { type: "image", src: "PENDING", alt: "The Reef brand identity" },
      tagline: "A rebrand rooted in reef, sea, and Bequia's heritage.",
      tags: [
        { label: "Illustrator",      category: "tool"     },
        { label: "Figma",            category: "tool"     },
        { label: "Logo Design",      category: "skill"    },
        { label: "Typography",       category: "skill"    },
        { label: "Print Design",     category: "skill"    },
        { label: "Hospitality",      category: "industry" },
      ],
      client:            "The Reef",
      clientDescription: "One of Bequia's oldest restaurants, founded by Mr. Simmons and now run by his son Cassie Simmons. A community anchor in Lower Bay, Bequia, Saint Vincent and the Grenadines — known as much for its events as its food.",
      role:     "Brand Designer",
      team:     "Solo",
      duration: "PENDING",
      tools:    ["Adobe Illustrator", "Figma"],

      brief: "The Reef had been operating with a basic typographic treatment — functional but forgettable. They wanted something that felt like the place: old, nautical, organic. Not a modern rebrand. Something with character you could feel.",

      process: [
        {
          phase: "Identity Development",
          summary: "Designed a custom wordmark with organic, aged letterforms — thick strokes with textured 'freckle' detailing that references coral and reef surface texture. The result reads as both piratic and deeply natural.",
          media: [
            { type: "image", src: "PENDING", alt: "Old logo — before" },
            { type: "image", src: "PENDING", alt: "New wordmark — exploration" },
            { type: "image", src: "PENDING", alt: "Final mark — primary" },
          ],
        },
        {
          phase: "Nautical Language",
          summary: "Extended the reef and sea aesthetic into a broader visual language — textures, motifs, and compositional references to Bequia's maritime character.",
        },
        {
          phase: "Menu Design",
          summary: "Carried the nautical theme directly into menu layouts. Typography, borders, and background treatment all echo the brand mark's organic character.",
          media: [
            { type: "image", src: "PENDING", alt: "Menu design — spread" },
          ],
        },
      ],

      gallery: [
        { type: "image", src: "PENDING", alt: "Before — original logo" },
        { type: "image", src: "PENDING", alt: "New wordmark — primary" },
        { type: "image", src: "PENDING", alt: "Logo detail — reef texture in letterforms" },
        { type: "image", src: "PENDING", alt: "Menu design — full spread" },
        { type: "image", src: "PENDING", alt: "Brand application — background texture" },
      ],

      outcome: "Delivered a rebrand that replaced a generic type treatment with a mark that genuinely reflects the venue's identity. Applied across menus and print collateral.",

      brandSystem: {
        deliverables: [
          "Custom wordmark",
          "Logo variants (primary, mono)",
          "Menu design",
          "Background / texture assets",
          "PENDING — list any others",
        ],
        colorPalette: [
          // PENDING — add when confirmed
        ],
        typography: [
          {
            role: "display",
            family: "Custom / hand-crafted wordmark",
            usage: "Primary logo only — organic, reef-textured letterforms",
          },
        ],
        logoVariants: [
          { type: "image", src: "PENDING", alt: "Primary — colour" },
          { type: "image", src: "PENDING", alt: "Mono variant" },
          { type: "image", src: "PENDING", alt: "Reverse / white on dark" },
        ],
      },
    } as unknown as BrandingProject,


    // ── 5. LOTS OF LOBSTER — EVENT (3 editions) ──────────────
    // Detail: STANDARD
    // Multi-restaurant Bequia lobster festival, The Reef as founder
    // NOTE: Correct name is "Lots of Lobster" not "Bequia Lobster Fest"
    {
      id: "proj-005",
      detailLevel: "standard",
      title: "Lots of Lobster",
      category: ["branding", "motion"],
      year: 2023, // CONFIRM: is 2023 the correct first edition?
      slug: "lots-of-lobster",
      thumbnail: { type: "image", src: "PENDING", alt: "Lots of Lobster — event identity" },
      tagline: "Three editions of a multi-venue Caribbean lobster festival.",
      tags: [
        { label: "Illustrator",      category: "tool"     },
        { label: "After Effects",    category: "tool"     },
        { label: "Logo Design",      category: "skill"    },
        { label: "Event Design",     category: "skill"    },
        { label: "Motion Graphics",  category: "skill"    },
        { label: "Hospitality",      category: "industry" },
      ],
      client:   "The Reef",
      role:     "Designer",
      duration: "2023–Present (3 editions)",
      tools:    ["Adobe Illustrator", "Adobe After Effects"],

      description: "The Reef conceived Lots of Lobster to unite Bequia's restaurants around the island's lobster season — a multi-venue weekend event that put Bequia's food culture on the calendar. Shalom designed the event identity, logo, menus, social media content, and motion graphics. The first edition was rough; the second was a significant visual refresh that set the tone carried through to the third.",

      gallery: [
        { type: "image", src: "PENDING", alt: "Edition 1 — original logo" },
        { type: "image", src: "PENDING", alt: "Edition 2 — refreshed identity" },
        { type: "image", src: "PENDING", alt: "Edition 3 — social media content" },
        { type: "image", src: "PENDING", alt: "Menu design" },
        { type: "video", src: "PENDING", poster: "PENDING", caption: "Motion promo" },
      ],

      outcome: "Delivered event identity, menus, social content, and motion promos across three consecutive editions.",
    } as StandardProject,


    // ── 6. MUTINY ON THE REEF — EASTER EVENT ─────────────────
    // Detail: DEEP
    // 4 editions: gallery of early work, deep dive on 2026 AI campaign
    {
      id: "proj-006",
      detailLevel: "deep",
      title: "Mutiny on the Reef",
      category: ["motion", "branding"],
      year: 2026,
      slug: "mutiny-on-the-reef",
      thumbnail: { type: "image", src: "PENDING", alt: "Mutiny 2026 — AI DJ campaign" },
      heroMedia: { type: "video", src: "PENDING", poster: "PENDING", caption: "Mutiny 2026 — campaign reel" },
      tagline: "Four editions of Mutiny. The last one changed the playbook.",
      tags: [
        { label: "AI Generation",  category: "tool"     },
        { label: "DaVinci Resolve",category: "tool"     },
        { label: "After Effects",  category: "tool"     },
        { label: "Illustrator",    category: "tool"     },
        { label: "Art Direction",  category: "skill"    },
        { label: "Motion Graphics",category: "skill"    },
        { label: "3D Animation",   category: "skill"    },
        { label: "Entertainment",  category: "industry" },
      ],
      client:            "The Reef",
      clientDescription: "One of Bequia's oldest restaurants, Lower Bay, Bequia. Known for its annual Easter events.",
      role:     "Creative Director & Designer",
      team:     "Solo",
      duration: "2022–2026 (4 editions)",
      tools:    ["Adobe Illustrator", "Adobe After Effects", "DaVinci Resolve", "AI image generation"],

      brief: "Every Easter in Bequia brings a run of events, and The Reef's entry is Mutiny — a pirate-themed party by the sea, the name a clever play on the venue's identity and setting. Over four years, the job evolved from designing promotional materials to directing a fully AI-integrated campaign.",

      process: [
        {
          phase: "Editions 1–2 (2022–2023) — Foundation",
          summary: "Established the Mutiny visual identity: logo, typographic treatment, motion graphics for event promos. Solid work, but early. These editions set the base that later campaigns would build on.",
          media: [
            { type: "image", src: "PENDING", alt: "Mutiny 2022 — logo and promo materials" },
            { type: "image", src: "PENDING", alt: "Mutiny 2023 — motion promo still" },
          ],
        },
        {
          phase: "Edition 3 (2024) — AI Enters the Workflow",
          summary: "Introduced AI-generated concept art and character design into the campaign. Developed stylised visuals and incorporated them alongside traditional motion graphics.",
          media: [
            { type: "image", src: "PENDING", alt: "Mutiny 2024 — AI concept characters" },
          ],
        },
        {
          phase: "Edition 4 (2026) — Full Creative Overhaul",
          summary: "Rebuilt everything. Generated AI portraits of each performing DJ — placing real people into fully stylised pirate-aesthetic environments and costumes. Created a narrative storyline that ran through all promo materials. Redesigned and animated the logo in 3D. Final edit and grade in DaVinci Resolve. The campaign ran as a coherent, character-driven story rather than a series of individual event flyers.",
          media: [
            { type: "image", src: "PENDING", alt: "DJ character generation — AI concepts and finals" },
            { type: "image", src: "PENDING", alt: "3D logo animation — frame still" },
            { type: "image", src: "PENDING", alt: "DaVinci Resolve — edit timeline BTS" },
          ],
        },
      ],

      gallery: [
        // Early editions — gallery context only
        { type: "image", src: "PENDING", alt: "Editions 1–2 promo gallery" },
        // 2024 edition
        { type: "image", src: "PENDING", alt: "Mutiny 2024 — AI character concepts" },
        // 2026 hero content
        { type: "image", src: "PENDING", alt: "Mutiny 2026 — DJ character renders" },
        { type: "image", src: "PENDING", alt: "Mutiny 2026 — 3D logo still" },
        { type: "video", src: "PENDING", poster: "PENDING", caption: "Mutiny 2026 — main promo video" },
        { type: "image", src: "PENDING", alt: "Behind the scenes — DaVinci Resolve session" },
      ],

      outcome: "Delivered a complete, character-driven campaign for the 2026 edition — the most ambitious in the event's history. AI-generated DJ portraits, 3D logo animation, original storyline, and a full DaVinci Resolve-edited promo package.",
      metrics: [
        "PENDING — event attendance, social reach, reception to the AI-generated content",
      ],
    } as DeepProject,


    // ════════════════════════════════════════════════════════
    // APPS / UI/UX
    // ════════════════════════════════════════════════════════

    // ── 7. LUXCARE ───────────────────────────────────────────
    {
      id: "proj-007",
      detailLevel: "deep",
      title: "LuxCare",
      category: ["app", "web-design"],
      year: 2024,
      slug: "luxcare",
      thumbnail: { type: "image", src: "PENDING", alt: "LuxCare App" },
      tagline: "A garment care and repair management system.",
      tags: [
        { label: "React",          category: "tool"     },
        { label: "UI/UX Design",   category: "skill"    },
        { label: "App Design",     category: "type"     },
        { label: "Fashion/Retail", category: "industry" },
      ],
      client:   "PENDING — personal product or client?",
      role:     "Designer & Developer",
      team:     "PENDING",
      duration: "PENDING",
      tools:    ["Figma", "React", "PENDING"],
      brief:    "PENDING — rant-clear: who uses LuxCare, what problem does it solve?",
      process: [
        { phase: "Research",   summary: "PENDING" },
        { phase: "Design",     summary: "PENDING" },
        { phase: "Build",      summary: "PENDING" },
      ],
      gallery: [
        { type: "image", src: "PENDING", alt: "PENDING" },
      ],
      outcome: "PENDING",
    } as DeepProject,


    // ── 8. SUPERBOOK ─────────────────────────────────────────
    {
      id: "proj-008",
      detailLevel: "deep",
      title: "Superbook",
      category: ["app", "web-design"],
      year: 2024,
      slug: "superbook",
      thumbnail: { type: "image", src: "PENDING", alt: "Superbook Platform" },
      tagline: "A booking platform, built to your brief.",
      tags: [
        { label: "React",        category: "tool"  },
        { label: "UI/UX Design", category: "skill" },
        { label: "SaaS",         category: "type"  },
      ],
      client:   "Personal Product",
      role:     "Designer & Developer",
      team:     "PENDING",
      duration: "PENDING",
      tools:    ["Figma", "React", "PENDING"],
      brief:    "A booking platform as a service — clients describe what they need, Shalom builds and deploys a tailored booking system for them.",
      process: [
        { phase: "Concept", summary: "PENDING" },
        { phase: "Design",  summary: "PENDING" },
        { phase: "Build",   summary: "PENDING" },
      ],
      gallery: [
        { type: "image", src: "PENDING", alt: "PENDING" },
      ],
      outcome: "PENDING",
    } as DeepProject,


    // ── 9. ISLAND TROVES ─────────────────────────────────────
    {
      id: "proj-009",
      detailLevel: "standard",
      title: "Island Troves",
      category: ["app", "web-design"],
      year: 2024,
      slug: "island-troves",
      thumbnail: { type: "image", src: "PENDING", alt: "Island Troves Web App" },
      tagline: "A web app for Caribbean-made products.",
      tags: [
        { label: "React",        category: "tool"     },
        { label: "UI/UX Design", category: "skill"    },
        { label: "E-commerce",   category: "type"     },
        { label: "Caribbean",    category: "industry" },
      ],
      client:   "Island Troves",
      role:     "Designer & Developer",
      duration: "PENDING",
      tools:    ["Figma", "React", "PENDING"],
      description: "PENDING — rant-clear: describe Island Troves, what it does, who it's for, what you built.",
      gallery: [
        { type: "image", src: "PENDING", alt: "PENDING" },
      ],
      outcome: "PENDING",
    } as StandardProject,


    // ── 10. CARRYVAN ─────────────────────────────────────────
    {
      id: "proj-010",
      detailLevel: "deep",
      title: "Carryvan",
      category: ["app", "web-design"],
      year: 2025,
      slug: "carryvan",
      thumbnail: { type: "image", src: "PENDING", alt: "Carryvan App" },
      tagline: "Point A to point B, anywhere in the Caribbean.",
      tags: [
        { label: "React",        category: "tool"     },
        { label: "UI/UX Design", category: "skill"    },
        { label: "Platform",     category: "type"     },
        { label: "Logistics",    category: "industry" },
        { label: "Caribbean",    category: "industry" },
      ],
      client:   "Personal Product",
      role:     "Designer & Developer",
      team:     "PENDING",
      duration: "PENDING",
      tools:    ["Figma", "React", "PENDING — backend stack"],
      brief:    "A Caribbean transport and delivery platform. Users can request a ride or a package drop-off. Drivers and vehicle operators list their vehicles and accept jobs. Vehicle size selection is built into the delivery flow.",
      process: [
        {
          phase: "Concept",
          summary: "PENDING — what gap in the Caribbean market does this fill?",
        },
        {
          phase: "User Flows",
          summary: "PENDING — passenger/sender flow, driver onboarding, job matching.",
        },
        {
          phase: "Admin & Fleet System",
          summary: "Built a fleet management admin system alongside the consumer app — operators can manage drivers, vehicles, and job history.",
        },
        {
          phase: "Build",
          summary: "PENDING — current state. What's shipped?",
        },
      ],
      gallery: [
        { type: "image", src: "PENDING", alt: "Passenger / delivery request screen" },
        { type: "image", src: "PENDING", alt: "Driver view" },
        { type: "image", src: "PENDING", alt: "Admin fleet dashboard" },
      ],
      outcome: "PENDING — live, in beta, or in active development?",
    } as DeepProject,

  ],


  // ════════════════════════════════════════════════════════
  // GALLERY PAGES
  // Scrollable grid pages — items have NO individual routes.
  // Click/hover opens a lightbox: description + secondary images.
  // ════════════════════════════════════════════════════════

  galleries: {

    // ── LOGOS ──────────────────────────────────────────────
    logos: {
      id:       "logos",
      title:    "Logos",
      subtitle: "Mark-making across identities.",
      items: [
        {
          id:          "logo-reef",
          title:       "The Reef",
          year:        2022,
          industry:    "Hospitality",
          thumbnail:   { type: "image", src: "PENDING", alt: "The Reef logo" },
          description: "Custom organic wordmark with reef-texture detailing — built for a Bequia institution.",
          secondaryMedia: [
            { type: "image", src: "PENDING", alt: "Light / reversed variant" },
            { type: "image", src: "PENDING", alt: "Mono variant" },
            { type: "image", src: "PENDING", alt: "Logo on menu application" },
          ],
          projectSlug: "the-reef-brand",
        },
        {
          id:          "logo-lots-of-lobster",
          title:       "Lots of Lobster",
          year:        2023,
          industry:    "Events / Hospitality",
          thumbnail:   { type: "image", src: "PENDING", alt: "Lots of Lobster logo" },
          description: "Event mark for Bequia's annual multi-restaurant lobster festival. Significantly refreshed in year two.",
          secondaryMedia: [
            { type: "image", src: "PENDING", alt: "Edition 1 — original mark" },
            { type: "image", src: "PENDING", alt: "Edition 2 — refreshed mark" },
          ],
          projectSlug: "lots-of-lobster",
        },
        {
          id:          "logo-jubilee",
          title:       "Jubilee",
          year:        2023,
          industry:    "PENDING",
          thumbnail:   { type: "image", src: "PENDING", alt: "Jubilee logo" },
          description: "PENDING — rant-clear.",
        },
        // Add more logo entries here...
      ],
    },

    // ── SOCIAL MEDIA KITS ──────────────────────────────────
    "social-kits": {
      id:       "social-kits",
      title:    "Social Kits",
      subtitle: "Content systems built for visibility.",
      items: [
        {
          id:          "kit-kimya-sustainability",
          title:       "Kimya Glasgow — Sustainability",
          year:        2023,
          client:      "Kimya Glasgow Inc.",
          industry:    "Fashion",
          thumbnail:   { type: "image", src: "PENDING", alt: "Kimya sustainability carousel" },
          description: "5-part carousel series on sustainable fashion — grew platform engagement and positioned the brand's ethical values.",
          secondaryMedia: [
            { type: "image", src: "PENDING", alt: "Carousel slide 1" },
            { type: "image", src: "PENDING", alt: "Carousel slide 2" },
            { type: "image", src: "PENDING", alt: "Carousel slide 3" },
          ],
          projectSlug: "kimya-glasgow-sustainability",
        },
        {
          id:          "kit-botanical",
          title:       "Botanical — Product Education",
          year:        2024,
          client:      "Botanical",
          industry:    "Beauty / Wellness",
          thumbnail:   { type: "image", src: "PENDING", alt: "Botanical product carousel" },
          description: "Carousel series explaining each oil's benefits, paired with 3D/AI product visuals.",
          secondaryMedia: [
            { type: "image", src: "PENDING", alt: "Carousel slide 1" },
            { type: "image", src: "PENDING", alt: "Carousel slide 2" },
          ],
          projectSlug: "botanical-social",
        },
        // Add more social kit entries here...
      ],
    },

    // ── MOTION GRAPHICS ────────────────────────────────────
    motion: {
      id:       "motion",
      title:    "Motion",
      subtitle: "A selection of motion work across projects.",
      items: [
        {
          id:          "motion-paradise-titles",
          title:       "Paradise — Title Sequence",
          year:        2024,
          client:      "Kimya Glasgow Inc.",
          thumbnail:   { type: "image", src: "PENDING", alt: "Paradise motion title sequence still" },
          description: "Title and lower-third animations for the Paradise fragrance launch film.",
          secondaryMedia: [
            { type: "video", src: "PENDING", poster: "PENDING", caption: "Title sequence" },
          ],
          projectSlug: "kimya-glasgow-paradise",
        },
        {
          id:          "motion-mutiny-logo",
          title:       "Mutiny — 3D Logo Animation",
          year:        2026,
          client:      "The Reef",
          thumbnail:   { type: "image", src: "PENDING", alt: "Mutiny 3D logo animation still" },
          description: "3D animated logo sting for the 2026 Mutiny on the Reef campaign.",
          secondaryMedia: [
            { type: "video", src: "PENDING", poster: "PENDING", caption: "Logo animation" },
          ],
          projectSlug: "mutiny-on-the-reef",
        },
        {
          id:          "motion-lobster-promo",
          title:       "Lots of Lobster — Event Promo",
          year:        2024,
          client:      "The Reef",
          thumbnail:   { type: "image", src: "PENDING", alt: "Lots of Lobster motion promo still" },
          description: "Animated event promo for the third edition of Lots of Lobster.",
          secondaryMedia: [
            { type: "video", src: "PENDING", poster: "PENDING", caption: "Promo clip" },
          ],
          projectSlug: "lots-of-lobster",
        },
        // Add more motion entries here...
      ],
    },

  },

};
