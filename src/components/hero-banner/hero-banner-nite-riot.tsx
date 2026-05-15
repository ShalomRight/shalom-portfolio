'use client';
import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "@/plugins";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const allImageSources = Array.from({ length: 9 }, (_, i) => `/assets/img/hero-nr/grid-${i + 1}.jpg`);

const HeroBannerNiteRiot = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = containerRef.current;
    const gridImages = gsap.utils.toArray<HTMLElement>(".nr-img", ctx);
    const heroImage = ctx.querySelector<HTMLElement>(".nr-img.nr-hero-img");
    const images = gridImages.filter((img) => img !== heroImage);

    const introCopyEls = ctx.querySelectorAll<HTMLElement>(".nr-intro-copy h3");
    const titleHeadingEl = ctx.querySelector<HTMLElement>(".nr-title h1");

    let introCopy: any = null;
    let titleHeading: any = null;
    if (introCopyEls.length > 0) {
      introCopy = new SplitText(introCopyEls, { type: "words", wordsClass: "word" });
    }
    if (titleHeadingEl) {
      titleHeading = new SplitText(titleHeadingEl, { type: "words", wordsClass: "word" });
    }

    const getRandomImageSet = () => {
      const shuffled = [...allImageSources].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 9);
    };

    function startImageRotation() {
      const totalCycles = 20;
      for (let cycle = 0; cycle < totalCycles; cycle++) {
        const randomImages = getRandomImageSet();
        gsap.to({}, {
          duration: 0,
          delay: cycle * 0.15,
          onComplete: () => {
            gridImages.forEach((img, index) => {
              const imgElement = img.querySelector("img");
              if (!imgElement) return;
              if (cycle === totalCycles - 1 && img === heroImage) {
                imgElement.setAttribute("src", "/assets/img/hero-nr/hero.jpg");
                gsap.set(".nr-hero-img img", { scale: 2 });
              } else {
                imgElement.setAttribute("src", randomImages[index] || "/assets/img/hero-nr/grid-1.jpg");
              }
            });
          },
        });
      }
    }

    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "hop" } });

    // Grid images clip in
    tl.to(".nr-img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      stagger: 0.05,
      onStart: () => {
        setTimeout(() => {
          startImageRotation();
        }, 500);
      },
    });

    // Non-hero images clip out
    tl.to(images, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      delay: 2.5,
      stagger: 0.05,
    });

    // Hero image zoom and mask
    tl.to(".nr-hero-img", {
      y: -50,
      duration: 1,
    });

    tl.to(".nr-hero-img", {
      scale: 4,
      clipPath: "polygon(20% 10%, 80% 10%, 80% 90%, 20% 90%)",
      duration: 1.5,
      onStart: () => {
        gsap.to(".nr-hero-img img", {
          scale: 1,
          duration: 1.5,
          ease: "hop",
        });
        gsap.to(".nr-banner-img", { scale: 1, delay: 0.5, duration: 0.5 });
      },
    });

    // Banner images fly in
    tl.to(".nr-banner-img-1", {
      left: "40%",
      rotate: -20,
      duration: 1.5,
      delay: 0.5,
    }, "<");

    tl.to(".nr-banner-img-2", {
      left: "60%",
      rotate: 20,
      duration: 1.5,
    }, "<");

    // Text reveal
    if (titleHeading?.words) {
      gsap.set(titleHeading.words, { y: "110%" });
      tl.to(titleHeading.words, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=1");
    }

    if (introCopy?.words) {
      gsap.set(introCopy.words, { y: "110%" });
      tl.to(introCopy.words, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "<");
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="tp-hero-nr-area" style={{ position: "relative", width: "100%", height: "100svh", overflow: "hidden", backgroundColor: "#e3e3db" }}>
      {/* Image Grid */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        aspectRatio: "1",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        zIndex: 2,
      }}>
        {[0, 1, 2].map((row) => (
          <div key={row} style={{ width: "100%", display: "flex", gap: "1em" }}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const isHero = index === 4;
              return (
                <div
                  key={col}
                  className={`nr-img ${isHero ? 'nr-hero-img' : ''}`}
                  style={{
                    position: "relative",
                    flex: 1,
                    aspectRatio: "1",
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={`/assets/img/hero-nr/grid-${index + 1}.jpg`}
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Banner Images */}
      <div className="nr-banner-img nr-banner-img-1" style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0)",
        width: "20%",
        aspectRatio: "4/5",
        zIndex: 3,
      }}>
        <Image src="/assets/img/hero-nr/banner-1.jpg" alt="" fill style={{ objectFit: "cover" }} />
      </div>
      <div className="nr-banner-img nr-banner-img-2" style={{
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0)",
        width: "20%",
        aspectRatio: "4/5",
        zIndex: 3,
      }}>
        <Image src="/assets/img/hero-nr/banner-2.jpg" alt="" fill style={{ objectFit: "cover" }} />
      </div>

      {/* Intro Copy */}
      <div className="nr-intro-copy" style={{
        position: "absolute",
        top: "45%",
        transform: "translateY(-50%)",
        width: "100%",
        padding: "0 8em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 4,
      }}>
        <h3 style={{
          position: "relative",
          textTransform: "uppercase",
          color: "#000",
          fontFamily: "sans-serif",
          fontWeight: 500,
          fontStyle: "italic",
          lineHeight: 0.9,
          fontSize: "1.5rem",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}>Creative Solutions</h3>
        <h3 style={{
          position: "relative",
          textTransform: "uppercase",
          color: "#000",
          fontFamily: "sans-serif",
          fontWeight: 500,
          fontStyle: "italic",
          lineHeight: 0.9,
          fontSize: "1.5rem",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}>Impactful Results</h3>
      </div>

      {/* Title */}
      <div className="nr-title" style={{
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 4,
      }}>
        <h1 style={{
          position: "relative",
          textTransform: "uppercase",
          color: "#000",
          fontFamily: "sans-serif",
          fontWeight: 500,
          fontStyle: "italic",
          lineHeight: 0.9,
          fontSize: "3.5rem",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}>Crafting bold experiences</h1>
      </div>
    </div>
  );
};

export default HeroBannerNiteRiot;
