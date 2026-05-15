import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const GALLERY_IMAGES = [
  "https://images.ctfassets.net/d1rzkrhwv5ps/11JaMqxnAoyY8UVbcUtsTt/ec3f9a2bc299c4b449da837e97682754/Screenshot_2026-05-10_at_7.00.55%C3%A2__AM.png",
  "https://images.ctfassets.net/d1rzkrhwv5ps/Xl5N6Eo3wjNGL3zjXcw4J/f9a649b88c6ab1e5840e20572428d55d/Mutiny_Cover.jpg",
  "https://images.ctfassets.net/d1rzkrhwv5ps/2VRfWLkcAuMJ7sCW4iKz6Y/a77b2f82dbb26383f7fea206e93c0e72/a04b84bb73424b42b339186ceac42fb2.png",
  "https://images.ctfassets.net/d1rzkrhwv5ps/3FWe5XRnx6CJtxSZt45EGz/473e6ff17fb478501b047c93b24dd0ef/Vincy_Woman_-_Shot_0.png",
  "https://images.ctfassets.net/d1rzkrhwv5ps/7wFy76aA025jcwZ10LhTHl/b246764613d8023d82341988fe849c66/Untitled_21.jpg",
];

// images
const port_images = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function LineImgSlider() {
  return (
    <div className="tp-line-text-wrap tp-line-text-wrap-2 pb-120">
      <div className="swiper tp-img-slide">
        <Marquee speed={150}>
          {port_images.map((imgSrc, index) => (
            <div
              key={index}
              className={`sv-port-thumb port-thumb-${index % 2 === 0 ? 1 : 2}`}
              style={{marginRight: '40px'}}
            >
              <Image src={imgSrc} alt="port-img" width={600} height={400} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
