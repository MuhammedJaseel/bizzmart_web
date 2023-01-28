import React, { StrictMode, useState } from "react";
import "../style/zft.css";
import { WidgetPopUp1 } from "./widget_popup";

export default function WidgetFooterSubmit({ props }) {
  const { isEdit, onTap, onCancel, loading, error, onDelete } = props;
  const popupProps1 = {
    close: () => setisDelete(false),
    title: "Confirm Delete",
    desc: `Are you sure you want to deleate this item`,
    error,
    loading,
    submit: onDelete,
    btnTitle: "CONFIRM",
    small: true,
  };
  const [isDelete, setisDelete] = useState(false);
  return (
    <StrictMode>
      <div className="zftA">
        {isEdit ? (
          <div className="zftAa" onClick={() => setisDelete(true)}>
            DELETE PRODECT
          </div>
        ) : (
          <div />
        )}
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
      {isDelete ? <WidgetPopUp1 props={popupProps1}></WidgetPopUp1> : null}
    </StrictMode>
  );
}
