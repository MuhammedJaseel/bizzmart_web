import React, { Component, StrictMode } from "react";
import { estimateList, invoiceList } from "../module/dummydata";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { MyForm1 } from "./widget_form";
import DrawerView1 from "./widget_view";
import "../style/hsl.css";

const pTitles = ["Sales Invoices", "Sales Estimates"];
const titS = {
  tit: [`Invoice List`, `Estimate List`],
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
      invoice: null,
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
      searchPh: page === 0 ? "Search an invoices" : "Search an estimates",
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAdd: () => setState({ addPage: true }),
      title: page === 0 ? "+ New Invoice" : "+ New Estmates",
      drowelList: [
        { title: "Add New Invoice", fun: () => setState({ addPage: true }) },
        { title: "Add New Estimate", fun: () => setState({ addPage: true }) },
      ],
      onShare: null,
      onDownload: null,
    };
    const bodyR = !addPage ? <HeaderButtens1 props={bodyRBody} /> : null;

    return (
      <StrictMode>
        <Header1 title="SALES" bodyL={pTitles[page]} bodyR={bodyR} />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4 title={titS.tit[page]} desc={titS.desc[page]} body={filter} />
        <HomeSalesInvoicesTable state={state} setState={setState} />
        <HomeSalesEstimatesTable state={state} setState={setState} />
        <HomeSalesInvoicesForm state={state} setState={setState} />
        <HomeSalesEstimatesForm state={state} setState={setState} />
        <DrawerView1 state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function HomeSalesInvoicesTable({ state, setState }) {
  const { page, addPage, allInvoice } = state;
  const widths = [
    { width: 4 },
    { width: 10 },
    { width: 10 },
    { width: 25 },
    { width: 10 },
    { width: 10, right: true },
    { width: 10, right: true },
    { width: 8 },
  ];
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
  const onclick = (v) => setState({ invoice: v });
  if (page !== 0 || addPage) return null;
  return [
    <MyTable1 widths={widths} heads={heads0} body={body} onclick={onclick} />,
    <MyTableCounter1 props={{ total: 100 }} />,
  ];
}
function HomeSalesEstimatesTable({ state, setState }) {
  const { page, addPage, allEstimate } = state;
  const widths = [
    { width: 4 },
    { width: 10 },
    { width: 10 },
    { width: 30 },
    { width: 10 },
    { width: 10, right: true },
    { width: 5 },
  ];
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
  return [
    <MyTable1 widths={widths} heads={heads1} body={body} />,
    <MyTableCounter1 props={{ total: 100 }} />,
  ];
}

function HomeSalesInvoicesForm({ state, setState }) {
  if (state.page !== 0 || !state.addPage) return null;
  return <MyForm1 />;
}
function HomeSalesEstimatesForm({ state, setState }) {
  if (state.page !== 1 || !state.addPage) return null;
  return <MyForm1 />;
}
