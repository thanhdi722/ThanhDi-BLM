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
import Rules2 from "../../components/ComponentTeacherDay/rules2/index";
import imgBackground from "../../../public/2011/bacground.png";
import IpadList from "../../components/ComponentTeacherDay/ipad";
import img from "../../../public/2011/giay.png";
import "./style.scss";
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
      <Image className="book" src={img} alt="" />
      <Image className="book2" src={img} alt="" />

      {/* <div id="item-hot">
        <ProductList />
      </div> */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div className="leaf">
          <div>
            <img
              src="http://www.pngmart.com/files/1/Fall-Autumn-Leaves-Transparent-PNG.png"
              height="75px"
              width="75px"
              alt="fall leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Pictures-Collage-PNG.png"
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Clip-Art-PNG.png"
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png"
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Transparent-Autumn-Leaves-Falling-PNG.png"
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png"
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png"
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
        </div>

        <div className="leaf leaf1">
          <div>
            <img
              src="http://www.pngmart.com/files/1/Fall-Autumn-Leaves-Transparent-PNG.png"
              height="75px"
              width="75px"
              alt="fall leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Pictures-Collage-PNG.png"
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Clip-Art-PNG.png"
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png"
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Transparent-Autumn-Leaves-Falling-PNG.png"
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png"
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png"
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
        </div>

        <div className="leaf leaf2">
          <div>
            <img
              src="http://www.pngmart.com/files/1/Fall-Autumn-Leaves-Transparent-PNG.png"
              height="75px"
              width="75px"
              alt="fall leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Pictures-Collage-PNG.png"
              height="75px"
              width="75px"
              alt="autumn leaves collage"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Autumn-Fall-Leaves-Clip-Art-PNG.png"
              height="75px"
              width="75px"
              alt="fall leaves clip art"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Green-Leaves-PNG-File.png"
              height="75px"
              width="75px"
              alt="green leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Transparent-Autumn-Leaves-Falling-PNG.png"
              height="75px"
              width="75px"
              alt="falling autumn leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png"
              height="75px"
              width="75px"
              alt="realistic fall leaves"
            />
          </div>
          <div>
            <img
              src="http://www.pngmart.com/files/1/Realistic-Autumn-Fall-Leaves-PNG.png"
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
        <div>
          <Rules />
        </div>
        <div>
          <Rules2 />
        </div>
      </div>
    </div>
  );
}
