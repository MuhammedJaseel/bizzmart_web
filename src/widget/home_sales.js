import React, { Component, StrictMode } from "react";
import { estimateList, invoiceList } from "../module/dummydata";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { MyForm1 } from "./widget_form";
import DrawerView1 from "./widget_view";
import "../style/hsl.css";
import { salesGetSales } from "../method/home_sales";

const pTitles = ["Sales Invoices", "Sales Estimates"];
const titS = {
  tit: [`Invoice List`, `Estimate List`],
  desc: [
    `Shows all the recorded sales invoices against the selected date range.`,
    `Shows all the recorded estimate against the selected date range.`,
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
      invoicePaging: {},
      estimatePaging: {},
      form: null,
      item: null,
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    salesGetSales(state, setState);
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, form } = state;

    const filterBody = {
      searchPh: page === 0 ? "Search an invoices" : "Search an estimates",
    };
    const filter = form === null ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAdd: () =>
        setState({ form: { formType: page === 0 ? "invoice" : "estimate" } }),
      title: page === 0 ? "+ New Invoice" : "+ New Estimates",
      drowelList: [
        {
          title: "Add New Invoice",
          fun: () => setState({ form: { formType: "invoice" } }),
        },
        {
          title: "Add New Estimate",
          fun: () => setState({ form: { formType: "estimate" } }),
        },
      ],
      onShare: null,
      onDownload: null,
    };
    const bodyR = form === null ? <HeaderButtens1 props={bodyRBody} /> : null;

    return (
      <StrictMode>
        <Header1 title="SALES" bodyL={pTitles[page]} bodyR={bodyR} />
        <Header2
          titles={pTitles}
          page={page}
          onTap={(k) => setState({ page: k, form: null })}
        />
        <Header4 title={titS.tit[page]} desc={titS.desc[page]} body={filter} />
        <HomeSalesInvoicesTable state={state} setState={setState} />
        <HomeSalesEstimatesTable state={state} setState={setState} />
        <HomeSalesForm state={state} setState={setState} />
        <DrawerView1 state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function HomeSalesInvoicesTable({ state, setState }) {
  const { page, form, allInvoice } = state;
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
  // for (let i = 0; i < allInvoice.length; i++) {
  //   const it = allInvoice[i];
  body.push([
    { data: "it.image", data2: "it.customer", type: 1 },
    { data: "it.invoice" },
    { data: "it.date", type: 2 },
    { data: "it.customer", data2: "it.type", type: 2 },
    { data: "it.phoneNumber" },
    { data: "it.total" },
    { data: "it.action" },
    { data: "it.status" },
  ]);
  // }
  const onclick = (v) => setState({ item: v });
  if (page !== 0 || form !== null) return null;
  return [
    <MyTable1 widths={widths} heads={heads0} body={body} onclick={onclick} />,
    <MyTableCounter1 props={{ total: 100 }} />,
  ];
}
function HomeSalesEstimatesTable({ state, setState }) {
  const { page, form, allEstimate } = state;
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
  if (page !== 1 || form !== null) return null;
  return [
    <MyTable1 widths={widths} heads={heads1} body={body} />,
    <MyTableCounter1 props={{ total: 100 }} />,
  ];
}

function HomeSalesForm({ state, setState }) {
  const { form } = state;
  if (form === null) return null;
  return <MyForm1 state={state} setState={setState} />;
}

// [{"variant_name": "el","bar_code": "asa","hsncode": "sas","ean": "12","purchase_price": "21",
// "cost_price": "21",
// "cost_with_tax": "21",
// "selling_price": "21",
// "online_price": "1",
// "cost_tax_amount": "1",
// "mrp": "21",
// "stock_price": "12",
// "opening_stock": "21",
// "min_stock_level": "21",}]
