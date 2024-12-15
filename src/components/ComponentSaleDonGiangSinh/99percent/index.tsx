"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Skeleton, Spin } from "antd";
import "./product.scss";
import DecorProduct from "../../../../public/flase-sale/IC-DECOR.png";
import DecorWomen from "../../../../public/flase-sale/maycu.png";
import FrameProduct from "../../../../public/sale-12/fai.png";
import { useProductSaleDataDaily99 } from "../../../app/hooks/useProductSaleData99";
import DecorProduct2 from "../../../../public/halloween/ICON-DRAGON.png";
import { useProductSaleDataIPHONE99 } from "../../../app/hooks/productDailySale2412/useProductSaleDataIPHONE99";
import { useProductSaleDataSAMSUNG99 } from "../../../app/hooks/productDailySale2412/useProductSaleDataSAMSUNG99";
import { useProductSaleDataWACTH99 } from "../../../app/hooks/productDailySale2412/useProductSaleDataWACTH99";
export interface Product {
  id: number;
  name: string;
  url_key: string;
  image: {
    url: string;
  };
  attributes: any;
  price_range: {
    minimum_price: {
      final_price: {
        value: number;
        currency: string;
      };
    };
  };
}
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

const ProductPercent: React.FC = () => {
  const { data: dataIPHONE99 } = useProductSaleDataIPHONE99();
  const filteredIPHONE99 = dataIPHONE99?.filter(
    (item: any) => item.title === "SP IPHONE 99 24/12"
  );
  const { data: dataSAMSUNG99 } = useProductSaleDataSAMSUNG99();
  const filteredSAMSUNG99 = dataSAMSUNG99?.filter(
    (item: any) => item.title === "SP SAMSUNG 99 24/12"
  );
  const { data: dataWACTH99 } = useProductSaleDataWACTH99();
  const filteredWACTH99 = dataWACTH99?.filter(
    (item: any) => item.title === "SP MTB WATCH 99 24/12"
  );

  const [activeSubTab, setActiveSubTab] = useState<string>("iPhone");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [dataTitle, setDataTitle] = useState<ApiResponse | null>(null);
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
                  eq: "banner-page-deal-dau-thang-12",
                },
              },
            },
          }),
        }
      );

      const result = await response.json();
      setDataTitle(result);
    } catch (err) {}
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);
  const tabs = [
    {
      name: "iPhone",
    },
    {
      name: "Samsung",
    },
  ];

  const visibleProducts = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const handleTabChange = (tab: string) => {
    setActiveSubTab(tab);
  };
  const currentData =
    activeSubTab === "iPhone"
      ? filteredIPHONE99
      : activeSubTab === "Samsung"
      ? filteredSAMSUNG99
      : filteredWACTH99;
  return (
    <div
      className="product-20-11"
      style={{
        marginBottom: "20px",
      }}
    >
      <div>
        <div className="upgrade-list">
          <div className="container">
            <div>
              <div>
                <div className="women-decor" style={{ padding: "10px 0px" }}>
                  {dataTitle ? (
                    dataTitle?.data?.Slider?.items[0]?.Banner?.items
                      .filter((item) =>
                        item.name.includes("title máy 99 deal đầu tháng")
                      )
                      .map((item, index) => (
                        <div key={index}>
                          <img
                            src={item.media || ""}
                            alt={`privilege-${index + 1}`}
                          />
                        </div>
                      ))
                  ) : (
                    <Spin>
                      <div style={{ width: 200, height: 200 }} />
                    </Spin>
                  )}
                </div>
                <div className="tab-buttons">
                  <button
                    className={activeSubTab === "iPhone" ? "active" : ""}
                    onClick={() => handleTabChange("iPhone")}
                  >
                    iPhone
                  </button>
                  <button
                    className={activeSubTab === "Samsung" ? "active" : ""}
                    onClick={() => handleTabChange("Samsung")}
                  >
                    Samsung
                  </button>
                  <button
                    className={activeSubTab === "WATCH" ? "active" : ""}
                    onClick={() => handleTabChange("WATCH")}
                  >
                    Watch
                  </button>
                </div>
                {currentData && currentData.length > 0 ? (
                  <div className="upgrade">
                    {currentData?.[0]?.items
                      .sort((a: any, b: any) => a.sale_price - b.sale_price)
                      .slice(0, visibleCount)
                      .map((product: any, index: number) => (
                        <Link
                          key={index}
                          href={`https://bachlongmobile.com/products/${product?.product?.url_key}`}
                          passHref
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div className="upgrade-item">
                            <div className="upgrade-item-header">
                              <span className="percent">Trả góp 0%</span>
                              {/* {/(iphone|ipad|macbook|watch)/i.test(
                                product?.product?.name
                              ) && (
                                <Image
                                  className="ic-auth"
                                  src={DecorWomen}
                                  alt=""
                                />
                              )} */}
                            </div>
                            <div className="upgrade-item-img">
                              <div className="img-content">
                                <Image
                                  src={product?.product?.image?.url}
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
                            <div className="upgrade-item-content">
                              <h4 className="upgrade-item-content-tt">
                                {product?.product?.name}
                              </h4>
                              <div className="upgrade-item-content-body">
                                <div className="upgrade-item-content-body-price">
                                  {product?.sale_price?.toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </div>
                                <div className="upgrade-item-content-body-reduced">
                                  <div className="price-reduced">
                                    {Number(
                                      product?.price_original
                                    )?.toLocaleString("vi-VN")}{" "}
                                    VNĐ
                                  </div>
                                  <div className="percent">
                                    -
                                    {Math.ceil(
                                      100 -
                                        (product.sale_price /
                                          product.price_original) *
                                          100
                                    )}
                                    %
                                  </div>
                                </div>
                                {/* <div
                                  style={{
                                    backgroundColor: "rgba(215, 0, 24, .08)",
                                    borderRadius: "0.4rem",
                                    color: "#d70018",
                                    padding: "0.8rem",
                                    textAlign: "center",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.2rem",
                                      textAlign: "center",
                                    }}
                                  >
                                    Giá thu bằng giá bán - Trợ giá lên đến 100%
                                  </span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <div className="upgrade">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="upgrade-item"
                        style={{ padding: "10px" }}
                      >
                        <div className="">
                          <Skeleton.Image
                            active
                            style={{
                              width: "210px",
                              height: "210px",
                              marginBottom: "10px",
                            }}
                          />
                        </div>
                        <div className="upgrade-item-content">
                          <Skeleton.Input
                            active
                            block
                            style={{
                              width: "100%",
                              marginBottom: "8px",
                            }}
                          />
                          <Skeleton.Input
                            active
                            block
                            style={{
                              width: "100%",
                              marginBottom: "8px",
                            }}
                          />
                          <Skeleton.Input
                            active
                            block
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {visibleCount < currentData?.[0]?.items?.length ? (
                  <div style={{ textAlign: "center", margin: "10px 0px" }}>
                    <button
                      onClick={loadMore}
                      style={{
                        backgroundColor: "#d71536",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Xem thêm
                    </button>
                  </div>
                ) : (
                  <div style={{ height: "50px" }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPercent;
