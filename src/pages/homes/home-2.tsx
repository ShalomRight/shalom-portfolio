'use client';
import {gsap} from "gsap";
import React, { useEffect, useState } from "react";
import useScrollSmooth from '@/hooks/use-scroll-smooth';
import { ScrollSmoother, ScrollTrigger, SplitText } from '@/plugins';
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import AboutOne from "@/components/about/about-one";
import VideoTwo from "@/components/video/video-two";
import ServiceTwo from "@/components/service/service-two";
import ProjectTwo from "@/components/project/project-two";
import AwardTwo from "@/components/award/award-two";
import LineText from "@/components/line-text/line-text";
import InstagramArea from "@/components/instagram/instagram-area";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { bounceAnimation, heroBgAnimation, heroTitleAnim } from "@/utils/title-animation";
import { videoAnimTwo } from "@/utils/video-anim";
import { panelOneAnimation } from "@/utils/panel-animation";
import { awardAnimOne } from "@/utils/award-anim";
import { instagramAnim } from "@/utils/instagram-anim";
import { hoverBtn } from "@/utils/hover-btn";
import HeroBannerTrueKind from "@/components/hero-banner/hero-banner-truekind";
import PreloaderTrueKind from "@/components/preloader/preloader-truekind";
import PreloaderNiteRiot from "@/components/preloader/preloader-niteriot";
import AboutTwo from "@/components/about/about-two";
import ServiceThree from "@/components/service/service-three";


const HomeTwoMain = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  useScrollSmooth();
  useEffect(() => {
    document.body.classList.add("tp-smooth-scroll");
    return () => {
      document.body.classList.remove("tp-smooth-scroll");
    }
  }, []);

  useGSAP(() => {
    if (showPreloader) return;
    const timer = setTimeout(() => {
      // hero animation
      heroTitleAnim();
      heroBgAnimation();
      // bounce animation
      bounceAnimation();
      // video anim
      videoAnimTwo();
      // panel animation
      panelOneAnimation();
      // award animation
      awardAnimOne();
      // instagram animation
      instagramAnim();
      hoverBtn();
    }, 100)
    return () => clearTimeout(timer);
  }, [showPreloader]);

  return (
    <Wrapper>
      {/* Preloader — covers entire viewport until animation completes */}
      {showPreloader && (
        <PreloaderTrueKind onComplete={() => setShowPreloader(false)} />
        /* Swap to <PreloaderNiteRiot onComplete={() => setShowPreloader(false)} /> for the other style */
      )}

      {/* header area start */}
      <HeaderOne />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* hero area start */}
            <HeroBannerTrueKind />
            {/* hero area end */}
              {/* about area start */}
              <AboutTwo />
              {/* about area end */}
            {/* about area start */}
            {/* <AboutOne/> */}
            {/* about area end */}

            {/* video area start */}
            {/* <VideoTwo /> */}
            {/* video area end */}

                 {/* service area start */}
                        <ServiceThree />
                        {/* service area end */}

            {/* service area start */}
            {/* <ServiceTwo /> */}
            {/* service area end */}

            {/* project area */}
            {/* <ProjectTwo/> */}
            {/* project area */}


            {/* award area */}
            <AwardTwo/>
            {/* award area */}

            {/* line text area */}
            <LineText/>
            {/* line text area */}

                 {/* instagram area */}
            <InstagramArea/>
            {/* instagram area */}

       
          </main>

          {/* footer area */}
          <FooterTwo/>
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeTwoMain;
