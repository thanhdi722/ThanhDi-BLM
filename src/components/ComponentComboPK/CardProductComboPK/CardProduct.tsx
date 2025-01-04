/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./CardProduct.scss";
import iconconhang from "../../../../public/ic-shipped.png";
import Image from "next/image";
import Link from "next/link";
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
function CardProduct({
  name,
  url_key,
  image,
  price_range,
}: Omit<Product, "id">) {
  return (
    <div className="upgrade">
      <Link
        href={`https://bachlongmobile.com/products/${url_key}`}
        passHref
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="upgrade-item">
          <div className="upgrade-item-header">
            <span className="percent">
              -
              {Math.round(
                ((price_range?.minimum_price?.final_price?.value +
                  500000 -
                  price_range?.minimum_price?.final_price?.value) /
                  (price_range?.minimum_price?.final_price?.value + 500000)) *
                  100
              )}
              %
            </span>
            {/* {(activeTab === "iPhone" || activeTab === "NONP") && (
                  <Image className="ic-auth" src={DecorWomen} alt="" />
                )} */}
          </div>
          <div className="upgrade-item-img">
            <div className="img-content">
              <Image
                src={image?.url}
                width={1400}
                height={1200}
                quality={100}
                alt={name}
              />
            </div>
            <div className="frame-product">
              {/* <Image
                  src={
                    activeTab === 'iPhone'
                      ? product?.product?.name.includes('16')
                        ? FrameProduct
                        : FrameProduct1
                      : activeTab === 'NONP'
                        ? FrameProduct3
                        : FrameProduct2
                  }
                  width={500}
                  height={500}
                  quality={100}
                  alt="frame-product"
                /> */}
            </div>
          </div>
          <div className="upgrade-item-content">
            <h4 className="upgrade-item-content-tt">{name}</h4>
            <div className="upgrade-item-content-body">
              <div className="upgrade-item-content-body-price">
                {price_range?.minimum_price?.final_price?.value?.toLocaleString(
                  "vi-VN"
                )}{" "}
                VNĐ
              </div>
              <div className="upgrade-item-content-body-reduced">
                <div className="price-reduced">
                  {Number(
                    price_range?.minimum_price?.final_price?.value + 500000
                  )?.toLocaleString("vi-VN")}{" "}
                  VNĐ
                </div>
                {/* <div className="percent">
                 
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardProduct;
