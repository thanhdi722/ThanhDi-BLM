/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./CardProduct.css";
import iconconhang from "../../../../public/ic-shipped.png";
import Image from "next/image";
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
function CardProduct({ name, price_range }: Omit<Product, "id">) {
  return (
    <div className="CardProductProductWarehouseDischarge">
      <div
        className="product__title-WarehouseDischarge"
        style={{ textDecoration: "none" }}
      >
        {name}
      </div>
      <div
        className="product__groupPrice"
        style={{ background: "0", textAlign: "center" }}
      >
        <span className="product__price">Giá: </span>
        <span className="product__priceSpecial">
          {price_range.minimum_price.final_price.value.toLocaleString()}{" "}
          {price_range.minimum_price.final_price.currency}
        </span>
      </div>
      <button
        style={{
          padding: "10px 20px",
          border: "1px solid red",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          margin: "0px auto 20px auto ",
        }}
      >
        Đặt hàng
      </button>
    </div>
  );
}

export default CardProduct;
