import React from "react";
import Banner from "../../components/ComponentTeacherDay/Banner/Banner";
import Image from "next/image";
import ProductList from "../../components/ComponentTeacherDay/product/index";
import AppleList from "../../components/ComponentTeacherDay/apple/index";
import ProductPercent from "../../components/ComponentTeacherDay/99percent/index";
import AndroidList from "../../components/ComponentTeacherDay/android/index";
import LaptopList from "../../components/ComponentTeacherDay/laptop/index";
import ToyList from "../../components/ComponentTeacherDay/toy/index";
import Rules from "../../components/ComponentTeacherDay/rules/index";
import imgBackground from "../../../public/2011/BR.webp";
import IpadList from "../../components/ComponentTeacherDay/ipad";
export default function page() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#D1BB99",
      }}
    >
      {/* <Image
        src={imgBackground}
        alt=""
        style={{ position: "absolute", zIndex: "-1" }}
      /> */}
      <div>
        <Banner />
      </div>
      <div id="item-hot">
        <ProductList />
      </div>
      <div id="item-iphone">
        <AppleList />
      </div>
      <div id="item-airpods">
        <ProductPercent />
      </div>
      <div id="item-ipad">
        <IpadList />
      </div>
      <div id="item-mac">
        <LaptopList />
      </div>
      <div id="item-android">
        <AndroidList />
      </div>
      <div id="item-toy">
        <ToyList />
      </div>
      <div>
        <Rules />
      </div>
    </div>
  );
}
