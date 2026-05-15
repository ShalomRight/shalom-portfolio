import React from "react";
import Link from "next/link";
import { CloseTwo } from "../svg";
import MobileMenus from "./mobile-menus";

type IProps = {
  openOffcanvas: boolean;
  setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileOffcanvas({ openOffcanvas, setOpenOffcanvas }: IProps) {
  return (
    <>
      <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
        <div className="tp-offcanvas-wrapper">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo">
              <Link href="/" className="tp-header-brand-name" onClick={() => setOpenOffcanvas(false)}>
                Shalom.js
              </Link>
            </div>
            <div className="tp-offcanvas-close">
              <button
                className="tp-offcanvas-close-btn"
                onClick={() => setOpenOffcanvas(false)}
                aria-label="Close menu"
              >
                <CloseTwo />
              </button>
            </div>
          </div>
          <div className="tp-offcanvas-main">
            <div className="tp-main-menu-mobile d-xl-none">
              <MobileMenus />
            </div>
            <div className="tp-offcanvas-contact">
              <h3 className="tp-offcanvas-title sm">Contact</h3>
              <ul>
                <li>
                  <a href="mailto:shalom.sutherland@gmail.com">shalom.sutherland@gmail.com</a>
                </li>
                <li>Kingstown, Saint Vincent and the Grenadines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenOffcanvas(false)}
        className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
      ></div>
    </>
  );
}
