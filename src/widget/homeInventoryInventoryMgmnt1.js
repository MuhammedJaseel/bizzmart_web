import { StrictMode, useState } from "react";
import {
  inventorySearchProductStockIssue,
  inventorySetSearchProductStockIssue,
} from "../method/homeInventoryInventoryMgmnt";
import { addStockIssueItemStruct } from "../module/homeInventoryInventoryMgmnt";
import { Select } from "./interface";
import { Header1, Header4, WidgetInputSelect } from "./widget";

export function InventoryAddIssueStock({ state, setState }) {
  const { page, addIssueStock, allTax, allBranches } = state;
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
        onChange={() => {
          setState(addIssueStock);
        }}
      >
        <Header4 title={title} desc={desc} />
        <div className="hiaB">
          <div style={{ width: "20%" }}>
            Main Branch *<br />
            <select
              onChange={(e) => (addIssueStock.main_branch_id = e.target.value)}
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
              onChange={(e) => (addIssueStock.issue_date = e.target.value)}
            />
          </div>
          <div style={{ width: "20%" }}>
            Transfer to Branch *
            <br />
            <select
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
              Total
            </div>
          </div>
          <div className="hiaCc">
            {addIssueStock?.items?.map((it, k) => (
              <div key={k} className="hiaCcA">
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
                      onChange: async (e) => {
                        await inventorySearchProductStockIssue(
                          e.target.value,
                          (v) => (it.list = v)
                        );
                        setState({ addIssueStock });
                      },
                      list: it?.list || [],
                      clearlist: () => {
                        it.list = [];
                        setState({ addIssueStock });
                      },
                      setValue: async (v) => {
                        it.product_id = it.list[k].id;
                        it.name = it.list[k].name;
                        if (addIssueStock?.items?.length - 1 === k)
                          addIssueStock.items.push({
                            ...addStockIssueItemStruct,
                          });
                        setState({ addIssueStock });
                        await inventorySetSearchProductStockIssue(
                          it.list[k].id,
                          (v) => {
                            it = { ...it, ...v };
                            addIssueStock.items[k] = it;
                            setState({ addIssueStock });
                          }
                        );
                      },
                      placeholder: "Search your product",
                    }}
                  />
                </div>
                <div className="" style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.quantity}
                    disabled={it.product_id === ""}
                    onChange={(e) => (it.quantity = e.target.value)}
                  />
                </div>
                <div className="" style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    disabled={it.product_id === ""}
                    type="number"
                    value={it.cost_price}
                    onChange={(e) => (it.cost_price = e.target.value)}
                  />
                </div>
                <div className="" style={{ width: "8%" }}>
                  <input
                    className="hiaCcAb"
                    placeholder="0.00"
                    type="number"
                    value={it.price}
                    disabled={it.product_id === ""}
                    onChange={(e) => (it.price = e.target.value)}
                  />
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  <select
                    disabled={it.product_id === ""}
                    className="hiaCcAb"
                    onChange={(e) => (it.branch_id = e.target.value)}
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
                  {it.total}
                  {it.price}
                </div>
              </div>
            ))}
          </div>
          <div className="hiaCd">
            <div className="hiaCdA">
              <b>Delevery Address</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter notes here"
                id="purchase_note"
                onChange={(e) => {
                  addIssueStock.asset_note = e.target.value;
                  setState(addIssueStock);
                }}
              ></textarea>
              <br />
              <br />
              <b>Stock issue Note</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter notes here"
                id="purchase_note"
                onChange={(e) => {
                  addIssueStock.asset_note = e.target.value;
                  setState(addIssueStock);
                }}
              ></textarea>
            </div>
            <div style={{ width: "30%" }}>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Subtitla</b>
                <b>{addIssueStock?.sub_total}</b>
              </div>
              <div
                className="hiaCdB"
                style={{ width: "100%", fontSize: ".9vw" }}
              >
                <b>Tax</b>
                {/* <b>{_getTotal()}</b> */}
              </div>
              <div className="hiaCdB">
                <b>Total</b>
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
                <div className="" style={{ width: "8%" }}>
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
                <div className="" style={{ width: "8%" }}>
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
                <div className="" style={{ width: "8%" }}>
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
                <div className="" style={{ width: "8%" }}>
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
                <div className="" style={{ width: "8%" }}>
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
                <div className="" style={{ width: "8%" }}>
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
