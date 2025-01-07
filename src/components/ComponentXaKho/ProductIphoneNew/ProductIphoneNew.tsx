/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import "./ProductIphoneNew.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
import imagesTitle from "../../../../public/warehouse-discharge/iphone.png";
export interface Product {
  id: number;
  name: string;
  url_key: string;
  image: {
    url: string;
  };
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
  }
}
fragment ProductInterfaceField on ProductInterface {
  id
  name
  url_key
  image {
    url
  }
  price_range {
    minimum_price {
      final_price {
        value
        currency
      }
    }
  }
}
`;

const variables1 = {
  filter: {
    category_uid: {
      eq: "Mzg4",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

const variables2 = {
  filter: {
    category_uid: {
      eq: "Mzkw",
    },
  },
  pageSize: 200,
  currentPage: 1,
};
const variables3 = {
  filter: {
    category_uid: {
      eq: "Mzg5",
    },
  },
  pageSize: 200,
  currentPage: 1,
};
async function fetchProductListData(selectedVariable: any) {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: selectedVariable,
    }),
  });

  const data = await response.json();
  console.log("Fetched data:", data);
  return data.data.products.items as Product[];
}

const ProductListIphone: React.FC = () => {
  const [mainTab, setMainTab] = useState("Apple");
  const [visibleCount, setVisibleCount] = useState(10);

  // Use variables1 for Apple and variables2 for Android
  const selectedVariable =
    mainTab === "Apple"
      ? variables1
      : mainTab === "Android"
      ? variables2
      : variables3;

  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListData", mainTab],
    queryFn: () => fetchProductListData(selectedVariable),
    staleTime: 300000,
  });

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (error) {
    return <div>Error loading data</div>;
  }
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
  return (
    <div className="container-iphone-ProductOld">
      <div className="container">
        <div
          className="OldForNew-Section-Container-leather-case-a1"
          id="item-leather-case"
        >
          {dataTitle ? (
            dataTitle?.data?.Slider?.items[0]?.Banner?.items
              .filter((item) =>
                item.name.includes("title sản phẩm iphone page xả kho")
              )
              .map((item, index) => (
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
          <div className="header-table-combo-pk">
            {/* <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Phụ Kiện</h2>
            </div> */}
            <div className="tab-button-table-combo-pk">
              <button
                className={`btn-tab-buyPhone ${
                  mainTab === "Apple" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setMainTab("Apple")}
              >
                iPhone
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  mainTab === "iPad" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setMainTab("iPad")}
              >
                iPad
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  mainTab === "Android" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setMainTab("Android")}
              >
                Laptop
              </button>
            </div>
          </div>

          {isLoading ? (
            <div
              className="loading container-spin flex h-28 items-center justify-center"
              style={{ height: "300px" }}
            >
              <Spin />
            </div>
          ) : data && data.length === 0 ? (
            <div className="no-products-message">
              <Image
                src={noProducts}
                alt="no-products"
                className="no-products-image"
              />
              <span>Không có sản phẩm</span>
            </div>
          ) : (
            <>
              <div className="OldForNew-Section5-ItemSlider">
                {data?.slice(0, visibleCount).map((product) => (
                  <CardProduct
                    key={product?.id}
                    name={product?.name}
                    url_key={product?.url_key}
                    image={product?.image}
                    price_range={product.price_range}
                  />
                ))}
              </div>
              {visibleCount < (data?.length || 0) && (
                <div className="load-more-container">
                  <button onClick={loadMorePosts}>Xem thêm</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListIphone;
