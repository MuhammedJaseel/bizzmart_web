import { StrictMode, useState } from "react";
import { inventoryFormData } from "../module/homeInventory";
import { Header1, Header2, Header4, HeaderButtens1 } from "./widget";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import "../style/hia.css";
import { Select } from "./interface";
import {
  WidgetPopUp1,
  WidgetPopUp1Body,
  WidgetPopUp1In1,
} from "./widget_popup";
import {
  getAllAssetsCategory,
  getAssetStockLists,
  postAsset,
  postAssetPurchase,
  postExistingAsset,
  postTransferAsset,
  postWriteOffAsset,
} from "../method/homeInventoryAssest";
import { getTodayType2 } from "../module/simple";
import { calculateAssetPurchaseTax } from "../module/homeInventoryAssets";

export function AssetTable({ state, setState }) {
  const { allFixedAssets, allAssignedAssets, page } = state;
  const title = "INVENTORY";
  const bodyRBody = {
    makeAdd: () => {
      setState({
        page: inventoryFormData.filter((k) => k.path === "addAsset")[0],
        addExistingAsset: {
          asset_note: "",
          items: [
            {
              asset_id: "",
              asset_category_id: "",
              quantity: 0,
              current_value: 0,
              branch_id: "",
              user_id: "",
              total: 0,
            },
          ],
        },
      });
    },
    title: "+ New Asset",
    drowelList: [
      {
        title: "Asset Transfer",
        fun: () => setState({ assetTransfer: {} }),
      },
      {
        title: "Asset Writeoff",
        fun: () => setState({ assetWriteoff: {} }),
      },
      {
        title: "Asset Purchase",
        fun: () =>
          setState({
            page: { path: "addAssetPurchase" },
            addAssetPurchase: {
              items: [
                {
                  asset_id: "",
                  asset_category_id: "",
                  quantity: 1,
                  price: 0,
                  tax_id: "",
                  item_tax: "",
                  item_total: 0,
                },
              ],
            },
          }),
      },
    ],
    onShare: null,
    onDownload: null,
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const body = [];
  if (allFixedAssets !== null)
    for (let i = 0; i < allFixedAssets.length; i++) {
      const it = allFixedAssets[i];
      body.push([
        { data: null },
        { data: it.asset_category },
        { data: it.asset_category },
        { data: it.quantity },
        { data: it.total_cost },
        { data: null },
      ]);
    }
  const body1 = [];
  if (allAssignedAssets !== null)
    for (let i = 0; i < allAssignedAssets.length; i++) {
      const it = allAssignedAssets[i];
      body1.push([
        { data: null },
        { data: it.asset_category },
        { data: it.asset_category },
        { data: it.quantity },
        { data: it.custodian_name },
        { data: it.assigned_date },
        { data: it.cost },
        { data: it.total_cost },
        { data: null },
      ]);
    }

  const [subPage, setsubPage] = useState(0);

  const pTitles = ["All Fixed Assets", "Assigned Assets"];
  if (page?.path !== "asset") return null;
  return (
    <StrictMode>
      <Header1
        title={title}
        bodyL={"ASSET LIST"}
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      {subPage === 0 ? (
        <MyTable1
          widths={[
            { width: 1 },
            { width: 30 },
            { width: 25 },
            { width: 25, align: "center" },
            { width: 10, align: "right" },
            { width: 1 },
          ]}
          heads={[
            null,
            "Asset detail",
            "Category",
            "Quantity",
            "Total Cost",
            null,
          ]}
          body={body}
        />
      ) : (
        <MyTable1
          widths={[
            { width: 1 },
            { width: 25 },
            { width: 20 },
            { width: 22, align: "center" },
            { width: 20 },
            { width: 15 },
            { width: 8, align: "right" },
            { width: 8, align: "right" },
            { width: 1 },
          ]}
          heads={[
            null,
            "Asset detail",
            "Category",
            "Quantity",
            "Costodain",
            "Assigned Date",
            "Cost",
            "Total Cost",
            null,
          ]}
          body={body1}
        />
      )}
      <MyTableCounter1 props={{ total: 50 }} />
      <AssetTranferPoup state={state} setState={setState} />
      <AssetWriteOffPoup state={state} setState={setState} />
    </StrictMode>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////        ASSET ADDING FORM        ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function AssetForm({ state, setState }) {
  const { page, allAssets, addExistingAsset, allCustodian } = state;
  const { allBranches } = state;
  const [saveBtn, setsaveBtn] = useState(false);
  if (page?.path !== "addAsset") return null;

  const _getTotal = () => {
    var value = 0;
    for (let i = 0; i < addExistingAsset.items.length; i++)
      value +=
        addExistingAsset.items[i].current_value *
        addExistingAsset.items[i].quantity;

    return value;
  };

  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL={page.title}
        onTap={() => setState({ page: null })}
      />
      <div style={{ overflow: "scroll", maxHeight: "calc(100vh - 5vw)" }}>
        <Header4 title={page.title} desc={page.desc} />
        <div className="hiaC">
          <div className="hiaCb">
            <div className="hiaCbA" style={{ width: "3%" }} />
            <div className="hiaCbA" style={{ width: "30%" }}>
              Select Asset
            </div>
            <div className="hiaCbA" style={{ width: "25%" }}>
              Assest Cagtegory*
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Qty
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Value
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Branch*
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Custodian
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Total
            </div>
          </div>
          <div className="hiaCc">
            {addExistingAsset?.items?.map((it, k) => (
              <div key={k} className="hiaCcA">
                <div
                  className={
                    k + 1 === addExistingAsset.items.length ? "" : "hiaCcAa"
                  }
                  onClick={() => {
                    addExistingAsset.items.splice(k, 1);
                    setState(addExistingAsset);
                  }}
                  style={{ minWidth: "3%" }}
                />
                <div style={{ width: "30%" }}>
                  <Select
                    className="hiaCcAb"
                    placeholder="Select Asset"
                    list={allAssets ?? []}
                    propertyName="name"
                    onChange={(v) => {
                      it.asset_id = v.asset_id;
                      it.asset_category = v.asset_category;
                      it.asset_category_id = v.asset_category_id;
                      if (k + 1 === addExistingAsset.items.length)
                        addExistingAsset.items.push({
                          asset_id: "",
                          asset_category_id: "",
                          quantity: 0,
                          current_value: 0,
                          branch_id: "",
                          user_id: "",
                          total: 0,
                        });
                      setState(addExistingAsset);
                    }}
                    bottom={{
                      title: "+ New Asset",
                      onClick: () => {
                        getAllAssetsCategory(state, setState);
                        setState({ addAsset: {} });
                      },
                    }}
                  />
                </div>
                <div className="" style={{ width: "25%" }}>
                  <input
                    className="hiaCcAb"
                    disabled
                    value={it.asset_category}
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
                      setState(addExistingAsset);
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
                      setState(addExistingAsset);
                    }}
                  />
                </div>
                <div className="" style={{ width: "8%" }}>
                  <select
                    className="hiaCcAb"
                    onChange={(e) => {
                      it.branch_id = e.target.value;
                      setState(addExistingAsset);
                    }}
                  >
                    <option hidden>Branch</option>
                    {allBranches?.map((it) => (
                      <option value={it.branch_id}>{it.branch_name}</option>
                    ))}
                  </select>
                </div>
                <div className="" style={{ width: "10%" }}>
                  <select
                    className="hiaCcAb"
                    onChange={(e) => {
                      it.user_id = e.target.value;
                      setState(addExistingAsset);
                    }}
                    value={it.user_id}
                  >
                    <option hidden>Custodian</option>
                    {allCustodian?.map((it) => (
                      <option value={it.id}>{it.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
              </div>
            ))}
          </div>
          <div className="hiaCd">
            <div className="hiaCdA">
              <b>Assest Note</b>
              <br />
              <textarea
                className="hiaCdAa"
                placeholder="Enter asset notes here"
                onChange={(e) => {
                  addExistingAsset.asset_note = e.target.value;
                  setState(addExistingAsset);
                }}
              ></textarea>
            </div>
            <div className="hiaCdB">
              <b>Total Value</b>
              <b>{_getTotal()}</b>
            </div>
          </div>
        </div>
        <div className="hiaD">
          <div className="hiaDa">
            <div
              className="hiaDaA"
              onClick={() => {
                setsaveBtn(false);
                postExistingAsset(state, setState, true);
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
                    postExistingAsset(state, setState, true);
                  }}
                >
                  Save Purchase
                </div>
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    postExistingAsset(state, setState, false);
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
      <AddAssetPoup state={state} setState={setState} />
    </StrictMode>
  );
}

function AddAssetPoup({ state, setState }) {
  const { loading, error, addAsset, allAssetsCategory } = state;
  if (addAsset === undefined) return null;
  const popupProps1 = {
    close: () => setState({ addAsset: undefined }),
    title: "New Asset",
    desc: `Add new asset to the business`,
    error,
    loading,
    onChange: (e) => {
      addAsset[e.target.id] = e.target.value;
    },
    submit: () => postAsset(state, setState),
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Asset Name*">
          <input
            style={{ width: "100%" }}
            id="name"
            placeholder="Enter asset name here"
          />
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Description">
          <input
            style={{ width: "100%" }}
            placeholder="Enter description"
            id="description"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Asset Category*">
          <select style={{ width: "100%" }} id="asset_category_id">
            <option hidden>Select Category</option>
            {allAssetsCategory.map((it, k) => (
              <option key={k} value={it.id}>
                {it.title}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}

function AssetTranferPoup({ state, setState }) {
  const { loading, error, assetTransfer, allBranches, allAssets } = state;
  const { allCustodian } = state;

  const [assetStockList, setassetStockList] = useState([]);

  if (assetTransfer === undefined) return null;
  const popupProps1 = {
    close: () => setState({ assetTransfer: undefined }),
    title: "Transfer an Asset",
    desc: `Record the tranfer of asset between your branches`,
    error,
    loading,
    onChange: (e) => {
      assetTransfer[e.target.id] = e.target.value;
      if (e.target.id === "asset_id")
        getAssetStockLists(
          {
            from_branch_id: assetTransfer.from_branch_id,
            asset_id: e.target.value,
          },
          setassetStockList,
          setState
        );
    },
    submit: () => postTransferAsset(state, setState),
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Transfer from branch*">
          <select style={{ width: "100%" }} id="from_branch_id">
            <option hidden>Select the branch to tranfer from</option>
            {allBranches?.map((it) => (
              <option value={it.branch_id}>{it.branch_name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Stock">
          <select
            style={{ width: "100%" }}
            id="asset_stock_id"
            disabled={
              assetTransfer.from_branch_id === undefined ||
              assetTransfer.asset_id === undefined
            }
          >
            <option hidden>Select a stock</option>
            {assetStockList?.map((it) => (
              <option value={it.asset_stock_id}>{it.serial_no}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Transfer to Branch*">
          <select style={{ width: "100%" }} id="to_branch_id">
            <option hidden>Select the branch to tranfer to</option>
            {allBranches?.map((it) => (
              <option value={it.branch_id}>{it.branch_name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Description">
          <input
            style={{ width: "100%" }}
            placeholder="Enter description"
            id="description"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select an Asset*">
          <select style={{ width: "100%" }} id="asset_id">
            <option hidden>Select the asset using name or code</option>
            {allAssets?.map((it) => (
              <option value={it.asset_id}>{it.name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select Current Custodian">
          <select style={{ width: "100%" }} id="custodian_user_id">
            <option hidden>Select an employee as custodian</option>
            {allCustodian?.map((it) => (
              <option value={it.id}>{it.name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select New Custodian">
          <select style={{ width: "100%" }} id="new_custodian_user_id">
            <option hidden>Select a employee as custodian</option>
            {allCustodian?.map((it) => (
              <option value={it.id}>{it.name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}

function AssetWriteOffPoup({ state, setState }) {
  const { loading, error, assetWriteoff, allBranches, allAssets } = state;
  const { allCustodian } = state;

  const [assetStockList, setassetStockList] = useState([]);

  if (assetWriteoff === undefined) return null;
  const popupProps1 = {
    close: () => setState({ assetWriteoff: undefined }),
    title: "Writeoff an Asset",
    desc: `Write off assets you own against any reason`,
    error,
    loading,
    onChange: (e) => {
      assetWriteoff[e.target.id] = e.target.value;
      if (e.target.id === "asset_id")
        getAssetStockLists(
          {
            from_branch_id: assetWriteoff.branch_id,
            asset_id: e.target.value,
          },
          setassetStockList,
          setState
        );
    },
    submit: () => postWriteOffAsset(state, setState),
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select the Branch*">
          <select style={{ width: "100%" }} id="branch_id">
            <option hidden>Select the branch the asset belongs</option>
            {allBranches?.map((it) => (
              <option value={it.branch_id}>{it.branch_name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select an Asset*">
          <select style={{ width: "100%" }} id="asset_id">
            <option hidden>Select an asset to writeoff</option>
            {allAssets?.map((it) => (
              <option value={it.asset_id}>{it.name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select the Custodian*">
          <select style={{ width: "100%" }} id="custodian_user_id">
            <option hidden>
              Select the custodian who handles the asset currently
            </option>
            {allCustodian?.map((it) => (
              <option value={it.id}>{it.name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Description">
          <input
            style={{ width: "100%" }}
            placeholder="Enter description"
            id="description"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="As On">
          <input
            style={{ width: "30%" }}
            disabled
            type="date"
            value={getTodayType2()}
          />
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Stock">
          <select
            style={{ width: "100%" }}
            id="asset_stock_id"
            disabled={
              assetWriteoff.branch_id === undefined ||
              assetWriteoff.asset_id === undefined
            }
          >
            <option hidden>Select a stock</option>
            {assetStockList?.map((it) => (
              <option value={it.asset_stock_id}>{it.serial_no}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select Reason" id="reason">
          <select style={{ width: "100%" }}>
            <option hidden>Select a reason for the action</option>
          </select>
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}

export function InventoryAddAssetPurchase({ state, setState }) {
  const { page, addAssetPurchase, allAssets, allPaymenyMode } = state;
  const { allSuppliers, allTax, allAccounts, error } = state;
  const [saveBtn, setsaveBtn] = useState(false);

  if (page?.path !== "addAssetPurchase") return null;
  const title = "New Asset Purchase";
  const desc = "Record a new asset purchase entry for your business";
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL={"ASSET > ASSET PURCHSE"}
        onTap={() => setState({ page: null })}
      />
      <div style={{ overflow: "scroll", maxHeight: "calc(100vh - 5vw)" }}>
        <Header4 title={title} desc={desc} />
        <div className="hiaB">
          <div style={{ width: "25%" }}>
            Supplier *<br />
            <select
              onChange={(e) => (addAssetPurchase.supplier_id = e.target.value)}
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
            Purchase Date *<br />
            <input
              type="date"
              onChange={(e) =>
                (addAssetPurchase.purchase_date = e.target.value)
              }
            />
          </div>
          <div style={{ width: "11%" }}>
            Payment From*
            <br />
            <select>
              <option hidden>Select Payment from</option>
              {allAccounts?.map((it, k) => (
                <option value={it.id} key={k}>
                  {it.account_display_name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ width: "11%" }}>
            Payment Mode
            <br />
            <select
              onChange={(e) => (addAssetPurchase.payment_mode = e.target.value)}
            >
              <option hidden>Select payment</option>
              {allPaymenyMode?.map((it, k) => (
                <option key={k} value={it.id}>
                  {it.title}
                </option>
              ))}
            </select>
          </div>
          <div style={{ width: "11%" }}>
            Due Date*
            <br />
            <input
              type="date"
              id="due_date"
              onChange={(e) => (addAssetPurchase.due_date = e.target.value)}
            />
          </div>
          <div style={{ width: "23%" }}>
            Reference
            <br />
            <input
              placeholder="Enter payment reference or chequr number"
              onChange={(e) => (addAssetPurchase.reference = e.target.value)}
            />
          </div>
        </div>
        <div className="hiaC">
          <div className="hiaCb">
            <div className="hiaCbA" style={{ width: "3%" }} />
            <div className="hiaCbA" style={{ width: "30%" }}>
              Select Asset
            </div>
            <div className="hiaCbA" style={{ width: "25%" }}>
              Assest Cagtegory*
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Qty
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Price / Rate
            </div>
            <div className="hiaCbA" style={{ width: "8%" }}>
              Tax Slab
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Tax Amount
            </div>
            <div className="hiaCbA" style={{ width: "10%" }}>
              Total
            </div>
          </div>
          <div className="hiaCc">
            {addAssetPurchase?.items?.map((it, k) => (
              <form
                key={k}
                className="hiaCcA"
                onChange={() => calculateAssetPurchaseTax(it, state, setState)}
              >
                <div
                  className={
                    k + 1 === addAssetPurchase.items.length ? "" : "hiaCcAa"
                  }
                  onClick={() => {
                    addAssetPurchase.items.splice(k, 1);
                    setState(addAssetPurchase);
                  }}
                  style={{ minWidth: "3%" }}
                />
                <div style={{ width: "30%" }}>
                  <Select
                    className="hiaCcAb"
                    placeholder="Select Asset"
                    list={allAssets ?? []}
                    propertyName="name"
                    onChange={(v) => {
                      it.asset_id = v.asset_id;
                      it.asset_category = v.asset_category;
                      it.asset_category_id = v.asset_category_id;
                      if (k + 1 === addAssetPurchase.items.length)
                        addAssetPurchase.items.push({
                          asset_id: "",
                          asset_category_id: "",
                          quantity: 1,
                          price: 0,
                          tax_id: "",
                          item_tax: "",
                          item_total: 0,
                        });
                      calculateAssetPurchaseTax(it, state, setState);
                      setState(addAssetPurchase);
                    }}
                    bottom={{
                      title: "+ New Asset",
                      onClick: () => {
                        getAllAssetsCategory(state, setState);
                        setState({ addAsset: {} });
                      },
                    }}
                  />
                </div>
                <div className="" style={{ width: "25%" }}>
                  <input
                    className="hiaCcAb"
                    disabled
                    value={it.asset_category}
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
                      setState(addAssetPurchase);
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
                      setState(addAssetPurchase);
                    }}
                  />
                </div>
                <div className="" style={{ width: "8%" }}>
                  <select
                    className="hiaCcAb"
                    onChange={(e) => {
                      it.branch_id = e.target.value;
                      setState(addAssetPurchase);
                    }}
                    id="tax_id"
                    value={it.tax_id}
                  >
                    <option hidden>Select tax</option>
                    {allTax.map((it, k) => (
                      <option key={k} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
                <div className="hiaCcAd" style={{ width: "10%" }}>
                  {it.total}
                </div>
              </form>
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
                  addAssetPurchase.asset_note = e.target.value;
                  setState(addAssetPurchase);
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
                <b>{addAssetPurchase?.sub_total}</b>
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
          <div
            style={{
              color: "red",
              fontSize: ".8vw",
              padding: ".3vw .5vw",
            }}
          >
            {error}
          </div>
          <div className="hiaDa">
            <div
              className="hiaDaA"
              onClick={() => {
                setsaveBtn(false);
                postAssetPurchase(state, setState, true);
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
                    postAssetPurchase(state, setState, true);
                  }}
                >
                  Save Purchase
                </div>
                <div
                  className="hinaDaCa"
                  onClick={() => {
                    setsaveBtn(false);
                    postAssetPurchase(state, setState, false);
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
      <AddAssetPoup state={state} setState={setState} />
    </StrictMode>
  );
}
