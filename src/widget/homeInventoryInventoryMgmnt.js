import { StrictMode, useState } from "react";
import { setAddStockIssueItemStruct } from "../module/homeInventoryInventoryMgmnt";
import { Header1, Header2, Header4, HeaderButtens1 } from "./widget";
import { MyTable1, MyTableCounter1 } from "./widget_table";

export function StockIssueTable({ state, setState }) {
  const { allStockIssue, page } = state;
  const body = [];
  if (allStockIssue?.data !== null)
    for (let i = 0; i < allStockIssue?.data?.length; i++) {
      const it = allStockIssue?.data[i];
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

  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ Issue Stock",
    makeAdd: () =>
      setState({
        page: { path: "addIssueStock" },
        addIssueStock: setAddStockIssueItemStruct(),
      }),
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 8 },
  ];

  if (page?.path !== "stockIssue") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK ISSUE"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockTransferTable({ state, setState }) {
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

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Issued", "Received"];

  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ Stock Transfer",
    makeAdd: () =>
      setState({
        page: { path: "addStockTransfer" },
        addStockTransfer: { items: [] },
      }),
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer From",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 12 },
    { width: 8 },
  ];

  if (page?.path !== "stockTransfer") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK TRANSFER"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReceivedTable({ state, setState }) {
  const { allStockRecevied, allStockAcknowledged, page } = state;
  const body = [];

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Issued", "Acknowledged"];

  const items = subPage === 0 ? allStockRecevied : allStockAcknowledged;

  if (items?.data !== null)
    for (let i = 0; i < items?.data?.length; i++) {
      const it = items?.data[i];
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

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer From",
    "Description",
    "Count",
    "Amount",
  ];
  const widths = [
    { width: 1 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 16 },
    { width: 10 },
  ];

  if (page?.path !== "stockReceived") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RECEIVED"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReturnTable({ state, setState }) {
  const { allStockReturn, page } = state;
  const body = [];
  if (allStockReturn?.data !== null)
    for (let i = 0; i < allStockReturn?.data?.length; i++) {
      const it = allStockReturn?.data[i];
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
  const bodyRBody = {
    drowelList: null,
    onShare: null,
    onDownload: null,
    title: "+ Stock Return",
    makeAdd: () => {
      setState({
        page: { path: "addStockReturn" },
        addStockReturn: { items: [] },
      });
    },
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 8 },
  ];

  if (page?.path !== "stockReturn") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RETURN"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 lg widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockReceivedStockReturnTable({ state, setState }) {
  const { allStockRecevied, page } = state;
  const body = [];
  if (allStockRecevied?.data !== null)
    for (let i = 0; i < allStockRecevied?.data?.length; i++) {
      const it = allStockRecevied?.data[i];
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

  const [subPage, setsubPage] = useState(0);
  const pTitles = ["Issued", "Acknowledged"];

  const bodyRBody = { drowelList: null, onShare: null, onDownload: null };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;

  const heads = [
    null,
    "Transaction #",
    "Date",
    "Transfer To",
    "Description",
    "Count",
    "Amount",
    "Status",
  ];
  const widths = [
    { width: 1 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 8 },
  ];

  if (page?.path !== "stockReceivedStockReturn") return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="STOCK RECEIVED"
        onTap={() => setState({ page: null })}
        bodyR={bodyR}
      />
      <Header2 titles={pTitles} page={subPage} onTap={setsubPage} />
      <Header4 title={page?.title} desc={page?.desc} />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 50 }} />
    </StrictMode>
  );
}

export function StockTakingTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stockTaking") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}

export function StockTrailTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stockTaking") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
export function StockLabelsTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "stocklabels") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
export function PromotionsTable({ state, setState }) {
  const { page } = state;
  if (page?.path !== "promotions") return null;
  return (
    <StrictMode>
      <Header4 title={page?.title} desc={page?.desc} />
    </StrictMode>
  );
}
