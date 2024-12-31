/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./style.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import { useProductComboBaoDa16 } from "../hook/ComboPK/ComboBaoDa/ComboBaoDa16";
import { useProductComboBaoDa15 } from "../hook/ComboPK/ComboBaoDa/ComboBaoDa15";
import { useProductComboBaoDa13 } from "../hook/ComboPK/ComboBaoDa/ComboBaoDa13";
import { useProductComboBaoDa14 } from "../hook/ComboPK/ComboBaoDa/ComboBaoDa14";
import { useProductComboBaoDaIpadPro } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaIpadPro";
import { useProductComboBaoDaIpadGen } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaIpadGen";
import { useProductComboBaoDaIpadAir } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaIpadAir";
import { useProductComboBaoDaIpadMini } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaIpadMini";
import { useProductComboBaoDaGalaxyS } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaGalaxyS";
import { useProductComboBaoDaGalaxyZ } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaGalaxyZ";
import { useProductComboBaoDaAirPods } from "../hook/ComboPK/ComboBaoDa/ComboBaoDaAirPods";

const SectionBaoDa: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState<string>("iPhone");
  const [activeChildTab, setActiveChildTab] = useState<string>("16");

  const handleParentTabChange = (parentTab: string) => {
    setActiveParentTab(parentTab);
    // Reset the active child tab to the first option of the selected parent tab
    if (parentTab === "iPhone") {
      setActiveChildTab("16");
    } else if (parentTab === "Galaxy") {
      setActiveChildTab("Galaxy Z");
    } else if (parentTab === "iPad") {
      setActiveChildTab("Pro");
    } else if (parentTab === "AirPods") {
      setActiveChildTab("AirPods");
    }
  };

  const { data: dataIphone16 } = useProductComboBaoDa16();
  const { data: dataIphone15 } = useProductComboBaoDa15();
  const { data: dataIphone14 } = useProductComboBaoDa14();
  const { data: dataIphone13 } = useProductComboBaoDa13();
  const { data: dataIpadPro } = useProductComboBaoDaIpadPro();
  const { data: dataIpadGen } = useProductComboBaoDaIpadGen();
  const { data: dataIpadAir } = useProductComboBaoDaIpadAir();
  const { data: dataIpadMini } = useProductComboBaoDaIpadMini();
  const { data: dataGalaxyZ } = useProductComboBaoDaGalaxyZ();
  const { data: dataGalaxyS } = useProductComboBaoDaGalaxyS();
  const { data: dataAirPods } = useProductComboBaoDaAirPods();
  const [dataTitle, setDataTitle] = useState<any>(null);

  const renderChildTabs = () => {
    if (activeParentTab === "iPhone") {
      return (
        <div className="list-child-tab">
          <button
            className={activeChildTab === "16" ? "active" : ""}
            onClick={() => setActiveChildTab("16")}
          >
            iPhone 16
          </button>
          <button
            className={activeChildTab === "15" ? "active" : ""}
            onClick={() => setActiveChildTab("15")}
          >
            iPhone 15
          </button>
          <button
            className={activeChildTab === "14" ? "active" : ""}
            onClick={() => setActiveChildTab("14")}
          >
            iPhone 14
          </button>
          <button
            className={activeChildTab === "13" ? "active" : ""}
            onClick={() => setActiveChildTab("13")}
          >
            iPhone 13
          </button>
        </div>
      );
    } else if (activeParentTab === "Galaxy") {
      return (
        <div className="list-child-tab">
          <button
            className={activeChildTab === "Galaxy Z" ? "active" : ""}
            onClick={() => setActiveChildTab("Galaxy Z")}
          >
            Galaxy Z
          </button>
          <button
            className={activeChildTab === "Galaxy S" ? "active" : ""}
            onClick={() => setActiveChildTab("Galaxy S")}
          >
            Galaxy S
          </button>
        </div>
      );
    } else if (activeParentTab === "AirPods") {
      return null;
    } else if (activeParentTab === "iPad") {
      return (
        <div className="list-child-tab">
          <button
            className={activeChildTab === "Pro" ? "active" : ""}
            onClick={() => setActiveChildTab("Pro")}
          >
            Pro
          </button>
          <button
            className={activeChildTab === "Gen" ? "active" : ""}
            onClick={() => setActiveChildTab("Gen")}
          >
            Gen
          </button>
          <button
            className={activeChildTab === "Air" ? "active" : ""}
            onClick={() => setActiveChildTab("Air")}
          >
            Air
          </button>
          <button
            className={activeChildTab === "Mini" ? "active" : ""}
            onClick={() => setActiveChildTab("Mini")}
          >
            Mini
          </button>
        </div>
      );
    }
  };

  const renderContent = () => {
    if (!dataTitle) {
      return (
        <Spin>
          <div style={{ width: 200, height: 200 }} />
        </Spin>
      );
    }

    if (activeParentTab === "iPhone") {
      switch (activeChildTab) {
        case "16":
          return dataIphone16?.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "15":
          return dataIphone15.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "14":
          return dataIphone14.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "13":
          return dataIphone13.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        default:
          return null;
      }
    } else if (activeParentTab === "AirPods") {
      return dataAirPods.map((item: any) => (
        <CardProduct
          key={item.id}
          name={item.name}
          url_key={item.url_key}
          image={item.image}
          price_range={item.price_range}
          price_original={item.attributes[0].value}
        />
      ));
    } else if (activeParentTab === "Galaxy") {
      switch (activeChildTab) {
        case "Galaxy Z":
          return dataGalaxyZ.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "Galaxy S":
          return dataGalaxyS.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        default:
          return null;
      }
    } else if (activeParentTab === "iPad") {
      switch (activeChildTab) {
        case "Pro":
          return dataIpadPro.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "Gen":
          return dataIpadGen.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "Air":
          return dataIpadAir.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        case "Mini":
          return dataIpadMini.map((item: any) => (
            <CardProduct
              key={item.id}
              name={item.name}
              url_key={item.url_key}
              image={item.image}
              price_range={item.price_range}
              price_original={item.attributes[0].value}
            />
          ));
        default:
          return null;
      }
    }
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
    <div className="OldForNew-Section-leather-case" id="item-leather-case">
      <div className="container OldForNew-Section-Container-leather-case">
        {dataTitle ? (
          dataTitle?.data?.Slider?.items[0]?.Banner?.items
            .filter((item: any) =>
              item.name.includes("title bao da trang phụ kiện")
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
            className={activeParentTab === "iPhone" ? "active" : ""}
            onClick={() => handleParentTabChange("iPhone")}
          >
            iPhone
          </button>
          <button
            className={activeParentTab === "Galaxy" ? "active" : ""}
            onClick={() => handleParentTabChange("Galaxy")}
          >
            Galaxy
          </button>
          <button
            className={activeParentTab === "AirPods" ? "active" : ""}
            onClick={() => handleParentTabChange("AirPods")}
          >
            AirPods
          </button>
          <button
            className={activeParentTab === "iPad" ? "active" : ""}
            onClick={() => handleParentTabChange("iPad")}
          >
            iPad
          </button>
        </div>
        <div className="tab-child">{renderChildTabs()}</div>
        <div className="list-product-combo-bao-da">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SectionBaoDa;
