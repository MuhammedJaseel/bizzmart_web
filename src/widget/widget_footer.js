import React from "react";
import "../style/zft.css";

export default function WidgetFooterSubmit({ isEdit }) {
  return (
    <div className="zftA">
      {isEdit ? <div className="zftAa">DELETE PRODECT</div> : <div />}
      <div className="zftAb">
        <div className="zftAbA">CANCEL</div>
        <button type="submit" className="zftAbB">
          SAVE
        </button>
      </div>
    </div>
  );
}
