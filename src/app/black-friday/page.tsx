import React from "react";
import Banner from "../../components/ComponentBlackFriday/Banner/Banner";
import Image from "next/image";
import AppleList from "../../components/ComponentBlackFriday/apple/index";
import ProductPercent from "../../components/ComponentBlackFriday/99percent/index";
import AndroidList from "../../components/ComponentBlackFriday/android/index";
import LaptopList from "../../components/ComponentBlackFriday/laptop/index";
import ToyList from "../../components/ComponentBlackFriday/toy/index";
import IpadList from "../../components/ComponentBlackFriday/ipad";
import img from "../../../public/2011/giay.png";
import "./style.scss";
export default function page() {
  return (
    <div
      className="page-20-11"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {/* <Image className="book" src={img} alt="" />
      <Image className="book2" src={img} alt="" /> */}

      {/* <div id="item-hot">
        <ProductList />
      </div> */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div>
          <Banner />
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
      </div>
    </div>
  );
}
