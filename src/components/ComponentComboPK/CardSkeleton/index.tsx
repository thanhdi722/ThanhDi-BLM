import Skeleton from "antd/es/skeleton";
import React from "react";

function index() {
  return (
    <div>
      <div className="upgrade">
        <div style={{ textDecoration: "none", color: "black" }}>
          <div className="upgrade-item">
            <div className="upgrade-item-header"></div>
            <div className="upgrade-item-img">
              <div className="img-content">
                <Skeleton.Input active />
              </div>
              <div className="frame-product">
                <Skeleton.Input active />
              </div>
            </div>
            <div className="upgrade-item-content">
              <h4 className="upgrade-item-content-tt">
                <Skeleton.Input active />
              </h4>
              <div className="upgrade-item-content-body">
                <div className="upgrade-item-content-body-price">
                  <Skeleton.Input active />
                </div>
                <div className="upgrade-item-content-body-reduced">
                  <div className="price-reduced">
                    <Skeleton.Input active />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
