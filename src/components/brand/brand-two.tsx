import React from "react";
import Image from "next/image";
import { Leaf } from "../svg";
// new images from public folder
import b_1 from "../../../public/assets/img/new/Her 01.jpg";
import b_2 from "../../../public/assets/img/new/Jubile Logo - Final.jpg";
import b_3 from "../../../public/assets/img/new/Kalinago Tribe SVG Logo - Green.jpg";
import b_4 from "../../../public/assets/img/new/Kimya.png";
import b_5 from "../../../public/assets/img/new/Nichecraft_Logo_Fina.png";
import b_6 from "../../../public/assets/img/new/Reef_Logo_01.png";
import b_7 from "../../../public/assets/img/new/SML_LOGO_02.jpg";
import b_8 from "../../../public/assets/img/new/Vincy Run Club Logo.jpg";

// brand_data
const brand_data = [
  {
    id: 1,
    brand: b_1,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 2,
    brand: b_2,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 3,
    brand: b_3,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 4,
    brand: b_4,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 5,
    brand: b_5,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 6,
    brand: b_6,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 7,
    brand: b_7,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
  {
    id: 8,
    brand: b_8,
    texts: [
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
      "Shalom Sutherland",
    ],
  },
];

// brand items
export function BrandItems() {
  return (
    <>
      {brand_data.map((item) => (
        <div key={item.id} className="col-xl-3 col-lg-3 col-md-6">
          <div className="tp-brand-4-item p-relative" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "150px" }}>
            <Image src={item.brand} alt="brand" style={{ maxWidth: "200px", maxHeight: "100px", width: "auto", height: "auto", objectFit: "contain" }} />
            <div className="tp-brand-4-line-text d-flex align-items-center">
              {item.texts.map((text, index) => (
                <span key={index}>{text}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

const BrandTwo = () => {
  return (
    <div
      className="tp-brand-4-area mt-20 pt-120 pb-120 grey-bg-3"
      style={{ backgroundImage: "url(/assets/img/home-04/brand/overly.png)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="tp-service-4-title-box tp_fade_bottom mb-65">
              <span className="tp-section-subtitle-3">
                <span>
                  <Leaf />
                </span>
                Our Clients
              </span>
              <h4 className="tp-section-title-40 font-style-2">
                We love to work with clients to develop unique, innovative
                websites.
              </h4>
            </div>
          </div>
        </div>
        <div className="row gx-0">
          <BrandItems />
        </div>
      </div>
    </div>
  );
};

export default BrandTwo;
