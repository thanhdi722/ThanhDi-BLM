import React from "react";
import ComboBaoDa from "../../components/ComponentComboPK/ComboBaoDa/page";
import ComboManHinh from "../../components/ComponentComboPK/ComboManHinh/index";
import ComboSacDuPhong from "../../components/ComponentComboPK/ComboSacDuPhong/page";
import ComboLoaTaiNghe from "../../components/ComponentComboPK/ComboLoaTaiNghe/page";
import ComboCocCapSac from "../../components/ComponentComboPK/CpmboCocCapSac/page";
import ComboDoChoiPhuKien from "../../components/ComponentComboPK/ComboDoChoiPhuKien/page";
export default function PageComboPk() {
  return (
    <div>
      <h1>Combo PK</h1>
      <ComboBaoDa />
      <ComboManHinh />
      <ComboSacDuPhong />
      <ComboLoaTaiNghe />
      <ComboCocCapSac />
      <ComboDoChoiPhuKien />
    </div>
  );
}
