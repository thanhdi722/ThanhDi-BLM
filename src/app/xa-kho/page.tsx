import React from "react";
import Banner from "../../components/ComponentXaKho/Banner/page";
import Header from "../../components/ComponentXaKho/Header/page";
import Body from "../../components/ComponentXaKho/Body/page";
import CardProductAccessory from "../../components/ComponentXaKho/ProductAccessory/ProductAccessory";
import AccessoriesList from "../../components/ComponentXaKho/accessories/index";
import ProductIPhone from "../../components/ComponentXaKho/ProductIPhone/ProductIPhone";
function page() {
  return (
    <div>
      <Banner />
      {/* <Header /> */}
      <Body />
      <ProductIPhone />
      <AccessoriesList />
      <CardProductAccessory />
    </div>
  );
}

export default page;
