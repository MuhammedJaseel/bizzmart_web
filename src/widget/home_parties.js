import React, { Component, StrictMode } from "react";
import { customerList, suppliersList } from "../module/dummydata";
import "../style/hdb.css";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import {
  Header1,
  Header2,
  Header4,
  HeaderButtens1,
  TitleFilter1,
} from "./widget";
import { DrawerForm1 } from "./widget_form";
import { DrowerView2 } from "./widget_view";

const pTitles = ["Customers", "Suppliers"];
const titles = {
  title: [`Customers List`, `Suppliers List`],
  titleAdd: [`Customers List`, `Suppliers List`],
  desc: [
    `Shows all the custmer recorded against your business`,
    `Shows all the suppliers recorded against your business`,
  ],
};

const heads0 = [
  null,
  "Custmer Name",
  "Loyalty Tire",
  "Status",
  "Phone Number",
  "Email",
  "Last Seen",
  "Turnover",
  "Balance",
];
const heads1 = [
  null,
  "Supplier Name",
  "Status",
  "Phone Number",
  "Email",
  "Last Seen",
  "Turnover",
];

const statDot = (v) => <div className={"hprA_" + v} />;

export default class HomeParties extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      addPage: false,
      allCustomer: [],
      customer: null,
      allSupplier: [],
    };
  }
  componentDidMount() {
    this.setState({ allCustomer: customerList, allSupplier: suppliersList });
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, addPage, customer } = state;
    const titleL = page === 0 ? "COUSTOMERS" : "SUPPLIERS";

    const filterBody = {
      searchPh: "Search a " + (page === 0 ? "customer" : "sippliers"),
      noDate: true,
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAdd: () => setState({ addPage: true }),
      title: page === 0 ? "+ New Customer" : "+ New Suppliers",
      drowelList: null,
    };
    const bodyR = addPage ? null : <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1 title="PARTIES" bodyL={titleL} bodyR={bodyR} />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4
          title={titles.title[page]}
          desc={titles.desc[page]}
          body={filter}
        />
        <HomePartiesCoustomerTable state={state} setState={setState} />
        <HomePartiesSuppliersTable state={state} setState={setState} />
        <HomePartiesCoustomerForm state={state} setState={setState} />
        <HomePartiesSuppliersForm state={state} setState={setState} />
        <DrowerView2
          show={customer !== null}
          close={() => setState({ customer: null })}
        />
      </React.StrictMode>
    );
  }
}

function HomePartiesCoustomerTable({ state, setState }) {
  const { page, addPage, allCustomer } = state;

  const onclick = (v) => setState({ customer: v });

  const widths = [
    { width: 4 },
    { width: 18 },
    { width: 9 },
    { width: 9 },
    { width: 10 },
    { width: 20 },
    { width: 8 },
    { width: 6, right: true },
    { width: 6, right: true },
  ];
  const body = [];
  if (allCustomer !== null)
    for (let i = 0; i < allCustomer.length; i++) {
      const it = allCustomer[i];
      body.push([
        { data: it.image, data2: it.customerName, type: 1 },
        { data: it.customerName },
        { data: [statDot("y"), it.loyaltyTire], type: 2 },
        { data: [statDot("g"), it.status], type: 2 },
        { data: it.phoneNumber },
        { data: it.email },
        { data: it.lastSean },
        { data: it.turnover, data2: it.turnover, type: 2 },
        { data: it.balance, data2: it.balance, type: 2 },
      ]);
    }
  if (page === 1) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} onclick={onclick} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}
function HomePartiesSuppliersTable({ state, setState }) {
  const { page, addPage, allSupplier } = state;

  const widths = [
    { width: 4 },
    { width: 25 },
    { width: 12 },
    { width: 12 },
    { width: 22 },
    { width: 12 },
    { width: 6 },
  ];
  const body = [];
  if (allSupplier !== null)
    for (let i = 0; i < allSupplier.length; i++) {
      const it = allSupplier[i];
      body.push([
        { data: it.image, data2: it.supplierName, type: 1 },
        { data: it.supplierName },
        { data: [statDot("g"), it.status], type: 2 },
        { data: it.phoneNumber },
        { data: it.email },
        { data: it.lastSean },
        { data: it.turnover },
      ]);
    }
  if (page === 0) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}

function HomePartiesCoustomerForm({ state, setState }) {
  const { page, addPage } = state;
  const body = {
    show: page === 0 && addPage,
    close: () => setState({ addPage: false }),
  };
  return <DrawerForm1 props={body} />;
}

function HomePartiesSuppliersForm({ state, setState }) {
  const { page, addPage } = state;
  const body = {
    show: page === 1 && addPage,
    close: () => setState({ addPage: false }),
  };
  return <DrawerForm1 props={body} />;
}
