import React, { StrictMode } from "react";
import { getProducts } from "../method/home_inventory";
import { inventoryFormData } from "../module/home_inventory";
import { inventoryPopupsData } from "../module/home_inventory";
import { Header1, Header4, HeaderButtens1 } from "./widget";
import { MyTable1, MyTableCounter1 } from "./widget_table";

export default function HomeInventoryTables({ state, setState }) {
  return (
    <StrictMode>
      <ProductTable state={state} setState={setState} />
      <ServiceTable state={state} setState={setState} />
      <AssetTable state={state} setState={setState} />
      <PriceLookupTable state={state} setState={setState} />
      <StockLookupTable state={state} setState={setState} />
      <PriceChargeTable state={state} setState={setState} />
      <MslLookupTable state={state} setState={setState} />
      <StockIssueTable state={state} setState={setState} />
      <StockTransferTable state={state} setState={setState} />
      <StockReceivedTable state={state} setState={setState} />
      <StockReturnTable state={state} setState={setState} />
      <StockTakingTable state={state} setState={setState} />
      <StockTrailTable state={state} setState={setState} />
      <StockLabelsTable state={state} setState={setState} />
      <PromotionsTable state={state} setState={setState} />
    </StrictMode>
  );
}

function ProductTable({ state, setState }) {
  const { allProduct, page, setPage, product, productPaging } = state;
  const title = "INVENTORY";
  const bodyRBody = {
    makeAdd: () => {
      setPage(inventoryFormData.filter((k) => k.path === "addProdect")[0]);
      product.type = 1;
      product.is_service = 0;
      setState({ product });
    },
    title: "+ New Product",
    drowelList: null,
    onShare: null,
    onDownload: null,
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.categoryName },
        { data: it.type },
        { data: it.cost },
        { data: it.selling, type: 2 },
        { data: it.MRP },
        { data: it.tax },
        { data: it.stock },
        { data: it.MSL },
      ]);
    }

  const counterProps = {
    total: productPaging.totalCount,
    onTap: (v) => {
      productPaging.page_number = v;
      getProducts(state, setState);
    },
  };

  if (page?.path !== "prodect") return null;
  return (
    <StrictMode>
      <Header1 title={title} bodyL={page.title} onTap={setPage} bodyR={bodyR} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={counterProps} />
    </StrictMode>
  );
}
function ServiceTable({ state, setState }) {
  const { allProduct, page, setPage, product } = state;
  const title = "INVENTORY";
  const bodyRBody = {
    makeAdd: () => {
      setPage(inventoryFormData.filter((k) => k.path === "addService")[0]);
      product.type = 2;
      product.is_service = 1;
      setState({ product });
    },
    title: "+ New Service",
    drowelList: null,
    onShare: null,
    onDownload: null,
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      // if (it.is_service === 1)
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
  if (page?.path !== "service") return null;
  return (
    <StrictMode>
      <Header1 title={title} bodyL={page.t2} onTap={setPage} bodyR={bodyR} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function AssetTable({ state, setState }) {
  const { allAsset, page, setPage } = state;
  const title = "INVENTORY";
  const bodyRBody = {
    makeAdd: () =>
      setPage(inventoryFormData.filter((k) => k.path === "addAsset")[0]),
    title: "+ New Asset",
    drowelList: [
      {
        title: "Asset Transfer",
        fun: () => setState({ popup: inventoryPopupsData[0] }),
      },
      {
        title: "Asset Writeoff",
        fun: () => setState({ popup: inventoryPopupsData[1] }),
      },
      { title: "Asset Purchase", fun: () => alert() },
    ],
    onShare: null,
    onDownload: null,
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const body = [];
  if (allAsset !== null)
    for (let i = 0; i < allAsset.length; i++) {
      const it = allAsset[i];
      body.push([
        { data: it.image, data2: it.assetName, type: 1 },
        { data: it.assetName, data2: it.assetCode, type: 2 },
        { data: it.category },
        { data: it.branch },
        { data: it.custodian },
        { data: it.bougthDate },
        { data: it.cost },
        { data: it.bookValue },
      ]);
    }
  if (page?.path !== "asset") return null;
  return (
    <StrictMode>
      <Header1 title={title} bodyL={page.t2} onTap={setPage} bodyR={bodyR} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function PriceLookupTable({ state, setState }) {
  const { allProduct, page } = state;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.categoryName },
        { data: it.type },
        { data: it.cost },
        { data: it.selling, type: 2 },
        { data: it.mrp },
        { data: it.tax },
        { data: it.stock },
        { data: it.msl },
      ]);
    }
  if (page?.path !== "priceLookup") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function StockLookupTable({ state, setState }) {
  const { allProduct, page } = state;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.categoryName },
        { data: it.type },
        { data: it.stockPrimary },
        { data: it.mslSecondary },
      ]);
    }
  if (page?.path !== "stockLookup") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function PriceChargeTable({ state, setState }) {
  const { allProduct, page } = state;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.categoryName },
        { data: it.type },
        { data: it.cost },
        { data: it.selling, type: 2 },
        { data: it.mrp },
        { data: it.tax },
        { data: it.stock },
        { data: it.msl },
      ]);
    }
  if (page?.path !== "priceCharge") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function MslLookupTable({ state, setState }) {
  const { allProduct, page } = state;
  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.categoryName },
        { data: it.type },
        { data: it.msl },
        { data: it.stock },
        { data: it.stickDifference },
      ]);
    }
  if (page?.path !== "mslLookup") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function StockIssueTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }
  if (page?.path !== "stockIssue") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function StockTransferTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferFrom },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }
  if (page?.path !== "stockTransfer") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function StockReceivedTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
      ]);
    }
  if (page?.path !== "stockReceived") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function StockReturnTable({ state, setState }) {
  const { allIssue, page } = state;
  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }
  if (page?.path !== "stockReturn") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={page.widths} heads={page.heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}
function StockTakingTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stockTaking") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
function StockTrailTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stockTaking") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
function StockLabelsTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stocklabels") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
function PromotionsTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "promotions") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
