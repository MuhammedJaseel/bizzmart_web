import React, { Component } from "react";
import { estimateList, invoiceList } from "../module/dummydata";
import { MyTable1 } from "./widget_table";
import {
  Header1,
  Header2,
  Header4,
  HeaderButtens1,
  MyForm1,
  TitleFilter1,
} from "./widget";
import "../style/hsl.css";

const pTitles = ["Sales Invoices", "Sales Estimates"];
const titles = {
  title: [`Invoice List`, `Estimate List`],
  titleAdd: [`Invoice List`, `Estimate List`],
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
      addPage: false,
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
    const { page, addPage } = state;
    const filterBody = {
      searchPh: "Search an Invoices",
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAd: () => setState({ addPage: true }),
      title: page === 0 ? "+ New Invoice" : "+ New Estmates",
      drowelList: [
        { title: "Add New Invoice", fun: () => alert() },
        { title: "Add New Estimate", fun: () => alert() },
      ],
    };
    const bodyR = !addPage ? <HeaderButtens1 props={bodyRBody} /> : null;

    return (
      <React.StrictMode>
        <Header1 title="SALES" bodyR={bodyR} />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4
          title={titles.title[page]}
          desc={titles.desc[page]}
          body={filter}
        />
        <HomeSalesInvoicesTable state={state} setState={setState} />
        <HomeSalesEstimatesTable state={state} setState={setState} />
        <HomeSalesInvoicesForm state={state} setState={setState} />
        <HomeSalesEstimatesForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeSalesInvoicesTable({ state, setState }) {
  const { page, addPage, allInvoice } = state;

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
  if (page !== 0 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} />
    </React.StrictMode>
  );
}
function HomeSalesEstimatesTable({ state, setState }) {
  const { page, addPage, allEstimate } = state;

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
  if (page !== 1 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
    </React.StrictMode>
  );
}

function HomeSalesInvoicesForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 0 || !addPage) return null;
  return (
    <React.StrictMode>
      <MyForm1 />
    </React.StrictMode>
  );
}
function HomeSalesEstimatesForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 1 || !addPage) return null;
  return (
    <React.StrictMode>
      <MyForm1 />
    </React.StrictMode>
  );
}
