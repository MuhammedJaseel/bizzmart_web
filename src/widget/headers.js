import React from "react";
import "../style/hd.css";

export function Header1({ title, bodyL, bodyR }) {
  return (
    <div className="hdA">
      <div className="hdAa">
        <div className="hdAb">{title}</div>
        {bodyL}
      </div>
      {bodyR}
    </div>
  );
}
