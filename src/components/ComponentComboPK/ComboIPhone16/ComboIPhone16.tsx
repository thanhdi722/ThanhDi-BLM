"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./ComboIPhone16.scss";
import images1 from "../../../../public/combo-01-16.png";
import images2 from "../../../../public/combo-02-16.png";
import images3 from "../../../../public/combo-03-16.png";
import images4 from "../../../../public/combo-04-16.png";
import ModalCombo161 from "../ModalCombo/ModalCombo161";

const ComboIPhone16: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);

  const images = [images1, images2, images3, images4];
  const combos = [
    { combo: "COMBO GIÁNG SINH 1", persen: "40%", image: images1 },
    { combo: "COMBO GIÁNG SINH 2", persen: "60%", image: images2 },
    { combo: "COMBO GIÁNG SINH 3", persen: "50%", image: images3 },
    { combo: "COMBO GIÁNG SINH 4", persen: "40%", image: images4 },
  ];

  const handleComboClick = (combo: any) => {
    setSelectedCombo(combo);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="banner-slide">
        <div className="container">
          <div className="banner-slide-combo">
            {combos.map((combo, index) => (
              <div
                key={index}
                className="banner-slide-combo-wrap"
                onClick={() => handleComboClick(combo)}
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
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalCombo161
          visible={isModalOpen}
          selectedCombo={selectedCombo}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ComboIPhone16;
