import { StrictMode } from "react";
import { postPriceChange } from "../method/homeInventoryPriceMgmnt";
import { Input } from "./interface";
import { Header1, Header4, HeaderButtens1 } from "./widget";
import {
  WidgetPopUp1,
  WidgetPopUp1Body,
  WidgetPopUp1In1,
} from "./widget_popup";
import { MyTable1, MyTableCounter1 } from "./widget_table";

export function PriceLookupTable({ state, setState }) {
  const { priceLookupList, page } = state;

  const heads = [
    null,
    "Product Name",
    "Code",
    "Category",
    "Type",
    "Purchase Price",
    "RRP",
    "MRP",
    "Online",
  ];
  const widths = [
    { width: 4 },
    { width: 20 },
    { width: 9 },
    { width: 11 },
    { width: 8 },
    { width: 8, align: "right" },
    { width: 9, align: "right" },
    { width: 9, align: "right" },
    { width: 9, align: "right" },
  ];

  const body = [];
  if (priceLookupList?.data !== null)
    for (let i = 0; i < priceLookupList?.data?.length; i++) {
      const it = priceLookupList?.data[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.category },
        { data: it.type },
        { data: it.purchase_price },
        { data: it.rrp },
        { data: it.mrp },
        { data: it.online },
      ]);
    }

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  if (page?.path !== "priceLookup") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="PRICE LOOKUP"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={widths} heads={heads} body={body} />
      <MyTableCounter1
        props={{
          total: priceLookupList?.page?.totalCount,
          onTap: (p, l) => {
            console.log(p);
            console.log(l);
          },
        }}
      />
    </StrictMode>
  );
}

export function StockLookupTable({ state, setState }) {
  const { stockLookupList, page } = state;
  const body = [];
  if (stockLookupList?.data !== null)
    for (let i = 0; i < stockLookupList?.data?.length; i++) {
      const it = stockLookupList?.data[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.category },
        { data: it.type },
        { data: it.stock + " " + it.primary_unit },
        { data: it.stock + " " + it.secondary_unit },
      ]);
    }

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  if (page?.path !== "stockLookup") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK LOOKUP"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
export function PriceChargeTable({ state, setState }) {
  const { allProduct, page } = state;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.category_name },
        { data: it.type },
        { data: it.cost },
        { data: it.selling, type: 2 },
        { data: it.MRP },
        { data: it.tax },
        { data: it.stock },
        { data: it.MSL },
      ]);
    }

  const _onCLick = (k) =>
    setState({
      addPriceChange: {
        name: allProduct[k].name,
        product_id: allProduct[k].id,
        // mrp: allProduct[k].MRP,
        // rrp: allProduct[k].rrp,
        // online: allProduct[k].online,
        // purchase_price: allProduct[k].purchase_price,
      },
    });

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  if (page?.path !== "priceCharge") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="PRICE CHARGE"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1
        lg
        widths={page.widths}
        heads={page.heads}
        body={body}
        onclick={_onCLick}
      />
      <MyTableCounter1 props={{ total: 50 }} />
      <PriceChangePopup state={state} setState={setState} />
    </StrictMode>
  );
}
export function MslLookupTable({ state, setState }) {
  const { page, maslLookupList } = state;
  const body = [];
  if (maslLookupList?.data !== null)
    for (let i = 0; i < maslLookupList?.data?.length; i++) {
      const it = maslLookupList?.data[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.category },
        { data: it.type },
        { data: it.MSL + " " + it.primary_unit },
        { data: it.stock + " " + it.primary_unit },
        { data: Number(it.stock) - Number(it.MSL) + " " + it.primary_unit },
      ]);
    }

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  if (page?.path !== "mslLookup") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="MSL LOOKUP"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

function PriceChangePopup({ state, setState }) {
  const { loading, error, addPriceChange } = state;

  if (addPriceChange === undefined) return null;
  const popupProps1 = {
    close: () => setState({ addPriceChange: undefined }),
    title: addPriceChange?.name,
    error,
    loading,
    medium: true,
    onChange: (e) => (addPriceChange[e.target.id] = e.target.value),
    submit: () => postPriceChange(state, setState),
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1
          title={
            <span>
              MRP <span style={{ fontSize: ".6vw" }}>Maximum Retail Price</span>
            </span>
          }
        >
          <Input
            placeholder="0.00"
            style={{ width: "100%" }}
            unit="INR"
            id="mrp"
            // defaultValue={addPriceChange?.mrp}
          />
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Online Price">
          <Input
            placeholder="0.00"
            style={{ width: "100%" }}
            unit="INR"
            id="online"
            // defaultValue={addPriceChange?.online}
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1
          title={
            <span>
              RRP{" "}
              <span style={{ fontSize: ".6vw" }}>Recommended Retail Price</span>
            </span>
          }
        >
          <Input
            placeholder="0.00"
            style={{ width: "100%" }}
            unit="INR"
            id="rrp"
            defaultValue={addPriceChange?.rrp}
          />
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Purchase Price">
          <Input
            placeholder="0.00"
            style={{ width: "100%" }}
            unit="INR"
            id="purchase_price"
            defaultValue={addPriceChange?.purchase_price}
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
