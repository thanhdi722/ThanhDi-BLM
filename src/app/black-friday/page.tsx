import React from "react";
import imgBackground from "../../../public/black-friday/bacground.png";
import Image from "next/image";
function page() {
  return (
    <div>
      <Image src={imgBackground} alt="background" />
    </div>
  );
}

export default page;
