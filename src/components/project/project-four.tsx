import React from "react";
import Image from "next/image";
import { ProjectShape, RightArrow } from "../svg";
import Link from "next/link";

// portfolio data: img_1 = heroMedia, img_2 = thumbnail (exact Contentful field values)
const project_data = [
  {
    id: 1,
    // Paradise — heroMedia + thumbnail from Contentful
    img_1: "https://images.ctfassets.net/d1rzkrhwv5ps/11JaMqxnAoyY8UVbcUtsTt/ec3f9a2bc299c4b449da837e97682754/Screenshot_2026-05-10_at_7.00.55%C3%A2__AM.png",
    img_2: "https://images.ctfassets.net/d1rzkrhwv5ps/2Q57H8hmG7XFaf7Sxf5qZk/2a4b70aa30b037aa9352393588d3b678/ladies_2.jpg",
    meta: "2024 · Motion",
    title: "Paradise",
    slug: "kimya-glasgow-paradise",
  },
  {
    id: 2,
    // Mutiny — heroMedia (cover wide) + thumbnail (cover square)
    img_1: "https://images.ctfassets.net/d1rzkrhwv5ps/Xl5N6Eo3wjNGL3zjXcw4J/f9a649b88c6ab1e5840e20572428d55d/Mutiny_Cover.jpg",
    img_2: "https://images.ctfassets.net/d1rzkrhwv5ps/2ETjJxLdcb4yaPa5XE3D45/5eca02ba37dfdbd4645b1505b0685101/Mutiny_-_Cover.jpg",
    meta: "2026 · Motion",
    title: "Mutiny on the Reef",
    slug: "mutiny-on-the-reef",
  },
  {
    id: 3,
    // Botanical — heroMedia + thumbnail from Contentful
    img_1: "https://images.ctfassets.net/d1rzkrhwv5ps/2VRfWLkcAuMJ7sCW4iKz6Y/a77b2f82dbb26383f7fea206e93c0e72/a04b84bb73424b42b339186ceac42fb2.png",
    img_2: "https://images.ctfassets.net/d1rzkrhwv5ps/5fNlvTOdoZCRdoA0GTPNXW/2a98a16492c4234ea11bb45f16eadd64/End_Shot.png",
    meta: "2024 · Branding",
    title: "Botanical",
    slug: "botanical-social",
  },
];

// prop type
type IProps = {
  style_2?: boolean;
};

export default function ProjectFour({ style_2 = false }: IProps) {
  return (
    <div className={`tp-project-3-area ${style_2 ? "pt-60 pw-project-style" : "pt-130 black-bg"}`}>
      <div className="container container-1720">
        {!style_2 && (
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="tp-project-3-title-box p-relative mb-150">
                <h4 className="tp-section-title-200 tp_reveal_anim">
                  Latest <span>Projects</span>
                </h4>
                <div className="tp-project-3-btn-box">
                  <Link
                    className="tp-btn-zikzak p-relative"
                    href="/work"
                  >
                    <span className="zikzak-content">
                      See <br /> All Work
                      <RightArrow clr="#19191A" />
                    </span>
                    <ProjectShape />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xl-12">
            {project_data.map((item, i) => (
              <div key={item.id} className="tp-project-3-wrap">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="tp-project-3-thumb pro-img-1">
                      <Image
                        src={item.img_1}
                        alt={item.title}
                        width={570}
                        height={720}
                        style={{ objectFit: "cover", display: "block", width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                    <div className="tp-project-3-content text-center">
                      <span className="tp-project-3-meta">{item.meta}</span>
                      <h4 className="tp-project-3-title-sm">
                        <Link href={`/work/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <Link
                        className="tp-btn-project-sm"
                        href={`/work/${item.slug}`}
                      >
                        See Project
                      </Link>
                    </div>
                    <div className="tp-project-3-border color-1 text-center">
                      <span></span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 order-0 order-lg-0">
                    <div className="tp-project-3-thumb pro-img-2">
                      <Image
                        src={item.img_2}
                        alt={`${item.title} — thumbnail`}
                        width={570}
                        height={720}
                        style={{ objectFit: "cover", display: "block", width: "100%" }}
                      />
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
