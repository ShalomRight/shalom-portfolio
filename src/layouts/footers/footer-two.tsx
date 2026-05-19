import React from "react";
import Link from "next/link";

// prop type
type IProps = {
  whiteFooter?: boolean;
  topCls?: string;
};

export default function FooterTwo({ whiteFooter = false,topCls='footer-top' }: IProps) {
  return (
    <footer className={`${topCls}`}>
      <div
        className={`tp-footer-2-area pt-100 pb-20 ${
          whiteFooter ? "tp-footer-white" : "black-bg"
        }`}
      >
        <div className="container container-1480">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="tp-footer-2-widget footer-col-2-2">
                <div className="tp-footer-2-widget-menu">
                  <h4 className="tp-footer-2-widget-title">Sitemap</h4>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/work">Work</a></li>
                    <li><a href="/about-me">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="tp-footer-2-widget text-md-center footer-col-2-1">
                <div className="tp-footer-2-widget-logo">
                  <Link className="tp-header-brand-name" href="/">
                    Shalom.js
                  </Link>
                </div>
                <div className="tp-footer-2-widget-text">
                  <p>
                    Motion, brand, and digital — <br /> based in Saint Vincent.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="tp-footer-2-widget footer-col-2-3">
                <h4 className="tp-footer-2-widget-title">Contact</h4>
                <div className="tp-footer-2-contact-item">
                  <span>Kingstown, Saint Vincent &amp; the Grenadines</span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href="tel:+17844971584">P: +1 (784) 497-1584</a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href="mailto:shalom.sutherland@gmail.com">E: shalom.sutherland@gmail.com</a>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        className={`tp-copyright-2-area tp-copyright-2-bdr-top ${
          whiteFooter ? "tp-copyright-white" : "black-bg"
        }`}
      >
        <div className="container container-1480">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-5">
              <div className="tp-copyright-2-left text-center text-lg-start">
                <p>
                  All rights reserved — {new Date().getFullYear()} © Shalom Sutherland
                </p>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="tp-copyright-2-social text-center text-lg-end">
                {/* TODO: add real profile URLs */}
                <a className="mb-10" href="#">LinkedIn</a>
                <a className="mb-10" href="#">Instagram</a>
                <a className="mb-10" href="#">Behance</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- footer area end --> */}
    </footer>
  );
}
