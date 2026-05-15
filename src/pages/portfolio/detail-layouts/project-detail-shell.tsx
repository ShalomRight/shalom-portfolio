"use client";
import { gsap } from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterFour from "@/layouts/footers/footer-four";
import { PortfolioProject } from "@/data";
import { charAnimation, fadeAnimation } from "@/utils/title-animation";
import { projectDetailsPin } from "@/utils/project-anim";

type Props = {
  project: PortfolioProject;
  children: React.ReactNode;
  /**
   * When provided, fires projectDetailsPin() which creates a GSAP ScrollTrigger
   * that pins the matched element while the left column scrolls.
   * Example: ".project-details-1-right-wrap" for the detail-one layout.
   */
  pinSelector?: string;
};

/** Shared scroll/GSAP shell used by all detail layout variants */
export default function ProjectDetailShell({ project, children, pinSelector }: Props) {
  // Guard: this file lives in /pages/ so Next.js tries to prerender it as a
  // standalone route. When rendered without props, bail out gracefully.
  if (!project) return null;
  useScrollSmooth();
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Scoped animation setup ──────────────────────────────────────
  // scope: containerRef prevents selector bleed to other mounted pages.
  // No setTimeout — useGSAP defers internally via useLayoutEffect.
  // dependencies: [] means this only fires once on mount, not on every
  // project prop change, preventing double-fire during React dev mode.
  useGSAP(
    () => {
      // Kill any stale triggers from a previous page visit before creating new ones
      ScrollTrigger.getAll().forEach((t: ScrollTrigger) => t.kill());
      charAnimation();
      fadeAnimation();
      // Fire sticky-panel pin only when the layout requests it
      if (pinSelector) {
        projectDetailsPin();
      }
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main ref={containerRef}>
            {/* Breadcrumb */}
            <div className="container pt-120 pb-40">
              <p style={{ opacity: 0.4, fontSize: "0.8rem" }}>
                <Link href="/work" style={{ opacity: 0.6 }}>Work</Link>
                {" / "}
                <span>{project.title}</span>
              </p>
            </div>

            {children}
          </main>
          <FooterFour />
        </div>
      </div>
    </Wrapper>
  );
}

// ── MediaBlock ──────────────────────────────────────────────────────
/** Renders a MediaAsset safely — skips PENDING srcs.
 *
 * Performance notes (Vercel best practices):
 * - Images use `fill` + `sizes` so Next.js picks the correct srcset entry.
 * - Videos are lazy-loaded by default (no autoplay), preventing bandwidth waste.
 * - `objectFit: cover` ensures the asset fills its container at any aspect ratio.
 * - Aspect-ratio container prevents layout shift (CLS).
 * - Loading skeleton shown while image loads.
 */
export function MediaBlock({
  asset,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw",
}: {
  asset: { type: string; src: string; alt?: string; poster?: string; caption?: string; aspectRatio?: string };
  priority?: boolean;
  sizes?: string;
}) {
  if (!asset || asset.src === "PENDING") return null;

  if (asset.type === "video") {
    const ratio = asset.aspectRatio ?? "16/9";
    return (
      <div
        style={{
          aspectRatio: ratio,
          background: "#0d0d0d",
          position: "relative",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <video
          src={asset.src}
          poster={asset.poster && asset.poster !== "PENDING" ? asset.poster : undefined}
          controls
          playsInline
          preload="metadata"   // load only duration/poster — not full video
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {asset.caption && (
          <p style={{ opacity: 0.5, fontSize: "0.8rem", marginTop: "0.5rem", padding: "0 0.25rem" }}>
            {asset.caption}
          </p>
        )}
      </div>
    );
  }

  // Image with a fixed aspect-ratio container — prevents CLS
  const ratio = asset.aspectRatio;

  if (ratio) {
    return (
      <div
        style={{
          position: "relative",
          aspectRatio: ratio,
          background: "#111",
          overflow: "hidden",
          willChange: "transform",
        }}
      >
        <Image
          src={asset.src}
          alt={asset.alt ?? ""}
          fill
          sizes={sizes}
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={priority}
        />
        {asset.caption && (
          <p style={{ opacity: 0.5, fontSize: "0.8rem", marginTop: "0.5rem" }}>{asset.caption}</p>
        )}
      </div>
    );
  }

  // Unknown aspect ratio — use natural image proportions (avoids CLS via intrinsic sizing)
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#111",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <Image
        src={asset.src}
        alt={asset.alt ?? ""}
        width={1920}
        height={1080}
        sizes={sizes}
        style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
        priority={priority}
      />
      {asset.caption && (
        <p style={{ opacity: 0.5, fontSize: "0.8rem", marginTop: "0.5rem" }}>{asset.caption}</p>
      )}
    </div>
  );
}

// ── ProjectMeta ─────────────────────────────────────────────────────
/** Project meta row: client, role, tools, year */
export function ProjectMeta({ project }: { project: PortfolioProject }) {
  const role     = "role"     in project ? project.role     : undefined;
  const client   = "client"   in project ? project.client   : undefined;
  const duration = "duration" in project ? project.duration : undefined;
  const tools    = "tools"    in project ? project.tools    : [];

  // All PENDING strings are already stripped in the Contentful mapper,
  // but guard here too for any locally-sourced fallback data.
  const clean = (v?: string) => (!v || v.toUpperCase() === "PENDING" ? undefined : v);

  return (
    <div
      className="row g-4 mb-80"
      style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}
    >
      {clean(client) && (
        <div className="col-6 col-md-3">
          <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Client</p>
          <p style={{ fontSize: "0.95rem" }}>{client}</p>
        </div>
      )}
      {clean(role) && (
        <div className="col-6 col-md-3">
          <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Role</p>
          <p style={{ fontSize: "0.95rem" }}>{role}</p>
        </div>
      )}
      {clean(duration) && (
        <div className="col-6 col-md-3">
          <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Duration</p>
          <p style={{ fontSize: "0.95rem" }}>{duration}</p>
        </div>
      )}
      {tools && tools.length > 0 && (
        <div className="col-6 col-md-3">
          <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Tools</p>
          <p style={{ fontSize: "0.95rem" }}>{tools.filter((t) => t.toUpperCase() !== "PENDING").join(", ")}</p>
        </div>
      )}
    </div>
  );
}
