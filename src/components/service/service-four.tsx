import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FirstBracket, FirstBracketTwo, RightArrow, SvgBg } from "../svg";
import icon from '@/assets/img/home-03/service/sv-icon-1.png';

const service_data = [
  {
    id: 1,
    title: "Motion Design",
    desc: "From title sequences to full campaign films — I concept, direct, and deliver motion work across After Effects, DaVinci Resolve, and Cinema 4D. <br /> Every frame is intentional.",
    category: ["After Effects", "DaVinci Resolve", "Cinema 4D"],
  },
  {
    id: 2,
    title: "Brand Identity",
    desc: "Logo systems, visual language, and print collateral built to last. I work from strategy through execution — delivering marks that feel native to the brand, not borrowed from a trend.",
    category: ["Logo Design", "Visual Systems", "Print & Digital"],
  },
  {
    id: 3,
    title: "Web & UI",
    desc: "Responsive web experiences and UI design grounded in craft. From Figma concepts to shipped React frontends — I design and build.",
    category: ["React", "Frontend Dev", "Responsive Design"],
  },
];
export default function ServiceFour() {
  
  return (
    <div className="tp-service-3-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="tp-service-3-title-box mb-60 p-relative">
              <div className="tp-service-3-icon">
                <Image src={icon} alt="icon" />
              </div>
              <span className="tp-section-subtitle-2 tp_fade_bottom">
                <span>
                  <FirstBracket />
                </span>
                <span className="tp-subtitle-text tp_text_invert">
                  Our approach
                </span>
                <span>
                  <FirstBracketTwo />
                </span>
              </span>
              <h4 className="tp-section-title-90 tp_text_invert tp_fade_bottom">
                Creative <br /> development studio
              </h4>
            </div>
          </div>
        </div>

        {service_data.map((item) => (
          <div key={item.id} className="tp-service-3-wrap tp_fade_bottom">
            <div className="row align-items-start">
              <div className="col-xl-3 col-lg-3">
                <div className="tp-service-3-title-box">
                  <h4 className="tp-service-3-title">
                    <Link href="/service">{item.title}</Link>
                  </h4>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7">
                <div className="tp-service-3-content">
                  <p dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                  <div className="tp-service-3-category">
                    {item.category.map((c, i) => (
                      <span key={i}>{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2">
                <div className="tp-service-3-btn-box text-start text-md-end">
                  <Link
                    className="tp-btn-zikzak-sm p-relative"
                    href="/service"
                  >
                    <span className="zikzak-content">
                      See <br /> Details
                      <RightArrow clr="currentColor" />
                    </span>
                    <span>
                      <SvgBg />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
