'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './style.scss'
import { Skeleton, Spin } from 'antd'
import Link from 'next/link'
import SkeletonImage from 'antd/es/skeleton/Image'

function HeaderHalloween() {
  const [endDate, setEndDate] = useState(new Date('2024-12-31T21:30:00'))
  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ])
  const [isEventOver, setIsEventOver] = useState(false)
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
  const [data, setData] = useState<ApiResponse | null>(null)

  const fetchBannerHeader = async () => {
    try {
      const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query getSlider($filter: SliderFilterInput) {
              Slider(filter: $filter) {
                items {
                  Banner {
                    __typename
                    items {
                     name
                     link           
                     media                     
                    }       
                  }
                }               
              }
            }
          `,
          variables: {
            filter: {
              identifier: {
                eq: 'banner-flash-sale-cuoi-nam',
              },
            },
          },
        }),
      })

      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error fetching data', err)
    }
  }
  useEffect(() => {
    fetchBannerHeader()
  }, [])

  return (
    <div className="page-sale-chot-nam">
      <div>
        {data?.data?.Slider?.items[0]?.Banner?.items[0]?.media ? (
          <Image
            src={data.data.Slider.items[0].Banner.items[0].media}
            alt="Banner PC"
            className="HeaderCombo-bannerPC"
            width={1820}
            height={500}
          />
        ) : (
          <Skeleton.Image style={{ width: 1920, height: 500, display: 'block', margin: 'auto' }} />
        )}
        {data?.data?.Slider?.items[0]?.Banner?.items[1]?.media ? (
          <Image
            src={data.data.Slider.items[0].Banner.items[1].media}
            alt="Banner Mobile"
            className="HeaderCombo-bannerMB"
            width={900}
            height={900}
          />
        ) : (
          <></>
        )}
      </div>
      <div
        className="banner-HeaderHalloween shine-banner"
        style={{ position: 'relative', overflow: 'hidden' }}
      ></div>
      <div className="container">
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
          <div className="header-deal-cuoi-nam">
            <h1>
              <div className="newYear-deal-24-12">{/* Giáng sinh an lành - nhận quà hạnh phúc */}</div>
              <div className="title-deal-24-12">thời gian còn lại</div>
            </h1>
            <h2 className="countdown-deal-24-12">
              <div id="countdown-days">{timeArray[0].days} Ngày</div>
              <div id="countdown-hours">{timeArray[0].hours} Giờ</div>
              <div id="countdown-minutes">{timeArray[0].minutes} Phút</div>
              <div id="countdown-seconds">{timeArray[0].seconds} Giây</div>
            </h2>
          </div>
        )}
        <div
          style={{
            padding: '10px',
            // background: "linear-gradient(0deg, #0002ff, #7490ff)",
            // borderRadius: "10px",
            marginBottom: '20px',
          }}
        >
          <div className="HeaderHalloween-promotion-header" style={{ fontWeight: 400 }}>
            {` `}
            <p className="glitch-24-12">8 đặc quyền mua hàng tại Bạch Long Mobile</p>
          </div>
          <div className="HeaderHalloween-promotion-list-privilege">
            {data?.data?.Slider?.items[0]?.Banner?.items
              .filter((item) => item.name.includes('ưu đãi flash sale cuối năm'))
              .map((item, index) => (
                <div key={index} className="privilege-img" style={{ cursor: 'pointer' }}>
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={item.media || ''}
                        alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
                        width={1200}
                        height={1000}
                      />
                    </a>
                  ) : (
                    <Image
                      src={item.media || ''}
                      alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
                      width={1200}
                      height={1000}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderHalloween
