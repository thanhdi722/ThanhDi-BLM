'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Spin } from 'antd'
import './product-ipad.scss'
import ProductBanner from '../../../../public/gratitude/product-banner-02.png'
import HostPrice2 from '../../../../public/gratitude/hot-price.png'
import FrameProduct from '../../../../public/new-year/frame-all.png'
import ProductDecor from '../../../../public/new-year/product-decor.png'
import ProductTree from '../../../../public/new-year/product-tree.png'
import ProductBg from '../../../../public/new-year/product-bg.png'

import BestSeller from '../../../../public/new-year/best-seller.gif'
import Author from '../../../../public/apple/author.webp'
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Product {
  id: number
  name: string
  url_key: string
  image: {
    url: string
  }
  attributes: any
  price_range: {
    minimum_price: {
      final_price: {
        value: number
        currency: string
      }
    }
  }
}

const query = `
 query getProducts(
  $search: String
  $filter: ProductAttributeFilterInput
  $sort: ProductAttributeSortInput
  $pageSize: Int
  $currentPage: Int
) {
  products(
    search: $search
    filter: $filter
    sort: $sort
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    items {
      ...ProductInterfaceField
    }
    aggregations {
      attribute_code
      count
      label
      options {
        count
        label
        value
        swatch_data {
          type
          value
        }
      }
      position
    }
    sort_fields {
      default
      options {
        label
        value
      }
    }
    total_count
    page_info {
      current_page
      page_size
      total_pages
    }  }
}
fragment ProductInterfaceField on ProductInterface {
 image_banner
  __typename
  sku
  uid
  name
  url_key
  url_suffix
  canonical_url
  stock_status
  categories {
    __typename
    name
    url_key
    url_path
    level
    uid
    position
    icon_image
    image
    path
  }
  id
  meta_description
  meta_keyword
  meta_title
  new_from_date
  new_to_date
  rating_summary
  review_count
  thumbnail {
    url
    position
  }
  image {
    url
  }
  price_range {
    ...PriceRangeField
  }
  ...CustomField
}
fragment CustomField on ProductInterface {
  color
  country_of_manufacture
  daily_sale {
    end_date
    entity_id
    sale_price
    sale_qty
    saleable_qty
    sold_qty
    start_date
    __typename
  }
  rating_summary_start {
    star_1
    star_2
    star_3
    star_4
    star_5
  }
  attributes {
    attribute_code
    label
    value
  }
}
fragment PriceRangeField on PriceRange {
  __typename
  maximum_price {
    ...ProductPriceField
  }
  minimum_price {
    ...ProductPriceField
  }
}
fragment ProductPriceField on ProductPrice {
  discount {
    amount_off
    percent_off
  }
  final_price {
    currency
    value
  }
  regular_price {
    currency
    value
  }
}
`

const variables = {
  filter: {
    category_uid: {
      eq: 'MTk2', // Assuming this is the category ID for iPads
    },
  },
  pageSize: 200,
  currentPage: 1,
}

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

async function fetchProductListData() {
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

  return data.data.products.items as Product[]
}

const ProductIpad: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['productIpadData'],
    queryFn: fetchProductListData,
    staleTime: 300000,
  })

  const [dataTitle, setDataTitle] = useState<ApiResponse | null>(null)
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
                  }
                `,
          variables: {
            filter: {
              identifier: {
                eq: 'title-khai-xuan-phu-quy',
              },
            },
          },
        }),
      })

      const result = await response.json()
      setDataTitle(result)
    } catch (err) {}
  }

  useEffect(() => {
    fetchBannerHeader()
  }, [])

  const [activeTab, setActiveTab] = useState<string>('Pro')
  const [visibleCount, setVisibleCount] = useState<number>(5) // Initial number of products to show
  const [filteredData, setFilteredData] = useState<Product[]>([])

  const tabs = ['Pro', 'Air', 'Gen']

  useEffect(() => {
    const filtered = data?.filter((product) => product.name.includes(activeTab))
    setFilteredData(filtered || [])

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4)
      } else {
        setVisibleCount(5)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [data, activeTab])

  if (isLoading) {
    return (
      <div className="loading container-spin">
        <Spin />
      </div>
    )
  }

  if (error) {
    return <div>Error loading data</div>
  }

  const visibleProducts = filteredData.slice(0, visibleCount)

  const hostData: any = data
  const filterFlashSaleItems = (data: Product[] | undefined) => {
    if (!data) return []

    return data.filter((item) => {
      return item.attributes.some((attribute: { attribute_code: string; value: string }) => {
        return attribute.attribute_code === 'flash_sale_hot' && attribute.value?.toLowerCase() === 'yes'
      })
    })
  }
  const flashSaleItems = filterFlashSaleItems(hostData).slice(0, 2)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5)
  }

  return (
    <div className="product-new-year-month-2">
      <div className="upgrade-list">
        <div
          className="container"
          style={{ backgroundColor: '#ff7eb8', padding: '10px', borderRadius: '10px', marginTop: '50px' }}
        >
          <div className="upgrade-hot-wrap">
            {dataTitle ? (
              dataTitle?.data?.Slider?.items[0]?.Banner?.items
                .filter((item) => item.media_alt.includes('title-ipad-don-tet-2'))
                .map((item, index) => (
                  <div key={index} className="custom-banner-title">
                    <img src={item.media || ''} alt={`privilege-${index + 1}`} className="product-banner" />
                  </div>
                ))
            ) : (
              <Spin>
                <div style={{ width: 200, height: 200 }} />
              </Spin>
            )}
            {/* <div className="upgrade-hot">
              {flashSaleItems.map((product, index) => (
                <Link
                  key={index}
                  href={`https://bachlongmobile.com/products/${product.url_key}`}
                  passHref
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: 'black' }}
                  className="hot-item"
                >
                  <div className="upgrade-hot-item">
                    <Image src={ProductBg} width={400} height={200} alt="product-bg" className="product-bg" />
                    <Image
                      src={ProductTree}
                      width={500}
                      height={200}
                      alt="product-bg"
                      className="product-tree"
                    />
                    <div className="upgrade-hot-item-wrap">
                      <div className="upgrade-hot-item-header">
                        <Image
                          src={Author}
                          width={60}
                          height={20}
                          quality={100}
                          alt="author"
                          className="author"
                        />
                        <span className="percent">Trả góp 0%</span>
                      </div>
                      <div className="upgrade-hot-item-img">
                        <div className="img-content">
                          <Image
                            src={product.image.url}
                            width={1400}
                            height={1200}
                            quality={100}
                            alt={`product-${index}`}
                          />
                        </div>
                        <div className="frame-product">
                          <Image
                            src={FrameProduct}
                            width={500}
                            height={500}
                            quality={100}
                            alt="frame-product"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="upgrade-hot-item-content">
                   
                      <Image
                        src={BestSeller}
                        width={300}
                        height={90}
                        alt="best-seller"
                        style={{ position: 'relative', zIndex: 20 }}
                      />
                     
                      <div>
                        <h4 className="upgrade-hot-item-content-tt">{product.name}</h4>
                      </div>
                      <div className="upgrade-hot-item-content-body">
                        <div className="upgrade-hot-item-content-body-price">
                          {product.price_range.minimum_price.final_price.value.toLocaleString('vi-VN')}{' '}
                          {product.price_range.minimum_price.final_price.currency}
                        </div>
                        <div className="upgrade-hot-item-content-body-reduced">
                          <div className="price-reduced">
                            {product.attributes && product.attributes[0]?.value
                              ? Number(product.attributes[0].value).toLocaleString('vi-VN')
                              : ''}{' '}
                            {product.attributes[0].value &&
                              product.price_range.minimum_price.final_price.currency}
                          </div>

                          {product.attributes[0].value && (
                            <div className="percent">
                              -
                              {Math.ceil(
                                ((product.attributes[0].value -
                                  product.price_range.minimum_price.final_price.value) /
                                  product.attributes[0].value) *
                                  100
                              )}
                              %
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="upgrade-wrap-footer">
                        <div className="upgrade-hot-footer">
                          <span>Giá thu bằng giá bán</span>
                          <span>Trợ giá lên đến 100%</span>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div> */}
            <div className="upgrade-list">
              <div className="tabs">
                {tabs.map((tab) => (
                  <div key={tab}>
                    <button
                      onClick={() => {
                        setActiveTab(tab)
                      }}
                      className={activeTab === tab ? 'tab active' : 'tab'}
                      style={{
                        color: activeTab === tab ? 'white' : '#000',
                        backgroundColor: activeTab === tab ? '#ef373e' : '#f1f1f1',
                        border: activeTab === tab ? '1px solid #ffd400' : '1px solid #ccc',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        minWidth: '150px',
                      }}
                    >
                      {tab}
                    </button>
                  </div>
                ))}
              </div>

              <div className="upgrade">
                {visibleProducts.map((product, index) => (
                  <Link
                    key={index}
                    href={`https://bachlongmobile.com/products/${product.url_key}`}
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'black', position: 'relative' }}
                  >
                    {index < 5 && (
                      <div
                        style={{
                          width: '180px',
                          height: '80px',
                          position: 'absolute',
                          top: '-13px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          zIndex: 20,
                        }}
                      >
                        <Image
                          src={BestSeller}
                          width={180}
                          height={80}
                          alt="best-seller"
                          style={{
                            width: 'auto',
                            height: 'auto',
                          }}
                        />
                      </div>
                    )}
                    <div className="upgrade-item" >
                      <div className="upgrade-item-header" style={{paddingTop:"15px"}}>
                        <Image src={Author} width={60} height={20} quality={100} alt="author" />
                        <span className="percent">Trả góp 0%</span>
                      </div>
                      <div className="upgrade-item-img">
                        <div className="img-content">
                          <Image
                            src={product.image.url}
                            width={1400}
                            height={1200}
                            quality={100}
                            alt={`product-${index}`}
                          />
                        </div>
                        <div className="frame-product">
                          <Image
                            src={FrameProduct}
                            width={500}
                            height={500}
                            quality={100}
                            alt="frame-product"
                          />
                        </div>
                        {/* <div className="product-decor">
                          <Image
                            src={ProductDecor}
                            width={500}
                            height={500}
                            quality={100}
                            alt="product-decor"
                            className="product-decor"
                          />
                        </div> */}
                      </div>
                      <div className="upgrade-item-content">
                        <h4 className="upgrade-item-content-tt">{product.name}</h4>
                        <div className="upgrade-item-content-body">
                          <div className="upgrade-item-content-body-price">
                            {product.price_range.minimum_price.final_price.value.toLocaleString('vi-VN')}{' '}
                            {product.price_range.minimum_price.final_price.currency}
                          </div>
                          <div className="upgrade-item-content-body-reduced">
                            <div className="price-reduced">
                              {product.attributes && product.attributes[0]?.value
                                ? Number(product.attributes[0].value).toLocaleString('vi-VN')
                                : ''}{' '}
                              {product.attributes[0].value &&
                                product.price_range.minimum_price.final_price.currency}
                            </div>

                            {product.attributes[0].value && (
                              <div className="percent">
                                -
                                {Math.ceil(
                                  ((product.attributes[0].value -
                                    product.price_range.minimum_price.final_price.value) /
                                    product.attributes[0].value) *
                                    100
                                )}
                                %
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="upgrade-wrap-footer">
                        <div className="upgrade-hot-footer">Giá thu bằng giá bán - Trợ giá lên đến 100%</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {visibleCount < filteredData.length && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button onClick={loadMore} className="button-rules">
                    Xem thêm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductIpad
