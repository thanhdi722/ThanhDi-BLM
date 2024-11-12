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
import img from "../../../public/2011/giay.png";
import "./style.scss";

export default function Page() {
  useEffect(() => {
    for (let i = 0; i < 400; i++) {
      let star = document.createElement("div");
      star.classList.add("star");

      let size = Math.random() * 2.6 + 1;
      //   -----------------------------------------------------------------------
      star.style.top = Math.random() * document.body.scrollHeight + "px";
      star.style.left = Math.random() * document.body.scrollWidth + "px";
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.opacity = Math.random().toString();
      //   -----------------------------------------------------------------------

      star.style.animation = "moveit 2.5s infinite";

      let delayValue = Math.random() * 4;
      star.style.animationDelay = delayValue + "s";

      document.body.appendChild(star);
    }
  }, []);

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
