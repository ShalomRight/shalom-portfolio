import React from "react";
import Image from "next/image";
import { Hand } from "../svg";

// decorative shape — unchanged
import shape from "@/assets/img/inner-about/about/shape-1.png";

/**
 * About page image panel — three project hero shots.
 * Replace each src with the real Contentful/CDN URL when media is uploaded.
 * ab_1 → Paradise (left, large)
 * ab_2 → Mutiny on the Reef (right, top overlay)
 * ab_3 → Botanical (right, bottom)
 *
 * Fallback: renders a dark placeholder tile until real URLs land.
 */
const PROJECT_IMAGES = {
  ab_1: { src: "PENDING", alt: "Paradise — fragrance launch film" },
  ab_2: { src: "PENDING", alt: "Mutiny on the Reef — campaign" },
  ab_3: { src: "PENDING", alt: "Botanical — 3D product visuals" },
};

const placeholderStyle: React.CSSProperties = {
  width: "100%",
  aspectRatio: "4/3",
  background: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function ProjectImage({ entry, className, dataSpeed }: {
  entry: { src: string; alt: string };
  className?: string;
  dataSpeed?: string;
}) {
  if (entry.src !== "PENDING") {
    return (
      <Image
        data-speed={dataSpeed}
        className={className}
        src={entry.src}
        alt={entry.alt}
        width={800}
        height={600}
        style={{ height: "auto", width: "100%" }}
      />
    );
  }
  return (
    <div
      data-speed={dataSpeed}
      className={className}
      style={placeholderStyle}
    >
      <span style={{ opacity: 0.2, fontSize: "0.7rem", textAlign: "center", padding: "0 1rem" }}>
        {entry.alt}
      </span>
    </div>
  );
}

export default function AboutUsArea() {
  return (
    <div className="ab-about-area ab-about-mt pb-90 z-index-5">
      <div className="container container-1480">
        <div className="ab-about-thumb-wrap mb-180">
          <div className="row align-items-end">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="ab-about-left-thumb">
                <ProjectImage entry={PROJECT_IMAGES.ab_1} dataSpeed=".7" />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="ab-about-right-thumb p-relative">
                <ProjectImage
                  entry={PROJECT_IMAGES.ab_2}
                  dataSpeed="1.1"
                  className="inner-img z-index-5"
                />
                <ProjectImage entry={PROJECT_IMAGES.ab_3} dataSpeed="0.9" />
              </div>
            </div>
          </div>
        </div>
        <div id="about-info" className="row">
          <div className="col-xxl-9">
            <div className="ab-about-content p-relative">
              <span>
                <Hand />
                Hi!
              </span>
              <p className="tp-dropcap tp_fade_bottom">
                I&apos;m a multidisciplinary designer and motion creative with 10+
                years of experience across branding, motion graphics, digital
                marketing, and frontend. I&apos;ve worked with fashion labels,
                hospitality brands, broadcast studios, and event producers
                across the Caribbean — combining creative direction with
                technical execution to produce visual systems that move.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-4 mb-40">
                <div className="ab-about-category-title-box p-relative">
                  <h4 className="ab-about-category-title">
                    Something <br />
                    <span>WHAT I DO</span>
                  </h4>
                  <Image
                    className="ab-about-shape-1 d-none d-md-block"
                    src={shape}
                    alt="shape"
                  />
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-8">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40">
                    <div className="ab-about-category-list category-space-1 tp_fade_bottom">
                      <ul>
                        <li>Motion Graphics</li>
                        <li>Brand Identity</li>
                        <li>Creative Direction</li>
                        <li>Video Production</li>
                        <li>Event Branding</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40">
                    <div className="ab-about-category-list category-space-2 tp_fade_bottom">
                      <ul>
                        <li>UI / UX Design</li>
                        <li>Frontend Development</li>
                        <li>Social Media Design</li>
                        <li>Product Visualization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
