"use client";
import React, { useEffect, useRef, useState } from "react";
import Banner from "../../components/ComponentDealSoc/banner/index";
import AppleList from "../../components/ComponentDealSoc/apple/index";
import May99 from "../../components/ComponentDealSoc/may99/index";
import AndroidList from "../../components/ComponentDealSoc/android/index";
import SamsungList from "../../components/ComponentDealSoc/samsung/index";
import PhukienList from "../../components/ComponentDealSoc/phukien/index";
import Snowfall from "../../components/ComponentDealSoc/snow/Snowfall";
import giftree from "../../../public/sale-12/giftree.gif";
import giftree2 from "../../../public/sale-12/giftree2.gif";
import Noel from "../../components/ComponentDealSoc/Noel/index";
import wheelSpin from "../../../public/sale-12/vongquaymayman.svg";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
const categories = [
  { id: "item-iphone", name: "iPhone" },
  { id: "item-airpods", name: "Máy 99%" },
  { id: "item-mac", name: "Samsung" },
  { id: "item-android", name: "Android" },
  { id: "item-toy", name: "Phụ Kiện" },
];
export default function Page() {
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
    <div className="page-sale-chot-nam" style={{ background: "#b50009" }}>
      {/* <Image
        src={background}
        alt=""
        style={{
          position: 'absolute',
          zIndex: '-1',
          height: '100%',
          objectFit: 'fill',
        }}
      /> */}
      {/* <Snowfall /> */}
      <Image
        src={giftree}
        alt=""
        width={200}
        height={200}
        className={`giftree-1`}
      />
      <Image
        src={giftree2}
        alt=""
        width={200}
        height={200}
        className={`sticky-category giftree-2 ${
          isStickyVisible ? "visible" : "hidden"
        }`}
      />
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ zIndex: 1000 }}>
          <div>
            <Banner />
          </div>

          <div id="item-iphone">
            <AppleList />
          </div>

          <div id="item-airpods">
            <May99 />
          </div>

          <div id="item-mac">
            <SamsungList />
          </div>

          <div id="item-android">
            <AndroidList />
          </div>
          <div id="item-toy">
            <PhukienList />
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
          <Link href="https://bachlongmobile.com/news/khuyen-mai/chao-thang-3-trao-qua-tang-gui-yeu-thuong/">
            <div
              id="main"
              className={`main-spin ${isStickyVisible ? "visible" : "hidden"}`}
              style={{
                zIndex: 1000,
                position: "fixed",
              }}
            >
              <Image
                src={wheelSpin}
                alt=""
                width={200}
                height={200}
                id="wheelSpin"
                className="wheel-spin"
              />

              <button className="spin-spin">SPIN</button>
            </div>
          </Link>

          {/* <Noel /> */}
          <Snowfall />
        
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
      </div>
    </div>
  );
}
