/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import { useProductComboCuongLucPhone } from "../hook/ComboPK/ComboCuongLuc/ComboCuongLuciPhone";
import { useProductComboCuongLucSamsung } from "../hook/ComboPK/ComboCuongLuc/ComboCuongLucSamsung";
import { useProductComboCuongLucAppleWatch } from "../hook/ComboPK/ComboCuongLuc/ComboCuongLucAppleWatch";
import { useProductComboCuongLucPad } from "../hook/ComboPK/ComboCuongLuc/ComboCuongLuciPad";
import { useProductComboCuongLucCameraiPhone } from "../hook/ComboPK/ComboCuongLuc/ComboCuongLucCameraiPhone";
import CardSkeleton from "../CardSkeleton";

const SectionBaoDa: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState<string>("camera");
  const [activeChildTab, setActiveChildTab] = useState<string>("iphone");
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const handleParentTabChange = (parentTab: string) => {
    setActiveParentTab(parentTab);
    setVisibleProducts(10);
    if (parentTab === "man-hinh") {
      setActiveChildTab("iphone");
      setActiveChildTab("samsung");
      setActiveChildTab("apple-watch");
      setActiveChildTab("pad");
    } else if (parentTab === "camera") {
      setActiveChildTab("camera");
    }
  };

  const { data: dataCuongLucPhone } = useProductComboCuongLucPhone();
  const { data: dataCuongLucPad } = useProductComboCuongLucPad();
  const { data: dataCuongLucSamsung } = useProductComboCuongLucSamsung();
  const { data: dataCuongLucAppleWatch } = useProductComboCuongLucAppleWatch();
  const { data: dataCuongLucCameraiPhone } =
    useProductComboCuongLucCameraiPhone();
  const [dataTitle, setDataTitle] = useState<any>(null);

  const renderChildTabs = () => {
    if (activeParentTab === "man-hinh") {
      return (
        <div style={{ display: "block", margin: "0 auto" }}>
          <div className="list-child-tab">
            <button
              className={activeChildTab === "iphone" ? "active" : ""}
              onClick={() => setActiveChildTab("iphone")}
            >
              iPhone
            </button>
            <button
              className={activeChildTab === "pad" ? "active" : ""}
              onClick={() => setActiveChildTab("pad")}
            >
              iPad
            </button>
            <button
              className={activeChildTab === "apple-watch" ? "active" : ""}
              onClick={() => setActiveChildTab("apple-watch")}
            >
              Apple Watch
            </button>
            <button
              className={activeChildTab === "samsung" ? "active" : ""}
              onClick={() => setActiveChildTab("samsung")}
            >
              Samsung
            </button>
          </div>
        </div>
      );
    } else if (activeParentTab === "camera") {
      return null;
    }
    {
      return (
        <div className="list-child-tab">
          <button
            className={activeChildTab === "iphone" ? "active" : ""}
            onClick={() => setActiveChildTab("iphone")}
          >
            iPhone
          </button>

          <button
            className={activeChildTab === "samsung" ? "active" : ""}
            onClick={() => setActiveChildTab("samsung")}
          >
            Samsung
          </button>
          <button
            className={activeChildTab === "apple-watch" ? "active" : ""}
            onClick={() => setActiveChildTab("apple-watch")}
          >
            Apple Watch
          </button>
          <button
            className={activeChildTab === "pad" ? "active" : ""}
            onClick={() => setActiveChildTab("pad")}
          >
            iPad
          </button>
        </div>
      );
    }
  };

  const renderContent = () => {
    if (!dataCuongLucCameraiPhone) {
      return (
        <div className="list-product-combo-bao-da">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    }

    const renderProducts = (data: any[]) => {
      return data
        ?.slice(0, visibleProducts)
        .map((item: any) => (
          <CardProduct
            key={item.id}
            name={item.name}
            url_key={item.url_key}
            image={item.image}
            price_range={item.price_range}
            price_original={item.attributes[0].value}
          />
        ));
    };

    let products;
    if (activeParentTab === "man-hinh") {
      switch (activeChildTab) {
        case "iphone":
          products = renderProducts(dataCuongLucPhone);
          break;
        case "pad":
          products = renderProducts(dataCuongLucPad);
          break;
        case "apple-watch":
          products = renderProducts(dataCuongLucAppleWatch);
          break;
        case "samsung":
          products = renderProducts(dataCuongLucSamsung);
          break;
        default:
          return null;
      }
    } else if (activeParentTab === "camera") {
      products = renderProducts(dataCuongLucCameraiPhone);
    }
    return (
      <div style={{ display: "block" }}>
        <div className="list-product-combo-bao-da">{products}</div>
        <div>
          {products && products.length >= visibleProducts && (
            <button
              className="btn-see-more"
              onClick={() => setVisibleProducts(visibleProducts + 10)}
            >
              Xem thêm
            </button>
          )}
        </div>
      </div>
    );
  };
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
                  eq: "banner-page-combo-phu-kien",
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
  return (
    <div className="OldForNew-Section-leather-case" id="item-strength">
      <div className="container product-combo-cuong-luc">
        {dataTitle ? (
          dataTitle?.data?.Slider?.items[0]?.Banner?.items
            .filter((item: any) =>
              item.name.includes("title cường lực trang phụ kiện")
            )
            .map((item: any, index: any) => (
              <div key={index}>
                <img
                  src={item.media || ""}
                  alt={`privilege-${index + 1}`}
                  style={{ padding: "0px 10px 20px 10px" }}
                />
              </div>
            ))
        ) : (
          <Spin>
            <div style={{ width: 200, height: 200 }} />
          </Spin>
        )}
        <div className="list-tab-parent">
          <button
            className={activeParentTab === "man-hinh" ? "active" : ""}
            onClick={() => handleParentTabChange("man-hinh")}
          >
            Dán Màn Hình
          </button>
          <button
            className={activeParentTab === "camera" ? "active" : ""}
            onClick={() => handleParentTabChange("camera")}
          >
            Dán Camera
          </button>
        </div>
        <div className="tab-child">{renderChildTabs()}</div>
        <div className="">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SectionBaoDa;
