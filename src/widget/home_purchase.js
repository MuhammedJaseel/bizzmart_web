import React, { Component } from "react";
import { purchaseList, purchaseOrder } from "../module/dummydata";
import "../style/hpr.css";
import { Header1, Header2, Header4, MyTable1 } from "./widget";

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
    const { page } = state;

    return (
      <React.StrictMode>
        <Header1 title="Purchase" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4 title={pTitles[page]} desc={desc[page]} />
        <HomePurchaseListTable state={state} setState={setState} />
        <HomePurchaseOrderTable state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomePurchaseListTable({ state, setState }) {
  const { page, allPurchaseList } = state;

  const widths = [4, 12, 12, 24, 12, 12, 12, 8];
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
  if (page !== 0) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} />
    </React.StrictMode>
  );
}
function HomePurchaseOrderTable({ state, setState }) {
  const { page, allPurchaseOrder } = state;

  const widths = [4, 15, 15, 35, 15, 8];
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
  if (page !== 1) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
    </React.StrictMode>
  );
}
