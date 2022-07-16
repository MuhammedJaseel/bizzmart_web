import React, { StrictMode } from "react";
import { WidgetPopUp1 } from "./widget_popup";

export default function HomeInventoryPopups({ state, setState }) {
  const { popup } = state;
  if (popup === null) return null;
  const props = {
    close: () => setState({ popup: null }),
    title: popup.title,
    desc: popup.desc,
  };
  return <WidgetPopUp1 props={props} />;
  // (
  //   <div className="hinF">
  //     <InventoryAssetPopup1 state={state} setState={setState} />
  //     <InventoryAssetPopup2 state={state} setState={setState} />
  //   </div>
  // );
}

function InventoryAssetPopup1({ state, setState }) {
  const { popup } = state;
  if (popup !== "assetTransfer") return null;
  return <StrictMode> jkjkj</StrictMode>;
}
function InventoryAssetPopup2({ state, setState }) {
  const { popup } = state;
  if (popup !== "assetWriteOff") return null;
  return <StrictMode></StrictMode>;
}
