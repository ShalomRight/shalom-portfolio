"use client";
import { gsap } from "gsap";
import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import Image from "next/image";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterFour from "@/layouts/footers/footer-four";
import { GalleryPage, GalleryItem } from "@/data";
import { charAnimation, fadeAnimation } from "@/utils/title-animation";

type Props = { gallery: GalleryPage | null };

const WorkLogosMain = ({ gallery }: Props) => {
  useScrollSmooth();
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useGSAP(() => {
    const t = setTimeout(() => { charAnimation(); fadeAnimation(); }, 100);
    return () => clearTimeout(t);
  });

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Hero */}
            <div className="tm-hero-area tm-hero-ptb">
              <div className="container">
                <div className="tm-hero-content">
                  <span className="tm-hero-subtitle">Work / Logos</span>
                  <h1 className="tm-hero-title tp-char-animation">{gallery?.title ?? "Logos"}</h1>
                </div>
                {gallery?.subtitle && (
                  <div className="tm-hero-text tp_title_anim">
                    <p>{gallery.subtitle}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Random grid */}
            <div className="container pb-120">
              <div className="tp-logos-grid" style={{ columns: "3 280px", gap: "1.5rem" }}>
                {gallery?.items.map((item) => {
                  const src = item.thumbnail.src !== "PENDING" ? item.thumbnail.src : null;
                  return (
                    <div
                      key={item.id}
                      className="tp-logos-item tp_fade_bottom"
                      style={{ breakInside: "avoid", marginBottom: "1.5rem", cursor: "pointer" }}
                      onClick={() => setSelected(item)}
                    >
                      <div style={{ background: "#1a1a1a", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                        {src ? (
                          <Image src={src} alt={item.thumbnail.alt ?? item.title} fill style={{ objectFit: "contain", padding: "2rem" }} />
                        ) : (
                          <span style={{ opacity: 0.2, fontSize: "0.75rem" }}>Image pending</span>
                        )}
                      </div>
                      <div style={{ paddingTop: "1rem" }}>
                        <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{item.title}</h3>
                        <span style={{ opacity: 0.4, fontSize: "0.8rem" }}>{item.industry} · {item.year}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
          <FooterFour />
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#111", maxWidth: "860px", width: "100%", borderRadius: "4px", padding: "2.5rem", position: "relative" }}
          >
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer" }}>×</button>
            <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{selected.title}</h2>
            {selected.industry && <p style={{ opacity: 0.5, fontSize: "0.8rem", marginBottom: "1rem", textTransform: "uppercase" }}>{selected.industry} · {selected.year}</p>}
            {selected.description && <p style={{ opacity: 0.75, marginBottom: "1.5rem" }}>{selected.description}</p>}
            {selected.secondaryMedia && selected.secondaryMedia.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                {selected.secondaryMedia.map((m, i) => (
                  <div key={i} style={{ background: "#1a1a1a", aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                    {m.src !== "PENDING" ? (
                      <Image src={m.src} alt={m.alt ?? ""} fill style={{ objectFit: "contain", padding: "1rem" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.2, fontSize: "0.75rem" }}>pending</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {selected.projectSlug && (
              <Link href={`/work/${selected.projectSlug}`} style={{ fontSize: "0.85rem", opacity: 0.7, textDecoration: "underline" }}>
                View full project →
              </Link>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default WorkLogosMain;
