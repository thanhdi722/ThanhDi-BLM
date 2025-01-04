/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import { useProductComboPKKhac } from "../hook/ComboPK/ComboDoChoiCongNghe/ComboPKKhac";
import { useProductComboPKLaptop } from "../hook/ComboPK/ComboDoChoiCongNghe/ComboPKLaptop";

import CardSkeleton from "../CardSkeleton";
const SectionBaoDa: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState<string>("laptop");
  const [activeChildTab, setActiveChildTab] = useState<string>("laptop");
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  const handleParentTabChange = (parentTab: string) => {
    setActiveParentTab(parentTab);
    setVisibleProducts(10);
    // Reset the active child tab to the first option of the selected parent tab
    if (parentTab === "laptop") {
      setActiveChildTab("laptop");
    } else if (parentTab === "khac") {
      setActiveChildTab("khac");
    }
  };

  const { data: dataPKKhac } = useProductComboPKKhac();
  const { data: dataPKLaptop } = useProductComboPKLaptop();

  const [dataTitle, setDataTitle] = useState<any>(null);

  const renderChildTabs = () => {
    if (activeParentTab === "laptop") {
      return null;
    }
    if (activeParentTab === "khac") {
      return null;
    }
  };

  const renderContent = () => {
    if (!dataTitle) {
      return (
        <div className="list-product-combo-bao-da">
          {Array.from({ length: 10 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    }

    const renderProducts = (data: any[]) => {
      if (!data) {
        // Display CardSkeletons while data is loading
        return Array.from({ length: visibleProducts }).map((_, index) => (
          <CardSkeleton key={index} />
        ));
      }

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
    if (activeParentTab === "khac") {
      products = renderProducts(dataPKKhac);
    } else if (activeParentTab === "laptop") {
      products = renderProducts(dataPKLaptop);
    }

    return (
      <>
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
      </>
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
    <div className="OldForNew-Section-leather-case" id="item-laptop">
      <div className="container product-combo-do-choi-phu-kien">
        {dataTitle ? (
          dataTitle?.data?.Slider?.items[0]?.Banner?.items
            .filter((item: any) =>
              item.name.includes("title đồ chơi công nghệ trang phụ kiện")
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
            className={activeParentTab === "laptop" ? "active" : ""}
            onClick={() => handleParentTabChange("laptop")}
          >
            Laptop/Macbook
          </button>
          <button
            className={activeParentTab === "khac" ? "active" : ""}
            onClick={() => handleParentTabChange("khac")}
          >
            Khác
          </button>
        </div>
        <div className="tab-child">{renderChildTabs()}</div>
        <div className="">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SectionBaoDa;
