'use client';
import React, { useEffect } from "react";
import Link from "next/link";
import HeaderMenus from "./header-menus";
import useSticky from "@/hooks/use-sticky";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";

export default function HeaderFour() {
  const { sticky, headerRef, headerFullWidth, adjustMenuBackground } = useSticky();
  const [openOffCanvas, setOpenOffCanvas] = React.useState(false);

  useEffect(() => {
    headerFullWidth();
    adjustMenuBackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`tp-header-3-area mt-35 z-index-5 ${sticky ? "header-sticky" : ""}`}
        >
          <span className="menu-bg"></span>
          <div className="container container-1740">
            <div className="row align-items-center">

              {/* Logo */}
              <div className="col-xl-3 col-lg-6 col-md-6 col-6">
                <div className="tp-header-logo tp-header-3-logo">
                  <Link href="/" className="tp-header-brand-name">
                    Shalom.js
                  </Link>
                </div>
              </div>

              {/* Desktop nav */}
              <div className="col-xl-6 col-lg-6 d-none d-xl-block">
                <div className="tp-header-3-menu-wrap text-center">
                  <div className="tp-header-3-menu header-main-menu">
                    <nav className="tp-main-menu-content">
                      <HeaderMenus />
                    </nav>
                  </div>
                </div>
              </div>

              {/* Right — mobile toggle only */}
              <div className="col-xl-3 col-lg-6 col-md-6 col-6">
                <div className="tp-header-3-right d-flex align-items-center justify-content-end">
                  <button
                    onClick={() => setOpenOffCanvas(true)}
                    className="tp-header-3-bar tp-offcanvas-open-btn d-xl-none"
                    aria-label="Open menu"
                  >
                    <i className="fa-solid fa-bars"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile off-canvas */}
      <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
    </>
  );
}
