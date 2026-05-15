import React from "react";
import Image from "next/image";
import { Hand } from "../svg";
import shape from '@/assets/img/inner-about/about/shape-1.png';

export default function AboutMeArea() {
  return (
    <div className="ab-about-area ab-about-mt pb-90 z-index-5">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="ab-about-content p-relative tp_fade_bottom">
              <span>
                <Hand />
                Hi!
              </span>
              <p className="tp-dropcap">
                I&apos;m a multidisciplinary designer and motion creative based in Saint Vincent &amp; the Grenadines — 10+ years across branding, motion graphics, digital marketing, and frontend design. I build visual systems, lead creative direction, and write the code to bring it all to life.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-4 mb-40">
                <div className="ab-about-category-title-box tp_fade_bottom ab-2-about-title-style p-relative">
                  <h4 className="ab-about-category-title">
                    Something <br />
                    <span>About me</span>
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
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40 tp_fade_bottom">
                    <div className="ab-about-category-list category-space-1">
                      <span className="ab-about-category-title mb-30">
                        WHAT I DO
                      </span>
                      <ul>
                        <li>Brand Identity &amp; Creative Direction</li>
                        <li>Motion Graphics &amp; Animation</li>
                        <li>Social Media Campaigns</li>
                        <li>Event Branding</li>
                        <li>Frontend Development</li>
                        <li>Video Production &amp; Editing</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40 tp_fade_bottom">
                    <div className="ab-about-category-list category-space-2">
                      <span className="ab-about-category-title mb-30">
                        TOOLS
                      </span>
                      <ul>
                        <li>Adobe After Effects</li>
                        <li>DaVinci Resolve</li>
                        <li>Cinema 4D</li>
                        <li>Final Cut Pro</li>
                        <li>React / Next.js</li>
                        <li>HTML / CSS / JavaScript</li>
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
