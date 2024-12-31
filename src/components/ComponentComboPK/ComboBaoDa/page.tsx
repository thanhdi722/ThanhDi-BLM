// /* eslint-disable @next/next/no-img-element */
// "use client";
// import React, { useState, useEffect } from "react";
// import "./style.scss";
// import CardProduct from "../CardProductComboPK/CardProduct";
// import { useQuery } from "@tanstack/react-query";
// import { Spin } from "antd";
// import "swiper/css";
// import "swiper/css/navigation";
// import Image from "next/image";
// import noProducts from "../../../../public/img-no-pro-matching.webp";
// import imagesPK from "../../../../public/combo-pk/baodapc.png";
// export interface Product {
//   id: number;
//   name: string;
//   url_key: string;
//   image: {
//     url: string;
//   };
//   price_range: {
//     minimum_price: {
//       final_price: {
//         value: number;
//         currency: string;
//       };
//     };
//   };
// }
// interface BannerItem {
//   banner_id: number;
//   caption: string;
//   link: string;
//   media: string;
//   media_alt: string;
//   name: string;
//   slider_id: number;
// }

// interface Banner {
//   __typename: string;
//   items: BannerItem[];
//   page_info: {
//     current_page: number;
//     page_size: number;
//     total_pages: number;
//   };
// }

// interface SliderItem {
//   title: string;
//   identifier: string;
//   Banner: Banner;
// }

// interface SliderData {
//   Slider: {
//     items: SliderItem[];
//     total_count: number;
//   };
// }

// interface ApiResponse {
//   data: SliderData;
// }
// const query = `
// query getProducts(
// $search: String
// $filter: ProductAttributeFilterInput
// $sort: ProductAttributeSortInput
// $pageSize: Int
// $currentPage: Int
// ) {
// products(
//   search: $search
//   filter: $filter
//   sort: $sort
//   pageSize: $pageSize
//   currentPage: $currentPage
// ) {
//   items {
//     ...ProductInterfaceField
//   }
// }
// }
// fragment ProductInterfaceField on ProductInterface {
// id
// name
// url_key
// image {
//   url
// }
// price_range {
//   minimum_price {
//     final_price {
//       value
//       currency
//     }
//   }
// }
// }
// `;
// const variables = {
//   filter: {
//     category_uid: {
//       eq: "MTg=",
//     },
//   },
//   pageSize: 200,
//   currentPage: 1,
// };

// async function fetchProductListDataBaoDa() {
//   const response = await fetch("https://beta-api.bachlongmobile.com/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const data = await response.json();
//   console.log("data", data);
//   return data.data.products.items as Product[];
// }

// const SectionBaoDa: React.FC = () => {
//   const { data, error, isLoading } = useQuery<Product[]>({
//     queryKey: ["productListDataBaoDa", variables.filter.category_uid.eq], // Thêm category_uid vào queryKey
//     queryFn: fetchProductListDataBaoDa,
//     staleTime: 300000,
//   });
//   const [dataTitle, setDataTitle] = useState<ApiResponse | null>(null);
//   const [activeTab, setActiveTab] = useState<string>("Apple"); // Đặt giá trị mặc định là "All"
//   const [filteredData, setFilteredData] = useState<Product[]>([]);
//   const [filteredDataSub, setFilteredDataSub] = useState<Product[]>([]);
//   const [visibleProducts, setVisibleProducts] = useState<number>(10);
//   const [isExpanded, setIsExpanded] = useState<boolean>(false);
//   const [visibleCount, setVisibleCount] = useState(10);
//   // Danh sách các hãng
//   const brands = ["Apple", "Jinya", "Mipow", "UNIQ", "Spigen"];
//   const [subActiveTab, setSubActiveTab] = useState<string>("16");
//   useEffect(() => {
//     setSubActiveTab("16");
//   }, []);

//   useEffect(() => {
//     const filtered = data?.filter(
//       (product) =>
//         product?.name.toLowerCase().includes(activeTab.toLowerCase()) ||
//         (activeTab === "Apple" &&
//           (product?.name.toLowerCase().includes("Silicone") ||
//             product?.name.toLowerCase().includes("finewoven") ||
//             product?.name.toLowerCase().includes("Silicon") ||
//             product?.name.toLowerCase().includes("silicon") ||
//             product?.name.toLowerCase().includes("silicon magsafe") ||
//             product?.name.toLowerCase().includes("suốt magsafe") ||
//             product?.name.toLowerCase().includes("beats")))
//     );
//     setFilteredData(filtered || []);
//     setVisibleCount(10);
//     setVisibleProducts(10);
//     setIsExpanded(false);
//     setSubActiveTab("16"); // Ensure subActiveTab is set correctly
//     console.log("t test", filtered);
//   }, [activeTab, data]);

//   // New useEffect to filter by subActiveTab

//   useEffect(() => {
//     let filtered = filteredData.filter((product) =>
//       product?.name.toLowerCase().includes(subActiveTab.toLowerCase())
//     );

//     // If there are no products for iPhone 16, fall back to iPhone 15
//     if (subActiveTab === "16" && filtered.length === 0) {
//       setSubActiveTab("15");
//       filtered = filteredData.filter((product) =>
//         product?.name.toLowerCase().includes("15")
//       );
//     }

//     setFilteredDataSub(filtered || []);
//     setVisibleCount(10);
//     setVisibleProducts(10);
//   }, [subActiveTab, filteredData]);
//   if (error) {
//     return <div>Error loading data</div>;
//   }

//   const loadMorePosts = () => {
//     setVisibleCount((prevCount) => prevCount + 10); // Increase the count by 6
//     setVisibleProducts((prevVisible) => prevVisible + 10); // Update visibleProducts to show more items
//   };

//   const fetchBannerHeader = async () => {
//     try {
//       const response = await fetch(
//         "https://beta-api.bachlongmobile.com/graphql",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             query: `
//                   query getSlider($filter: SliderFilterInput) {
//                     Slider(filter: $filter) {
//                       items {
//                       title
//                         Banner {
//                           __typename
//                           items {

//                             link
//                             media
//                             media_alt
//                             name

//                           }

//                         }
//                       }

//                     }
//                   }
//                 `,
//             variables: {
//               filter: {
//                 identifier: {
//                   eq: "banner-page-combo-phu-kien",
//                 },
//               },
//             },
//           }),
//         }
//       );

//       const result = await response.json();
//       setDataTitle(result);
//     } catch (err) {}
//   };
//   useEffect(() => {
//     fetchBannerHeader();
//   }, []);
//   return (
//     <div className="OldForNew-Section-leather-case" id="item-leather-case">
//       <div className="container">
//         <div className="OldForNew-Section-Container-leather-case">
//           {dataTitle ? (
//             dataTitle?.data?.Slider?.items[0]?.Banner?.items
//               .filter((item) =>
//                 item.name.includes("title bao da trang phụ kiện")
//               )
//               .map((item, index) => (
//                 <div key={index}>
//                   <img
//                     src={item.media || ""}
//                     alt={`privilege-${index + 1}`}
//                     style={{ padding: "0px 10px 20px 10px" }}
//                   />
//                 </div>
//               ))
//           ) : (
//             <Spin>
//               <div style={{ width: 200, height: 200 }} />
//             </Spin>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionBaoDa;
