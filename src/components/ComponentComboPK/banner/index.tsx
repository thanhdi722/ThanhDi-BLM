'use client'
import React, { useEffect, useState } from 'react'

import './HeaderCombo.scss'
import { Spin } from 'antd'
import Image from 'next/image'
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
const HeaderCombo = () => {
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
                eq: 'banner-page-combo-phu-kien',
              },
            },
          },
        }),
      })

      const result = await response.json()
      setData(result)
    } catch (err) {}
  }
  useEffect(() => {
    fetchBannerHeader()
  }, [])

  return (
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
        <Spin>
          <div style={{ width: 1820, height: 500 }} />
        </Spin>
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
        <Spin>
          <div style={{ width: 1820, height: 500 }} />
        </Spin>
      )}
    </div>
  )
}

export default HeaderCombo
