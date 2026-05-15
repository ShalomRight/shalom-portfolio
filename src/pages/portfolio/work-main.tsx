"use client";
import { gsap } from "gsap";
import React, { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP);

import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterFour from "@/layouts/footers/footer-four";
import { PortfolioProject, ProjectCategory } from "@/data";
import { charAnimation, fadeAnimation } from "@/utils/title-animation";

const CATEGORIES: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All",      value: "all"        },
  { label: "Motion",   value: "motion"     },
  { label: "Branding", value: "branding"   },
  { label: "App / UI", value: "app"        },
  { label: "Web",      value: "web-design" },
];

type Props = { projects: PortfolioProject[] };

const WorkMain = ({ projects }: Props) => {
  useScrollSmooth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const visible = projects.filter((p) => {
    if (active === "all") return true;
    return (p.category as string[]).includes(active);
  });

  // ── Initial hero animations (run once on mount) ──────────────────
  // scope: containerRef ensures selectors only match inside this component.
  // Kill any stale ScrollTriggers first (React Strict Mode fires effects twice
  // in dev; this prevents double-registered triggers causing jitter).
  useGSAP(
    () => {
      // Kill stale triggers before creating new ones
      ScrollTrigger.getAll().forEach((t: ScrollTrigger) => t.kill());
      charAnimation();
      fadeAnimation();
      // Refresh after layout settles so scroll positions are measured correctly
      ScrollTrigger.refresh();
    },
    { scope: containerRef, dependencies: [] }
  );

  // ── Re-run fade on filter change (kill stale triggers first) ─────
  const handleFilter = useCallback(
    (value: ProjectCategory | "all") => {
      setActive(value);
      // Defer until React has committed the new card DOM
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Kill all triggers so we start clean after each filter
          ScrollTrigger.getAll().forEach((t: ScrollTrigger) => t.kill());
          fadeAnimation();
          ScrollTrigger.refresh();
        });
      });
    },
    []
  );

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main ref={containerRef}>
            {/* Page Hero */}
            <div className="tm-hero-area tm-hero-ptb">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tm-hero-content">
                      <span className="tm-hero-subtitle">Shalom Sutherland</span>
                      <h1 className="tm-hero-title fs-220 tp-char-animation">Work</h1>
                    </div>
                    <div className="tm-hero-text tp_title_anim">
                      <p>Brand identity, motion, UI/UX, and front-end — selected projects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="container mb-60">
              <div className="tp-portfolio-filter d-flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleFilter(cat.value)}
                    className={`tp-portfolio-filter-btn ${active === cat.value ? "active" : ""}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="container pb-120">
              <div className="row g-4">
                {visible.map((project) => (
                  <WorkCard key={project.id} project={project} />
                ))}
              </div>

              {/* Logos CTA */}
              <div
                className="tp-work-subcategory-cta mt-80 pt-60"
                style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p
                  className="mb-20"
                  style={{ opacity: 0.5, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em" }}
                >
                  Also available
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <Link href="/work/logos" className="tp-portfolio-filter-btn">Logo Archive →</Link>
                  <Link href="/work/motion" className="tp-portfolio-filter-btn">Motion Archive →</Link>
                </div>
              </div>
            </div>
          </main>
          <FooterFour />
        </div>
      </div>
    </Wrapper>
  );
};

// ── WorkCard ────────────────────────────────────────────────────────
// Extracted as a stable component (not defined inside WorkMain) so React
// doesn't recreate it on every filter change — avoids animation double-fire.
function WorkCard({ project }: { project: PortfolioProject }) {
  const src = project.thumbnail.src !== "PENDING" ? project.thumbnail.src : null;
  return (
    <div
      className="col-xl-4 col-lg-6 col-md-6 tp_fade_bottom"
      // will-change: transform promotes this element to its own layer so
      // the GSAP fade-up translate doesn't trigger repaints on siblings.
      style={{ willChange: "transform, opacity" }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="tp-work-card d-block"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className="tp-work-card-thumb"
          style={{
            background: "#1a1a1a",
            aspectRatio: "4/3",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {src ? (
            <Image
              src={src}
              alt={project.thumbnail.alt ?? project.title}
              fill
              // sizes tells the browser the actual rendered width so it picks
              // the right srcset entry — prevents downloading a 1920px image
              // for a 400px card.
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              // Only priority-load the first 3 cards (above fold)
              priority={false}
            />
          ) : (
            // Skeleton placeholder maintains the aspect-ratio box
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(110deg, #1a1a1a 30%, #242424 50%, #1a1a1a 70%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.4s infinite",
              }}
            />
          )}
        </div>
        <div className="tp-work-card-content pt-25">
          <div className="d-flex align-items-center gap-2 mb-10">
            {project.category.map((cat) => (
              <span
                key={cat}
                className="tp-work-card-tag"
                style={{ fontSize: "0.7rem", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {cat}
              </span>
            ))}
            <span style={{ fontSize: "0.7rem", opacity: 0.4, marginLeft: "auto" }}>{project.year}</span>
          </div>
          <h3 className="tp-work-card-title" style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            {project.title}
          </h3>
          <p className="tp-work-card-tagline" style={{ opacity: 0.6, fontSize: "0.9rem" }}>
            {project.tagline}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default WorkMain;
