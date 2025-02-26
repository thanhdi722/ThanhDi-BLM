import React, { useEffect, useState } from 'react' // Import các thư viện cần thiết từ React
import Image from 'next/image' // Import component Image từ Next.js
import { useQuery } from '@tanstack/react-query' // Import hook useQuery từ thư viện react-query
import Link from 'next/link' // Import component Link từ Next.js
import { Spin } from 'antd' // Import component Spin từ thư viện antd
import { Swiper, SwiperSlide } from 'swiper/react' // Import các component Swiper và SwiperSlide từ thư viện swiper/react
import ProductBanner from '../../../../public/gratitude/product-banner-01.png' // Import hình ảnh ProductBanner
import Author from '../../../../public/apple/author.webp' // Import hình ảnh Author
import HostPrice from '../../../../public/gratitude/fire.gif' // Import hình ảnh HostPrice
import HostPrice2 from '../../../../public/gratitude/hot-price.png' // Import hình ảnh HostPrice2
import FrameProduct from '../../../../public/new-year/frame-all.png' // Import hình ảnh FrameProduct
import ProductDecor from '../../../../public/new-year/product-decor.png' // Import hình ảnh ProductDecor
import ProductBg from '../../../../public/new-year/product-bg.png' // Import hình ảnh ProductBg
import ProductTree from '../../../../public/new-year/product-tree.png' // Import hình ảnh ProductTree
import BestSeller from '../../../../public/new-year/best-seller.gif' // Import hình ảnh BestSeller
import FireworkDecor from '../../../../public/new-year/firework-decor.gif' // Import hình ảnh FireworkDecor
import FireworkDecorLeft from '../../../../public/new-year/firework-decor-left.gif' // Import hình ảnh FireworkDecorLeft
import './product-new-year.scss' // Import file CSS

// Định nghĩa interface Product
export interface Product {
  id: number // ID của sản phẩm
  name: string // Tên của sản phẩm
  url_key: string // URL key của sản phẩm
  image: {
    url: string // URL hình ảnh của sản phẩm
  }
  attributes: any // Thuộc tính của sản phẩm
  price_range: {
    minimum_price: {
      final_price: {
        value: number // Giá trị cuối cùng của sản phẩm
        currency: string // Đơn vị tiền tệ
      }
    }
  }
}

// Định nghĩa query GraphQL để lấy danh sách sản phẩm
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
/// testing thanh dĩ con bòa
// Định nghĩa các biến cho query GraphQL
const variables = {
  filter: {
    category_uid: {
      eq: 'MTk4', // Lọc sản phẩm theo category_uid
    },
  },
  pageSize: 200, // Số lượng sản phẩm trên mỗi trang
  currentPage: 1, // Trang hiện tại
}

// Định nghĩa interface BannerItem
interface BannerItem {
  banner_id: number // ID của banner
  caption: string // Chú thích của banner
  link: string // Link của banner
  media: string // Media của banner
  media_alt: string // Media alt của banner
  name: string // Tên của banner
  slider_id: number // ID của slider
}

// Định nghĩa interface Banner
interface Banner {
  __typename: string // Tên kiểu của banner
  items: BannerItem[] // Danh sách các banner item
  page_info: {
    current_page: number // Trang hiện tại
    page_size: number // Kích thước trang
    total_pages: number // Tổng số trang
  }
}

// Định nghĩa interface SliderItem
interface SliderItem {
  title: string // Tiêu đề của slider
  identifier: string // Định danh của slider
  Banner: Banner // Banner của slider
}

// Định nghĩa interface SliderData
interface SliderData {
  Slider: {
    items: SliderItem[] // Danh sách các slider item
    total_count: number // Tổng số lượng slider item
  }
}

// Định nghĩa interface ApiResponse
interface ApiResponse {
  data: SliderData // Dữ liệu của API response
}

// Hàm fetchProductListData để lấy danh sách sản phẩm từ API
async function fetchProductListData() {
  const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
    method: 'POST', // Phương thức POST
    headers: {
      'Content-Type': 'application/json', // Định dạng nội dung là JSON
    },
    body: JSON.stringify({
      query, // Query GraphQL
      variables, // Biến cho query
    }),
  })

  const data = await response.json() // Chuyển đổi response thành JSON
  return data.data.products.items as Product[] // Trả về danh sách sản phẩm
}

// Định nghĩa component ProductList
const ProductList: React.FC = () => {
  // Sử dụng hook useQuery để lấy dữ liệu sản phẩm
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['productListData'], // Key của query
    queryFn: fetchProductListData, // Hàm fetch dữ liệu
    staleTime: 300000, // Thời gian dữ liệu cũ
  })

  const [dataTitle, setDataTitle] = useState<any | null>(null) // State để lưu dữ liệu tiêu đề
  // Hàm fetchBannerHeader để lấy dữ liệu banner
  const fetchBannerHeader = async () => {
    try {
      const response = await fetch('https://beta-api.bachlongmobile.com/graphql', {
        method: 'POST', // Phương thức POST
        headers: {
          'Content-Type': 'application/json', // Định dạng nội dung là JSON
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
                eq: 'banner-thang-3', // Lọc slider theo identifier
              },
            },
          },
        }),
      })

      const result = await response.json() // Chuyển đổi response thành JSON
      setDataTitle(result) // Lưu dữ liệu tiêu đề vào state
    } catch (err) {}
  }

  // Sử dụng hook useEffect để gọi hàm fetchBannerHeader khi component được render
  useEffect(() => {
    fetchBannerHeader()
  }, [])

  const [activeTab, setActiveTab] = useState<string>('iPhone 16') // State để lưu tab đang hoạt động
  const [activeSubTab, setActiveSubTab] = useState<string>('') // State để lưu sub-tab đang hoạt động
  const [filteredData, setFilteredData] = useState<Product[]>([]) // State để lưu dữ liệu sản phẩm đã lọc
  const [visibleCount, setVisibleCount] = useState<number>(5) // State để lưu số lượng sản phẩm hiển thị
  const [isMobile, setIsMobile] = useState<boolean>(false) // State để kiểm tra thiết bị di động

  // Định nghĩa các tab và sub-tab
  const tabs = [
    {
      name: 'iPhone 16',
      subTabs: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16'],
    },
    {
      name: 'iPhone 15',
      subTabs: ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15'],
    },
    {
      name: 'iPhone 14',
      subTabs: [],
    },
    {
      name: 'iPhone 13',
      subTabs: [],
    },
    {
      name: 'iPhone 11',
      subTabs: [],
    },
  ]

  // Sử dụng hook useEffect để lọc dữ liệu sản phẩm khi dữ liệu hoặc tab thay đổi
  useEffect(() => {
    const filtered = data?.filter((product) => {
      const matchesTab =
        (activeTab === 'iPhone 16' && activeSubTab === 'iPhone 16') ||
        (activeTab === 'iPhone 15' && activeSubTab === 'iPhone 15') ||
        (activeTab === 'iPhone 14' && activeSubTab === 'iPhone 14')
          ? product.name.includes(activeTab) &&
            !product.name.includes('Pro') &&
            !product.name.includes('Plus')
          : product.name.includes(activeTab)

      const matchesSubTab = activeSubTab
        ? activeSubTab.includes('Pro Max')
          ? product.name.includes('Pro Max')
          : activeSubTab.includes('Pro')
            ? product.name.includes('Pro') && !product.name.includes('Pro Max')
            : product.name.includes(activeSubTab)
        : true

      return matchesTab && matchesSubTab
    })
    setFilteredData(filtered || [])

    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
      setVisibleCount(window.innerWidth < 768 ? 4 : 5)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [data, activeTab, activeSubTab])

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

  const visibleProducts = filteredData.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5)
  }
  return (
    <div className="product-new-year-month-3">
      {/* <Image
        src={FireworkDecor}
        width={500}
        height={500}
        alt="firework-decor"
        className="firework-decor-left"
      />
      <Image
        src={FireworkDecorLeft}
        width={500}
        height={500}
        alt="firework-decor"
        className="firework-decor"
      /> */}
      <div
        className="container"
        style={{
          backgroundColor: '#fede27',
          padding: '10px',
          borderRadius: '10px',
          position: 'relative',
          marginTop: '50px',
        }}
      >
        <div className="upgrade-hot-wrap">
          {dataTitle ? (
            dataTitle?.data?.Slider?.items[0]?.Banner?.items
              .filter((item: any) => item.media_alt.includes('title-banner-thang-3-iphone'))
              .map((item: any, index: number) => (
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
              {isMobile ? (
                <Swiper spaceBetween={10} slidesPerView="auto">
                  {tabs.map((tab) => (
                    <SwiperSlide key={tab.name} style={{ width: 'auto' }}>
                      <button
                        onClick={() => {
                          setActiveTab(tab.name)
                          setActiveSubTab('')
                        }}
                        className={activeTab === tab.name ? 'tab active' : 'tab'}
                        style={{
                          color: activeTab === tab.name ? 'white' : '#000',
                          backgroundColor: activeTab === tab.name ? '#ef373e' : '#f1f1f1',
                          border: activeTab === tab.name ? '1px solid #ef373e' : '1px solid #ccc',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                      >
                        {tab.name}
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => {
                      setActiveTab(tab.name)
                      setActiveSubTab('')
                    }}
                    className={activeTab === tab.name ? 'tab active' : 'tab'}
                    style={{
                      color: activeTab === tab.name ? 'white' : '#000',
                      backgroundColor: activeTab === tab.name ? '#ef373e' : '#f1f1f1',
                      border: activeTab === tab.name ? '1px solid #ffd400' : '1px solid #ccc',
                      padding: '10px 20px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      minWidth: '150px',
                    }}
                  >
                    {tab.name}
                  </button>
                ))
              )}
            </div>

            <div style={{ display: 'flex', marginBottom: '12px' }} className="sub-tab-list">
              {isMobile ? (
                <Swiper spaceBetween={10} slidesPerView="auto">
                  {tabs
                    .find((tab) => tab.name === activeTab)
                    ?.subTabs.map((subTab) => (
                      <SwiperSlide key={subTab} style={{ width: 'auto' }}>
                        <button
                          onClick={() => setActiveSubTab(subTab)}
                          className={activeSubTab === subTab ? 'sub-tab active' : 'sub-tab'}
                          style={{
                            color: activeSubTab === subTab ? 'white' : '#000',
                            backgroundColor: activeSubTab === subTab ? '#ef373e' : '#f1f1f1',
                            border: activeSubTab === subTab ? '1px solid #ffd400' : '1px solid #ccc',
                            padding: '5px 10px',
                            margin: '5px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          {subTab}
                        </button>
                      </SwiperSlide>
                    ))}
                </Swiper>
              ) : (
                tabs
                  .find((tab) => tab.name === activeTab)
                  ?.subTabs.map((subTab) => (
                    <button
                      key={subTab}
                      onClick={() => setActiveSubTab(subTab)}
                      className={activeSubTab === subTab ? 'sub-tab active' : 'sub-tab'}
                      style={{
                        color: activeSubTab === subTab ? 'white' : '#000',
                        backgroundColor: activeSubTab === subTab ? '#ef373e' : '#f1f1f1',
                        border: activeSubTab === subTab ? '1px solid #ffd400' : '1px solid #ccc',
                        padding: '5px 10px',
                        margin: '5px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        minWidth: '150px',
                      }}
                    >
                      {subTab}
                    </button>
                  ))
              )}
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
  )
}

export default ProductList
