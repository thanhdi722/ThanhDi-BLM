"use client";
import React, { useEffect, useState } from "react";
import FrameProduct from "../../../../public/sale-12/fpk2412.png";
import { Skeleton, Spin } from "antd";
import "./apple.scss";
import Link from "next/link";
import Image from "next/image";
import {
  useProductSaleDataPKCocCapXaKho,
  useProductSaleDataPKBaoDaXaKho,
  useProductSaleDataPKXaKho,
  useProductSaleDataPKDanManXaKho,
} from "../hook/dataPK";

import HostPrice2 from "../../../../public/gratitude/hot-price.png";
import BestSeller from "../../../../public/new-year/best-seller.png";
import Author from "../../../../public/apple/author.webp";

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

const AppleList: React.FC = () => {
  const { data } = useProductSaleDataPKXaKho();
  const filteredDataPKXaKho = data?.filter(
    (item: any) => item.title === "SP Phụ Kiện Xả Kho"
  );
  const { data: dataBaoDa } = useProductSaleDataPKBaoDaXaKho();
  const filteredDataPKBaoDa = dataBaoDa?.filter(
    (item: any) => item.title === "SP PK Bao Da Xả Kho"
  );
  const { data: dataCocCap } = useProductSaleDataPKCocCapXaKho();
  const filteredDataPKCocCap = dataCocCap?.filter(
    (item: any) => item.title === "SP PK Cốc Cáp"
  );
  const { data: dataDanMan } = useProductSaleDataPKDanManXaKho();
  const filteredDataPKDanMan = dataDanMan?.filter(
    (item: any) => item.title === "SP PK Dán Màn Xả Kho"
  );
  const [activeTab, setActiveTab] = useState<string>("dan-man");
  const [filteredData, setFilteredData] = useState<any[]>([]);
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
                       
                        Banner {
                          __typename
                          items {
                           
                            media
                          
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
      setDataTitle(result);
    } catch (err) {}
  };
  useEffect(() => {
    fetchBannerHeader();
  }, []);

  const visibleProducts = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const currentData =
    activeTab === "dan-man"
      ? filteredDataPKDanMan
      : activeTab === "bao-da"
      ? filteredDataPKBaoDa
      : activeTab === "coc-cap"
      ? filteredDataPKCocCap
      : filteredDataPKXaKho;
  return (
    <div className="product-xa-kho">
      <div>
        <div className="upgrade-list">
          <div className="container">
            <div
              style={{
                padding: "10px",
                borderRadius: "10px",
                background:
                  "linear-gradient(180deg, #ffe150, var(--bg-gradient-white, rgb(255, 228, 141)) 90%)",
              }}
            >
              <div>
                <div
                  className="women-decor"
                  style={{
                    paddingBottom: "20px",
                  }}
                >
                  {dataTitle ? (
                    dataTitle?.data?.Slider?.items[0]?.Banner?.items
                      .filter((item) =>
                        item.name.includes(
                          "title sản phẩm phụ kiện 90 page xả kho"
                        )
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
                    <Spin style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 200, height: 200 }} />
                    </Spin>
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="tab-buttons">
                    <button
                      className={activeTab === "dan-man" ? "active" : ""}
                      onClick={() => handleTabChange("dan-man")}
                    >
                      Dán Màn
                    </button>
                    <button
                      className={activeTab === "bao-da" ? "active" : ""}
                      onClick={() => handleTabChange("bao-da")}
                    >
                      Bao Da
                    </button>
                    <button
                      className={activeTab === "coc-cap" ? "active" : ""}
                      onClick={() => handleTabChange("coc-cap")}
                    >
                      Cốc Cáp
                    </button>
                    <button
                      className={activeTab === "other" ? "active" : ""}
                      onClick={() => handleTabChange("other")}
                    >
                      Khác
                    </button>
                  </div>
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
                              {/* <span className="percent">Trả góp 0%</span> */}
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
                    {[...Array(10)].map((_, index) => (
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

export default AppleList;
