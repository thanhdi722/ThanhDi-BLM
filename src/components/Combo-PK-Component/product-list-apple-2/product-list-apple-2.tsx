/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./product-list-apple-2.scss";
import CardProduct from "../CardProductComboPK/CardProduct";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import noProducts from "../../../../public/img-no-pro-matching.webp";
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

const variables = {
  filter: {
    category_uid: {
      eq: "Njk=",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataBaoDaA2() {
  const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  console.log("data a2", data);
  return data.data.products.items as Product[];
}

const Section5: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataBaoDaA2", variables.filter.category_uid.eq], // Thêm category_uid vào queryKey
    queryFn: fetchProductListDataBaoDaA2,
    staleTime: 300000,
  });

  const [activeTab, setActiveTab] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);
  // useEffect(() => {
  //   if (activeTab === "All") {
  //     setFilteredData(data || []);
  //   } else {
  //     const filtered = data?.filter((product) =>
  //       product.name.toLowerCase().includes(activeTab.toLowerCase())
  //     );
  //     setFilteredData(filtered || []);
  //   }
  //   setVisibleProducts(10);
  //   setIsExpanded(false);
  // }, [activeTab, data]);
  // useEffect(() => {
  //   switch (activeTab) {
  //     case "IPhone 16 Series":
  //       variables.filter.category_uid.eq = "MzE0"; // Set for 'Cường Lực'
  //       break;
  //     case "IPhone 15 Series":
  //       variables.filter.category_uid.eq = "MjEx"; // Set for 'Bao da, Ốp lưng'
  //       break;
  //     // case "IPhone 14 Series":
  //     //   variables.filter.category_uid.eq = "MjEy"; // Set for 'Bao da, Ốp lưng'
  //     //   break;
  //     // case "IPhone 13 Series":
  //     //   variables.filter.category_uid.eq = "MjEz"; // Set for 'Bao da, Ốp lưng'
  //     //   break;
  //     // case "IPhone 12 Series":
  //     //   variables.filter.category_uid.eq = "MjE0"; // Set for 'Bao da, Ốp lưng'
  //     //   break;
  //     // case "IPhone 11 Series":
  //     //   variables.filter.category_uid.eq = "MjE1"; // Set for 'Bao da, Ốp lưng'
  //     //   break;
  //     default:
  //       variables.filter.category_uid.eq = "Njg="; // Default to 'All'
  //   }
  // }, [activeTab]);
  const toggleProducts = () => {
    if (isExpanded) {
      setVisibleProducts(10);
      setIsExpanded(false);
    } else {
      setVisibleProducts(filteredData.length);
      setIsExpanded(true);
    }
  };

  // if (isLoading) {
  // 	return (
  // 		<div className='loading container-spin'>
  // 			<Spin />
  // 		</div>
  // 	);
  // }

  if (error) {
    return <div>Error loading data</div>;
  }

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Increase the count by 6
    setVisibleProducts((prevVisible) => prevVisible + 10); // Update visibleProducts to show more items
  };
  return (
    <div className="OldForNew-Section-leather-case" id="item-leather-case">
      <div className="container">
        {/* <Image src={pklaptop} alt="no-products" className="images-pk" /> */}

        <div className="OldForNew-Section-Container-leather-case-a2">
          <div className="header-table-combo-pk">
            <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Phụ Kiện AirPods Apple</h2>
            </div>
            <div className="tab-button-table-combo-pk">
              {/* <button
                className={`btn-tab-buyPhone ${
                  activeTab === "IPhone 16 Series"
                    ? "btn-tab-buyPhone_active"
                    : ""
                }`}
                onClick={() => setActiveTab("IPhone 16 Series")}
              >
                iPhone 16
              </button> */}
              {/* <button
                className={`btn-tab-buyPhone ${
                  activeTab === "IPhone 15 Series"
                    ? "btn-tab-buyPhone_active"
                    : ""
                }`}
                onClick={() => setActiveTab("IPhone 15 Series")}
              >
                iPhone 15
              </button> */}
              {/* <button
                className={`btn-tab-buyPhone ${
                  activeTab === "IPhone 14 Series"
                    ? "btn-tab-buyPhone_active"
                    : ""
                }`}
                onClick={() => setActiveTab("IPhone 14 Series")}
              >
                iPhone 14
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "IPhone 13 Series"
                    ? "btn-tab-buyPhone_active"
                    : ""
                }`}
                onClick={() => setActiveTab("IPhone 13 Series")}
              >
                iPhone 13
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "IPhone 12 Series"
                    ? "btn-tab-buyPhone_active"
                    : ""
                }`}
                onClick={() => setActiveTab("IPhone 12 Series")}
              >
                iPhone 12
              </button>
              <button
                className={`btn-tab-buyPhone ${
                  activeTab === "IPhone 11 Series"
                    ? "btn-tab-buyPhone_active"
                    : ""
                }`}
                onClick={() => setActiveTab("IPhone 11 Series")}
              >
                iPhone 11
              </button> */}
              {/* <button
                className={`btn-tab-buyPhone ${
                  activeTab === "All" ? "btn-tab-buyPhone_active" : ""
                }`}
                onClick={() => setActiveTab("All")}
              >
                Tất cả
              </button> */}
            </div>
          </div>
          {isLoading && (
            <div
              className="loading container-spin flex h-28 items-center justify-center"
              style={{
                height: "300px",
              }}
            >
              <Spin />
            </div>
          )}
          {data && data.length === 0 && !isLoading ? (
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
                {data?.slice(0, visibleProducts).map((product) => (
                  <CardProduct
                    key={product?.id}
                    name={product?.name}
                    url_key={product?.url_key}
                    image={product?.image}
                    price_range={product?.price_range}
                  />
                ))}
              </div>

              {visibleCount < (data?.length || 0) && ( // Check if more products are available
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

export default Section5;
