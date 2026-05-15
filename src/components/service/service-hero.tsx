import React from "react";
import Image from "next/image";

// image
const ser_hero = "https://images.ctfassets.net/d1rzkrhwv5ps/4Q2UOr9bQX1v4V8OjTP7yk/a77be2180e17ac7f6a3d15650f7ee201/Screenshot_2026-05-10_at_4.33.44%C3%A2__PM.png";
import ser_hero_shape from "@/assets/img/inner-service/hero/hero-shape-1.jpg";

export default function ServiceHero() {
  return (
    <div className="sv-hero-area sv-hero-ptb">
      <div className="container container-1530">
        <div className="row">
          <div className="col-xl-10">
            <div className="sv-hero-title-box">
              <h4 className="sv-hero-title tp-char-animation">
                Designed to move. <br /> Built to last.
              </h4>
              <p className="tp_fade_bottom">
                Delivering high-end visual systems and digital experiences from concept to shipped product.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="sv-hero-thumb p-relative">
              <div className="sv-hero-thumb-box">
                <Image
                  data-speed=".7"
                  src={ser_hero}
                  alt="ser_hero-img"
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
              <Image
                className="sv-hero-thumb-shape d-none d-lg-block"
                src={ser_hero_shape}
                alt="ser_hero-shape"
                style={{height:"auto"}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
