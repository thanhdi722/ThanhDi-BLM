'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './style.scss'
import { Spin } from 'antd'
import Link from 'next/link'
import Gold from '../../../../public/new-year/gold.png'
import CloudBanner from '../../../../public/new-year/cloud-banner.png'
import Cloud5 from '../../../../public/new-year/cloud-5.png'
import TimeBanner from '../../../../public/new-year/time-banner.png'
import TableTime from '../../../../public/new-year/table-time.png'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
// import EventCards from '../eventInYear'

interface BannerItem {
  banner_id: number
  caption: string
  link: string
  media: string
  media_alt: string
  name: string
  slider_id: number
}

interface Banner {
  __typename: string
  items: BannerItem[]
  page_info: {
    current_page: number
    page_size: number
    total_pages: number
  }
}

interface SliderItem {
  title: string
  identifier: string
  Banner: Banner
}

interface SliderData {
  Slider: {
    items: SliderItem[]
    total_count: number
  }
}

interface ApiResponse {
  data: SliderData
}

type PromotionProps = {
  onScrollToRules: () => void
}

const query = `
  query getSlider($filter: SliderFilterInput) {
                    Slider(filter: $filter) {
                      items {
                        title
                        identifier
                        Banner {
                          __typename
                          items {
                            banner_id
                            caption
                            link
                            media
                            media_alt
                            name
                            slider_id
                          }
                          page_info {
                            current_page
                            page_size
                            total_pages
                          }
                        }
                      }
                      total_count
                    }
                  }`

const variables = {
  filter: {
    identifier: {
      eq: 'don-tet-sang',
    },
  },
}

async function fetchBannerData() {
  const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const data = await response.json()
  return data.data.Slider.items
}

function HeaderHalloween({ onScrollToRules }: PromotionProps) {
  const [endDate, setEndDate] = useState(new Date('2025-02-10T21:30:00'))
  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ])
  const [isEventOver, setIsEventOver] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeDiff = endDate.getTime() - now.getTime()

      if (timeDiff <= 0) {
        setIsEventOver(true)
        clearInterval(interval)
        return
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      setTimeArray([{ date: endDate.toDateString(), days, hours, minutes, seconds }])
    }, 1000)

    return () => clearInterval(interval)
  }, [endDate])

  const { data, isLoading } = useQuery({
    queryKey: ['fetchBannerData'],
    queryFn: fetchBannerData,
    staleTime: 300000,
  })

  const categoryData = data?.[0]?.Banner?.items
  const bannerDesktopData = categoryData?.find((cateData: { media_alt: string }) =>
    cateData.media_alt.startsWith('khai-xuan-phu-quy-desktop')
  )
  const bannerMobileData = categoryData?.find((cateData: { media_alt: string }) =>
    cateData.media_alt.startsWith('don-tet-sang-mobile')
  )

  return (
    <div className="page-sale-thang-12">
      <div>
        <div className="banner-desktop">
          {isLoading ? (
            <Spin>
              <div style={{ width: 1820, height: 500 }} />
            </Spin>
          ) : (
            bannerDesktopData && (
              <img
                src={bannerDesktopData.media}
                alt={bannerDesktopData.media_alt || 'banner desktop'}
                width={3000}
                height={2000}
              />
            )
          )}
        </div>
        <div className="banner-mobile">
          {isLoading ? (
            <Spin>
              <div style={{ width: 1820, height: 500 }} />
            </Spin>
          ) : (
            bannerMobileData && (
              <Image
                src={bannerMobileData.media}
                alt={bannerMobileData.media_alt || 'banner desktop'}
                width={3000}
                height={2000}
                quality={100}
              />
            )
          )}
        </div>
      </div>
      {/* <EventCards /> */}
      <div
        className="banner-HeaderHalloween shine-banner"
        style={{ position: 'relative', overflow: 'hidden' }}
      ></div>
      <div className="time-wrap">
        <div className="cloud-banner-wrap">
          {/* <Image src={Gold} width={1920} height={900} alt="background-banner" className="gold-banner-right" />
          <Image src={Gold} width={1920} height={900} alt="background-banner" className="gold-banner-left" /> */}
          {/* <Image src={CloudBanner} width={1920} height={900} alt="background-banner" className="cloud-main" /> */}
          {isEventOver ? (
            <div className="HeaderHalloween-time-line">
              <p
                className="HeaderHalloween-time-line-end-text"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '40px 0px',
                  color: '#ff000e',
                  fontSize: '32px',
                  fontWeight: '600',
                }}
              >
                Hết thời gian sự kiện
              </p>
            </div>
          ) : (
            <>
              <div className="wrap-timer">
                <h2 className="time-tt text-center text-white">- - - - Sự kiện sẽ diễn ra trong - - - -</h2>
                <div className="timer">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div className="timer-banner" key={index}>
                      <Image
                        src={TimeBanner}
                        width={500}
                        height={500}
                        alt="background-banner"
                        className="time-banner-item"
                      />
                      {index === 0 && (
                        <span className="txt-time" id="countdown-days">
                          {timeArray[0].days} <br /> ngày
                        </span>
                      )}
                      {index === 1 && (
                        <span className="txt-time" id="countdown-days">
                          {timeArray[0].hours} <br /> giờ
                        </span>
                      )}
                      {index === 2 && (
                        <span className="txt-time" id="countdown-days">
                          {timeArray[0].minutes} <br /> phút
                        </span>
                      )}
                      {index === 3 && (
                        <span className="txt-time" id="countdown-days">
                          {timeArray[0].seconds} <br /> giây
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button className="button-rules" onClick={onScrollToRules}>
                  Xem thể lệ
                </button>
              </div>
            </>
          )}
          {/* <Image src={Cloud5} width={1920} height={900} alt="background-banner" className="cloud-main-02" />
          <Image src={Cloud5} width={1920} height={900} alt="background-banner" className="cloud-main-03" />
          <Image src={CloudBanner} width={1920} height={900} alt="background-banner" className="cloud-left" />
          <Image
            src={CloudBanner}
            width={1920}
            height={900}
            alt="background-banner"
            className="cloud-right"
          /> */}
        </div>
        <div className="container">
          <div
            style={{
              padding: '10px',
              // background: "linear-gradient(0deg, #0002ff, #7490ff)",
              // borderRadius: "10px",
              marginBottom: '20px',
            }}
          >
            <h2 className="HeaderHalloween-promotion-header" style={{ fontWeight: 400 }}>
              {
                data?.[0]?.Banner?.items.filter((item: any) => item.media_alt.includes('uu-dai-don-tet-sang'))
                  .length
              }{' '}
              đặc quyền mua hàng tại Bạch Long Mobile
            </h2>
            <div className="promotion-desktop">
              <div className="HeaderHalloween-promotion-list-privilege">
                {data?.[0]?.Banner?.items
                  .filter((item: any) => item.media_alt.includes('uu-dai-don-tet-sang'))
                  .map((item: any, index: any) => (
                    <div key={index} className="privilege-img" style={{ cursor: 'pointer' }}>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={item.media || ''}
                            alt={`privilege-${index + 1}`}
                            width={1200}
                            height={1000}
                          />
                        </a>
                      ) : (
                        <Image
                          src={item.media || ''}
                          alt={`privilege-${index + 1}`}
                          width={1200}
                          height={1000}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="promotion-mobile">
              <Swiper
                spaceBetween={10}
                slidesPerView={5.5}
                breakpoints={{
                  440: {
                    slidesPerView: 4.5,
                    spaceBetween: 15,
                  },
                  1024: {
                    slidesPerView: 5.5,
                    spaceBetween: 20,
                  },
                }}
              >
                {data?.[0]?.Banner?.items
                  .filter((item: any) => item.media_alt.includes('uu-dai-don-tet-sang'))
                  .map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                      {item.link ? (
                        <Link href={item.link} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={item.media || ''}
                            alt={`privilege-${index + 1}`}
                            width={1200}
                            height={1000}
                          />
                        </Link>
                      ) : (
                        <div
                          onClick={() =>
                            document.getElementById('item-rules')?.scrollIntoView({ behavior: 'smooth' })
                          }
                        >
                          <Image
                            src={item.media || ''}
                            alt={`privilege-${index + 1}`}
                            width={1200}
                            height={1000}
                          />
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderHalloween
