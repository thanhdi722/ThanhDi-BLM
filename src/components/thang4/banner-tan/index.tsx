'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './style.scss'
import { Modal, Spin } from 'antd'
import Link from 'next/link'
import Gold from '../../../../public/new-year/gold.png'
import CloudBanner from '../../../../public/new-year/cloud-banner.png'
import Cloud5 from '../../../../public/new-year/cloud-5.png'
import TimeBanner from '../../../../public/new-year/time-heart.png'
import TableTime from '../../../../public/new-year/table-time.png'
import { useQuery } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import EventCards from '../eventInYear'

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
const query2 = `
query getCategories($filters:CategoryFilterInput){categories(filters:$filters){__typename items{description icon_image image_banner name url_path daily_sale{start_date end_date sale_type}slider_banner_left{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}slider_banner_right{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}daily_sale_id slider_id slider_two is_trend content_hot content_new check_show_category_in_page check_show_brand_in_page show children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields children{breadcrumbs{...BreadcrumbFields}...CategoryTreeFields}}}image_banner icon_image}}}}fragment CategoryTreeFields on CategoryTree{is_show_category_slider category_trend{__typename name image url_key url_path}icon_image image_banner slider_banner_left{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}slider_banner_right{title identifier Banner{items{banner_id caption link media media_alt name}page_info{current_page page_size total_pages}}}slider_two is_trend show check_show_category_in_page check_show_brand_in_page content_hot content_new uid id available_sort_by canonical_url name image include_in_menu meta_description meta_keywords meta_title display_mode url_key url_path description path path_in_store children_count position}fragment BreadcrumbFields on Breadcrumb{category_level category_name category_uid category_url_key category_url_path}
`

const variables2 = {
  filters: { url_key: { eq: 'bach-long-say-hi-don-tet-sang-hai-loc-vang' } },
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
      eq: 'khai-xuan-phu-quy',
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
  const [isModalOpenContent, setIsModalOpenContent] = useState(false)
  const handleCancelContent = () => setIsModalOpenContent(false)
  const [endDate, setEndDate] = useState(new Date('2025-04-30T21:30:00'))
  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ])
  const [isEventOver, setIsEventOver] = useState(false)
  async function fetchContentData() {
    const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query2,
        variables: variables2,
      }),
    })

    const data = await response.json()
    return data.data.categories.items
  }
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
    cateData.media_alt.startsWith('khai-xuan-phu-quy-mobile')
  )
  const { data: contentData } = useQuery({
    queryKey: ['contentData'],
    queryFn: fetchContentData,
    staleTime: 300000,
  })
  return (
    <div className="page-sale-thang-4">
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
                {/* <h2 className="time-tt text-center">- - - - Chương trình áp dụng - - - -</h2> */}
                <div className="timer">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div className="flex gap-4 text-white" key={index}>
                      {index === 0 && (
                        <p className="" id="countdown-days">
                          <span>{String(timeArray[0].days).padStart(2, '0')}</span> ngày
                        </p>
                      )}
                      {index === 1 && (
                        <p className="" id="countdown-hours">
                          <span>{String(timeArray[0].hours).padStart(2, '0')}</span> giờ
                        </p>
                      )}
                      {index === 2 && (
                        <p className="" id="countdown-minutes">
                          <span>{String(timeArray[0].minutes).padStart(2, '0')}</span> phút
                        </p>
                      )}
                      {index === 3 && (
                        <p className="" id="countdown-seconds">
                          <span>{String(timeArray[0].seconds).padStart(2, '0')}</span> giây
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className="rounded-md border-2 border-yellow-500 bg-red-500 text-white hover:bg-red-600"
                  onClick={() => setIsModalOpenContent(true)}
                  style={{
                    backgroundColor: 'rgb(255 30 30)',
                    border: '1px solid #yellow',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontWeight: '600',
                  }}
                >
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
        {/* <EventCards /> */}
        <div className="container">
          <div
            style={{
              padding: '10px',
              background: 'white',
              borderRadius: '16px',
              marginTop: '20px',
              border: '2px solid rgb(255 30 30)',
            }}
          >
            {/* <h2 className="HeaderHalloween-promotion-header" style={{ fontWeight: 400 }}>
              {
                data?.[0]?.Banner?.items.filter((item: any) => item.media_alt.includes('uu-dai-dac-quyen'))
                  .length
              }{' '}
              đặc quyền mua hàng tại Bạch Long Mobile
            </h2> */}
            <Image
              className="background-8"
              src={
                data?.[0]?.Banner?.items.filter((item: any) =>
                  item.media_alt.includes('banner-uu-dai-khai-xuan-phu-quy')
                )[0].media
              }
              alt="banner-tan"
              width={1920}
              height={900}
            />
            <div className="promotion-desktop">
              <div className="HeaderHalloween-promotion-list-privilege-v2">
                {data?.[0]?.Banner?.items
                  .filter((item: any) => item.media_alt.includes('uu-dai-dac-quyen'))
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
                  .filter((item: any) => item.media_alt.includes('uu-dai-dac-quyen'))
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

      <div
        className="banner-HeaderHalloween shine-banner"
        style={{ position: 'relative', overflow: 'hidden' }}
      ></div>

      <Modal width={1000} open={isModalOpenContent} onCancel={handleCancelContent} footer={null}>
        <div className="rules-new-year" id="item-rules">
          <div className="container">
            <div
              className={`content-item`}
              dangerouslySetInnerHTML={{ __html: contentData?.[0]?.description }}
            ></div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default HeaderHalloween
