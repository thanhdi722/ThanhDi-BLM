"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "../CardProduct/CardProduct";
import Image from "next/image";
import { Spin } from "antd"; // Import Spin from Ant Design
import "./ProductAccessory.scss";
import noProducts from "../../../../public/img-no-pro-matching.webp";
interface ProductItem {
  name: string;
  price1: number;
}

interface Product {
  loaisp: string; // Loại sản phẩm
  item: ProductItem; // Thông tin sản phẩm
}
function CardProductAccessory() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>(""); // Khởi tạo activeTab rỗng
  const [visibleCount, setVisibleCount] = useState<number>(15); // Số sản phẩm hiển thị
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxuvoT7Q9AbBQ11hDEHoAnGZ7qjAYvNmzz6s6hou6QT4krSKYZnPOBk_5XsconFLUdCGQ/exec"
      );
      const data = await response.json();
      setFilteredProducts(data);
      setLoading(false); // Set loading to false after data is fetched

      // Thiết lập activeTab thành loaisp đầu tiên nếu có sản phẩm
      if (data.length > 0) {
        setActiveTab(data[0].loaisp);
      }

      return data;
    };

    fetchData();
  }, []);

  // Lấy danh sách các loại sản phẩm duy nhất và di chuyển "Khác" xuống cuối
  const uniqueLoaisp = Array.from(
    new Set(filteredProducts.map((product) => product.loaisp))
  ).sort((a, b) => (a === "Khác" ? 1 : 0)); // Đưa "Khác" xuống cuối

  // Lọc sản phẩm theo activeTab
  const filteredByTab = filteredProducts.filter(
    (product) => product.loaisp === activeTab
  );

  // Xác định sản phẩm hiển thị
  const displayedProducts = filteredByTab.slice(0, visibleCount);

  // Hàm để xem thêm sản phẩm
  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 15); // Tăng số sản phẩm hiển thị lên 10
  };

  // Hàm để thu gọn sản phẩm
  const handleSeeLess = () => {
    setVisibleCount(10); // Đặt lại số sản phẩm hiển thị về 10
  };

  // Update activeTab and reset visibleCount
  const handleTabChange = (loaisp: string) => {
    setActiveTab(loaisp);
    setVisibleCount(15); // Reset visibleCount to 15 when changing tab
  };

  console.log("activeTab:", activeTab); // Log giá trị activeTab
  console.log("filteredProducts:", filteredProducts); // Log sản phẩm đã lọc
  return (
    <div>
      <div className="container">
        <div className="warehouse-discharge-Section5-Container">
          <div>
            <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">Máy xả kho giảm đến 99%</h2>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                paddingBottom: "10px",
                justifyContent: "center",
              }}
            >
              {uniqueLoaisp.map(
                (
                  loaisp // Tạo nút tab cho mỗi loaisp
                ) => (
                  <button
                    key={loaisp}
                    className={`btn-tab-warehouse-discharge ${
                      activeTab === loaisp
                        ? "btn-tab-warehouse-discharge_active"
                        : ""
                    }`}
                    onClick={() => handleTabChange(loaisp)}
                  >
                    {`${loaisp}`}
                  </button>
                )
              )}
            </div>
          </div>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <Spin size="large" />
            </div>
          ) : displayedProducts.length === 0 ? (
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
              <div className="warehouse-discharge-Section5-ItemSlider">
                {displayedProducts.map((product, index) => (
                  <CardProduct
                    key={`${product.item.name}-${index}`}
                    name={product.item.name}
                    price1={product.item.price1}
                  />
                ))}
              </div>
              {displayedProducts.length < filteredByTab.length ? (
                <button onClick={handleSeeMore} className="btn-see-more">
                  Xem thêm
                </button> // Nút xem thêm
              ) : (
                <button onClick={handleSeeLess} className="btn-see-more">
                  Thu gọn
                </button> // Nút thu gọn
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProductAccessory;
