import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
// shapes
import shape_1 from '@/assets/img/home-03/gallery/gal-shape-1.png';
import shape_d_1 from '@/assets/img/home-03/gallery/gal-shape-dark-1.png';
import shape_2 from '@/assets/img/home-03/gallery/gal-shape-2.png';
import shape_d_2 from '@/assets/img/home-03/gallery/gal-shape-dark-2.png';

/**
 * Gallery marquee — original slot size: 420 × 740 px (portrait).
 * Images pulled from Contentful: hero or thumbnail per project.
 */
const GALLERY_IMAGES: { src: string; label: string }[] = [
  // Paradise — heroMedia (same as thumbnail in Contentful)
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/11JaMqxnAoyY8UVbcUtsTt/ec3f9a2bc299c4b449da837e97682754/Screenshot_2026-05-10_at_7.00.55%C3%A2__AM.png", label: "Paradise" },
  // Mutiny on the Reef — heroMedia (wide cover)
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/Xl5N6Eo3wjNGL3zjXcw4J/f9a649b88c6ab1e5840e20572428d55d/Mutiny_Cover.jpg", label: "Mutiny on the Reef" },
  // Botanical — thumbnail from Contentful
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/2VRfWLkcAuMJ7sCW4iKz6Y/a77b2f82dbb26383f7fea206e93c0e72/a04b84bb73424b42b339186ceac42fb2.png", label: "Botanical" },
  // SVG Independence Day — thumbnail from Contentful
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/3FWe5XRnx6CJtxSZt45EGz/473e6ff17fb478501b047c93b24dd0ef/Vincy_Woman_-_Shot_0.png", label: "SVG Independence Day" },
  // Jubilé Events — thumbnail from Contentful
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/7wFy76aA025jcwZ10LhTHl/b246764613d8023d82341988fe849c66/Untitled_21.jpg", label: "Jubilé Events" },
];

// Duplicate for a full seamless loop
const looped = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

const shapeStyle = { height: 'auto' };

export default function GalleryOne() {
  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="tp-gallery-shape-1">
        <Image className="img-1" src={shape_1} alt="shape" style={shapeStyle} />
        <Image className="img-2" src={shape_d_1} alt="shape" style={shapeStyle} />
      </div>
      <div className="tp-gallery-shape-2">
        <Image className="img-1" src={shape_2} alt="shape" style={shapeStyle} />
        <Image className="img-2" src={shape_d_2} alt="shape" style={shapeStyle} />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee className="tp-gallery-titming" speed={100} direction="left">
                  {looped.map((item, i) => (
                    <div key={i}>
                      <div className="tp-gallery-item mr-30">
                        <Image
                          src={item.src}
                          alt={item.label}
                          width={420}
                          height={740}
                          style={{ objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
