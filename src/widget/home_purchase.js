import React, { Component } from "react";
import { purchaseList, purchaseOrder } from "../module/dummydata";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { MyForm1 } from "./widget_form";
import "../style/hpr.css";

const pTitles = ["Purchase List", "Purchase Order"];
const desc = [
  `Shows all the recorded purchase entries against the selected date range`,
  `Shows all the recorded purchase order  against the selected date range`,
];

const heads0 = [
  null,
  "GRN#",
  "Date",
  "Supplier",
  "Invoice #",
  "Total",
  "Amount Due",
  "Status",
];
const heads1 = [null, "PON#", "Date", "Supplier", "Total", "Action"];

export default class HomePurchase extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      error: null,
      loading: false,
      addPage: false,
      // /////////////////////////////
      allPurchaseList: [],
      allPurchaseOrder: [],
    };
  }

  componentDidMount() {
    this.setState({
      allPurchaseList: purchaseList,
      allPurchaseOrder: purchaseOrder,
    });
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, addPage } = state;

    const filterBody = {
      searchPh: "Search an asset",
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAdd: () => setState({ addPage: true }),
      title: page === 0 ? "+ New Purchase" : "+ New Purchase Order",
      drowelList: [
        { title: "Add Purchase", fun: () => alert() },
        { title: "Add Purchase Order", fun: () => alert() },
      ],
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1 title="Purchase" bodyR={addPage ? null : bodyR} />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4 title={pTitles[page]} desc={desc[page]} body={filter} />
        <HomePurchaseListTable state={state} setState={setState} />
        <HomePurchaseOrderTable state={state} setState={setState} />
        <HomePurchaseListForm state={state} setState={setState} />
        <HomePurchaseOrderForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomePurchaseListTable({ state, setState }) {
  const { page, allPurchaseList, addPage } = state;

  const widths = [
    { width: 4 },
    { width: 12 },
    { width: 12 },
    { width: 22 },
    { width: 10 },
    { width: 12, right: true },
    { width: 12, right: true },
    { width: 5 },
  ];
  const body = [];
  if (allPurchaseList !== null)
    for (let i = 0; i < allPurchaseList.length; i++) {
      const it = allPurchaseList[i];
      body.push([
        { data: it.image, data2: it.supplier, type: 1 },
        { data: it.grn, type: 3 },
        { data: it.date },
        { data: it.supplier, type: 3 },
        { data: it.invoice },
        { data: it.total },
        { data: it.amountDue },
        { data: it.status },
      ]);
    }
  if (page !== 0 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}
function HomePurchaseOrderTable({ state, setState }) {
  const { page, allPurchaseOrder, addPage } = state;

  const widths = [
    { width: 4 },
    { width: 8 },
    { width: 8 },
    { width: 35 },
    { width: 15, right: true },
    { width: 5 },
  ];
  const body = [];
  if (allPurchaseOrder !== null)
    for (let i = 0; i < allPurchaseOrder.length; i++) {
      const it = allPurchaseOrder[i];
      body.push([
        { data: it.image, data2: it.supplier, type: 1 },
        { data: it.pon, type: 2 },
        { data: it.date },
        { data: it.supplier, type: 2 },
        { data: it.total },
        { data: it.action, type: 2 },
      ]);
    }
  if (page !== 1 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}

function HomePurchaseListForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 0 || !addPage) return null;
  return (
    <React.StrictMode>
      <MyForm1 />
    </React.StrictMode>
  );
}

function HomePurchaseOrderForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 1 || !addPage) return null;
  return (
    <React.StrictMode>
      <MyForm1 />
    </React.StrictMode>
  );
}
