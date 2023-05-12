import { StrictMode, useState } from "react";
import {
  getCategoryForInventoryCountRequest,
  getStockIssueSingleProdect,
  inventorySearchProductStockIssue,
  makeStockAcnowledged,
  onClickStartCount,
  postInventoryCountedAsSubmit,
  postInventoryCountedItems,
  postInventoryCountRequest,
  postInventoryStockTakenStatus,
  postStockIssue,
  setStockTakingProdectCount,
} from "../method/homeInventoryInventoryMgmnt";
import {
  addStockIssueItemStruct,
  calculateStockIssueTax,
} from "../module/homeInventoryInventoryMgmnt";
import { Select } from "./interface";
import {
  Header1,
  Header2,
  Header4,
  HeaderButtens1,
  WidgetInputSelect,
} from "./widget";
import { AddingForm1, FormSwitch } from "./widget_form";
import {
  WidgetPopUp1,
  WidgetPopUp1Body,
  WidgetPopUp1In1,
  WidgetPopUp1In2,
} from "./widget_popup";
import { MyTable1 } from "./widget_table";

export function InventoryAddIssueStock({ state, setState }) {
  const { page, addIssueStock, allTax, allBranches, error } = state;
  const [saveBtn, setsaveBtn] = useState(false);

  if (page?.path !== "addIssueStock") return null;
  const title = "Stock Issue";
  const desc = "Issue stock from your main branch to connected branches";
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK ISSUE"
        onTap={() => setState({ page: null })}
      />
      <form
        style={{ overflow: "scroll", maxHeight: "calc(100vh - 5vw)" }}
        onChange={() => setState(addIssueStock)}
      >
        <Header4 title={title} desc={desc} />
        <div className="hiaB">
          <div style={{ width: "20%" }}>
            Main Branch *<br />
            <select
              onChange={(e) => (addIssueStock.main_branch_id = e.target.value)}
              value={addIssueStock.main_branch_id}
              disabled
            >
              <option hidden>Select branch</option>
              {allBranches?.map((it, k) =>
                addIssueStock?.to_branch_id !== it.branch_id.toString() ? (
                  <option key={k} value={it.branch_id}>
                    {it.branch_name}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <div style={{ width: "11%" }}>
            Date *<br />
            <input
              type="date"
              value={addIssueStock.issue_date}
              disabled={addIssueStock?._IsEdit}
              onChange={(e) => (addIssueStock.issue_date = e.target.value)}
            />
          </div>
          <div style={{ width: "20%" }}>
            Transfer to Branch *
            <br />
            <select
              value={addIssueStock.to_branch_id}
              disabled={addIssueStock?._IsEdit}
              onChange={(e) => (addIssueStock.to_branch_id = e.target.value)}
            >
              <option hidden>Select branch</option>
              {allBranches?.map((it, k) =>
                addIssueStock?.main_branch_id !== it.branch_id.toString() ? (
                  <option key={k} value={it.branch_id}>
                    {it.branch_name}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <div style={{ width: "23%" }}>
            Disctiption
            <br />
            <input
              placeholder="Enter payment reference or chequr number"
              disabled={addIssueStock?._IsEdit}
              value={addIssueStock.description}
              onChange={(e) => (addIssueStock.description = e.target.value)}
            />
          </div>
          <div style={{ width: "22%" }} />
        </div>
        <div className="hiaC">
          <div className="hiaCb">
            <div className="hiaCbA" style={{ width: "3%" }} />
            <div className="hiaCbA" style={{ width: "55%" }}>
              Prodect / Service
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Qty
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Cost
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Branch Price
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Tax Stab
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Tax
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Total
            </div>
          </div>
          <div className="hiaCc">
            {addIssueStock?.items?.map((it, k) => (
              <form
                key={k}
                className="hiaCcA"
                onChange={() => calculateStockIssueTax(it, state, setState)}
              >
                <div
                  className={
                    k + 1 === addIssueStock.items.length ? "" : "hiaCcAa"
                  }
                  onClick={() => {
                    addIssueStock.items.splice(k, 1);
                    setState(addIssueStock);
                  }}
                  style={{ minWidth: "3%" }}
                />
                <div style={{ width: "54.8%", marginRight: ".3%" }}>
                  <WidgetInputSelect
                    props={{
                      disabled: addIssueStock?._IsEdit,
                      defaultValue: it.name,
                      onChange: async (v) => {
                        await inventorySearchProductStockIssue(
                          v,
                          (v1) => (it.list = v1)
                        );
                        setState({ addIssueStock });
                      },
                      list: it?.list || [],
                      clearlist: () => {
                        it.list = [];
                        setState({ addIssueStock });
                      },
                      setValue: async (v) => {
                        getStockIssueSingleProdect(it.list[v].id).then(
                          (res) => {
                            it.cost_price = res.data.selling_price;
                            it.price = res.data.selling_price;
                            it.selling_price = res.data.selling_price;
                            it.actual_price = res.data.selling_price;

                            it.product_id = res.data.id;
                            it.name = res.data.name;
                            it.unit = res.data.primary_unit;
                            it.tax_id = res.data.selling_tax.toString();
                            it.product_type = res.data.product_type;
                            if (addIssueStock?.items?.length - 1 === k)
                              addIssueStock.items.push({
                                ...addStockIssueItemStruct,
                              });
                            calculateStockIssueTax(it, state, setState);
                          }
                        );
                      },
                      placeholder: "Search your product",
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.quantity}
                    onChange={(e) => (it.quantity = e.target.value)}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    disabled={it.product_id === "" || addIssueStock?._IsEdit}
                    type="number"
                    value={it.cost_price}
                    onChange={(e) => (it.cost_price = e.target.value)}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.price}
                    disabled={it.product_id === "" || addIssueStock?._IsEdit}
                    onChange={(e) => (it.price = e.target.value)}
                  />
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  <select
                    disabled={it.product_id === "" || addIssueStock?._IsEdit}
                    className="hiaCcAb"
                    value={it.tax_id}
                    onChange={(e) => (it.tax_id = e.target.value)}
                  >
                    <option hidden>Select Tax</option>
                    {allTax?.map((it, k) => (
                      <option key={k} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.tax_amount}
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.tax_amount}
                </div>
              </form>
            ))}
          </div>
          <div className="hiaCd">
            <div className="hiaCdA">
              <b>Delevery Address</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter notes here"
                value={addIssueStock.delivary_address}
                onChange={(e) =>
                  (addIssueStock.delivary_address = e.target.value)
                }
              ></textarea>
              <br />
              <br />
              <b>Stock issue Note</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter notes here"
                value={addIssueStock.stock_note}
                onChange={(e) => (addIssueStock.stock_note = e.target.value)}
              ></textarea>
            </div>
            <div style={{ width: "30%" }}>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Subtitla</b>
                <b>{addIssueStock?.total - addIssueStock?.tax}</b>
              </div>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Tax</b>
                <b>{addIssueStock?.tax}</b>
              </div>
              <div className="hiaCdB" style={{ width: "100%" }}>
                <b>Total</b>
                <b>{addIssueStock?.total}</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hiaD">
          <div className="imaError">{error}</div> &nbsp;
          <div className="hiaDa">
            <div
              className="hiaDaA"
              onClick={() => {
                setsaveBtn(false);
                if (addIssueStock?._IsAcknowledging)
                  makeStockAcnowledged(addIssueStock?.id, state, setState);
                else postStockIssue(state, setState, true);
              }}
            >
              {addIssueStock?._IsAcknowledging
                ? "ACKNOWLEDGED"
                : addIssueStock?._IsEdit
                ? "PRINT"
                : "SAVE & PRINT"}
            </div>
            {!addIssueStock?._IsEdit || !addIssueStock?._IsAcknowledging ? (
              <div className="hiaDaB" onClick={() => setsaveBtn(!saveBtn)} />
            ) : null}
            {saveBtn ? (
              <div className="hiaDaC">
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    postStockIssue(state, setState, true);
                  }}
                >
                  Save Purchase
                </div>
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    postStockIssue(state, setState, false);
                  }}
                >
                  Save & Add New
                </div>
              </div>
            ) : null}
          </div>
          <div
            className="hiaDb"
            onClick={() => {
              setState({ page: null });
            }}
          >
            CANCEL
          </div>
        </div>
      </form>
    </StrictMode>
  );
}

export function InventoryAddStockTransfer({ state, setState }) {
  const { page, addStockTransfer, allAssets, allPaymenyMode } = state;
  const { allSuppliers } = state;
  const [saveBtn, setsaveBtn] = useState(false);

  if (page?.path !== "addStocktransfer") return null;
  const title = "Stock Transfer";
  const desc = "Transfer stock from one branch to another";
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK TRANSFER"
        onTap={() => setState({ page: null })}
      />
      <div style={{ overflow: "scroll", maxHeight: "calc(100vh - 5vw)" }}>
        <Header4 title={title} desc={desc} />
        <div className="hiaB">
          <div style={{ width: "25%" }}>
            Transfer from Branch *<br />
            <select
              onChange={(e) => (addStockTransfer.supplier_id = e.target.value)}
            >
              <option hidden>Select Supplier</option>
              {allSuppliers?.map((it, k) => (
                <option key={k} value={it.id}>
                  {it.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ width: "11%" }}>
            Date *<br />
            <input
              type="date"
              onChange={(e) =>
                (addStockTransfer.purchase_date = e.target.value)
              }
            />
          </div>
          <div style={{ width: "11%" }}>
            Transfer to Branch *
            <br />
            <select>
              <option hidden>Select Payment from</option>
            </select>
          </div>
          <div style={{ width: "23%" }}>
            Disctiption
            <br />
            <input
              placeholder="Enter payment reference or chequr number"
              onChange={(e) => (addStockTransfer.reference = e.target.value)}
            />
          </div>
          <div style={{ width: "25%" }} />
        </div>
        <div className="hiaC">
          <div className="hiaCb">
            <div className="hiaCbA" style={{ width: "3%" }} />
            <div className="hiaCbA" style={{ width: "55%" }}>
              Prodect / Service
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Qty
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Cost
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Branch Price
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Tax Stab
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Total
            </div>
          </div>
          <div className="hiaCc">
            {addStockTransfer?.items?.map((it, k) => (
              <div key={k} className="hiaCcA">
                <div
                  className={
                    k + 1 === addStockTransfer.items.length ? "" : "hiaCcAa"
                  }
                  onClick={() => {
                    addStockTransfer.items.splice(k, 1);
                    setState(addStockTransfer);
                  }}
                  style={{ minWidth: "3%" }}
                />
                <div style={{ width: "55%" }}>
                  <Select
                    className="hiaCcAb"
                    placeholder="Select Asset"
                    list={allAssets ?? []}
                    propertyName="name"
                    onChange={(v) => {
                      it.asset_id = v.asset_id;
                      it.asset_category = v.asset_category;
                      it.asset_category_id = v.asset_category_id;
                      if (k + 1 === addStockTransfer.items.length)
                        addStockTransfer.items.push({
                          asset_id: "",
                          asset_category_id: "",
                          quantity: 1,
                          price: 0,
                          tax_id: "",
                          item_tax: "",
                          item_total: 0,
                        });
                      setState(addStockTransfer);
                    }}
                    bottom={{
                      title: "+ New Asset",
                      onClick: () => {
                        // getAllAssetsCategory(state, setState);
                        // setState({ addAsset: {} });
                      },
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.quantity}
                    onChange={(e) => {
                      it.quantity = e.target.value;
                      it.total = it.quantity * it.current_value;
                      setState(addStockTransfer);
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.current_value}
                    onChange={(e) => {
                      it.current_value = e.target.value;
                      it.total = it.quantity * it.current_value;
                      setState(addStockTransfer);
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <select
                    className="hiaCcAb"
                    onChange={(e) => {
                      it.branch_id = e.target.value;
                      setState(addStockTransfer);
                    }}
                  >
                    <option>No Tax</option>
                  </select>
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
              </div>
            ))}
          </div>
          <div className="hiaCd">
            <div className="hiaCdA">
              <b>Purchase Note</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter notes here"
                id="purchase_note"
                onChange={(e) => {
                  addStockTransfer.asset_note = e.target.value;
                  setState(addStockTransfer);
                }}
              ></textarea>
            </div>
            <div style={{ width: "30%" }}>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Total Value</b>
                <input id="discount" type="number" placeholder="0.00" />
              </div>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Subtitla</b>
                <b>{addStockTransfer?.sub_total}</b>
              </div>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Tax</b>
                {/* <b>{_getTotal()}</b> */}
              </div>
              <div className="hiaCdB">
                <b>Total Value</b>
                {/* <b>{_getTotal()}</b> */}
              </div>
            </div>
          </div>
        </div>
        <div className="hiaD">
          <div className="hiaDa">
            <div
              className="hiaDaA"
              onClick={() => {
                setsaveBtn(false);
                // postAssetPurchase(state, setState, true);
              }}
            >
              SAVE & PRINT
            </div>
            <div className="hiaDaB" onClick={() => setsaveBtn(!saveBtn)} />
            {saveBtn ? (
              <div className="hiaDaC">
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    // postAssetPurchase(state, setState, true);
                  }}
                >
                  Save Purchase
                </div>
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    // postAssetPurchase(state, setState, false);
                  }}
                >
                  Save & Add New
                </div>
              </div>
            ) : null}
          </div>
          <div
            className="hiaDb"
            onClick={() => {
              setState({ page: null });
            }}
          >
            CANCEL
          </div>
        </div>
      </div>
    </StrictMode>
  );
}

export function InventoryAddStockReturn({ state, setState }) {
  const { page, addStockReturn, allAssets, allPaymenyMode } = state;
  const { allSuppliers } = state;
  const [saveBtn, setsaveBtn] = useState(false);

  if (page?.path !== "addStockReturn") return null;
  const title = "Stock Return";
  const desc = "Transfer stock from one branch to another";
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RETURN"
        onTap={() => setState({ page: null })}
      />
      <div style={{ overflow: "scroll", maxHeight: "calc(100vh - 5vw)" }}>
        <Header4 title={title} desc={desc} />
        <div className="hiaB">
          <div style={{ width: "25%" }}>
            Return from Branch *<br />
            <select
              onChange={(e) => (addStockReturn.supplier_id = e.target.value)}
            >
              <option hidden>Select Supplier</option>
              {allSuppliers?.map((it, k) => (
                <option key={k} value={it.id}>
                  {it.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ width: "11%" }}>
            Date *<br />
            <input
              type="date"
              onChange={(e) => (addStockReturn.purchase_date = e.target.value)}
            />
          </div>
          <div style={{ width: "11%" }}>
            Return to Branch/Supplier *
            <br />
            <select>
              <option hidden>Select Payment from</option>
            </select>
          </div>
          <div style={{ width: "23%" }}>
            Disctiption
            <br />
            <input
              placeholder="Enter payment reference or chequr number"
              onChange={(e) => (addStockReturn.reference = e.target.value)}
            />
          </div>
          <div style={{ width: "25%" }} />
        </div>
        <div className="hiaC">
          <div className="hiaCb">
            <div className="hiaCbA" style={{ width: "3%" }} />
            <div className="hiaCbA" style={{ width: "55%" }}>
              Prodect / Service
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Qty
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Cost
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Branch Price
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Tax Stab
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Total
            </div>
          </div>
          <div className="hiaCc">
            {addStockReturn?.items?.map((it, k) => (
              <div key={k} className="hiaCcA">
                <div
                  className={
                    k + 1 === addStockReturn.items.length ? "" : "hiaCcAa"
                  }
                  onClick={() => {
                    addStockReturn.items.splice(k, 1);
                    setState(addStockReturn);
                  }}
                  style={{ minWidth: "3%" }}
                />
                <div style={{ width: "55%" }}>
                  <Select
                    className="hiaCcAb"
                    placeholder="Select Asset"
                    list={allAssets ?? []}
                    propertyName="name"
                    onChange={(v) => {
                      it.asset_id = v.asset_id;
                      it.asset_category = v.asset_category;
                      it.asset_category_id = v.asset_category_id;
                      if (k + 1 === addStockReturn.items.length)
                        addStockReturn.items.push({
                          asset_id: "",
                          asset_category_id: "",
                          quantity: 1,
                          price: 0,
                          tax_id: "",
                          item_tax: "",
                          item_total: 0,
                        });
                      setState(addStockReturn);
                    }}
                    bottom={{
                      title: "+ New Asset",
                      onClick: () => {
                        // getAllAssetsCategory(state, setState);
                        // setState({ addAsset: {} });
                      },
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.quantity}
                    onChange={(e) => {
                      it.quantity = e.target.value;
                      it.total = it.quantity * it.current_value;
                      setState(addStockReturn);
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.current_value}
                    onChange={(e) => {
                      it.current_value = e.target.value;
                      it.total = it.quantity * it.current_value;
                      setState(addStockReturn);
                    }}
                  />
                </div>
                <div style={{ width: "8%" }}>
                  <select
                    className="hiaCcAb"
                    onChange={(e) => {
                      it.branch_id = e.target.value;
                      setState(addStockReturn);
                    }}
                  >
                    <option>No Tax</option>
                  </select>
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
              </div>
            ))}
          </div>
          <div className="hiaCd">
            <div className="hiaCdA">
              <b>Purchase Note</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter notes here"
                id="purchase_note"
                onChange={(e) => {
                  addStockReturn.asset_note = e.target.value;
                  setState(addStockReturn);
                }}
              ></textarea>
            </div>
            <div style={{ width: "30%" }}>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Total Value</b>
                <input id="discount" type="number" placeholder="0.00" />
              </div>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Subtitla</b>
                <b>{addStockReturn?.sub_total}</b>
              </div>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Tax</b>
                {/* <b>{_getTotal()}</b> */}
              </div>
              <div className="hiaCdB">
                <b>Total Value</b>
                {/* <b>{_getTotal()}</b> */}
              </div>
            </div>
          </div>
        </div>
        <div className="hiaD">
          <div className="hiaDa">
            <div
              className="hiaDaA"
              onClick={() => {
                setsaveBtn(false);
                // postAssetPurchase(state, setState, true);
              }}
            >
              SAVE & PRINT
            </div>
            <div className="hiaDaB" onClick={() => setsaveBtn(!saveBtn)} />
            {saveBtn ? (
              <div className="hiaDaC">
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    // postAssetPurchase(state, setState, true);
                  }}
                >
                  Save Purchase
                </div>
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    // postAssetPurchase(state, setState, false);
                  }}
                >
                  Save & Add New
                </div>
              </div>
            ) : null}
          </div>
          <div
            className="hiaDb"
            onClick={() => {
              setState({ page: null });
            }}
          >
            CANCEL
          </div>
        </div>
      </div>
    </StrictMode>
  );
}

export function InventoryNewInventoryCountPopup({ state, setState }) {
  const { newInventoryCount, error, loading, allBranches } = state;
  if (newInventoryCount === null) return null;

  const popupProps1 = {
    close: () => setState({ newInventoryCount: null }),
    title: "New Inventory Count",
    desc: "Inititate a new inventory count in any of your branch",
    error,
    loading,
    onChange: (e) => (newInventoryCount[e.target.id] = e.target.value),
    submit: () => postInventoryCountRequest(state, setState),
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Inventory Count Title*">
          <input className="hcbAa" id="title" />
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select Branch*">
          <select
            className="hcbAa"
            id="to_branch_id"
            onChange={(e) =>
              getCategoryForInventoryCountRequest(
                e.target.value,
                state,
                setState
              )
            }
          >
            <option hidden></option>
            {allBranches.map((it, k) => (
              <option key={k} value={it.branch_id}>
                {it.branch_name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select Category*">
          <select
            className="hcbAa"
            onChange={(e) => {
              newInventoryCount.category.push({
                title: newInventoryCount?.allCategory.filter(
                  (it) => it.id.toString() === e.target.value
                )[0].name,
                id: e.target.value,
              });
              setState({ newInventoryCount });
            }}
            disabled={newInventoryCount.to_branch_id === ""}
          >
            <option hidden>Select </option>
            {newInventoryCount?.allCategory?.map((it, k) => (
              <option
                key={k}
                value={it.id}
                hidden={
                  newInventoryCount?.category?.filter(
                    (it1) => it1.id === it.id.toString()
                  ).length > 0
                }
              >
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <div className="hinGa">
          {newInventoryCount?.category?.map((it, k) => (
            <div className="hinGaA" key={k}>
              {it.title}
              <div
                className="hinGaAa"
                onClick={() => {
                  newInventoryCount.category.splice(k, 1);
                  setState({ newInventoryCount });
                }}
              />
            </div>
          ))}
        </div>
      </WidgetPopUp1Body>

      <WidgetPopUp1Body>
        <WidgetPopUp1In2 title1="Start Date*" title2="End Date*">
          <input style={{ width: "47%" }} id="start_date" type="date" />
          <input style={{ width: "49%" }} id="end_date" type="date" />
        </WidgetPopUp1In2>
        <WidgetPopUp1In1 title="Inventory Count Type*">
          <select className="hcbAa" id="invetory_type">
            <option hidden>Select Inventory Count Type</option>
            <option value="1">Partial Count</option>
            <option value="2">Full Count</option>
          </select>
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}

export function InventoryProdectCountPage({ state, setState }) {
  const { error, loading, page, countingProductList } = state;

  const [subPage, setsubPage] = useState(0);
  const pTitles = [
    `All (${countingProductList?.items?.length || ""})`,
    `Counted (${countingProductList?.counted?.length || ""})`,
    `Uncounted (${countingProductList?.notCounted?.length || ""})`,
  ];

  if (page?.path !== "inventoryProductCountPage") return null;

  const bodyRBody = {
    drowelList: null,
    title: page.status === "Submit" ? "SUBMIT FOR REVIEW" : "START COUNT",
    makeAdd: () =>
      page.status === "Submit"
        ? postInventoryCountedAsSubmit(state, setState)
        : onClickStartCount(state, setState),
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;
  const body = [];
  var items = countingProductList?.items;
  if (subPage === 1) items = countingProductList?.counted;
  if (subPage === 2) items = countingProductList?.notCounted;
  for (let i = 0; i < items?.length; i++) {
    const it = items[i];
    body.push([
      { data: it.product_name },
      { data: it.counted },
      {
        data:
          Number(it.counted) > 0 ? (
            <div
              onClick={() => {
                it.counted = 0;
                for (let j = 0; j < countingProductList?.history?.length; j++)
                  if (countingProductList?.history[j]?.id === it?.product_id)
                    countingProductList.history[j].count = 0;
                setState({ countingProductList });
              }}
            >
              Clear
            </div>
          ) : null,
      },
    ]);
  }

  const heads = ["Prodect", "Counted", "Action"];
  const widths = [{ width: 70 }, { width: 10 }, { width: 10 }];

  return (
    <StrictMode>
      <Header1
        title="INVENTORY COUNT"
        bodyL={page?.title}
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <div className="hinGb">
        <div className="hinGbA">
          <div className="hinGbAa">
            <div style={{ width: "50%" }}>
              <WidgetPopUp1In1 title="Scan or search an item to count">
                <WidgetInputSelect
                  props={{
                    name: "product_name",
                    // defaultValue: it.name,
                    onChange: async (v) => {
                      countingProductList.searchList = [];
                      const searchingItems = countingProductList?.items;
                      const v1 = v.toLowerCase();
                      if (v1 !== "")
                        for (let i = 0; i < searchingItems?.length; i++) {
                          const el = searchingItems[i];
                          const v2 = el.product_name.toLowerCase();
                          if (v2.search(v1) !== -1)
                            countingProductList.searchList.push(el);
                        }
                      setState({ countingProductList });
                    },
                    list: countingProductList?.searchList || [],
                    setValue: async (v) => {
                      countingProductList.countingProduct =
                        countingProductList?.searchList[v];
                      countingProductList.searchList = [];
                      setState({ countingProductList });
                    },
                    placeholder: "Search your product",
                  }}
                />
              </WidgetPopUp1In1>
            </div>
            <div style={{ width: "18%" }}>
              <WidgetPopUp1In1 title="Reord count">
                <input
                  className="hcbAa"
                  type="number"
                  disabled={countingProductList.countingProduct === undefined}
                  onChange={(e) =>
                    (countingProductList.countingProductCount = e.target.value)
                  }
                />
              </WidgetPopUp1In1>
            </div>
            <div
              className="hinGbAaD"
              onClick={() => {
                if (countingProductList?.countingProductCount === undefined)
                  return;
                if (countingProductList?.history === undefined)
                  countingProductList.history = [];
                countingProductList.history.push({
                  id: countingProductList?.countingProduct?.product_id,
                  title: countingProductList?.countingProduct?.product_name,
                  count: countingProductList?.countingProductCount,
                });
                for (let i = 0; i < countingProductList?.items?.length; i++) {
                  if (
                    countingProductList?.items[i].product_id ===
                    countingProductList?.countingProduct?.product_id
                  ) {
                    countingProductList.items[i].counted =
                      Number(countingProductList?.items[i].counted) +
                      Number(countingProductList?.countingProductCount);
                    break;
                  }
                }

                setState({ countingProductList });
                setStockTakingProdectCount(countingProductList, setState);
              }}
            >
              COUNT
            </div>
            <div className="hinGbAaE">
              Enable quick
              <br /> scan
              <FormSwitch value={false} onTap={() => {}} />
            </div>
          </div>
          <MyTable1
            widths={widths}
            heads={heads}
            body={body}
            onclick={() => {}}
          />
        </div>
        <div className="hinGbB">
          <div className="hinGbBa">
            <div className="hinGbBaA">
              History
              <div className="hinGbBaAa">
                You can cancel a recent count in case of a mistake
              </div>
            </div>
            {countingProductList?.history?.map((it, k) => (
              <div key={k} className="hinGbBaB">
                <div className="hinGbBaBa">{k + 1}</div>
                <div className="hinGbBaBb">{it.title}</div>
                <div className="hinGbBaBc">{it.count}</div>
                <div
                  className="hinGbBaBd"
                  onClick={() => {
                    const iTems = countingProductList?.items;
                    for (let i = 0; i < iTems?.length; i++) {
                      if (iTems[i].product_id === it.id) {
                        countingProductList.items[i].counted =
                          Number(countingProductList.items[i].counted) -
                          Number(it.count);
                        break;
                      }
                    }
                    countingProductList?.history?.splice(k, 1);
                    setState({ countingProductList });
                    setStockTakingProdectCount(countingProductList, setState);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="hinGbBb">
            <div
              className="hinGbBbA"
              onClick={() => postInventoryCountedItems(state, setState)}
            >
              SAVE COUNT
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
//inventoryProductReviewPage

export function StockTakingReviewPage({ state, setState }) {
  const { allReviewItems, page } = state;
  const body = [];

  const [subPage, setsubPage] = useState(0);
  const pTitles = [
    `Uncounted (${allReviewItems[0]?.length || 0})`,
    `Counted (${allReviewItems[1]?.length || 0})`,
    `Unmatched (${allReviewItems[2]?.length || 0})`,
    `Matched (${allReviewItems[3]?.length || 0})`,
    `All (${allReviewItems[4]?.length || 0})`,
  ];

  for (let i = 0; i < allReviewItems[subPage]?.length; i++) {
    const it = allReviewItems[subPage][i];
    body.push([
      { data: it.product_name },
      { data: it.expected },
      { data: it.counted },
      { data: it.difference },
      { data: it.difference_value },
    ]);
  }

  const bodyRBody = {
    drowelList: [
      {
        title: "Complated",
        fun: () => postInventoryStockTakenStatus(1, state, setState),
      },
      {
        title: "Reject Stocktake",
        fun: () => postInventoryStockTakenStatus(2, state, setState),
      },
      {
        title: "Reopen Stocktake",
        fun: () => postInventoryStockTakenStatus(3, state, setState),
      },
    ],
    onShare: null,
    onDownload: null,
    title: "MARK COMPLATED",
    makeAdd: () => {},
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    "Product",
    "Expected",
    "Counted",
    "Difference (Count)",
    "Difference (Value)",
  ];
  const widths = [
    { width: 40 },
    { width: 14, align: "center" },
    { width: 14, align: "center" },
    { width: 14, align: "center" },
    { width: 14, align: "center" },
  ];

  const _addAll = (name) => {
    var value = 0;
    for (let i = 0; i < allReviewItems[subPage]?.length; i++)
      value += Number(allReviewItems[subPage][i][name]);
    return value;
  };

  if (page?.path !== "inventoryProductReviewPage") return null;
  const _onClickTable = (v) => {};
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RECEIVED"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4
        title="Invnetory Count"
        desc="Show all the team members recorded against your business"
      />
      <MyTable1
        widths={widths}
        heads={heads}
        body={body}
        onclick={_onClickTable}
      />
      <div className="hinGc">
        <div style={{ width: "40%" }}></div>
        <div style={{ width: "15%", textAlign: "center" }}>
          {_addAll("expected")}
        </div>
        <div style={{ width: "15%", textAlign: "center" }}>
          {_addAll("counted")}
        </div>
        <div style={{ width: "15%", textAlign: "center" }}>
          {_addAll("difference")}
        </div>
        <div style={{ width: "15%", textAlign: "center" }}>
          {_addAll("difference_value")}
        </div>
      </div>
    </StrictMode>
  );
}
