import React, { StrictMode, useRef, useState } from "react";
import { inventorySearchProduct } from "../method/home_inventory";
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
var value = {};
export function InventoryAddProdectPop({ state, setState }) {
  const { loading, error, addProdectPop, allProductSearches, product } = state;

  var [values, setValues] = useState([]);
  const refForKey = useRef(null);
  const refForKey1 = useRef(null);
  if (addProdectPop === null) return null;
  const { default_composites, selectable_composites } = product;

  var item = { composite_name: "", selectable: 0, composites: [] };

  if (default_composites?.length === 1 && addProdectPop === 0)
    values = default_composites[0]?.composites;

  if (selectable_composites.length >= addProdectPop && addProdectPop !== 0) {
    values = selectable_composites[addProdectPop - 1]?.composites;
    item = selectable_composites[addProdectPop - 1];
  }

  const body = {
    title: (
      <StrictMode>
        Add Products <span className="hinDh">{product.product_name}</span>
      </StrictMode>
    ),
    desc: "Add default products for this bundle",
    loading,
    error,
    close: () => {
      setState({ addProdectPop: null, allProductSearches: [], error: null });
      setValues([]);
    },
    onChange: (e) => {
      if (e.target.id === "name")
        inventorySearchProduct(e.target.value, state, setState);
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
      setState({ product, addProdectPop: null, error: null });
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
          <input
            className="hinDjA"
            id="name"
            ref={refForKey}
            placeholder="Search your prodect here"
          />
          <input
            className="hinDjB"
            id="qunatity"
            type="number"
            placeholder="0.00"
            ref={refForKey1}
            onChange={(e) => (value = { ...value, qunatity: e.target.value })}
          />
          <div
            className="hinDjD"
            onClick={() => {
              setState({ error: null });
              if (value.name === "" || value.name === undefined) {
                setState({ error: "Not a valid Prodect" });
                return;
              }
              if (value.qunatity === "" || value.qunatity === undefined) {
                setState({ error: "Enter quantity" });
                return;
              }
              setValues(values.concat([value]));
              value = {};
              refForKey.current.value = "";
              refForKey1.current.value = "";
            }}
          />
          {allProductSearches.length !== 0 ? (
            <div className="hinDjE">
              {allProductSearches.map((it, k) => (
                <div
                  key={k}
                  className="hinDjEa"
                  onClick={() => {
                    value = { ...value, ...it };
                    value.product_id = value.id;
                    setState({ allProductSearches: [] });
                    refForKey.current.value = it.name;
                  }}
                >
                  {it.name}
                </div>
              ))}
            </div>
          ) : null}
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////     INVENTORY TOPPINGS POPUP     ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function InventoryAddToppingsPop({ state, setState }) {
  var { addToppings, loading, error, product, allToppings } = state;

  const [isDefault, setIsDefault] = useState(false);
  var charges = {};
  var topping = "";
  var selectValue = "";

  if (addToppings === null) return null;
  const body = {
    title: "Add Toppings",
    desc: "Add  toppings to your product",
    close: () => setState({ addToppings: null, error: null }),
    loading,
    error,
    onChange: (e) => {},
    submit: () => {
      if (isDefault && selectValue === "") {
        setState({ error: "Fill all the fields" });
        return;
      }
      product.classification = product.classification.concat(addToppings);
      product.selectable = selectValue;
      setState({ product, addToppings: null });
    },
  };

  const assignTopping = () => {
    if (topping === "") {
      setState({ error: "Select topping" });
      return;
    }
    for (let i = 0; i < product?.attribute1?.split(",").length; i++) {
      const el = product?.attribute1?.split(",")[i].replace(/^\s+|\s+$/gm, "");
      if (charges[el] !== "" && charges[el] !== undefined)
        addToppings.push({
          topping_id: allToppings[topping].id,
          topping_title: allToppings[topping].name,
          variant_title: el,
          cost_amount: allToppings[topping].cost_price,
          charge_amount: charges[el],
          is_default: isDefault ? 1 : 0,
        });
    }
    document.getElementById("toppingForm").reset();
    charges = {};
    selectValue = "";
    topping = "";
    setState({ addToppings });
  };

  return (
    <WidgetPopUp1 props={body}>
      <WidgetPopUp2Body>
        <div className="hinDkA">
          <form className="hinDkAa" id="toppingForm">
            <div className="hinDkAaA">
              <div className="hinDkAaAa">
                <div className="hinDkAaAaB">
                  <div className="hinDkAaAaBa">Attribute Type</div>
                  <div
                    className="hinDkAaAaBb"
                    onClick={() => setIsDefault(!isDefault)}
                  >
                    <div
                      className={!isDefault ? "hinDkAaAaBbA" : "hinDkAaAaBbA_"}
                    >
                      Default
                    </div>
                    <div
                      className={isDefault ? "hinDkAaAaBbB" : "hinDkAaAaBbA_"}
                    >
                      Optional
                    </div>
                  </div>
                </div>
                {isDefault ? (
                  <div className="hinDkAaAaC">
                    <div className="hinDkAaAaBa">Selectables</div>
                    <input
                      className="hinDkAaAaCa"
                      placeholder="0.0"
                      type="number"
                      onChange={(e) => (selectValue = e.target.value)}
                    />
                  </div>
                ) : null}
              </div>
              <div className="hinDkAaAb">
                <div className="hinDkAaAaBa">Select Classifications</div>
                <select
                  className="hinDkAaAbA"
                  onChange={(e) => (topping = e.target.value)}
                >
                  <option hidden>Select Classifications</option>
                  {allToppings.map((it, k) => (
                    <option value={k}>{it.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="hinDkAaB">
              <div className="hinDkAaBa_">
                <div className="hinDkAaBaA">Product Variant</div>
                <div className="hinDkAaBaC">Charge</div>
              </div>
              {product?.attribute1 !== ""
                ? product?.attribute1?.split(",").map((it, k) => (
                    <div className="hinDkAaBa" key={k}>
                      <div className="hinDkAaBaA">
                        &nbsp;&nbsp;&nbsp;{it.replace(/^\s+|\s+$/gm, "")}
                      </div>
                      <input
                        className="hinDkAaBaC"
                        placeholder="0.00"
                        type="number"
                        onChange={(e) =>
                          (charges[it.replace(/^\s+|\s+$/gm, "")] =
                            e.target.value)
                        }
                      />
                    </div>
                  ))
                : null}
            </div>
          </form>
          <div className="hinDkAb">
            <div
              className="hinDkAbA"
              onClick={() => {
                document.getElementById("toppingForm").reset();
                charges = {};
                selectValue = "";
                topping = "";
              }}
            >
              CLEAR
            </div>
            <div className="hinDkAbB" onClick={assignTopping}>
              ADD
            </div>
          </div>
        </div>
        <div className="hinDkB">
          {addToppings?.map((it, k) => (
            <div
              key={k}
              className={it.is_default === 1 ? "hinDaJa_g" : "hinDaJa"}
            >
              <div className="hinDaJaA">
                {it.topping_title}-{it.variant_title}
              </div>
              {it.charge_amount}
              <div
                className="hinDaJaB"
                onClick={() => {
                  addToppings?.splice(k, 1);
                  setState({ product });
                }}
              />
            </div>
          ))}
        </div>
      </WidgetPopUp2Body>
    </WidgetPopUp1>
  );
}
