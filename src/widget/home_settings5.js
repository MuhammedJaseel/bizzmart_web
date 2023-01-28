import React, { StrictMode, useState } from "react";
import {
  postKots,
  deleteKots,
  postCategory,
  updateKots,
  getMasterData,
  updateCategory,
  deleteCategory,
  updateCategoryModifier,
  postAssetCategory,
  updateAssetCategory,
  deleteAssetCategory,
  postTax,
  updateOrDeleateTax,
} from "../method/home_settings";
import { Header1 } from "./widget";
import { AddingForm1, AddingFormLayout } from "./widget_form";
import { WidgetPopUp1, WidgetPopUp2Body } from "./widget_popup";

export function HomeSettings5ExpenseCategory({ state, setState }) {
  const title = `EXPENSE CATEGORY`;
  const desc = `Add your prodect station here`;
  const { page, allKot, addKot, deleteKot, loading, error } = state;
  if (page?.path === "expenceCategories")
    return (
      <StrictMode>
        <div className="hstN">
          <AddingFormLayout title={title} desc={desc}>
            <AddingForm1 title="All Stations">
              <form onSubmit={(e) => {}}>
                <button className="hstNaA" type="submit" />
                <input
                  className="hstNaB"
                  id="stationName"
                  placeholder="Type station names separated by comma and add"
                />
              </form>
              <div className="hstNb">
                <div className="hstNbA">
                  <div className="hstNbAa">Station (Kitchen)</div>Station IP
                </div>
                {allKot.map((it, k) => (
                  <div className="hstNbB" key={k}>
                    <div className="hstNbBa">{it.title}</div>
                    <div className="hstNbBb">192.168.1.212</div>
                    <div
                      className="hstNbBc"
                      onClick={() => {
                        deleteKot.push(it.id);
                        setState({ deleteKot });
                      }}
                    />
                  </div>
                ))}
              </div>
            </AddingForm1>
          </AddingFormLayout>
        </div>
      </StrictMode>
    );
}
export function HomeSettings5ProductCategory({ state, setState }) {
  const title = `PRODUCT CATEGORIES`;
  const desc = `Add your prodect station here`;
  const { page, allCategory, allKot, loading, error } = state;
  if (page?.path === "productCategories")
    return (
      <StrictMode>
        <Header1
          title="MASTERDATA SETTINGS"
          bodyL="PRODUCTION CATEGORIES"
          onTap={() => {
            setState({ page: null });
            getMasterData(state, setState);
          }}
        />
        <div className="hstN">
          <AddingFormLayout title={title} desc={desc}>
            <AddingForm1 title="Category Settings">
              <form onSubmit={(e) => postCategory(e, state, setState)}>
                <button className="hstNaA" type="submit" />
                <input
                  className="hstNaB"
                  id="stationName"
                  disabled={loading}
                  placeholder="Type station names separated by comma and add"
                />
              </form>
              <div className="hstNb">
                <div className="hstNbA">
                  <div className="hstNbAa">Category Head</div>Product Station
                </div>
                {allCategory?.map((it, k) => (
                  <div className="hstNbB" key={k}>
                    <input
                      defaultValue={it.name}
                      className="hstNbBa"
                      onChange={(e) => {
                        it.name = e.target.value;
                        it.updated = true;
                        setState({ allCategory });
                      }}
                    />
                    <select
                      className="hstNbBb_1"
                      defaultValue={it.kot}
                      onChange={(e) => {
                        it.kot = e.target.value;
                        it.updated = true;
                        setState({ allCategory });
                      }}
                    >
                      <option hidden>Select Station</option>
                      {allKot.map((it, k) => (
                        <option value={it.id}>{it.title}</option>
                      ))}
                    </select>
                    <div
                      className={
                        it.modifier.length === 0 ? "hstNbBd_" : "hstNbBd"
                      }
                      onClick={() => setState({ addCategoryModifier: it })}
                    />
                    <div
                      className={it.updated ? "hstNbBc_" : "hstNbBc"}
                      onClick={() => {
                        if (it.updated) updateCategory(k, state, setState);
                        else deleteCategory(k, state, setState);
                      }}
                    />
                  </div>
                ))}
              </div>
            </AddingForm1>
          </AddingFormLayout>
        </div>
      </StrictMode>
    );
}

export function HomeSettings5CategotyAddModifiger({ state, setState }) {
  const { addCategoryModifier, loading, error } = state;

  const value = {};
  if (addCategoryModifier === null) return null;
  const body = {
    title: (
      <StrictMode>
        Add Products <span className="hinDh">iPhone 13 Bundle</span>
      </StrictMode>
    ),
    desc: "Add default products for this bundle",
    close: () => setState({ addCategoryModifier: null, error: null }),
    loading,
    error,
    onChange: null,
    submit: () => updateCategoryModifier(state, setState),
  };
  return (
    <WidgetPopUp1 props={body}>
      <WidgetPopUp2Body>
        <div className="hinDj">
          <div className="hinDjA">Add Modifier*</div>
          <div className="hinDjB">Charge</div>
        </div>
        <form
          className="hinDj"
          onChange={(e) => (value[e.target.id] = e.target.value)}
        >
          <input className="hinDjA" id="title" />
          <input className="hinDjB" id="charge_amount" type="number" />
          <div
            className="hinDjD"
            onClick={() => {
              setState({ error: null });
              if (value.title === "" || value.title === null)
                setState({ error: "Enter title" });
              else {
                addCategoryModifier.modifier.push(value);
                setState({ addCategoryModifier });
              }
            }}
          />
        </form>
        <div className="hinDj1">
          {addCategoryModifier?.modifier?.map((it, k) => (
            <div className="hinDaHa" key={k}>
              {it.title}
              <div className="hinDaHb">{it.charge_amount}</div>
              <div
                className="hinDaHc"
                onClick={() => {
                  addCategoryModifier.modifier.splice(k, 1);
                  setState({ addCategoryModifier });
                }}
              />
            </div>
          ))}
        </div>
      </WidgetPopUp2Body>
    </WidgetPopUp1>
  );
}

export function HomeSettings5AssetCategories({ state, setState }) {
  const title = ` ASSET CATEGORIES`;
  const desc = `Add the asset categories for your business, these will be available when you are adding or purchasing assets`;
  const { page, loading, allAssetCategory } = state;
  if (page?.path === "assetCategories")
    return (
      <StrictMode>
        <Header1
          title="MASTERDATA SETTINGS"
          bodyL="PRODUCTION CATEGORIES"
          onTap={() => {
            setState({ page: null });
            getMasterData(state, setState);
          }}
        />
        <div className="hstN">
          <AddingFormLayout title={title} desc={desc}>
            <AddingForm1 title="Asset Category Settings">
              <form onSubmit={(e) => postAssetCategory(e, state, setState)}>
                <button className="hstNaA" type="submit" />
                <input
                  className="hstNaB"
                  id="stationName"
                  disabled={loading}
                  placeholder="Type category heads separated by comma and add"
                />
              </form>
              <div className="hstNb">
                <div className="hstNbA">
                  <div className="hstNbAa">Category Head</div>Discription
                </div>
                {allAssetCategory?.map((it, k) => (
                  <div className="hstNbB" key={k}>
                    <input
                      defaultValue={it.title}
                      className="hstNbBa"
                      onChange={(e) => {
                        it.name = e.target.value;
                        it.updated = true;
                        setState({ allAssetCategory });
                      }}
                    />
                    <input
                      defaultValue={it.description}
                      className="hstNbBb_1"
                      onChange={(e) => {
                        it.description = e.target.value;
                        it.updated = true;
                        setState({ allAssetCategory });
                      }}
                    />
                    <div
                      className={it?.updated ? "hstNbBc_" : "hstNbBc"}
                      onClick={() => {
                        if (it.updated) updateAssetCategory(k, state, setState);
                        else deleteAssetCategory(k, state, setState);
                      }}
                    />
                  </div>
                ))}
              </div>
            </AddingForm1>
          </AddingFormLayout>
        </div>
      </StrictMode>
    );
}
export function HomeSettings5SalesTaxes({ state, setState }) {
  const title = `SALES TAXES`;
  const desc = `Add your prodect station here`;
  const { page, allTax, addTax, loading } = state;
  if (page?.path === "salesTaxes")
    return (
      <StrictMode>
        <Header1
          title="DOCUMENT SETTINGS"
          bodyL="SALES TAXES"
          onTap={() => setState({ page: null })}
        />
        <div className="hstN">
          <AddingFormLayout title={title} desc={desc}>
            <AddingForm1 title="Sales Tax Settings">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: ".8vw",
                  fontWeight: "bold",
                  marginBottom: ".3vw",
                }}
              >
                <span style={{ width: "40%" }}>Tax Head</span>
                <span style={{ width: "22%" }}>GST</span>
                <span style={{ width: "22%" }}>CESS</span>
                <span style={{ width: "2vw" }} />
              </div>
              <form
                style={{ display: "flex", justifyContent: "space-between" }}
                onChange={(e) => {
                  addTax[e.target.id] = e.target.value;
                  setState(addTax);
                }}
              >
                <input
                  id="title"
                  style={{ width: "40%" }}
                  placeholder="Type..."
                  value={addTax?.title || ""}
                />
                <input
                  id="gst"
                  style={{ width: "22%" }}
                  placeholder="0.00%"
                  value={addTax?.gst || ""}
                  type="number"
                />
                <input
                  style={{ width: "22%" }}
                  id="css"
                  placeholder="0.00%"
                  value={addTax?.css || ""}
                  type="number"
                />
                <div
                  className="hstNaC"
                  style={loading ? { cursor: "progress" } : {}}
                  onClick={() => postTax(state, setState)}
                />
              </form>
              <div className="hstNb">
                <div className="hstNbA">
                  <span style={{ width: "44%" }}>Tax Head</span>
                  <span style={{ width: "26%" }}>GST</span>
                  <span style={{ width: "22%" }}>CESS</span>
                </div>
                {allTax?.map((it, k) => (
                  <form
                    className="hstNbB"
                    key={k}
                    onChange={(e) => {
                      it[e.target.id] = e.target.value;
                      it.edited = true;
                      setState(allTax);
                    }}
                  >
                    <input
                      id="name"
                      style={{ width: "40%" }}
                      placeholder="Type..."
                      value={it.name}
                    />
                    <input
                      id="rate"
                      style={{ width: "22%" }}
                      placeholder="0.00%"
                      value={it.rate}
                      type="number"
                    />
                    <input
                      style={{ width: "22%" }}
                      id="cess"
                      placeholder="0.00%"
                      value={it.cess}
                      type="number"
                    />
                    <div
                      className={it?.edited ? "hstNbBc_" : "hstNbBc"}
                      style={loading ? { cursor: "progress" } : {}}
                      onClick={() => updateOrDeleateTax(it, state, setState)}
                    />
                  </form>
                ))}
              </div>
            </AddingForm1>
          </AddingFormLayout>
        </div>
      </StrictMode>
    );
}

export function HomeSettings5ProdectionStations({ state, setState }) {
  const title = `PRODUCTION STATION`;
  const desc = `Add your prodect station here`;
  const [selected, setSelected] = useState(null);
  const [edited, setEdited] = useState(null);
  const { page, allKot, loading, error } = state;
  if (page?.path !== "prodectionStations") return null;
  return (
    <StrictMode>
      <Header1
        title="MASTERDATA SETTINGS"
        bodyL="PRODUCTION STATION"
        onTap={() => setState({ page: null })}
      />
      <div className="hstN">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="All Stations">
            <form onSubmit={(e) => postKots(e, state, setState)}>
              <button className="hstNaA" type="submit" />
              <input
                disabled={loading}
                className="hstNaB"
                id="stationName"
                placeholder="Type station names separated by comma and add"
              />
            </form>
            <div className="hstNb">
              <div className="hstNbA">
                <div className="hstNbAa">Station (Kitchen)</div>Station IP
              </div>
              {allKot.map((it, k) => (
                <div className="hstNbB" key={k}>
                  <input
                    className="hstNbBa"
                    defaultValue={it.title}
                    onFocus={() => {
                      setSelected(k);
                      setEdited(null);
                    }}
                    onChange={(e) => setEdited(e.target.value)}
                  />
                  <div className="hstNbBb">{it.ip}</div>
                  <div
                    className={
                      selected === k && edited !== null ? "hstNbBc_" : "hstNbBc"
                    }
                    onClick={() =>
                      selected === k && edited !== null
                        ? updateKots(
                            { id: it.id, title: edited },
                            state,
                            setState
                          )
                        : deleteKots(it.id, state, setState)
                    }
                  />
                </div>
              ))}
              <div className="imaError">{error}</div>
            </div>
          </AddingForm1>
        </AddingFormLayout>
      </div>
    </StrictMode>
  );
}
