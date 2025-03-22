'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import './happy-new-year.scss'

// Importing images
import itemAccess from '../../../public/apple/category-fixed-06.png'
import itemIphone from '../../../public/apple/category-fixed-01.png'
import itemIpad from '../../../public/apple/category-fixed-02.png'
import itemWatch from '../../../public/apple/category-fixed-03.png'
import itemMac from '../../../public/apple/category-fixed-04.png'
import itemAirPods from '../../../public/apple/category-fixed-05.png'

// Importing components
import Banner from '../../components/thang4/banner-tan'
import Category from '../../components/thang4/category-tan'
import ProductList from '../../components/thang4/product-tan'
import ProductIpad from '../../components/thang4/product-ipad-tan'
import ProductWatch from '../../components/thang4/product-watch-tan'
import ProductMac from '../../components/thang4/product-mac-tan'
import ProductAirPods from '../../components/thang4/product-airpods-tan'
import ProductAccess from '../../components/thang4/product-access-tan'
import Rules from '../../components/thang4/rules'

// Định nghĩa các danh mục với hình ảnh và văn bản thay thế tương ứng
const categories = [
  { id: 'item-iphone', src: itemIphone, alt: 'category-fixed-01' },
  { id: 'item-ipad', src: itemIpad, alt: 'category-fixed-02' },
  { id: 'item-watch', src: itemWatch, alt: 'category-fixed-03' },
  { id: 'item-mac', src: itemMac, alt: 'category-fixed-04' },
  { id: 'item-airpods', src: itemAirPods, alt: 'category-fixed-05' },
  { id: 'item-access', src: itemAccess, alt: 'category-fixed-06' },
]

const KhaiXuanPhuQuy = () => {
  const categoryRef = useRef(null)
  const swiperRef = useRef<any>(null)
  const [isStickyVisible, setIsStickyVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const scrollThreshold = 1500

  // Hàm xử lý khi nhấp vào và cuộn đến danh mục cụ thể
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

  // Hàm xử lý cuộn đến phần thể lệ với khoảng cách tùy chỉnh
  const handleScrollToRules = () => {
    const customOffset = 500
    handleClick('item-rules', customOffset)
  }

  useEffect(() => {
    // Hàm xử lý sự kiện cuộn và đặt hiển thị sticky
    const handleScroll = () => {
      setIsStickyVisible(window.scrollY > scrollThreshold)
    }

    // Intersection observer để quan sát các phần và đặt danh mục hoạt động
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

    // Hàm để quan sát các phần
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
    // Cập nhật swiper để trượt đến danh mục hoạt động
    if (swiperRef.current) {
      const activeIndex = categories.findIndex((category) => category.id === activeCategory)
      if (activeIndex !== -1) {
        swiperRef.current.slideTo(activeIndex, 300, true)
      }
    }
  }, [activeCategory])

  return (
    <div className="page-new-year-month-2">
      {/* Thành phần Snowfall */}
      {/* <Snowfall /> */}
      {/* Hình ảnh túi tiền */}
      {/* <Image src={MoneyBag} width={500} height={500} alt="money-bag" className="money-bag" /> */}
      {/* Thành phần Banner với trình xử lý cuộn đến thể lệ */}
      <Banner onScrollToRules={handleScrollToRules} />
      {/* Hình ảnh trang trí pháo hoa */}
      {/* <Image
        src={FireworkDecor}
        width={500}
        height={500}
        alt="firework-decor"
        className="firework-decor-nav"
      />
      <Image
        src={FireworkDecor}
        width={500}
        height={500}
        alt="firework-decor"
        className="firework-decor-main"
      /> */}
      {/* Thành phần Category */}
      <div ref={categoryRef}>
        <Category />
      </div>
      {/* Thành phần sản phẩm cho mỗi danh mục */}
      <div id="item-iphone">
        <ProductList />
      </div>
      <div id="item-ipad">
        <ProductIpad />
      </div>
      <div id="item-watch">
        <ProductWatch />
      </div>
      <div id="item-mac">
        <ProductMac />
      </div>
      <div id="item-airpods">
        <ProductAirPods />
      </div>
      <div id="item-access">
        <ProductAccess />
      </div>
      <div id="item-rules">
        <Rules />
      </div>
      {/* Điều hướng danh mục sticky */}
      <div className="container">
        <div className={`sticky-category ${isStickyVisible ? 'visible' : 'hidden'}`}>
          <div className="category-desktop">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-item ${activeCategory === category.id ? 'active' : 'default'}`}
                onClick={() => handleClick(category.id)}
              >
                <Image src={category.src} width={400} height={500} alt={category.alt} />
              </div>
            ))}
          </div>
          <div className="category-mobile">
            <Swiper
              slideToClickedSlide={true}
              spaceBetween={10}
              watchSlidesProgress={true}
              onSwiper={(swiperInstance) => {
                swiperRef.current = swiperInstance // Lưu trữ instance của swiper trong ref
              }}
              onSlideChange={(swiperInstance) => {
                setActiveCategory(categories[swiperInstance.activeIndex].id)
                swiperInstance.slideTo(swiperInstance.activeIndex, 300, true) // Trung tâm slide hoạt động khi cuộn
              }}
              breakpoints={{
                300: {
                  slidesPerView: 5,
                },
                850: {
                  slidesPerView: 6,
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
                    swiperRef.current?.slideTo(index, 300, true)
                    handleClick(category.id)
                  }}
                >
                  <div className={`swiper-slide ${activeCategory === category.id ? 'active' : 'default'}`}>
                    <Image src={category.src} width={400} height={500} alt={category.alt} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KhaiXuanPhuQuy
