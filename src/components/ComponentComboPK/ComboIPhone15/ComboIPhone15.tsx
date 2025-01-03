"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./ComboIPhone15.scss";
import images1 from "../../../../public/combo-01-15.png";
import images2 from "../../../../public/combo-02-15.png";
import images3 from "../../../../public/combo-03-15.png";
import images4 from "../../../../public/combo-04-15.png";
import ModalCombo162 from "../ModalCombo/ModalCombo162";
import ModalCombo153 from "../ModalCombo/ModalCombo153";
import ModalCombo154 from "../ModalCombo/ModalCombo154";
import ModalCombo151 from "../ModalCombo/ModalCombo151";
import ModalCombo152 from "../ModalCombo/ModalCombo152";
import { useProductCombo151 } from "../hook/ComboPK/Modal/ModalCombo151/ModalCombo151";
import { useProductCombo151V2 } from "../hook/ComboPK/Modal/ModalCombo151/ModalCombo151";
import { useProductCombo152 } from "../hook/ComboPK/Modal/ModalCombo152/ModalCombo152";
import { useProductCombo152V2 } from "../hook/ComboPK/Modal/ModalCombo152/ModalCombo152";
import { useProductCombo153 } from "../hook/ComboPK/Modal/ModalCombo153/ModalCombo153";
import { useProductCombo153V2 } from "../hook/ComboPK/Modal/ModalCombo153/ModalCombo153";
import { useProductCombo153V3 } from "../hook/ComboPK/Modal/ModalCombo153/ModalCombo153";
import { useProductCombo154 } from "../hook/ComboPK/Modal/ModalCombo154/ModalCombo154";
import { useProductCombo154V2 } from "../hook/ComboPK/Modal/ModalCombo154/ModalCombo154";
import { useProductCombo154V3 } from "../hook/ComboPK/Modal/ModalCombo154/ModalCombo154";
import { useProductCombo154V4 } from "../hook/ComboPK/Modal/ModalCombo154/ModalCombo154";

// Import modals and hooks similar to ComboIPhone16 if needed

const ComboIPhone15: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenV2, setIsModalOpenV2] = useState(false);
  const [isModalOpenV3, setIsModalOpenV3] = useState(false);
  const [isModalOpenV4, setIsModalOpenV4] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const { data: dataCombo1v1 } = useProductCombo151();
  const { data: dataCombo1v2 } = useProductCombo151V2();
  const { data: dataCombo2v1 } = useProductCombo152();
  const { data: dataCombo2v2 } = useProductCombo152V2();
  const { data: dataCombo3v1 } = useProductCombo153();
  const { data: dataCombo3v2 } = useProductCombo153V2();
  const { data: dataCombo3v3 } = useProductCombo153V3();
  const { data: dataCombo4v1 } = useProductCombo154();
  const { data: dataCombo4v2 } = useProductCombo154V2();
  const { data: dataCombo4v3 } = useProductCombo154V3();
  const { data: dataCombo4v4 } = useProductCombo154V4();

  // Define data fetching hooks similar to ComboIPhone16 if needed

  const images = [images1, images2, images3, images4];
  const combos = [
    { combo: "COMBO SIÊU RẺ 1", persen: "50%", image: images1 },
    { combo: "COMBO SIÊU RẺ 2", persen: "40%", image: images2 },
    { combo: "COMBO SIÊU RẺ 3", persen: "30%", image: images3 },
    { combo: "COMBO SIÊU RẺ 4", persen: "20%", image: images4 },
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
          <div className="banner-slide-combo15">
            {combos.map((combo, index) => (
              <div
                key={index}
                className="banner-slide-combo-wrap"
                onClick={() => handleComboClick(combo, index)}
              >
                <div key={index} className="banner-slide-combo15-wrap">
                  <div className="banner-slide-combo15-card">
                    <div className="banner-slide-combo15-button">
                      {combo.combo}
                    </div>
                    <Image
                      src={combo.image}
                      alt="banner-slide-combo15-image"
                      className="banner-slide-combo15-image"
                    />
                    <div className="banner-slide-combo15-price"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalCombo151
          dataCombo1v1={dataCombo1v1}
          dataCombo1v2={dataCombo1v2}
          visible={isModalOpen}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isModalOpenV2 && (
        <ModalCombo152
          dataCombo2v1={dataCombo2v1}
          dataCombo2v2={dataCombo2v2}
          visible={isModalOpenV2}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpenV2(false)}
        />
      )}
      {isModalOpenV3 && (
        <ModalCombo153
          dataCombo3v1={dataCombo3v1}
          dataCombo3v2={dataCombo3v2}
          dataCombo3v3={dataCombo3v3}
          visible={isModalOpenV3}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpenV3(false)}
        />
      )}
      {isModalOpenV4 && (
        <ModalCombo154
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

export default ComboIPhone15;
