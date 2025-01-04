"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./ComboIPhone16.scss";
import images1 from "../../../../public/combopk04012025.png";
import images2 from "../../../../public/combopk04012025222.png";
import images3 from "../../../../public/combopk04012025222333333.png";
import images4 from "../../../../public/combopk040120252223333334444444444.png";
import ModalCombo161 from "../ModalCombo/ModalCombo161";
import ModalCombo162 from "../ModalCombo/ModalCombo162";
import { useProductCombo161 } from "../hook/ComboPK/Modal/ModalCombo161/ModalCombo161";
import { useProductCombo161V2 } from "../hook/ComboPK/Modal/ModalCombo161/ModalCombo161";
import { useProductCombo161V3 } from "../hook/ComboPK/Modal/ModalCombo161/ModalCombo161";
import { useProductCombo162 } from "../hook/ComboPK/Modal/ModalCombo162/ModalCombo162";
import { useProductCombo162V2 } from "../hook/ComboPK/Modal/ModalCombo162/ModalCombo162";
import { useProductCombo162V3 } from "../hook/ComboPK/Modal/ModalCombo162/ModalCombo162";
import { useProductCombo163 } from "../hook/ComboPK/Modal/ModalCombo163/ModalCombo163";
import { useProductCombo163V2 } from "../hook/ComboPK/Modal/ModalCombo163/ModalCombo163";
import { useProductCombo163V3 } from "../hook/ComboPK/Modal/ModalCombo163/ModalCombo163";
import { useProductCombo163V4 } from "../hook/ComboPK/Modal/ModalCombo163/ModalCombo163";
import { useProductCombo164 } from "../hook/ComboPK/Modal/ModalCombo164/ModalCombo164";
import { useProductCombo164V2 } from "../hook/ComboPK/Modal/ModalCombo164/ModalCombo164";
import { useProductCombo164V3 } from "../hook/ComboPK/Modal/ModalCombo164/ModalCombo164";
import { useProductCombo164V4 } from "../hook/ComboPK/Modal/ModalCombo164/ModalCombo164";
import ModalCombo164 from "../ModalCombo/ModalCombo164";
import ModalCombo163 from "../ModalCombo/ModalCombo163";

const ComboIPhone16: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenV2, setIsModalOpenV2] = useState(false);
  const [isModalOpenV3, setIsModalOpenV3] = useState(false);
  const [isModalOpenV4, setIsModalOpenV4] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const { data: dataCombo1v1 } = useProductCombo161();
  const { data: dataCombo1v2 } = useProductCombo161V2();
  const { data: dataCombo1v3 } = useProductCombo161V3();
  const { data: dataCombo2v1 } = useProductCombo162();
  const { data: dataCombo2v2 } = useProductCombo162V2();
  const { data: dataCombo2v3 } = useProductCombo162V3();
  const { data: dataCombo3v1 } = useProductCombo163();
  const { data: dataCombo3v2 } = useProductCombo163V2();
  const { data: dataCombo3v3 } = useProductCombo163V3();
  const { data: dataCombo3v4 } = useProductCombo163V4();
  const { data: dataCombo4v1 } = useProductCombo164();
  const { data: dataCombo4v2 } = useProductCombo164V2();
  const { data: dataCombo4v3 } = useProductCombo164V3();
  const { data: dataCombo4v4 } = useProductCombo164V4();

  const images = [images1, images2, images3, images4];
  const combos = [
    { combo: "COMBO ĐÓN TẾT 1", persen: "40%", image: images1, price: 960000 },
    { combo: "COMBO ĐÓN TẾT 2", persen: "60%", image: images2, price: 1160000 },
    { combo: "COMBO ĐÓN TẾT 3", persen: "50%", image: images3, price: 1260000 },
    { combo: "COMBO ĐÓN TẾT 4", persen: "40%", image: images4, price: 1460000 },
  ];

  const handleComboClick = (combo: any, index: any) => {
    setSelectedCombo(combo);
    if (index === 0) {
      setIsModalOpen(true);
      setIsModalOpenV2(false);
    } else if (index === 1) {
      setIsModalOpen(false);
      setIsModalOpenV2(true);
    } else if (index === 2) {
      setIsModalOpen(false);
      setIsModalOpenV3(true);
      setIsModalOpenV2(false);
    } else if (index === 3) {
      setIsModalOpen(false);
      setIsModalOpenV3(false);
      setIsModalOpenV2(false);
      setIsModalOpenV4(true);
    } else {
      setIsModalOpen(false);
      setIsModalOpenV3(false);
      setIsModalOpenV2(false);
      setIsModalOpenV4(false);
    }
  };

  return (
    <>
      <div className="banner-slide">
        <div className="container">
          <h1 className="title-combo-16">COMBO PHỤ KIỆN IPHONE 16 SERIES</h1>
          <div className="banner-slide-combo">
            {combos.map((combo, index) => (
              <div
                key={index}
                className="banner-slide-combo-wrap"
                onClick={() => handleComboClick(combo, index)}
                style={{ position: "relative" }}
              >
                <div className="banner-slide-combo-card">
                  <div className="banner-slide-combo-header">
                    <div className="combo-txt">
                      <span>-{combo.persen}</span>
                    </div>
                  </div>
                  <div className="banner-slide-combo-button">{combo.combo}</div>
                  <Image
                    src={combo.image}
                    width={400}
                    height={400}
                    alt={combo.combo}
                    className="banner-slide-combo-image"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="combo-price-txt">
                    {combo.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalCombo161
          dataCombo1v1={dataCombo1v1}
          dataCombo1v2={dataCombo1v2}
          dataCombo1v3={dataCombo1v3}
          visible={isModalOpen}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpenV2 && (
        <ModalCombo162
          dataCombo2v1={dataCombo2v1}
          dataCombo2v2={dataCombo2v2}
          dataCombo2v3={dataCombo2v3}
          visible={isModalOpenV2}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpenV2(false)}
        />
      )}
      {isModalOpenV3 && (
        <ModalCombo163
          dataCombo3v1={dataCombo3v1}
          dataCombo3v2={dataCombo3v2}
          dataCombo3v3={dataCombo3v3}
          dataCombo3v4={dataCombo3v4}
          visible={isModalOpenV3}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpenV3(false)}
        />
      )}
      {isModalOpenV4 && (
        <ModalCombo164
          dataCombo4v1={dataCombo4v1}
          dataCombo4v2={dataCombo4v2}
          dataCombo4v3={dataCombo4v3}
          dataCombo4v4={dataCombo4v4}
          visible={isModalOpenV4}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpenV4(false)}
        />
      )}
    </>
  );
};

export default ComboIPhone16;
