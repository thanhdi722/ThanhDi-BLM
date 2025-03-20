"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./style.scss";
import { Skeleton, Spin } from "antd";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SkeletonImage from "antd/es/skeleton/Image";
import { useQuery } from "@tanstack/react-query";

function HeaderHalloween() {
  const [endDate, setEndDate] = useState(new Date("2027-02-16T21:30:00"));
  const [timeArray, setTimeArray] = useState([
    { date: endDate.toDateString(), days: 0, hours: 0, minutes: 0, seconds: 0 },
  ]);
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
      eq: 'banner-deal-dau-thang',
    },
  },
}

  const [isEventOver, setIsEventOver] = useState(false);
  interface BannerItem {
    banner_id: number;
    caption: string;
    link: string;
    media: string;
    media_alt: string;
    name: string;
    slider_id: number;
  }

  interface Banner {
    __typename: string;
    items: BannerItem[];
    page_info: {
      current_page: number;
      page_size: number;
      total_pages: number;
    };
  }

  interface SliderItem {
    title: string;
    identifier: string;
    Banner: Banner;
  }

  interface SliderData {
    Slider: {
      items: SliderItem[];
      total_count: number;
    };
  }

  interface ApiResponse {
    data: SliderData;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = endDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setIsEventOver(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeArray([
        { date: endDate.toDateString(), days, hours, minutes, seconds },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);
  const [data, setData] = useState<ApiResponse | null>(null);
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
  const { data: dataBanner, isLoading } = useQuery({
    queryKey: ['fetchBannerData'],
    queryFn: fetchBannerData,
    staleTime: 300000,
  })
  const fetchBannerHeader = async () => {
    try {
      const response = await fetch(
        "https://beta-api.bachlongmobile.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
                  eq: "banner-deal-dau-thang",
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);

  return (
    <div className="page-valentine-day">
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
          <Skeleton.Image
            style={{
              width: 1920,
              height: 500,
              display: "block",
              margin: "auto",
            }}
          />
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
        style={{ position: "relative", overflow: "hidden" }}
      ></div>
      <div className="container">
        {isEventOver ? (
          <div className="HeaderHalloween-time-line">
            <p
              className="HeaderHalloween-time-line-end-text"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "40px 0px",
                color: "#ff000e",
                fontSize: "32px",
                fontWeight: "600",
              }}
            >
              Hết thời gian sự kiện
            </p>
          </div>
        ) : (
          <div className="header-deal-cuoi-nam">
            {/* <h1>
             
              <div className="title-deal-24-12">thời gian còn lại</div>
            </h1> */}
            <h2 className="countdown-deal-24-12">
              <div id="countdown-days">
                <p>{timeArray[0].days} Ngày</p>
              </div>
              <div id="countdown-hours">
                <p>{timeArray[0].hours} Giờ</p>
              </div>
              <div id="countdown-minutes">
                <p>{timeArray[0].minutes} Phút</p>
              </div>
              <div id="countdown-seconds">
                <p>{timeArray[0].seconds} Giây</p>
              </div>
            </h2>
          </div>
        )}
        {/* <div
          style={{
            padding: "10px",
            // background: "linear-gradient(0deg, #0002ff, #7490ff)",
            // borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            className="HeaderHalloween-promotion-header"
            style={{ fontWeight: 400 }}
          >
            {` `}
            <p className="glitch-24-12">
              8 đặc quyền mua hàng tại Bạch Long Mobile
            </p>
          </div>
          <div className="HeaderHalloween-promotion-list-privilege">
            {data?.data?.Slider?.items[0]?.Banner?.items
              .filter((item) =>
                item.name.includes("uu-dai-valentine")
              )
              .map((item, index) => (
                <div
                  key={index}
                  className="privilege-img"
                  style={{ cursor: "pointer" }}
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={item.media || ""}
                        alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
                        width={1200}
                        height={1000}
                      />
                    </a>
                  ) : (
                    <Image
                      src={item.media || ""}
                      alt={`privilege-${index + 1}`} // Adjust the alt text accordingly
                      width={1200}
                      height={1000}
                    />
                  )}
                </div>
              ))}
          </div>
        </div> */}
         <div className="container">
          <div
            style={{
              padding: '10px',
              background: 'white',
              borderRadius: '16px',
              marginTop: '20px',
              border: '2px solid #ff3793',
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
                dataBanner?.[0]?.Banner?.items.filter((item: any) =>
                  item.media_alt.includes('banner-deal-dau-thang-banner-dat-quyen')
                )[0].media
              }
              alt="banner-tan"
              width={1920}
              height={900}
            />
            <div className="promotion-desktop">
              <div className="HeaderHalloween-promotion-list-privilege-v2">
                {dataBanner?.[0]?.Banner?.items
                  .filter((item: any) => item.media_alt.includes('banner-deal-dau-thang-banner-dat-quyen-'))
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
                {dataBanner?.[0]?.Banner?.items
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
    </div>
  );
}

export default HeaderHalloween;
