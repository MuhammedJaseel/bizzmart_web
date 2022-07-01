import React, { Component } from "react";
import { customerList, suppliersList } from "../module/dummydata";
import "../style/hdb.css";
import { Header1, Header2, Header4, MyTable1 } from "./widget";

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
      allSupplier: [],
    };
  }

  componentDidMount() {
    this.setState({ allCustomer: customerList, allSupplier: suppliersList });
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, addPage } = state;
    const titleL = page === 0 ? "COUSTOMERS" : "SUPPLIERS";

    return (
      <React.StrictMode>
        <Header1 title="PARTIES" bodyL={titleL} />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <Header4 title={titles.title[page]} desc={titles.desc[page]} />
        <HomePartiesCoustomerTable state={state} setState={setState} />
        <HomePartiesSuppliersTable state={state} setState={setState} />
        <HomePartiesCoustomerForm state={state} setState={setState} />
        <HomePartiesSuppliersForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomePartiesCoustomerTable({ state, setState }) {
  const { page, addPage, allCustomer } = state;

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
  if (page !== 0 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} />
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
  if (page !== 1 || addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} />
    </React.StrictMode>
  );
}

function HomePartiesCoustomerForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 0 || !addPage) return null;
  return <React.StrictMode></React.StrictMode>;
}
function HomePartiesSuppliersForm({ state, setState }) {
  const { page, addPage } = state;
  if (page !== 1 || !addPage) return null;
  return <React.StrictMode></React.StrictMode>;
}
