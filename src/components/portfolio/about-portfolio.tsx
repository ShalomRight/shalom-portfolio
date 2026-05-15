import React from "react";
import Image from "next/image";
const portfolio_images = [
  "https://images.ctfassets.net/d1rzkrhwv5ps/11JaMqxnAoyY8UVbcUtsTt/ec3f9a2bc299c4b449da837e97682754/Screenshot_2026-05-10_at_7.00.55%C3%A2__AM.png",
  "https://images.ctfassets.net/d1rzkrhwv5ps/Xl5N6Eo3wjNGL3zjXcw4J/f9a649b88c6ab1e5840e20572428d55d/Mutiny_Cover.jpg",
  "https://images.ctfassets.net/d1rzkrhwv5ps/3FWe5XRnx6CJtxSZt45EGz/473e6ff17fb478501b047c93b24dd0ef/Vincy_Woman_-_Shot_0.png",
];

export default function AboutPortfolio() {
  return (
    <div className="ab-2-portfolio-area pb-115">
      <div className="container-fluid ab-2-portfolio-thumb-wrap">
        <div className="row gx-3">
          {portfolio_images.map((imgSrc, i) => (
            <div key={i} className="col-xl-4 col-lg-4 col-md-6 mb-4">
              <div className="ab-2-portfolio-thumb fix tp_fade_bottom">
                <Image src={imgSrc} alt="p-img" width={800} height={600} style={{ width: "100%", height: "auto", objectFit: "cover", aspectRatio: "4/3" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
