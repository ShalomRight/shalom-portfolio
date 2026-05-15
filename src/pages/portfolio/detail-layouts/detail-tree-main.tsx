"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import ProjectDetailShell, { MediaBlock, ProjectMeta } from "./project-detail-shell";
import { PortfolioProject, DeepProject } from "@/data";
import { ScrollDownTwo, UpArrowFour, Leaf } from "@/components/svg";

type Props = { project: PortfolioProject };

/**
 * detail-tree — Full narrative case study.
 * Visual structure mirrors portfolio-details-3:
 *
 *  1. HERO        Big title + scroll cue + live URL (tp-project-details-3 classes)
 *  2. FULL IMAGE  heroMedia full-bleed (tp-project-details-3-full-width-thumb)
 *  3. SUMMARY     showcase-details-2-area — "SUMMARY" label left / brief right
 *  4. META        Client · Role · Year · Tools strip
 *  5. GALLERY     Swiper carousel — slidesPerView:1, fade, arrow nav (detail-2 style)
 *  6. STEPS       Iterated showcase-details-2-area blocks — one per process phase
 *  7. OUTCOME     Closing text + optional metrics
 *
 * Contentful fields:
 *   title, category, tagline, liveUrl → hero
 *   heroMedia                         → full-bleed image
 *   brief                             → summary paragraph
 *   client, role, year, tools         → meta
 *   gallery[]                         → swiper slides
 *   process[].phase/.summary/.media   → steps blocks
 *   outcome, metrics[]                → outcome
 */
export default function DetailTreeMain({ project }: Props) {
  // Guard: this file lives in /pages/ so Next.js tries to prerender it as a
  // standalone route. When rendered without props, bail out gracefully.
  if (!project) return null;
  const p = project as DeepProject;

  const clean = (v?: string | null): string | undefined =>
    !v || v.trim().toUpperCase() === "PENDING" ? undefined : v;

  const displayBrief    = clean(p.brief);
  const displayOutcome  = clean(p.outcome);
  const validGallery    = (p.gallery ?? []).filter((g) => g.src !== "PENDING");
  const validProcess    = (p.process ?? []).filter((s) => s.summary !== "PENDING");
  const validMetrics    = (p.metrics ?? []).filter((m) => !m.includes("PENDING"));

  // ── Gallery carousel settings (detail-2 style) ──────────────
  const gallerySettings: SwiperOptions = {
    slidesPerView: 1,
    loop: false,
    autoplay: false,
    spaceBetween: 0,
    speed: 1000,
    effect: "fade",
    navigation: {
      prevEl: ".dtree-gallery-prev",
      nextEl: ".dtree-gallery-next",
    },
  };

  // ── Steps carousel settings (pd-visual-slider-active style) ──
  const stepsSettings: SwiperOptions = {
    slidesPerView: 3,
    loop: true,
    grabCursor: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    spaceBetween: 20,
    speed: 1000,
    breakpoints: {
      1400: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
      992:  { slidesPerView: 2 },
      768:  { slidesPerView: 2 },
      576:  { slidesPerView: 1 },
      0:    { slidesPerView: 1 },
    },
  };

  return (
    <ProjectDetailShell project={project}>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <div className="tp-project-details-3-top tp-project-details-3-ptb">
        <div className="container container-1560">

          {/* Category tag */}
          <div className="d-flex gap-2 mb-20 flex-wrap">
            {project.category.map((c) => (
              <span
                key={c}
                style={{
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  opacity: 0.45,
                }}
              >
                {c.replace(/-/g, " ")}
              </span>
            ))}
          </div>

          {/* Big title */}
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-project-details-3-title-box">
                <h2 className="tp-section-title-160 mb-40 tp-char-animation">
                  {project.title}
                </h2>
                {project.tagline && (
                  <p style={{ fontSize: "1.15rem", opacity: 0.6, maxWidth: "560px", marginBottom: "2.5rem" }}>
                    {project.tagline}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Scroll cue + live link */}
          <div className="row">
            <div className="col-xl-6">
              <div className="tp-project-details-3-scroll smooth">
                <span>
                  <ScrollDownTwo />
                </span>
                Scroll to Explore
              </div>
            </div>
            {p.liveUrl && clean(p.liveUrl) && (
              <div className="col-xl-6">
                <div className="tp-project-details-3-link mt-30 text-start text-md-end">
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <span>
                      <UpArrowFour />
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      {/* ── end HERO ── */}

      {/* ── 2. FULL-BLEED IMAGE (parallax via data-speed) ───── */}
      {p.heroMedia && p.heroMedia.src !== "PENDING" && (
        <div data-speed=".8" className="tp-project-details-3-full-width-thumb mb-120">
          <MediaBlock asset={p.heroMedia} priority />
        </div>
      )}
      {/* Fallback: if no heroMedia but thumbnail exists */}
      {(!p.heroMedia || p.heroMedia.src === "PENDING") && project.thumbnail.src !== "PENDING" && (
        <div data-speed=".8" className="tp-project-details-3-full-width-thumb mb-120">
          <MediaBlock asset={project.thumbnail} priority />
        </div>
      )}

      {/* ── 3. SUMMARY ──────────────────────────────────────── */}
      {displayBrief && (
        <div className="showcase-details-2-area pb-120">
          <div className="container">
            {/* Section heading */}
            <div className="row">
              <div className="col-xl-12">
                <div className="showcase-details-2-section-box">
                  <h4 className="showcase-details-2-section-title tp-char-animation">
                    {project.title}
                  </h4>
                </div>
              </div>
            </div>
            {/* Left label / Right content */}
            <div className="row">
              <div className="col-xl-3">
                <div className="showcase-details-2-section-left">
                  <span className="ab-inner-subtitle mb-25">
                    <Leaf />
                    SUMMARY
                  </span>
                </div>
              </div>
              <div className="col-xl-9">
                <div className="showcase-details-2-content-right tp_title_anim">
                  <p className="pb-25">{displayBrief}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. META STRIP ───────────────────────────────────── */}
      <div className="container mb-80">
        <ProjectMeta project={project} />
      </div>

      {/* ── 5. GALLERY CAROUSEL (detail-2 style, with container padding) ── */}
      {validGallery.length > 0 && (
        <div className="showcase-details-2-area pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="showcase-details-2-section-box">
                  <h4 className="showcase-details-2-section-title tp-char-animation">
                    Gallery
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel — inside container for side padding */}
          <div className="container">
            <div className="project-details-2-slider-wrap">
              <Swiper
                {...gallerySettings}
                modules={[Navigation, EffectFade]}
                className="swiper-container project-details-2-slider p-relative fix"
              >
                {validGallery.map((asset, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div className="project-details-2-slider-thumb">
                      <MediaBlock asset={asset} />
                    </div>
                  </SwiperSlide>
                ))}

                {/* Arrow nav */}
                {validGallery.length > 1 && (
                  <div className="project-details-2-arrow-box">
                    <button className="dtree-gallery-prev project-details-2-prev">
                      <i className="fa-sharp fa-regular fa-arrow-left"></i>
                    </button>
                    <button className="dtree-gallery-next project-details-2-next">
                      <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </button>
                  </div>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      )}

      {/* ── 6. STEPS — pd-visual-slider-active carousel ──────── */}
      {validProcess.length > 0 && (
        <div className="showcase-details-2-area pb-120">
          <div className="container">
            {/* Section heading */}
            <div className="row">
              <div className="col-xl-12">
                <div className="showcase-details-2-section-box">
                  <h4 className="showcase-details-2-section-title tp-char-animation">
                    Steps
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel — one slide per process step */}
          <div className="pd-visual-slider-wrap pb-40">
            <Swiper
              {...stepsSettings}
              modules={[Autoplay]}
              className="swiper-container pd-visual-slider-active"
            >
              {validProcess.map((step, i) => (
                <SwiperSlide key={i}>
                  <div className="pd-visual-slider-thumb fix">
                    {/* Image at top of card — matches pd-visual-slider-thumb reference */}
                    {step.media && step.media.filter((m) => m.src !== "PENDING").length > 0 && (
                      <MediaBlock asset={step.media.filter((m) => m.src !== "PENDING")[0]} />
                    )}
                    {/* Step text content below image */}
                    <div style={{ padding: "1.75rem 1.5rem" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          opacity: 0.4,
                          display: "block",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h5
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {step.phase}
                      </h5>
                      <p style={{ opacity: 0.65, lineHeight: 1.7, fontSize: "0.9rem" }}>
                        {step.summary}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* ── 7. OUTCOME ──────────────────────────────────────── */}
      {displayOutcome && (
        <div className="showcase-details-2-area pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xl-3">
                <div className="showcase-details-2-section-left">
                  <span className="ab-inner-subtitle mb-25">
                    <Leaf />
                    OUTCOME
                  </span>
                </div>
              </div>
              <div className="col-xl-9">
                <div className="showcase-details-2-content-right tp_title_anim">
                  <p className="pb-25">{displayOutcome}</p>

                  {/* Metrics pills */}
                  {validMetrics.length > 0 && (
                    <ul
                      style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.6rem",
                        marginTop: "1.5rem",
                      }}
                    >
                      {validMetrics.map((m, i) => (
                        <li
                          key={i}
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            borderRadius: "2px",
                            padding: "0.4rem 0.9rem",
                            fontSize: "0.85rem",
                          }}
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </ProjectDetailShell>
  );
}
