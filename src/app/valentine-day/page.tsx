import React from "react";
import Banner from "../../components/ComponentValentine/banner";
import Product1 from "../../components/ComponentValentine/apple";
import Product2 from "../../components/ComponentValentine/ipad";
import Product3 from "../../components/ComponentValentine/macbook";
import Product4 from "../../components/ComponentValentine/watch";
import Product5 from "../../components/ComponentValentine/phukien";
function ValentineDay() {
  return (
    <div style={{ background: "#ffe0e6" }}>
      <Banner />
      <Product1/>
      <Product2/>
      <Product3/>
      <Product4/>
      <Product5/>
    </div>
  );
}

export default ValentineDay;
