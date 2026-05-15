import React from "react";

export default function VideoThree() {
  return (
    <div className="tp-video-3-area">
      <div className="tp-video-3-wrap p-relative">
        <video
          data-speed=".7"
          className="play-video"
          loop={true}
          muted={true}
          autoPlay={true}
          playsInline={true}
        >
          <source
            src="https://videos.ctfassets.net/d1rzkrhwv5ps/3WYZR1fLynxW2DQczCU7Vr/5dbfee8b06d5f3f2a30179905d13b945/RIGHT_STUFF_-_HAPPY_INDEPENDENCE_46_-_2025.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
}
