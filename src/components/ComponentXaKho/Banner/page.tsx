"use client";
import React, { useEffect, useState } from "react";
import BannerPC from "../../../../public/warehouse-discharge/BIG SALE XA KHO 1920x500 2310.jpg";
import BannerMB from "../../../../public/warehouse-discharge/BIG SALE XA KHO 1200X1200 2410.jpg";
import Image from "next/image";
import { Spin } from "antd";
import "./Banner.scss";

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
function page() {
  const [data, setData] = useState<ApiResponse | null>(null);

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
                         
                          link
                          media
                          media_alt
                          name
                          
                        }
                       
                      }
                    }

                  }
                }
              `,
            variables: {
              filter: {
                identifier: {
                  eq: "banner-page-xa-kho",
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      setData(result);
    } catch (err) {}
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);

  return (
    <div>
      <div>
        {data?.data?.Slider?.items[0]?.Banner?.items[0]?.media ? (
          <img
            src={data.data.Slider.items[0].Banner.items[0].media}
            alt="Banner PC"
            className="banner-pc-warehouse-discharge"
          />
        ) : (
          <Spin>
            <div style={{ width: 1820, height: 500 }} />
          </Spin>
        )}
        {data?.data?.Slider?.items[0]?.Banner?.items[1]?.media ? (
          <img
            src={data.data.Slider.items[0].Banner.items[1].media}
            alt="Banner Mobile"
            className="banner-mb-warehouse-discharge"
          />
        ) : (
          <></>
        )}
      </div>
      {/* <Image src={BannerPC} alt="" className="banner-pc-warehouse-discharge" />
      <Image src={BannerMB} alt="" className="banner-mb-warehouse-discharge" /> */}
    </div>
  );
}

export default page;
