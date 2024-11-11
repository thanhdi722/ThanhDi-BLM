import React from "react";
import Banner from "../../components/ComponentTeacherDay/Banner/Banner";
import Image from "next/image";
import ProductList from "../../components/ComponentTeacherDay/product/index";
import AppleList from "../../components/ComponentTeacherDay/apple/index";
import ProductPercent from "../../components/ComponentTeacherDay/99percent/index";
import AndroidList from "../../components/ComponentTeacherDay/android/index";
import LaptopList from "../../components/ComponentTeacherDay/laptop/index";
import ToyList from "../../components/ComponentTeacherDay/toy/index";
import IpadList from "../../components/ComponentTeacherDay/ipad";
import img from "../../../public/2011/giay.png";
import "./style.scss";
import img10 from "../../../public/2011/10.png";
import img11 from "../../../public/2011/11.png";
import img12 from "../../../public/2011/12.png";
import img13 from "../../../public/2011/13.png";
import img14 from "../../../public/2011/14.png";

export default function page() {
  return (
    <div
      className="page-20-11"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#D1BB99",
      }}
    >
      {/* <Image className="book" src={img} alt="" />
      <Image className="book2" src={img} alt="" /> */}

      {/* <div id="item-hot">
        <ProductList />
      </div> */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* <div className="leaf">
          <div>
            <img src={img10.src} height="75px" width="75px" alt="fall leaves" />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src={img12.src}
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src={img13.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
        </div> */}

        <div className="leaf leaf1">
          <div>
            <img src={img12.src} height="75px" width="75px" alt="fall leaves" />
          </div>
          <div>
            <img
              src={img13.src}
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
        </div>

        <div className="leaf leaf2">
          <div>
            <img src={img12.src} height="75px" width="75px" alt="fall leaves" />
          </div>
          <div>
            <img
              src={img13.src}
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src={img14.src}
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src={img10.src}
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src={img11.src}
              height="75px"
              width="75px"
              alt="autumn leaves"
            />
          </div>
        </div>
        {/* <Image
          src={imgBackground}
          alt=""
          style={{ position: "absolute", zIndex: "" }}
        /> */}
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
