'use client';
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const HeroBannerTrueKind = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = containerRef.current;

    const tl = gsap.timeline({
      delay: 0.5,
      defaults: { ease: "hop" },
    });

    // Hero image scales from 1.5x to 1x
    tl.to(".tk-hero-img", {
      scale: 1,
      duration: 2,
      ease: "hop",
    });

    // Nav slides down
    tl.to(".tk-hero-nav", {
      y: "0%",
      duration: 1.5,
      ease: "hop",
    }, "-=1.5");

    // Headlines and tagline reveal
    tl.to([".tk-line h1", ".tk-line p"], {
      y: "0%",
      duration: 1.5,
      stagger: 0.2,
      ease: "hop",
    }, "-=1.2");

    // CTA scales in
    tl.to([".tk-cta", ".tk-cta-icon"], {
      scale: 1,
      duration: 1.5,
      stagger: 0.75,
      ease: "hop",
    }, "-=1");

    // CTA label text
    tl.to(".tk-cta-label p", {
      y: "0%",
      duration: 1.5,
      delay: 0.5,
      ease: "hop",
    }, "<");
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="tp-hero-tk-area" style={{ position: "relative", width: "100%", height: "100svh", overflow: "hidden" }}>
      {/* Hero Content */}
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        {/* Hero Background Image */}
        <div className="tk-hero-img" style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1,
          transform: "scale(1.5)",
        }}>
          <Image src="/assets/img/hero-tk/hero.jpg" alt="" fill style={{ objectFit: "cover" }} />
        </div>

        {/* Hero Nav (stripped to essentials, page header handles main nav) */}
        <div className="tk-hero-nav" style={{
          position: "absolute",
          top: 0,
          width: "100%",
          padding: "1.25em 1.5em",
          display: "flex",
          alignItems: "center",
          gap: "1.5em",
          transform: "translateY(-120%)",
        }}>
          <div style={{ flex: 1 }}>
            <a href="#" style={{ textTransform: "capitalize", fontSize: "14px", fontWeight: "bolder", color: "#fff", textDecoration: "none" }}>KindRoot</a>
          </div>
          <div style={{ flex: 1, display: "flex", gap: "1.5em", justifyContent: "center" }}>
            {["Rituals", "Our Roots", "Lookbook", "Stories"].map((item) => (
              <a key={item} href="#" style={{ textTransform: "uppercase", fontSize: "12px", color: "#fff", textDecoration: "none" }}>{item}</a>
            ))}
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <a href="#" style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
              width: "60px",
              height: "40px",
              color: "#000",
              backgroundColor: "#fff",
              borderRadius: "40px",
              textDecoration: "none",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Header Copy */}
        <div style={{
          width: "100%",
          height: "100%",
          paddingTop: "25svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5em",
        }}>
          <div className="tk-line" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
            <h1 style={{
              fontSize: "5rem",
              fontWeight: 500,
              lineHeight: 1,
              color: "#fff",
              textAlign: "center",
              transform: "translateY(120%)",
            }}>
              <span style={{ fontFamily: "serif", fontStyle: "italic", fontWeight: 500 }}>Rooted</span> in care,
            </h1>
          </div>
          <div className="tk-line" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
            <h1 style={{
              fontSize: "5rem",
              fontWeight: 500,
              lineHeight: 1,
              color: "#fff",
              textAlign: "center",
              transform: "translateY(120%)",
            }}>
              grown with <span style={{ fontFamily: "serif", fontStyle: "italic", fontWeight: 500 }}>kindness</span>
            </h1>
          </div>
          <div className="tk-line" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}>
            <p style={{
              textTransform: "uppercase",
              fontSize: "12px",
              color: "#fff",
              fontWeight: 500,
              transform: "translateY(120%)",
            }}>Skincare that stays true to nature and to you</p>
          </div>
        </div>

        {/* CTA */}
        <div className="tk-cta" style={{
          position: "absolute",
          left: "50%",
          bottom: "3em",
          transform: "translateX(-50%) scale(0)",
          width: "50%",
          height: "60px",
          padding: "0.5rem",
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#fff",
          borderRadius: "4rem",
        }}>
          <div className="tk-cta-label" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}>
            <p style={{
              color: "#000",
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: 500,
              transform: "translateY(120%)",
            }}>View all products</p>
          </div>
          <div className="tk-cta-icon" style={{
            position: "relative",
            height: "100%",
            aspectRatio: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            backgroundColor: "#303030",
            borderRadius: "60px",
            transform: "scale(0)",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroBannerTrueKind;
