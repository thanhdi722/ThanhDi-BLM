// /* eslint-disable @next/next/no-img-element */
// "use client";
// import React, { useState, useEffect } from "react";
// import "./style.scss";
// import CardProduct from "../CardProductComboPK/CardProduct";
// import { Spin } from "antd";
// import "swiper/css";
// import "swiper/css/navigation";
// import { useProductComboBaoDa } from "../hook/ComboPK/ComboBaoDa/ComboBaoDa";

// const SectionBaoDa: React.FC = () => {
//   const [dataTitle, setDataTitle] = useState<any>(null);
//   const { data } = useProductComboBaoDa();
//   console.log("data check apple ", data);
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
//               .filter((item: any) =>
//                 item.name.includes("title bao da trang phụ kiện")
//               )
//               .map((item: any, index: any) => (
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
