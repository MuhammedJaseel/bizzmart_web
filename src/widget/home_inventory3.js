import React, { StrictMode, useState } from "react";
import { WidgetPopUp1, WidgetPopUp2Body } from "./widget_popup";

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
    onChange: (e) => (value[e.target.id] = e.target.value),
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////     INVENTORY PRODECT POPUP     ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function InventoryAddProdectPop({ state, setState }) {
  const { loading, error, addProdectPop, allProduct, product } = state;
  const { default_composites, selectable_composites } = product;
  
  var [values, setValues] = useState([]);
  if (addProdectPop === null) return null;
  
  const value = {};
  var item = { composite_name: "", selectable: 0, composites: [] };
  
  if (default_composites.length === 1 && addProdectPop === 0)
    values = default_composites[0].composites;

  if (selectable_composites.length >= addProdectPop && addProdectPop !== 0) {
    values = selectable_composites[addProdectPop - 1]?.composites;
    item = selectable_composites[addProdectPop - 1];
  }

  const body = {
    title: (
      <StrictMode>
        Add Products <span className="hinDh">iPhone 13 Bundle</span>
      </StrictMode>
    ),
    desc: "Add default products for this bundle",
    close: () => {
      setState({ addProdectPop: null });
      setValues([]);
    },
    loading,
    error,
    onChange: (e) => {
      if (e.target.id === "name" || e.target.id === "qunatity")
        if (e.target.id === "qunatity") value.qunatity = e.target.value;
        else {
          const pro = JSON.parse(e.target.value);
          value.product_id = pro.id;
          value.name = pro.name;
          value.cost = pro.cost;
          value.cost_tax = pro.cost_tax;
        }
      else item[e.target.id] = e.target.value;
    },
    submit: () => {
      if (values.length === 0) {
        setState({ error: "Add atlest one" });
        return 0;
      }
      item.composites = values;
      if (addProdectPop === 0) product.default_composites = [item];
      else product.selectable_composites[addProdectPop - 1] = item;
      setState({ product, addProdectPop: null });
      setValues([]);
    },
  };
  return (
    <WidgetPopUp1 props={body}>
      <WidgetPopUp2Body>
        {addProdectPop !== 0 ? (
          <StrictMode>
            <div className="hinDj2">
              <div className="hinDj2A">Product Group*</div>
              <div className="hinDj2A">Selectables</div>
            </div>
            <div className="hinDj2">
              <input
                className="hinDj2A"
                placeholder="Name"
                id="composite_name"
                defaultValue={item?.composite_name}
              />
              <input
                className="hinDj2A"
                type="number"
                id="selectable"
                placeholder="0.0"
                defaultValue={item?.selectable}
              />
            </div>
            <br />
          </StrictMode>
        ) : null}
        <div className="hinDj">
          <div className="hinDjA">Add Product*</div>
          <div className="hinDjB">Qty</div>
        </div>
        <div className="hinDj">
          <select className="hinDjA" id="name">
            {allProduct.map((it, k) => (
              <option key={k} value={JSON.stringify(it)}>
                {it.name}
              </option>
            ))}
          </select>
          <input className="hinDjB" id="qunatity" type="number" />
          <div
            className="hinDjD"
            onClick={() => setValues(values.concat([value]))}
          />
        </div>
        <div className="hinDj1">
          {values?.length !== 0
            ? values?.map((it, k) => (
                <div className="hinDaHa" key={k}>
                  {it.name}
                  <div className="hinDaHb">{it.qunatity}</div>
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
