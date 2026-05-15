"use client";
import React, { useState } from "react";
import ProjectDetailShell, { MediaBlock, ProjectMeta } from "./project-detail-shell";
import { PortfolioProject, DeepProject } from "@/data";

type Props = { project: PortfolioProject };

/**
 * detail-two — Many images + carousel.
 * Used for: app screen-heavy projects like Carryvan.
 * Shows: hero, brief, scrollable image carousel, outcome.
 */
export default function DetailTwoMain({ project }: Props) {
  const p = project as DeepProject;
  const validGallery = p.gallery?.filter(g => g.src !== "PENDING") ?? [];
  const [current, setCurrent] = useState(0);
  
  // State for process step carousels
  const [stepCarousels, setStepCarousels] = useState<Record<number, number>>({});

  return (
    <ProjectDetailShell project={project}>
      {/* Header */}
      <div className="container mb-60">
        <div className="row align-items-end mb-50">
          <div className="col-xl-8">
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
        {project.thumbnail.src !== "PENDING" && <MediaBlock asset={project.thumbnail} priority />}
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

      {/* Carousel */}
      {validGallery.length > 0 && (
        <div className="container-fluid px-0 mb-80" style={{ background: "#0d0d0d" }}>
          <div className="container py-60 px-4 px-md-3">
            <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "8px" }}>
              <MediaBlock asset={validGallery[current]} />
            </div>
          </div>
          {validGallery.length > 1 && (
            <div className="container pb-40">
              <div className="d-flex align-items-center justify-content-between">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + validGallery.length) % validGallery.length)}
                  style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.5rem 1.25rem", cursor: "pointer", fontSize: "0.85rem", borderRadius: "4px" }}
                >
                  ← Prev
                </button>
                <span style={{ opacity: 0.4, fontSize: "0.8rem" }}>
                  {current + 1} / {validGallery.length}
                </span>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % validGallery.length)}
                  style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.5rem 1.25rem", cursor: "pointer", fontSize: "0.85rem", borderRadius: "4px" }}
                >
                  Next →
                </button>
              </div>
              {/* Thumbnail strip */}
              <div className="d-flex gap-2 mt-20 overflow-auto pb-10" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}>
                {validGallery.map((asset, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      flexShrink: 0,
                      width: "80px",
                      height: "55px",
                      background: "#1a1a1a",
                      border: i === current ? "2px solid white" : "2px solid transparent",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      opacity: i === current ? 1 : 0.4,
                      borderRadius: "4px",
                    }}
                  >
                    <span style={{ fontSize: "0.6rem", opacity: 0.4, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {i + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Process */}
      {p.process && p.process.length > 0 && (
        <div className="container mb-80">
          <h2 style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.4, marginBottom: "3rem" }}>Process</h2>
          {p.process.map((step, i) => (
            step.summary !== "PENDING" && (
              <div key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem", marginBottom: "2rem" }}>
                <div className="row mb-4">
                  <div className="col-xl-3 mb-16">
                    <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 style={{ fontSize: "1rem", marginTop: "0.4rem" }}>{step.phase}</h3>
                  </div>
                  <div className="col-xl-9">
                    <p style={{ opacity: 0.75, lineHeight: 1.8 }}>{step.summary}</p>
                  </div>
                </div>
                
                {/* Step carousel */}
                {step.media && step.media.length > 0 && step.media.filter(m => m.src !== "PENDING").length > 0 && (
                  <div style={{ width: "100%" }}>
                    <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: "8px", marginBottom: "1rem", background: "#0d0d0d" }}>
                      <MediaBlock asset={step.media.filter(m => m.src !== "PENDING")[stepCarousels[i] || 0]} />
                    </div>
                    {step.media.filter(m => m.src !== "PENDING").length > 1 && (
                      <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <button
                            onClick={() => setStepCarousels(prev => ({
                              ...prev,
                              [i]: ((prev[i] || 0) - 1 + step.media!.filter(m => m.src !== "PENDING").length) % step.media!.filter(m => m.src !== "PENDING").length
                            }))}
                            style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.8rem", borderRadius: "4px" }}
                          >
                            ← Prev
                          </button>
                          <span style={{ opacity: 0.4, fontSize: "0.75rem" }}>
                            {(stepCarousels[i] || 0) + 1} / {step.media.filter(m => m.src !== "PENDING").length}
                          </span>
                          <button
                            onClick={() => setStepCarousels(prev => ({
                              ...prev,
                              [i]: ((prev[i] || 0) + 1) % step.media!.filter(m => m.src !== "PENDING").length
                            }))}
                            style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.8rem", borderRadius: "4px" }}
                          >
                            Next →
                          </button>
                        </div>
                        {/* Thumbnail strip */}
                        <div className="d-flex gap-2 overflow-auto pb-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}>
                          {step.media.filter(m => m.src !== "PENDING").map((asset, j) => (
                            <button
                              key={j}
                              onClick={() => setStepCarousels(prev => ({ ...prev, [i]: j }))}
                              style={{
                                flexShrink: 0,
                                width: "60px",
                                height: "42px",
                                background: "#1a1a1a",
                                border: (stepCarousels[i] || 0) === j ? "2px solid white" : "2px solid transparent",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                                opacity: (stepCarousels[i] || 0) === j ? 1 : 0.4,
                                borderRadius: "4px",
                              }}
                            >
                              <span style={{ fontSize: "0.55rem", opacity: 0.4, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {j + 1}
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Outcome */}
      {p.outcome && p.outcome !== "PENDING" && (
        <div className="container mb-120">
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "3rem", maxWidth: "640px" }}>
            <p style={{ opacity: 0.4, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Outcome</p>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.75, opacity: 0.85 }}>{p.outcome}</p>
          </div>
        </div>
      )}
    </ProjectDetailShell>
  );
}
