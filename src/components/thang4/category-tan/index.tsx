import Image, { StaticImageData } from 'next/image'
import React from 'react'
import Link from 'next/link'
import './category.scss'
import Category01 from '../../../../public/apple/category-01.png'
import Category02 from '../../../../public/apple/category-02.png'
import Category03 from '../../../../public/apple/category-03.png'
import Category04 from '../../../../public/apple/category-04.png'
import Category05 from '../../../../public/apple/category-05.png'
import Category06 from '../../../../public/apple/category-06.png'
import Category07 from '../../../../public/apple/category-07.png'
import Category08 from '../../../../public/apple/category-08.png'
import Unicorn1 from '../../../../public/new-year/unicorn1.gif'
import Unicorn2 from '../../../../public/new-year/unicorn2.gif'
import CategoryBg from '../../../../public/new-year/category-bg.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const Category = () => {
  const categoryImages = [
    Category01,
    Category02,
    Category03,
    Category04,
    Category05,
    Category06,
    Category07,
    Category08,
  ]

  const handleClickiPhone = () => {
    const iPhone = document.getElementById('item-iphone')
    if (iPhone) {
      iPhone.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickiPad = () => {
    const iPad = document.getElementById('item-ipad')
    if (iPad) {
      iPad.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickWatch = () => {
    const Watch = document.getElementById('item-watch')
    if (Watch) {
      Watch.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickMac = () => {
    const Mac = document.getElementById('item-mac')
    if (Mac) {
      Mac.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickAirpods = () => {
    const AirPods = document.getElementById('item-airpods')
    if (AirPods) {
      AirPods.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleClickAccess = () => {
    const Access = document.getElementById('item-access')
    if (Access) {
      Access.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const categoryLinks = {
    6: 'https://bachlongmobile.com/news/news/applecare-va-applecare-ban-nen-biet-gi-ve-hai-goi-bao-hanh-cua-apple/',
    7: 'https://bachlongmobile.com/news/news/apple-pay-huong-dan-chi-tiet-ve-cach-su-dung-tai-viet-nam/',
  }

  const renderCategoryItem = (src: StaticImageData, index: number) => {
    const isLinkWrapped = index === 6 || index === 7

    const content = (
      <div
        className="category-it-tan"
        onClick={
          index === 0
            ? handleClickiPhone
            : index === 1
              ? handleClickiPad
              : index === 2
                ? handleClickWatch
                : index === 3
                  ? handleClickMac
                  : index === 4
                    ? handleClickAirpods
                    : index === 5
                      ? handleClickAccess
                      : undefined
        }
      >
        {/* <Image src={CategoryBg} width={1200} height={1100} alt="category-bg" className="category-bg" /> */}
        <div className="cate-wrap">
          <Image
            src={src}
            width={1200}
            height={1100}
            alt={`category-apple-${index + 1}`}
            className="category-image"
          />
        </div>
      </div>
    )

    if (isLinkWrapped) {
      return (
        <Link href={categoryLinks[index] || '/default-link'} key={index}>
          {content}
        </Link>
      )
    }

    return <div key={index}>{content}</div>
  }

  return (
    <div className="category-wrapper-month-2">
      {/* <Image src={Unicorn2} width={500} height={500} alt="unicorn1" className="unicorn-left" />
      <Image src={Unicorn1} width={500} height={500} alt="unicorn1" className="unicorn-right" /> */}
      <div className="container">
        <div className="category-container">
          {categoryImages.map((src, index) => renderCategoryItem(src, index))}
        </div>
      </div>
    </div>
  )
}

export default Category
