import React from "react";
import "../style/zft.css";

export default function WidgetFooterSubmit({ props }) {
  const { isEdit, onTap, onCancel, loading, error } = props;
  return (
    <div className="zftA">
      {isEdit ? <div className="zftAa">DELETE PRODECT</div> : <div />}
      <div className="zftAb">
        <div className="zftAbA">{error}</div>
        <div className="zftAbB" onClick={onCancel}>
          CANCEL
        </div>
        <button
          type="submit"
          className={loading ? "zftAbC_" : "zftAbC"}
          onClick={(e) => {
            e.preventDefault();
            onTap();
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
}
