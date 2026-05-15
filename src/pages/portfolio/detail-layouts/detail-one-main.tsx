"use client";
import React from "react";
import ProjectDetailShell, { MediaBlock } from "./project-detail-shell";
import { PortfolioProject } from "@/data";

type Props = { project: PortfolioProject };

/**
 * detail-one — Legacy sticky-panel layout.
 *
 * Left col (7/12)  : stacked gallery images that scroll naturally.
 * Right col (5/12) : GSAP-pinned info panel — stays fixed on ≥1400px
 *                    while images scroll on the left (projectDetailsPin).
 *
 * Used for: multi-edition events (e.g. Jubilee Events).
 *
 * Contentful field mapping:
 *   project.gallery        → left stacked images (after thumbnail)
 *   project.thumbnail      → first / hero image on left
 *   project.title          → large heading in right panel
 *   project.tagline        → subtitle label
 *   project.description /  → body paragraph in right panel
 *     project.brief
 *   project.client         → meta row "Client"
 *   project.year           → meta row "Year"
 *   project.role           → meta row "Role"
 *   project.tools[]        → meta row "Tools"
 *   project.outcome        → meta row "Outcome"
 */
export default function DetailOneMain({ project }: Props) {
  // ── Field extraction ─────────────────────────────────────────
  const gallery     = "gallery"     in project ? project.gallery     : [];
  const description = "description" in project ? project.description : undefined;
  const brief       = "brief"       in project ? (project as any).brief as string | undefined : undefined;
  const outcome     = "outcome"     in project ? project.outcome     : undefined;
  const client      = "client"      in project ? project.client      : undefined;
  const role        = "role"        in project ? project.role        : undefined;
  const tools       = "tools"       in project ? project.tools       : ([] as string[]);

  // Strip any leftover PENDING placeholder strings from the import script
  const clean = (v?: string | null): string | undefined =>
    !v || v.trim().toUpperCase() === "PENDING" ? undefined : v;

  const displayDescription = clean(brief) ?? clean(description);
  const displayOutcome     = clean(outcome as string | undefined);
  const displayClient      = clean(client);
  const displayRole        = clean(role);
  const displayTools       = tools.filter((t) => t.toUpperCase() !== "PENDING");

  // Valid gallery images (no PENDING src)
  const validGallery = gallery.filter((g) => g.src !== "PENDING");

  // Category label for the subtitle badge (e.g. "motion" → "Motion")
  const categoryLabel = (project.category?.[0] ?? "").replace(/-/g, " ");

  return (
    <ProjectDetailShell project={project} pinSelector=".project-details-1-right-wrap">
      {/* ── Full-bleed split layout ──────────────────────────── */}
      <div className="project-details-1-area project-details-1-pt">
        <div className="container-fluid p-0">
          <div className="row g-0">

            {/* ── LEFT: stacked images ─────────────────────────── */}
            <div className="col-xl-7">
              <div className="project-details-1-left">

                {/* Hero / thumbnail — always first */}
                {project.thumbnail.src !== "PENDING" && (
                  <div className="project-details-1-thumb mb-10">
                    <MediaBlock asset={project.thumbnail} priority />
                  </div>
                )}

                {/* Remaining gallery images stacked vertically */}
                {validGallery.map((asset, i) => (
                  <div key={i} className="project-details-1-thumb mb-10">
                    <MediaBlock asset={asset} />
                  </div>
                ))}

              </div>
            </div>

            {/* ── RIGHT: pinned info panel ─────────────────────── */}
            {/* .project-details-1-right-wrap is the GSAP pin target  */}
            <div className="col-xl-5">
              <div className="project-details-1-right-wrap">
                <div className="project-details-1-right p-relative">

                  {/* Title block */}
                  <div className="project-details-1-title-box">
                    <span className="project-details-1-subtitle">
                      <i>01</i>
                      {categoryLabel}
                    </span>
                    <h4 className="project-details-1-title tp-char-animation">
                      {project.title}
                    </h4>
                    {project.tagline && (
                      <p style={{ opacity: 0.6, marginBottom: "0.5rem", fontSize: "1rem" }}>
                        {project.tagline}
                      </p>
                    )}
                    {displayDescription && (
                      <p>{displayDescription}</p>
                    )}
                  </div>

                  {/* Meta info rows */}
                  <div className="project-details-1-info-wrap">
                    {displayClient && (
                      <div className="project-details-1-info">
                        <span>Client</span>
                        <h4>{displayClient}</h4>
                      </div>
                    )}
                    <div className="project-details-1-info">
                      <span>Year</span>
                      <h4>{project.year}</h4>
                    </div>
                    {displayRole && (
                      <div className="project-details-1-info">
                        <span>Role</span>
                        <h4>{displayRole}</h4>
                      </div>
                    )}
                    {displayTools.length > 0 && (
                      <div className="project-details-1-info">
                        <span>Tools</span>
                        <h4>{displayTools.join(", ")}</h4>
                      </div>
                    )}
                    {displayOutcome && (
                      <div className="project-details-1-info">
                        <span>Outcome</span>
                        <h4>{displayOutcome}</h4>
                      </div>
                    )}
                  </div>

                </div>

                {/* Navigation — links back to the work index */}
                <div className="project-details-1-navigation d-flex justify-content-between align-items-center">
                  <a className="project-details-1-prev" href="/work">
                    <i className="fa-sharp fa-regular fa-arrow-left"></i>
                    <span>Back</span>
                  </a>
                  <a href="/work">
                    <span style={{ opacity: 0.4, fontSize: "0.85rem" }}>All Work</span>
                  </a>
                  <a className="project-details-1-next" href="/work">
                    <span>Work</span>
                    <i className="fa-sharp fa-regular fa-arrow-right"></i>
                  </a>
                </div>

              </div>
            </div>
            {/* ── end RIGHT ─── */}

          </div>
        </div>
      </div>
    </ProjectDetailShell>
  );
}
