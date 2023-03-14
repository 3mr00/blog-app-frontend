import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

import hero1 from "../../images/hero/1.jpg";
import hero2 from "../../images/hero/2.jpg";
import hero3 from "../../images/hero/3.jpg";

export default function SliderHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <div>
      {/* <!-- Hero Area Start --> */}
      <section className="hero-area feature-post">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="feature-post-slider owl-carousel">
                <Slider {...settings}>
                  <div className="single-feature-post">
                    <img src={hero1} alt="Hero" />
                    <div className="feature-text-wrapper">
                      <div className="feature-text">
                        <h2>Wonderful Blogs website</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Officia <br />
                          eveniet accusamus odio autem possimus nostrum?
                        </p>
                        <span className="feature-post-btn">Learn More</span>
                      </div>
                    </div>
                  </div>
                  <div className="single-feature-post">
                    <img src={hero2} alt="Hero" />
                    <div className="feature-text-wrapper">
                      <div className="feature-text">
                        <h2>Available Many Categories </h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Officia <br />
                          eveniet accusamus odio autem possimus nostrum?
                        </p>
                        <span className="feature-post-btn">Learn More</span>
                      </div>
                    </div>
                  </div>
                  <div className="single-feature-post">
                    <img src={hero3} alt="Hero" />
                    <div className="feature-text-wrapper">
                      <div className="feature-text">
                        <h2>Easy Add & Delete Blogs</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Officia <br />
                          eveniet accusamus odio autem possimus nostrum?
                        </p>
                        <span className="feature-post-btn">Learn More</span>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Hero Area end --> */}
    </div>
  );
}
