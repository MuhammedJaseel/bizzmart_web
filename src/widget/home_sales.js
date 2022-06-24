import React, { Component } from "react";
import { estimateList, invoiceList } from "../module/dummydata";
import { Header1, Header2, Header4, MyTable1 } from "./widget";
import "../style/hsl.css";

const pTitles = ["Sales Invoices", "Sales Estimates"];
const titles = {
  title: [`Invoice List`, `Estimate List`],
  desc: [
    `Shows all the recorded sales invoices against the selected date range`,
    `Shows all the recorded estimate against the selected date range`,
  ],
};
const heads0 = [
  null,
  "Invoice #",
  "Date",
  "Customer",
  "Phone Number",
  "Total",
  "Amount Due",
  "Status",
];
const heads1 = [
  null,
  "Estimate #",
  "Date",
  "Customer",
  "Phone Number",
  "Total",
  "Action",
];

export default class HomeSales extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      error: null,
      loading: false,
      // /////////////////////////////
      allInvoice: [],
      allEstimate: [],
    };
  }

  componentDidMount() {
    this.setState({ allInvoice: invoiceList, allEstimate: estimateList });
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;

    return (
      <React.StrictMode>
        <Header1 title="SALES" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4 title={titles.title[page]} desc={titles.desc[page]} />
        <HomeSalesInvoicesTable state={state} setState={setState} />
        <HomeSalesEstimatesTable state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeSalesInvoicesTable({ state, setState }) {
  const { page, allInvoice } = state;

  const widths = [4, 10, 10, 25, 15, 15, 10, 8];
  const body = [];
  if (allInvoice !== null)
    for (let i = 0; i < allInvoice.length; i++) {
      const it = allInvoice[i];
      body.push([
        { data: it.image, data2: it.customer, type: 1 },
        { data: it.invoice },
        { data: it.date, type: 2 },
        { data: it.customer, data2: it.type, type: 2 },
        { data: it.phoneNumber },
        { data: it.total },
        { data: it.action },
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
function HomeSalesEstimatesTable({ state, setState }) {
  const { page, allEstimate } = state;

  const widths = [4, 10, 10, 30, 15, 15, 10];
  const body = [];
  if (allEstimate !== null)
    for (let i = 0; i < allEstimate.length; i++) {
      const it = allEstimate[i];
      body.push([
        { data: it.image, data2: it.customer, type: 1 },
        { data: it.estimate },
        { data: it.date, type: 2 },
        { data: it.customer, data2: it.type, type: 2 },
        { data: it.phoneNumber },
        { data: it.total },
        { data: it.action },
      ]);
    }
  if (page !== 1) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
    </React.StrictMode>
  );
}
