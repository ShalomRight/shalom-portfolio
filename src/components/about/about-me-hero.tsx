import React from "react";
import Image from "next/image";
import Social from "../social/social";
import { Leaf } from "../svg";

// images
import shape_1 from "@/assets/img/inner-about/hero/hero-2-shape-1.jpg";
import shape_2 from "@/assets/img/inner-about/hero/hero-2-shape-2.jpg";
import hero_img from "../../../public/assets/img/new/hero-Shalom.jpg";

export default function AboutMeHero() {
  return (
    <div className="ab-2-hero-area ab-2-hero-ptb  p-relative">

      <div className="container">
        <div className="ab-2-hero-main">
          <div className="row">
            <div className="col-xl-7">
              <div className="ab-2-hero-title-box p-relative">
                <span
                  className="ab-2-hero-subtitle"
                  data-stagger="0.05"
                  data-on-scroll="0"
                  data-delay="0.6"
                >
                Creative Designer 
                </span>
                <h6
                  className="ab-2-hero-title tp-char-animation"
                  data-stagger="0.05"
                  data-on-scroll="0"
                  data-delay="0.6"
                >
                  Shalom<br/>Sutherland 
                </h6>
                <a className="tp-btn-white background-black" href="https://drive.google.com/file/d/1NYaoI5-iKP43WM88J2AEh2x9gH6AGT30/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Download CV
                  <span>
                    <Leaf />
                  </span>
                </a>
                <div className="ab-2-hero-shape-1">
                  <Image
                    src={shape_1}
                    alt="shape"
                  />
                </div>
                <div className="ab-2-hero-shape-2">
                  <Image
                    className="tp-zoom-in-out"
                    src={shape_2}
                    alt="shape"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-10 offset-xl-2">
              <div className="ab-2-hero-thumb-wrap p-relative">
                <Image
                  src={hero_img}
                  alt="shape"
                  data-speed="0.9"
                  style={{ width: "80%", height: "auto", aspectRatio: "500/720", objectFit: "cover", display: "block", marginLeft: "auto" }}
                />
                <h4
                  className="ab-2-hero-title tp-char-animation"
                  data-stagger="0.05"
                  data-on-scroll="0"
                  data-delay="0.6"
                >
                   
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
