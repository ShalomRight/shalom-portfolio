'use client';
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const projectsData = [
  { name: "Lunar Eclipse", director: "Amelia Crawford", location: "Toronto, ON" },
  { name: "Visitor Quarters", director: "Marcus Reynolds", location: "Vancouver Studio, BC" },
  { name: "Celestial", director: "Nina Liu // Weston", location: "Austin, TX" },
  { name: "Streamwave Original", director: "Dylan Pierce", location: "Sunset Studios - Miami" },
  { name: "Viewfinder", director: "Javier // Rodriguez", location: "BLANK Studios - Chicago" },
  { name: "Rhythm Collective", director: "Sophia // Chen", location: "London, UK" },
  { name: "Urban Odyssey", director: "Leo Thompson", location: "Pioneer Studios - Seattle" },
  { name: "Prism No. 1", director: "Taylor // McKnight", location: "Private Estate - Sedona" },
  { name: "Vision Quest", director: "Spencer // Hudson", location: "Elevation - Denver" },
  { name: "Wavelength", director: "Kai Nakamura", location: "San Francisco, CA" },
  { name: "Desert Horizon", director: "Olivia", location: "New Mexico" },
  { name: "Spectrum", director: "Ellis // Moss", location: "Harmony Studio - Montreal" },
  { name: "Vision Quest II", director: "Hudson // Wright", location: "Elevation Studios - Denver" },
  { name: "Auteur", director: "Leo Thompson", location: "Berlin, DE" },
  { name: "Capsule X Design", director: "Sophia // Chen", location: "Neon House - Brooklyn" },
  { name: "Pulse", director: "Callum // Winters", location: "Echo Pavilion - Portland" },
];

interface PreloaderNiteRiotProps {
  onComplete?: () => void;
}

const PreloaderNiteRiot: React.FC<PreloaderNiteRiotProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const ctx = containerRef.current;

    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // Logo gradient fill (line 1 then line 2)
    tl.to(".nrp-logo-line-1", {
      backgroundPosition: "0% 0%",
      color: "#fff",
      duration: 1,
      ease: "none",
    });

    tl.to(".nrp-logo-line-2", {
      backgroundPosition: "0% 0%",
      color: "#fff",
      duration: 1,
      ease: "none",
    });

    // Reveal project / location headers + items
    tl.to([".nrp-projects-header", ".nrp-project-item"], {
      opacity: 1,
      duration: 0.15,
      stagger: 0.075,
      delay: 0.5,
    });

    tl.to(
      [".nrp-locations-header", ".nrp-location-item"],
      {
        opacity: 1,
        duration: 0.15,
        stagger: 0.075,
      },
      "<"
    );

    // Turn items white
    tl.to(".nrp-project-item", {
      color: "#fff",
      duration: 0.15,
      stagger: 0.075,
    });

    tl.to(
      ".nrp-location-item",
      {
        color: "#fff",
        duration: 0.15,
        stagger: 0.075,
      },
      "<"
    );

    // Fade items out
    tl.to([".nrp-projects-header", ".nrp-project-item"], {
      opacity: 0,
      duration: 0.15,
      stagger: 0.075,
    });

    tl.to(
      [".nrp-locations-header", ".nrp-location-item"],
      {
        opacity: 0,
        duration: 0.15,
        stagger: 0.075,
      },
      "<"
    );

    // Fade entire overlay
    tl.to(".nrp-overlay-inner", {
      opacity: 0,
      duration: 0.5,
      delay: 1.0,
    });

    // Fade preloader container out and hide
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
      className="nrp-preloader"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 9999,
        pointerEvents: "all",
        backgroundColor: "#000",
      }}
    >
      <div
        className="nrp-overlay-inner"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: "2em",
          display: "flex",
          gap: "2em",
        }}
      >
        {/* Projects Column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1em",
          }}
        >
          <div
            className="nrp-projects-header"
            style={{ display: "flex", gap: "2em", opacity: 0 }}
          >
            <p
              style={{
                flex: 1,
                textTransform: "uppercase",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "#fff",
              }}
            >
              Project
            </p>
            <p
              style={{
                flex: 1,
                textTransform: "uppercase",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "#fff",
              }}
            >
              Director
            </p>
          </div>
          {projectsData.map((project, i) => (
            <div
              key={i}
              className="nrp-project-item"
              style={{ display: "flex", gap: "2em", opacity: 0, color: "#4f4f4f" }}
            >
              <p
                style={{
                  flex: 1,
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                }}
              >
                {project.name}
              </p>
              <p
                style={{
                  flex: 1,
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                }}
              >
                {project.director}
              </p>
            </div>
          ))}
        </div>

        {/* Logo Column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 0,
          }}
        >
          <h1
            className="nrp-logo-line-1"
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              fontSize: "2.5rem",
              fontStyle: "italic",
              lineHeight: 0.9,
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(0deg, #3a3a3a, #3a3a3a 50%, #fff 0)",
              backgroundSize: "100% 200%",
              backgroundPosition: "0% 100%",
              color: "#3a3a3a",
            }}
          >
            Nova
          </h1>
          <h1
            className="nrp-logo-line-2"
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              fontSize: "2.5rem",
              fontStyle: "italic",
              lineHeight: 0.9,
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundImage: "linear-gradient(0deg, #3a3a3a, #3a3a3a 50%, #fff 0)",
              backgroundSize: "100% 200%",
              backgroundPosition: "0% 100%",
              color: "#3a3a3a",
            }}
          >
            Vice
          </h1>
        </div>

        {/* Locations Column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1em",
          }}
        >
          <div
            className="nrp-locations-header"
            style={{ display: "flex", width: "50%", opacity: 0 }}
          >
            <p
              style={{
                textTransform: "uppercase",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                color: "#fff",
              }}
            >
              Location
            </p>
          </div>
          {projectsData.map((project, i) => (
            <div
              key={i}
              className="nrp-location-item"
              style={{ display: "flex", width: "50%", opacity: 0, color: "#4f4f4f" }}
            >
              <p
                style={{
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                }}
              >
                {project.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreloaderNiteRiot;
