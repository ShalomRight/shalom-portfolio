"use client";
import React from "react";
import ProjectDetailShell, { MediaBlock, ProjectMeta } from "./project-detail-shell";
import { PortfolioProject, DeepProject } from "@/data";

type Props = { project: PortfolioProject };

/**
 * detail-video — Video-primary project.
 * Used for: Paradise launch film, Mutiny campaign.
 * Shows: full-width hero video, brief, supporting gallery stills, outcome.
 */
export default function DetailVideoMain({ project }: Props) {
  const p = project as DeepProject;

  return (
    <ProjectDetailShell project={project}>
      {/* Full-width hero video */}
      <div style={{ width: "100%", background: "#0a0a0a", marginBottom: "4rem" }}>
        {p.heroMedia && p.heroMedia.src !== "PENDING" ? (
          <div style={{ maxHeight: "80vh", overflow: "hidden", position: "relative", aspectRatio: "16/9" }}>
            <MediaBlock asset={p.heroMedia} priority />
          </div>
        ) : (
          <div style={{ aspectRatio: "16/9", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ opacity: 0.2, fontSize: "0.85rem" }}>Hero video pending</span>
          </div>
        )}
      </div>

      {/* Title + tagline */}
      <div className="container mb-60">
        <div className="row align-items-end">
          <div className="col-xl-8">
            <div className="d-flex gap-2 mb-16 flex-wrap">
              {project.category.map((c) => (
                <span key={c} style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5 }}>{c}</span>
              ))}
            </div>
            <h1 className="tp-char-animation" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, marginBottom: "1.25rem" }}>
              {project.title}
            </h1>
            <p style={{ fontSize: "1.2rem", opacity: 0.65 }}>{project.tagline}</p>
          </div>
          <div className="col-xl-4 text-xl-end">
            <span style={{ opacity: 0.3, fontSize: "0.8rem" }}>{project.year}</span>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="container"><ProjectMeta project={project} /></div>

      {/* Brief */}
      {p.brief && p.brief !== "PENDING" && (
        <div className="container mb-80">
          <div className="row">
            <div className="col-xl-3">
              <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", paddingTop: "0.25rem" }}>The Brief</p>
            </div>
            <div className="col-xl-8">
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, opacity: 0.85 }}>{p.brief}</p>
            </div>
          </div>
        </div>
      )}

      {/* Process — behind the scenes / production phases */}
      {p.process && p.process.length > 0 && (
        <div className="container mb-80">
          <h2 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "3rem" }}>Process</h2>
          <div className="row g-5">
            {p.process.map((step, i) => (
              <div key={i} className="col-xl-12">
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2.5rem" }}>
                  <div className="row">
                    <div className="col-xl-3 mb-20">
                      <span style={{ opacity: 0.4, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 style={{ fontSize: "1rem", marginTop: "0.5rem" }}>{step.phase}</h3>
                    </div>
                    <div className="col-xl-4 mb-20">
                      <p style={{ opacity: 0.75, lineHeight: 1.8 }}>{step.summary}</p>
                    </div>
                    {step.media && step.media.length > 0 && (
                      <div className="col-xl-5">
                        <div className="row g-2">
                          {step.media.map((m, j) => (
                            <div key={j} className={m.type === "video" ? "col-12" : "col-6"}>
                              <MediaBlock asset={m} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Supporting gallery — stills + secondary clips */}
      {p.gallery && p.gallery.some(g => g.src !== "PENDING") && (
        <div className="container mb-80">
          <h2 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "2rem" }}>
            Gallery
          </h2>
          <div className="row g-3">
            {p.gallery.filter(g => g.src !== "PENDING").map((asset, i) => (
              <div key={i} className={asset.type === "video" ? "col-12" : "col-md-6"}>
                <MediaBlock asset={asset} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Outcome */}
      {p.outcome && p.outcome !== "PENDING" && (
        <div className="container mb-120">
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "3rem" }}>
            <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>Outcome</p>
            <p style={{ fontSize: "1.3rem", lineHeight: 1.7, maxWidth: "700px", opacity: 0.85 }}>{p.outcome}</p>
            {p.metrics && p.metrics.filter(m => !m.includes("PENDING")).length > 0 && (
              <ul style={{ marginTop: "1.5rem", paddingLeft: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {p.metrics.filter(m => !m.includes("PENDING")).map((m, i) => (
                  <li key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "2px", padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}>{m}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </ProjectDetailShell>
  );
}
