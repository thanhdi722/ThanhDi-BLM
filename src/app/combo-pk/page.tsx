import React from "react";
import ComboBaoDa from "../../components/ComponentComboPK/ComboBaoDa/page";
import ComboManHinh from "../../components/ComponentComboPK/ComboManHinh/index";
import ComboSacDuPhong from "../../components/ComponentComboPK/ComboSacDuPhong/page";
import ComboLoaTaiNghe from "../../components/ComponentComboPK/ComboLoaTaiNghe/page";
import ComboCocCapSac from "../../components/ComponentComboPK/CpmboCocCapSac/page";
import ComboDoChoiPhuKien from "../../components/ComponentComboPK/ComboDoChoiPhuKien/page";
import ComboIPhone15 from "../../components/ComponentComboPK/ComboIPhone15/ComboIPhone15";
import ComboIPhone16 from "../../components/ComponentComboPK/ComboIPhone16/ComboIPhone16";
import Banner from "../../components/ComponentComboPK/banner/index";
import BannerSlide from "../../components/ComponentComboPK/banner-slide/index";
export default function PageComboPk() {
  return (
    <div>
      <Banner />
      <BannerSlide />
      <ComboIPhone16 />
      <ComboIPhone15 />
      <ComboBaoDa />
      <ComboManHinh />
      <ComboSacDuPhong />
      <ComboLoaTaiNghe />
      <ComboCocCapSac />
      <ComboDoChoiPhuKien />
    </div>
  );
}
