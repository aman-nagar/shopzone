//src\components\Layout\Home\Banner\Banner.jsx
import "./Banner.scss";
import BannerImg from "../../../../assets/banner-img.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const Banner = () => {
  const { contextSafe } = useGSAP();
  const contentRef = useRef();
  const bannerRef = useRef();

  contextSafe(
    useGSAP(() => {
      gsap.from(bannerRef.current, {
        x: 800,
        duration: 0.8,
        delay: 0.7,
        // ease: "bounce.out",
      });
      gsap.from(contentRef.current, {
        x: -800,
        duration: 0.8,
        delay: 0.7,
        // ease: "bounce.out",
      });
    })
  );

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content" ref={contentRef}>
          <h1>SALES</h1>
          <p>
            Convallis interdum purus adipiscing dis parturient posuere ac a quam
            a eleifend montes parturient posuere curae tempor
          </p>
          <div className="ctas">
            <div className="banner-cta">Read More</div>
            <div className="banner-cta v2">Shop Now</div>
          </div>
        </div>
        <img className="banner-img" src={BannerImg} ref={bannerRef} />
      </div>
    </div>
  );
};

export default Banner;
