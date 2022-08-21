import React, { StrictMode, useState } from "react";
import { WidgetPopUp1, WidgetPopUp2Body } from "./widget_popup";

export function HomeInventoryPopups({ state, setState }) {
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

export function HomeInventoryModifersPopup({ state, setState }) {
  const { isModifer, error, allProduct, product } = state;
  const [values, setValues] = useState([]);
  const value = { title: allProduct[0]?.name, charge: "" };
  if (!isModifer) return null;

  const props = {
    close: () => {
      setState({ isModifer: false, error: null });
      setValues([]);
    },
    title: "Add Modifier",
    desc: "Add or Edit modifier for the secected product",
    error,
    submit: (e) => {
      for (let i = 0; i < values.length; i++) {
        if (values[i].charge !== "")
          if (values[i].charge < 0) setState({ error: "Not a valid charge" });
        return 0;
      }
      product.product_modifier = product.product_modifier.concat(values);
      setState({ product, isModifer: false });
      setValues([]);
    },
    onChnage: (e) => (value[e.target.id] = e.target.value),
  };
  return (
    <WidgetPopUp1 props={props}>
      <WidgetPopUp2Body>
        <div className="hinDj">
          <div className="hinDjA">Add Modifier*</div>
          <div className="hinDjB">Charge</div>
        </div>
        <div className="hinDj">
          <select className="hinDjA" id="title">
            {allProduct.map((it, k) => (
              <option value={it.name}>{it.name}</option>
            ))}
          </select>
          <input className="hinDjB" id="charge" type="number" />
          <div
            className="hinDjD"
            onClick={() => setValues(values.concat([value]))}
          />
        </div>
        <div className="hinDj1">
          {values.length !== 0
            ? values?.map((it, k) => (
                <div className="hinDaHa" key={k}>
                  {it.title}
                  <div className="hinDaHb">{it.charge}</div>
                  <div
                    className="hinDaHc"
                    onClick={() =>
                      setValues(values.filter((item, k1) => k !== k1))
                    }
                  />
                </div>
              ))
            : null}
        </div>
      </WidgetPopUp2Body>
    </WidgetPopUp1>
  );
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
