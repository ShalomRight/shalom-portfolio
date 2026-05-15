import React from "react";
import Image from "next/image";
import { ProjectShape, RightArrow } from "../svg";
import Link from "next/link";

// portfolio data: img_1 = hero image, img_2 = thumbnail image
const project_data = [
  {
    id: 1,
    // Paradise — hero (event layout shot) + thumbnail (fragrance bottle)
    img_1: "https://images.ctfassets.net/d1rzkrhwv5ps/1IQA53NPyiwUBWVbZ9dkYa/fc2c97836436e335309583d268d121af/Paradise_Layout.jpg",
    img_2: "https://images.ctfassets.net/d1rzkrhwv5ps/6TRG5LtSkISLTvvELouG5I/980224218e38f36b7a39f94e11f2c03c/Fragrance.jpeg",
    meta: "2024 · Motion",
    title: "Paradise",
    slug: "kimya-glasgow-paradise",
  },
  {
    id: 2,
    // Mutiny — hero (cover 1920x1080) + thumbnail (cover square 1080x1080)
    img_1: "https://images.ctfassets.net/d1rzkrhwv5ps/Xl5N6Eo3wjNGL3zjXcw4J/f9a649b88c6ab1e5840e20572428d55d/Mutiny_Cover.jpg",
    img_2: "https://images.ctfassets.net/d1rzkrhwv5ps/57NeZPrwGyuW6twZzUb4vt/10605f0e76c60113c90f0b34b4c3b52d/Mutiny_Cover_thumnails.jpg",
    meta: "2026 · Motion",
    title: "Mutiny on the Reef",
    slug: "mutiny-on-the-reef",
  },
  {
    id: 3,
    // Botanical — hero (product 3D shot) + thumbnail (social post)
    img_1: "https://images.ctfassets.net/d1rzkrhwv5ps/1QBGyaaq1sfnbEpfcy0YAM/209b27eb2aa57c41be0162818db73109/03_Botanical_-_Carrot_Oil.png",
    img_2: "https://images.ctfassets.net/d1rzkrhwv5ps/6PLo4B8wsTX5KqnW6OKwqk/805520ceed65acfe295e3200ccf8684f/Botanical_Social_Media_Post_-_Price_List_01.jpg",
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
