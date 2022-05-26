import React, { useState } from "react";
import "../style/btn.css";

export function SwitchButton1() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="btnA">
      <div className="btnAa" />
    </div>
  );
}

export function SelectButton1() {
  const [checked, setChecked] = useState(0);
  return (
    <div className="btnB">
      <div
        onClick={() => setChecked(0)}
        className={"btnBa" + (checked === 0 ? " btnBa_" : "")}
      >
        <div className={"btnBb" + (checked === 0 ? " btnBb_" : "")}>
          Standard Product
        </div>
        <div className="btnBc" />
        <div className={"btnBd" + (checked === 0 ? " btnBd_" : "")}>
          This product has one SKU with its own inventory
        </div>
      </div>
      <div
        onClick={() => setChecked(1)}
        className={"btnBa" + (checked === 1 ? " btnBa_" : "")}
      >
        <div className={"btnBb" + (checked === 1 ? " btnBb_" : "")}>
          Product with Variants
        </div>
        <div className="btnBc" />
        <div className={"btnBd" + (checked === 1 ? " btnBd_" : "")}>
          These products have different attributes, like size or flavour. Each
          variant has a unique SKU and inventory level.
        </div>
      </div>
      <div
        onClick={() => setChecked(2)}
        className={"btnBa" + (checked === 2 ? " btnBa_" : "")}
      >
        <div className={"btnBb" + (checked === 2 ? " btnBb_" : "")}>
          Composite Product
        </div>
        <div className="btnBc" />
        <div className={"btnBd" + (checked === 2 ? " btnBd_" : "")}>
          A composite contains one or more standard products. It has one SKU but
          adjusts inventory levels for each standard product.
        </div>
      </div>
    </div>
  );
}
