/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import "./product-list-strength.scss";
// import { Carousel } from "antd";
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
      eq: "MjQ=",
    },
  },
  pageSize: 200,
  currentPage: 1,
};

async function fetchProductListDataCuongLuc() {
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

  return data.data.products.items as Product[];
}

const Section5: React.FC = () => {
  // Moved useState hooks to the top level to avoid conditional calls

  const [activeTab, setActiveTab] = useState<string>("Apple"); // Đặt giá trị mặc định là "All"
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [filteredDataSub, setFilteredDataSub] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<number>(10);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState(10);

  const brands = [
    "Apple",
    "Mipow",
    "UNIQ",
    "Jcpal",
    "Pisen",
    "BAGI",
    "ZEELOT",
    "KINGKONG",
  ];
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productListDataCuongLuc", variables.filter.category_uid.eq],
    queryFn: fetchProductListDataCuongLuc,
    staleTime: 300000,
  });

  const [subActiveTab, setSubActiveTab] = useState<string>("16"); // Initialize subActiveTab

  useEffect(() => {
    setSubActiveTab("16"); // Set default subActiveTab
  }, []);

  useEffect(() => {
    const filtered = data?.filter(
      (product) =>
        product?.name.toLowerCase().includes(activeTab.toLowerCase()) || // Include products based on activeTab
        (activeTab === "Apple" &&
          product?.name.toLowerCase().includes("iphone")) // Check for MagSafe only if Apple is selected
    );
    setFilteredData(filtered || []);

    setVisibleProducts(10);
    setIsExpanded(false);
    setSubActiveTab("16"); // Reset subActiveTab when changing main tab
  }, [activeTab, data]);
  console.log("data a2", filteredData);
  // New useEffect to filter by subActiveTab
  useEffect(() => {
    const filtered = filteredData.filter((product) =>
      product?.name.toLowerCase().includes(subActiveTab.toLowerCase())
    );
    setFilteredDataSub(filtered || []);
  }, [subActiveTab, filteredData]);

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
    <div className="OldForNew-Section-strength" id="item-strength">
      <div className="container">
        <div className="OldForNew-Section-Container-strength">
          <div className="header-table-combo-pk">
            <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Phụ Kiện Cường Lực</h2>
            </div>
            <div className="tab-button-table-combo-pk">
              {brands.map((brand) => (
                <button
                  key={brand}
                  className={`btn-tab-buyPhone ${
                    activeTab === brand ? "btn-tab-buyPhone_active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(brand);
                    setSubActiveTab("All"); // Reset sub-tab when changing main tab
                  }}
                >
                  {brand}
                </button>
              ))}
            </div>
            <div className="tab-button-table-combo-pk">
              {data &&
                data.length > 0 && // Check if there is data
                [
                  { label: "iPhone 15", value: "15" },
                  { label: "iPhone 16", value: "16" },
                  // Add more sub-tabs as needed
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    className={`btn-tab-buyPhone ${
                      subActiveTab === value ? "btn-tab-buyPhone_active" : ""
                    }`}
                    onClick={() => setSubActiveTab(value)}
                  >
                    {label} {/* Display the new label */}
                  </button>
                ))}
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
                {filteredDataSub?.slice(0, visibleProducts).map((product) => (
                  <CardProduct
                    key={product.id}
                    name={product.name}
                    url_key={product.url_key}
                    image={product.image}
                    price_range={product.price_range}
                  />
                ))}
              </div>

              {visibleCount < (filteredDataSub?.length || 0) && ( // Check if more products are available
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
