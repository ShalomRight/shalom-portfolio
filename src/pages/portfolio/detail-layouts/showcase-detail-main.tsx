"use client";
import React from "react";
import ProjectDetailShell, { MediaBlock, ProjectMeta } from "./project-detail-shell";
import { PortfolioProject } from "@/data";

type Props = { project: PortfolioProject };

/**
 * showcase-detail — Visual-strong, moderate depth.
 * Used for: social media kits, product visuals, standard client projects.
 * Shows: large hero image, tagline, description, gallery masonry, outcome.
 */
export default function ShowcaseDetailMain({ project }: Props) {
  // Guard: this file lives in /pages/ so Next.js tries to prerender it as a
  // standalone route. When rendered without props, bail out gracefully.
  if (!project) return null;
  const description = "description" in project ? project.description : null;
  const outcome = "outcome" in project ? project.outcome : null;
  const gallery = "gallery" in project ? project.gallery : [];
  // Prefer heroMedia for the page hero if available (better quality / different framing)
  const heroAsset = ("heroMedia" in project && project.heroMedia) ? project.heroMedia : project.thumbnail;

  return (
    <ProjectDetailShell project={project}>
      {/* Hero */}
      <div className="container mb-60">
        <div className="row align-items-end mb-50">
          <div className="col-xl-7">
            <div className="d-flex gap-2 mb-16 flex-wrap">
              {project.category.map((c) => (
                <span key={c} style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5 }}>{c}</span>
              ))}
            </div>
            <h1 className="tp-char-animation" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.06, marginBottom: "1.25rem" }}>
              {project.title}
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.65 }}>{project.tagline}</p>
          </div>
        </div>
        {heroAsset && heroAsset.src !== "PENDING" && <MediaBlock asset={heroAsset} priority />}
      </div>

      {/* Meta + description */}
      <div className="container mb-80">
        <ProjectMeta project={project} />
        {description && description !== "PENDING" && (
          <div className="row">
            <div className="col-xl-8">
              <p style={{ fontSize: "1.1rem", lineHeight: 1.85, opacity: 0.8 }}>{description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Gallery — two-column showcase */}
      {gallery && gallery.some(g => g.src !== "PENDING") && (
        <div className="container mb-80">
          <div className="row g-4">
            {gallery.filter(g => g.src !== "PENDING").map((asset, i) => (
              <div key={i} className={i === 0 ? "col-12" : "col-md-6"}>
                <MediaBlock asset={asset} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outcome */}
      {outcome && outcome !== "PENDING" && (
        <div className="container mb-120">
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "3rem", maxWidth: "640px" }}>
            <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Outcome</p>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.75, opacity: 0.85 }}>{outcome}</p>
          </div>
        </div>
      )}
    </ProjectDetailShell>
  );
}
