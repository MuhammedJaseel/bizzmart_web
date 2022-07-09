import React, { Component } from "react";
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

  const widths = [4, 18, 9, 9, 10, 15, 8, 8, 6];
  const body = [];
  if (allCustomer !== null)
    for (let i = 0; i < allCustomer.length; i++) {
      const it = allCustomer[i];
      body.push([
        { data: it.image, data2: it.customerName, type: 1 },
        { data: it.customerName },
        { data: it.loyaltyTire, type: 2 },
        { data: it.status, type: 2 },
        { data: it.phoneNumber },
        { data: it.email },
        { data: it.lastSean },
        { data: it.turnover },
        { data: it.balance },
      ]);
    }
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} onclick={onclick} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}
function HomePartiesSuppliersTable({ state, setState }) {
  const { page, addPage, allSupplier } = state;

  const widths = [4, 25, 12, 12, 22, 12, 6];
  const body = [];
  if (allSupplier !== null)
    for (let i = 0; i < allSupplier.length; i++) {
      const it = allSupplier[i];
      body.push([
        { data: it.image, data2: it.supplierName, type: 1 },
        { data: it.supplierName },
        { data: it.status, type: 2 },
        { data: it.phoneNumber },
        { data: it.email },
        { data: it.lastSean },
        { data: it.turnover },
      ]);
    }
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
