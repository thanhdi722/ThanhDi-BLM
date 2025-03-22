import React, { useEffect } from "react";
import "./tank.scss";

function Tanks() {


  return (
    <div className="component-tank">
      <div className="gate">
        <img
          src="https://img.upanh.tv/2025/03/21/Green-Black-Army-War-Machine-Blank-Pages-Border-A4-Document-1.png"
          alt="Green-Black-Army-War-Machine-Blank-Pages-Border-A4-Document-1.png"
        />
      </div>
      <div className="tank" id="tank">
        <div className="turret">
          <div className="gun"></div>
          <div className="bullet"></div>
          <div className="explosion"></div>
        </div>
        <div className="body">
          <div className="glow"></div>
        </div>
        <div className="track" id="turret">
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
          <div className="wheel"></div>
        </div>
        <div className="wind">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="ground">
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
        <div className="rocks"></div>
      </div>
    </div>
  );
}

export default Tanks;
