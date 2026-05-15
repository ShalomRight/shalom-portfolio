'use client';
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const countsConfig = [
  { tens: 0, ones: 0 },
  { tens: 2, ones: 7 },
  { tens: 6, ones: 5 },
  { tens: 9, ones: 8 },
  { tens: 9, ones: 9 },
];

interface PreloaderTrueKindProps {
  onComplete?: () => void;
}

const PreloaderTrueKind: React.FC<PreloaderTrueKindProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = containerRef.current;
    const counts = ctx.querySelectorAll<HTMLElement>(".tkp-count");
    const blocks = ctx.querySelectorAll<HTMLElement>(".tkp-block");
    const spinner = ctx.querySelector<HTMLElement>(".tkp-spinner");
    const wordH1s = ctx.querySelectorAll<HTMLElement>(".tkp-word h1");
    const divider = ctx.querySelector<HTMLElement>(".tkp-divider");
    const word1H1 = ctx.querySelector<HTMLElement>("#tkp-word-1 h1");
    const word2H1 = ctx.querySelector<HTMLElement>("#tkp-word-2 h1");
    const ctaLabelP = ctx.querySelector<HTMLElement>(".tkp-cta-label p");

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "hop" },
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Counter cycle
    counts.forEach((count, index) => {
      const digits = count.querySelectorAll<HTMLElement>(".tkp-digit h1");
      tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);
      if (index < counts.length - 1) {
        tl.to(digits, { y: "-100%", duration: 1, stagger: 0.075 }, index * 1 + 1);
      }
    });

    // Fade spinner
    if (spinner) {
      tl.to(spinner, { opacity: 0, duration: 0.3 }, ">");
    }

    // Reveal logo words
    if (wordH1s.length) {
      tl.to(wordH1s, { y: "0%", duration: 1 }, "<");
    }

    // Divider line scales
    if (divider) {
      tl.to(divider, {
        scaleY: 1,
        duration: 1,
        onComplete: () => {
          if (divider) gsap.to(divider, { opacity: 0, duration: 0.3, delay: 0.3 });
        },
      });
    }

    // Words split apart
    if (word1H1) {
      tl.to(word1H1, { y: "100%", duration: 1, delay: 0.3 }, "<");
    }
    if (word2H1) {
      tl.to(word2H1, { y: "-100%", duration: 1 }, "<");
    }

    // Blocks wipe away
    tl.to(
      blocks,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.75,
      },
      "<"
    );

    // CTA label text slide up (optional polish)
    if (ctaLabelP) {
      tl.to(ctaLabelP, { y: "0%", duration: 1.5, delay: 0.5 }, "<");
    }

    // Fade entire preloader container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.5,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="tkp-preloader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 9999,
        pointerEvents: "all",
      }}
    >
      {/* Overlay Blocks */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <div
          className="tkp-block"
          style={{
            width: "100%",
            height: "100%",
            background: "#303030",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
        <div
          className="tkp-block"
          style={{
            width: "100%",
            height: "100%",
            background: "#303030",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Intro Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          gap: "0.25rem",
        }}
      >
        <div
          className="tkp-word"
          id="tkp-word-1"
          style={{
            position: "relative",
            left: "-0.5rem",
            paddingRight: "0.25rem",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#fff",
              fontWeight: 500,
              lineHeight: 1,
              transform: "translateY(-120%)",
            }}
          >
            <span
              style={{
                fontFamily: "serif",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              Kind
            </span>
          </h1>
        </div>
        <div
          className="tkp-word"
          id="tkp-word-2"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#fff",
              fontWeight: 500,
              lineHeight: 1,
              transform: "translateY(120%)",
            }}
          >
            Root
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div
        className="tkp-divider"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "1px",
          height: "100%",
          backgroundColor: "#fff",
          transform: "translateX(-50%) scaleY(0)",
          transformOrigin: "center top",
        }}
      />

      {/* Spinner */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="tkp-spinner"
          style={{
            width: "50px",
            height: "50px",
            border: "1.4px solid #fff",
            borderTopColor: "rgba(255,255,255,0.125)",
            borderRadius: "50%",
            animation: "tkp-spin 1s linear infinite",
          }}
        />
      </div>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {countsConfig.map((cfg, i) => (
          <div key={i} className="tkp-count" style={{ position: "relative" }}>
            <div style={{ display: "flex" }}>
              <div
                className="tkp-digit"
                style={{ flex: 1, paddingTop: "1rem", overflow: "hidden" }}
              >
                <h1
                  style={{
                    fontSize: "15rem",
                    fontFamily: "serif",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1,
                    transform: "translateY(120%)",
                  }}
                >
                  {cfg.tens}
                </h1>
              </div>
              <div
                className="tkp-digit"
                style={{ flex: 1, paddingTop: "1rem", overflow: "hidden" }}
              >
                <h1
                  style={{
                    fontSize: "15rem",
                    fontFamily: "serif",
                    fontWeight: 400,
                    color: "#fff",
                    lineHeight: 1,
                    transform: "translateY(120%)",
                  }}
                >
                  {cfg.ones}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inline spinner keyframes */}
      <style>{`
        @keyframes tkp-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PreloaderTrueKind;
