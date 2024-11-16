"use client";
import React, { useEffect } from "react";
import Banner from "../../components/ComponentBlackFriday/Banner/Banner";
import Image from "next/image";
import AppleList from "../../components/ComponentBlackFriday/apple/index";
import ProductPercent from "../../components/ComponentBlackFriday/99percent/index";
import AndroidList from "../../components/ComponentBlackFriday/android/index";
import LaptopList from "../../components/ComponentBlackFriday/laptop/index";
import ToyList from "../../components/ComponentBlackFriday/toy/index";
import IpadList from "../../components/ComponentBlackFriday/ipad";
import imgRocket from "../../../public/black-friday/GIF.gif";
import img from "../../../public/black-friday/bacground.png";
import "./style.scss";

export default function Page() {
  return (
    <div
      className="page-20-11"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      <Image className="background-home-black-friday" src={img} alt="" />
      {/* <div className="rocket">
        <Image className="rocket-fly shake" src={imgRocket} alt="" />
      </div> */}
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
