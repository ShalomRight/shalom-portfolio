import React, { CSSProperties } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
// shapes (keep existing decorative shapes)
import shape_1 from '@/assets/img/home-03/gallery/gal-shape-1.png';
import shape_d_1 from '@/assets/img/home-03/gallery/gal-shape-dark-1.png';
import shape_2 from '@/assets/img/home-03/gallery/gal-shape-2.png';
import shape_d_2 from '@/assets/img/home-03/gallery/gal-shape-dark-2.png';

/**
 * Gallery marquee — images pulled from active project hero/thumbnails.
 * Replace each "PENDING" src with the real Contentful/CDN URL when available.
 * The marquee auto-loops so add as many as needed.
 */
const GALLERY_IMAGES: { src: string; label: string }[] = [
  // Paradise — KG fragrance launch
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/1IQA53NPyiwUBWVbZ9dkYa/fc2c97836436e335309583d268d121af/Paradise_Layout.jpg", label: "Paradise" },
  // Kimya Glasgow Sustainability — fashion carousel
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/3nPBkCWFek2JNHHLmkMA3c/7d5922bac14e3d6801b964856ecdae50/Interview.jpg", label: "Kimya Glasgow Sustainability" },
  // Botanical — 3D product visuals
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/1QBGyaaq1sfnbEpfcy0YAM/209b27eb2aa57c41be0162818db73109/03_Botanical_-_Carrot_Oil.png", label: "Botanical" },
  // The Reef Brand — identity / menu design
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/6sMOEQWdzrmOZ5rsabOViI/49d8574c1421d528834855398b88c1a7/DE_REEF_MAIN_MENU_LETTER_SIZE_UPDATED.jpg", label: "The Reef Brand" },
  // Lots of Lobster — event identity
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/5rr4e2tUxw4Go6EOPeHF9p/893da2b30d85e0e7a0804e48c6cf77ec/Lol_Cover.png", label: "Lots of Lobster" },
  // Mutiny on the Reef — campaign
  { src: "https://images.ctfassets.net/d1rzkrhwv5ps/Xl5N6Eo3wjNGL3zjXcw4J/f9a649b88c6ab1e5840e20572428d55d/Mutiny_Cover.jpg", label: "Mutiny on the Reef" },
];

// Duplicate for a full seamless loop
const looped = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

const imgStyle: CSSProperties = { height: 'auto', width: '100%', objectFit: 'cover' };

const placeholderStyle: CSSProperties = {
  width: '280px',
  height: '200px',
  background: '#111',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export default function GalleryOne() {
  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="tp-gallery-shape-1">
        <Image className="img-1" src={shape_1} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_1} alt="shape" style={imgStyle} />
      </div>
      <div className="tp-gallery-shape-2">
        <Image className="img-1" src={shape_2} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_2} alt="shape" style={imgStyle} />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee className="tp-gallery-titming" speed={80} direction="left">
                  {looped.map((item, i) => (
                    <div key={i}>
                      <div className="tp-gallery-item mr-30">
                        {item.src !== "PENDING" ? (
                          <Image
                            src={item.src}
                            alt={item.label}
                            width={280}
                            height={200}
                            style={{ objectFit: 'cover', height: 'auto' }}
                          />
                        ) : (
                          // Placeholder until real media is uploaded to Contentful
                          <div style={placeholderStyle}>
                            <span style={{ opacity: 0.25, fontSize: '0.7rem', textAlign: 'center', padding: '0 1rem' }}>
                              {item.label}
                            </span>
                          </div>
                        )}
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
