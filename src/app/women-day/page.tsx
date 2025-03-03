"use client"

import React, { useEffect, useRef, useState } from "react";
import Banner from "../../components/ComponentWomenDay/banner";
import Product1 from "../../components/ComponentWomenDay/apple";
import Product2 from "../../components/ComponentWomenDay/may99";
import Product3 from "../../components/ComponentWomenDay/samsung";
import Product4 from "../../components/ComponentWomenDay/android";
import Product5 from "../../components/ComponentWomenDay/phukien";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import "./style.scss"
import Snowfall from "../../components/ComponentWomenDay/snow/Snowfall";
function ValentineDay() {
  const categories = [
    { id: 'item-iphone', name: 'iPhone' },
    { id: 'item-may99', name: 'Máy 99%' },
    { id: 'item-samsung', name: 'Samsung' },
    { id: 'item-android', name: 'Android' },
    { id: 'item-phukien', name: 'Phụ Kiện' },
  ]
  const swiperRef = useRef<any>(null)
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const scrollThreshold = 500

  const handleClick = (id: string, offset = 0) => {
    const element = document.getElementById(id)
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveCategory(id)
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > scrollThreshold)
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id)
          }
        })
      },
      { root: null, threshold: 0.1 }
    )

    const observeSections = () => {
      categories.forEach((category, index) => {
        const element = document.getElementById(category.id)
        if (element) {
          sectionObserver.observe(element)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    const timeoutId = setTimeout(observeSections, 0)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
      categories.forEach((category) => {
        const element = document.getElementById(category.id)
        if (element) {
          sectionObserver.unobserve(element)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (swiperRef.current) {
      const activeIndex = categories.findIndex((category) => category.id === activeCategory)
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex, 300, true)
      }
    }
  }, [activeCategory])
  return (
    <div className="women-day" style={{ background: "#ffe0e6" }}>
      <Banner />
      <Snowfall />
      <div id="item-iphone">
         <Product1/>
      </div>
      <div id="item-may99"> 
        <Product2/>
      </div>
      <div id="item-samsung"> 
        <Product3/>
      </div>
      <div id="item-android"> 
        <Product4/>
      </div>
      <div id="item-phukien"> 
        <Product5/>
      </div>
      <div className={`sticky-category ${isStickyVisible ? 'visible' : 'hidden'}`}>
            <div className="category-desktop">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`category-item ${activeCategory === category.id ? 'active' : 'default'}`}
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
                  swiperRef.current = swiperInstance // Store swiper instance in ref
                }}
                onSlideChange={(swiperInstance) => {
                  setActiveCategory(categories[swiperInstance.activeIndex].id)
                  swiperInstance.slideTo(swiperInstance.activeIndex, 300, true) // Center the active slide when scrolling
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
                      setActiveCategory(category.id)
                      swiperRef.current?.slideTo(index, 300, true) // Center the clicked slide
                      handleClick(category.id)
                    }}
                  >
                    <div className={`swiper-slide ${activeCategory === category.id ? 'active' : 'default'}`}>
                      <span className="category-name">{category.name}</span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
    </div>
  );
}

export default ValentineDay;
