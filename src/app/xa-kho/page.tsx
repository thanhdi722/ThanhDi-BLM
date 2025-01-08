"use client";
import React, { useEffect, useState, useRef } from "react";
import Banner from "../../components/ComponentXaKho/Banner/page";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardProductAccessory from "../../components/ComponentXaKho/ProductAccessory/ProductAccessory";
import AccessoriesList from "../../components/ComponentXaKho/accessories/index";
import ProductIPhone from "../../components/ComponentXaKho/ProductIPhone/ProductIPhone";
import ProductIphoneNew from "../../components/ComponentXaKho/ProductIphoneNew/ProductIphoneNew";
import ProductListIphone from "../../components/ComponentXaKho/ProductOld/ProductOld";
// import ProductAndroidNew from "../../components/ComponentXaKho/ProductAndroidNew/ProductAndroidNew";
import BannerSlider from "../../components/ComponentXaKho/banner-slide/index";
import Gift from "../../components/ComponentXaKho/Gift/index";
import "./style.scss";
const categories = [
  { id: "item-iphone", name: "Điện Thoại" },
  { id: "item-airpods", name: "iPad, Laptop" },
  { id: "item-mac", name: "Phụ Kiện" },
  { id: "item-toy", name: "Phụ Kiện 10k" },
];
function page() {
  const swiperRef = useRef<any>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollThreshold = 500;

  const handleClick = (id: string, offset = 0) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveCategory(id);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > scrollThreshold);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    const observeSections = () => {
      categories.forEach((category, index) => {
        const element = document.getElementById(category.id);
        if (element) {
          sectionObserver.observe(element);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    const timeoutId = setTimeout(observeSections, 0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
      categories.forEach((category) => {
        const element = document.getElementById(category.id);
        if (element) {
          sectionObserver.unobserve(element);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      const activeIndex = categories.findIndex(
        (category) => category.id === activeCategory
      );
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex, 300, true);
      }
    }
  }, [activeCategory]);

  return (
    <div className="page-sale-chot-nam" style={{ background: "#d5b487" }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ zIndex: 1000 }}>
          <div>
            <Banner />
            <BannerSlider />
          </div>

          <div id="item-iphone">
            <ProductIphoneNew />
          </div>

          <div id="item-airpods">
            <ProductListIphone />
          </div>

          <div id="item-mac">
            <AccessoriesList />
          </div>

          <div id="item-toy">
            <CardProductAccessory />
          </div>
          <div
            className={`sticky-category ${
              isStickyVisible ? "visible" : "hidden"
            }`}
          >
            <div className="category-desktop">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`category-item ${
                    activeCategory === category.id ? "active" : "default"
                  }`}
                  onClick={() => handleClick(category.id)}
                >
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
            <div className="category-mobile">
              <Swiper
                slideToClickedSlide={true}
                spaceBetween={10}
                watchSlidesProgress={true}
                onSwiper={(swiperInstance) => {
                  swiperRef.current = swiperInstance; // Store swiper instance in ref
                }}
                onSlideChange={(swiperInstance) => {
                  setActiveCategory(categories[swiperInstance.activeIndex].id);
                  swiperInstance.slideTo(swiperInstance.activeIndex, 300, true); // Center the active slide when scrolling
                }}
                breakpoints={{
                  300: {
                    slidesPerView: 3.5,
                  },
                  850: {
                    slidesPerView: 5,
                  },
                }}
                slidesPerView="auto"
                initialSlide={0}
              >
                {categories.map((category, index) => (
                  <SwiperSlide
                    key={index}
                    onClick={() => {
                      setActiveCategory(category.id);
                      swiperRef.current?.slideTo(index, 300, true); // Center the clicked slide
                      handleClick(category.id);
                    }}
                  >
                    <div
                      className={`swiper-slide ${
                        activeCategory === category.id ? "active" : "default"
                      }`}
                    >
                      <span className="category-name">{category.name}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div
          style={{ zIndex: 0, pointerEvents: "none" }}
          className={`sticky-category ${
            isStickyVisible ? "visible" : "hidden"
          }`}
        >
          <div>
            <div>
              <div className="cloud-new-year one-new-year">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="cloud-new-year two-new-year">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="cloud-new-year three-new-year">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className="cloud-new-year four-new-year">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ zIndex: 1, pointerEvents: "none", width: "100%" }}
          className={`sticky-category ${
            isStickyVisible ? "visible" : "hidden"
          }`}
        >
          <Gift />
        </div>
      </div>
    </div>
  );
}

export default page;
