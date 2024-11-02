"use client";
import React, { useEffect, useState } from "react";
import Banner from "../../components/flash-sale-tuan/banner/index";
import ProductList from "../../components/flash-sale-tuan/product/index";
import AppleList from "../../components/flash-sale-tuan/apple/index";
import ProductPercent from "../../components/flash-sale-tuan/99percent/index";
import AndroidList from "../../components/flash-sale-tuan/android/index";
import LaptopList from "../../components/flash-sale-tuan/laptop/index";
import ToyList from "../../components/flash-sale-tuan/toy/index";
import Rules from "../../components/flash-sale-tuan/rules/index";
import AccessoriesList from "../../components/flash-sale-tuan/accessories";
import BodyHallowween from "../../components/flash-sale-tuan/HeaderHalloween/HeaderHalloween";
import IpadList from "../../components/flash-sale-tuan/ipad";
import "./flash-sale-tuan.scss";
import ic1 from "../../../public/flase-sale/imagefl1.png";
import ic2 from "../../../public/flase-sale/imagefl2.png";

import Image from "next/image";

function Page() {
  return (
    <div className="page-flase-sale-tuan">
      {/* <Banner /> */}
      <BodyHallowween />
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
      <div className="item-watch">
        <AndroidList />
      </div>
      <div id="item-toy">
        <ToyList />
      </div>
      <div id="item-rules">
        <Rules />
      </div>
    </div>
  );
}

export default Page;
