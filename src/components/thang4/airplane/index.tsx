import React from "react";
import "./airplane.scss";
import Airplane from "../../../../public/airplane.png";
import Image from "next/image";

function airplane() {
  return (
    <div>
      <div className="component-airplane">
          <Image className="airplane-fly" src={Airplane} alt="airplane" />
      </div>
    </div>
  );
}

export default airplane;
