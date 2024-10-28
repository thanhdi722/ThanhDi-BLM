"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "../CardProduct/CardProduct";
import Image from "next/image";
import { Spin } from "antd"; // Import Spin from Ant Design
import ModalForm from "../ModalInfo/ModalInfo"; // Import ModalForm component
import "./ProductIPhone.scss";
import noProducts from "../../../../public/img-no-pro-matching.webp";
interface ProductItem {
  name: string;
  price: number;
  id: string;
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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State to manage modal visibility
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  ); // State to hold selected product

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching data
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxuvoT7Q9AbBQ11hDEHoAnGZ7qjAYvNmzz6s6hou6QT4krSKYZnPOBk_5XsconFLUdCGQ/exec?id=mayxakho"
      );
      const data = await response.json();

      // Filter to only include iPhones with IDs starting with "CTX"
      const filteredIPhones = data.filter(
        (product: Product) =>
          product.loaisp === "iPhone" && product?.item?.id.startsWith("CTX")
      );

      setFilteredProducts(filteredIPhones); // Update state with filtered products
      setLoading(false); // Set loading to false after data is fetched

      // Thiết lập activeTab thành loaisp đầu tiên nếu có sản phẩm
      if (filteredIPhones.length > 0) {
        setActiveTab(filteredIPhones[0].loaisp);
      }
      console.log("Filtered iPhones:", data);
      return filteredIPhones;
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

  // Hàm để mở modal
  const handleOpenModal = (product: ProductItem) => {
    setSelectedProduct(product); // Set the selected product
    setIsModalVisible(true);
  };

  // Hàm để đóng modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  console.log("dataasssssssssss", displayedProducts);
  return (
    <div style={{ padding: "20px 0px", backgroundColor: "#D5B487" }}>
      <div className="container">
        <div className="ProductIPhone-Section5-Container">
          <div>
            <div style={{ paddingBottom: "10px" }}>
              <h2 className="title-table-combo-pk">
                Phụ kiện xả kho giảm đến xx%
              </h2>
            </div>
            {/* <div
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
            </div> */}
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
                  <div
                    onClick={() => handleOpenModal(product.item)} // Pass product.item to the modal
                    key={`${product.item.name}-${index}`}
                  >
                    <CardProduct
                      name={product.item.name}
                      price1={product.item.price}
                    />
                  </div>
                ))}
              </div>
              {displayedProducts.length < filteredByTab.length && (
                <button onClick={handleSeeMore} className="btn-see-more">
                  Xem thêm
                </button>
              )}
              {/* <ModalForm
                visible={isModalVisible}
                onCancel={handleCloseModal}
                product={selectedProduct}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProductAccessory;
