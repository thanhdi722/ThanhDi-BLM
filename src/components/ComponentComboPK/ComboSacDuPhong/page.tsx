/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";

import { useProductComboSacDuPhongInnostyle } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongInnostyle";
import { useProductComboSacDuPhongPisen } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongPisen";
import { useProductComboSacDuPhongMicroPack } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongMicroPack";
import { useProductComboSacDuPhongKhac } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongKhac";
import { useProductComboSacDuPhongMazer } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongMazer";
import { useProductComboSacDuPhongEnergizer } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongEnergizer";
import { useProductComboSacDuPhongSamsung } from "../hook/ComboPK/ComboSacDuPhong/ComboSacDuPhongSamsung";

import CardSkeleton from "../CardSkeleton";
const SectionBaoDa: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState<string>("Pisen");
  const [activeChildTab, setActiveChildTab] = useState<string>("Pisen");
  const [visibleProducts, setVisibleProducts] = useState<number>(10);

  const handleParentTabChange = (parentTab: string) => {
    setActiveParentTab(parentTab);
    setVisibleProducts(10);
    // Reset the active child tab to the first option of the selected parent tab
    if (parentTab === "Innostyle") {
      setActiveChildTab("Innostyle");
    } else if (parentTab === "Pisen") {
      setActiveChildTab("Pisen");
    } else if (parentTab === "MicroPack") {
      setActiveChildTab("MicroPack");
    } else if (parentTab === "Khac") {
      setActiveChildTab("Khac");
    } else if (parentTab === "Mazer") {
      setActiveChildTab("Mazer");
    } else if (parentTab === "Energizer") {
      setActiveChildTab("Energizer");
    } else if (parentTab === "Samsung") {
      setActiveChildTab("Samsung");
    }
  };

  const { data: dataInnostyle } = useProductComboSacDuPhongInnostyle();
  const { data: dataPisen } = useProductComboSacDuPhongPisen();
  const { data: dataMicroPack } = useProductComboSacDuPhongMicroPack();
  const { data: dataKhac } = useProductComboSacDuPhongKhac();
  const { data: dataMazer } = useProductComboSacDuPhongMazer();
  const { data: dataEnergizer } = useProductComboSacDuPhongEnergizer();
  const { data: dataSamsung } = useProductComboSacDuPhongSamsung();

  const [dataTitle, setDataTitle] = useState<any>(null);

  const renderChildTabs = () => {
    if (activeParentTab === "Innostyle") {
      return null;
    } else if (activeParentTab === "Pisen") {
      return null;
    } else if (activeParentTab === "MicroPack") {
      return null;
    } else if (activeParentTab === "Khac") {
      return null;
    } else if (activeParentTab === "Mazer") {
      return null;
    } else if (activeParentTab === "Energizer") {
      return null;
    } else if (activeParentTab === "Samsung") {
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
    if (activeParentTab === "Innostyle") {
      products = renderProducts(dataInnostyle);
    } else if (activeParentTab === "Pisen") {
      products = renderProducts(dataPisen);
    } else if (activeParentTab === "MicroPack") {
      products = renderProducts(dataMicroPack);
    } else if (activeParentTab === "Khac") {
      products = renderProducts(dataKhac);
    } else if (activeParentTab === "Mazer") {
      products = renderProducts(dataMazer);
    } else if (activeParentTab === "Energizer") {
      products = renderProducts(dataEnergizer);
    } else if (activeParentTab === "Samsung") {
      products = renderProducts(dataSamsung);
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
    <div className="OldForNew-Section-leather-case" id="item-backup-charger">
      <div className="container product-combo-sac-du-phong">
        {dataTitle ? (
          dataTitle?.data?.Slider?.items[0]?.Banner?.items
            .filter((item: any) =>
              item.name.includes("title pin dự phòng trang phụ kiện")
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
            className={activeParentTab === "Pisen" ? "active" : ""}
            onClick={() => handleParentTabChange("Pisen")}
          >
            Pisen
          </button>
          <button
            className={activeParentTab === "Innostyle" ? "active" : ""}
            onClick={() => handleParentTabChange("Innostyle")}
          >
            Innostyle
          </button>

          <button
            className={activeParentTab === "MicroPack" ? "active" : ""}
            onClick={() => handleParentTabChange("MicroPack")}
          >
            MicroPack
          </button>
          <button
            className={activeParentTab === "Mazer" ? "active" : ""}
            onClick={() => handleParentTabChange("Mazer")}
          >
            Mazer
          </button>
          <button
            className={activeParentTab === "Energizer" ? "active" : ""}
            onClick={() => handleParentTabChange("Energizer")}
          >
            Energizer
          </button>

          <button
            className={activeParentTab === "Samsung" ? "active" : ""}
            onClick={() => handleParentTabChange("Samsung")}
          >
            Samsung
          </button>
          <button
            className={activeParentTab === "Khac" ? "active" : ""}
            onClick={() => handleParentTabChange("Khac")}
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
