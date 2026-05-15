"use client";
import { gsap } from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/plugins";
import Image from "next/image";
import shape from "@/assets/img/inner-about/about/shape-1.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Work history from resume ──────────────────────────────────────
const work_data = [
  {
    id: 1,
    role: "Independent Creative Director & Motion Designer",
    company: "Freelance",
    period: "2022 — Present",
    bullets: [
      "Led creative direction and post-production for the Paradise fragrance launch by Kimya Glasgow — campaign videos, interviews, and motion graphics.",
      "Managed digital marketing and visual content production across multiple Kimya Glasgow fashion campaigns and product launches.",
      "Developed branding and promotional assets for Mutiny on the Reef and Lots of Lobster events in Bequia.",
      "Integrated generative AI workflows into concept development, visual exploration, and promotional asset creation.",
    ],
  },
  {
    id: 2,
    role: "Designer / Marketing Assistant",
    company: "Skye Investment",
    period: "2019 — 2022",
    bullets: [
      "Developed promotional campaigns for Fitness Lab to grow memberships and engagement.",
      "Produced motion graphics and event promotions for Xtreme FM and Treebar & Grill.",
      "Collaborated with management to define campaign objectives and delivery timelines.",
    ],
  },
  {
    id: 3,
    role: "Editor & Cameraman",
    company: "Island Koncepts Television",
    period: "2009 — 2011",
    bullets: [
      "Operated studio and field camera equipment for live and recorded productions.",
      "Edited weekly television content using Adobe After Effects and Final Cut Pro.",
      'Filmed and produced "Styling With Kimistic" featuring local fashion designer Kimon Baptiste.',

    ],
  },
  {
    id: 4,
    role: "Junior Graphic Designer",
    company: "Right Stuff",
    period: "2008 — 2009",
    bullets: [
      "Designed graphics for banners, vehicles, signage, and promotional media.",
      "Worked directly with clients to develop visual concepts and production-ready artwork.",
    ],
  },
];

export default function AboutWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ── GSAP ScrollTrigger stagger reveal (skill: gsap-scrolltrigger) ──
  // Each work item reveals on scroll with a stagger so they cascade in
  // as the user scrolls into the section. Uses batch() for clean batching.
  // scope: containerRef prevents selector bleed to other components.
  useGSAP(
    () => {
      // Set initial state — items start invisible, shifted down
      gsap.set(".ab-work-item", { y: 60, opacity: 0 });

      // ScrollTrigger.batch() fires once per item entering the viewport,
      // batches all items visible within a 100ms window, and staggers them.
      ScrollTrigger.batch(".ab-work-item", {
        start: "top 88%",
        once: true, // play once — no reverse on scroll back
        onEnter: (batch: any) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
          }),
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div className="ab-2-work-area" ref={containerRef}>
      <div className="container">
        <div className="row">
          {/* Section title */}
          <div className="col-xl-5 col-lg-5">
            <div className="ab-2-work-title-box p-relative">
              <h4 className="ab-2-work-title tp_title_anim">
                Work <br /> Experience
              </h4>
              <span className="ab-2-work-subtitle tp_title_anim">
                10+ years across design, motion, and production
              </span>
              <Image
                className="ab-2-work-shape d-none d-lg-block"
                src={shape}
                alt="shape"
              />
            </div>
          </div>

          {/* Work items */}
          <div className="col-xl-7 col-lg-7">
            {work_data.map((item) => (
              <div key={item.id} className="ab-2-work-item ab-work-item">
                <div className="sv-service-content">
                  <div className="sv-service-title-box">
                    <span className="sv-service-subtitle">
                      <i>{item.id < 10 ? "0" + item.id : item.id}</i>
                      {item.company} &nbsp;&bull;&nbsp; {item.period}
                    </span>
                    <h4 className="sv-service-title">{item.role}</h4>
                  </div>
                  <div className="sv-service-space-wrap">
                    <div className="sv-service-text">
                      <ul style={{ paddingLeft: "1.2em", marginTop: "0.6rem" }}>
                        {item.bullets.map((b, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: "0.9rem",
                              lineHeight: 1.75,
                              opacity: 0.72,
                              marginBottom: "0.35rem",
                            }}
                          >
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
