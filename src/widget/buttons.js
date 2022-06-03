import React, { useState } from "react";
import "../style/btn.css";

export function SwitchButton1({ onTap, value }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className={value ? "btnA" : "btnA_"} onClick={onTap}>
      <div className={value ? "btnAa" : "btnAa_"} />
    </div>
  );
}

export function SelectButton1({ dis, type, setType }) {
  return (
    <div className="btnB">
      <div
        onClick={dis ? null : () => setType(0)}
        className={"btnBa" + (type === 0 ? " btnBa_" : "")}
      >
        <div className={type === 0 ? "btnBb_" : "btnBb" + (dis ? "-dis" : "")}>
          Standard Product
        </div>
        <div className="btnBc" />
        <div className={type === 0 ? " btnBd_" : "btnBd" + (dis ? "-dis" : "")}>
          This product has one SKU with its own inventory
        </div>
      </div>
      <div
        onClick={dis ? null : () => setType(1)}
        className={"btnBa" + (type === 1 ? " btnBa_" : "")}
      >
        <div className={type === 1 ? " btnBb_" : "btnBb" + (dis ? "-dis" : "")}>
          Product with Variants
        </div>
        <div className="btnBc" />
        <div className={type === 1 ? " btnBd_" : "btnBd" + (dis ? "-dis" : "")}>
          These products have different attributes, like size or flavour. Each
          variant has a unique SKU and inventory level.
        </div>
      </div>
      <div
        onClick={dis ? null : () => setType(2)}
        className={"btnBa" + (type === 2 ? " btnBa_" : "")}
      >
        <div className={type === 2 ? " btnBb_" : "btnBb" + (dis ? "-dis" : "")}>
          Composite Product
        </div>
        <div className="btnBc" />
        <div className={type === 2 ? " btnBd_" : "btnBd" + (dis ? "-dis" : "")}>
          A composite contains one or more standard products. It has one SKU but
          adjusts inventory levels for each standard product.
        </div>
      </div>
    </div>
  );
}
