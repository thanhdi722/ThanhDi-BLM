import React from "react";
import Banner from "../../components/ComponentXaKho/Banner/page";
import Header from "../../components/ComponentXaKho/Header/page";
import Body from "../../components/ComponentXaKho/Body/page";
import CardProductAccessory from "../../components/ComponentXaKho/ProductAccessory/ProductAccessory";
function page() {
  return (
    <div>
      <Banner />
      {/* <Header /> */}
      <Body />
      <CardProductAccessory />
    </div>
  );
}

export default page;
