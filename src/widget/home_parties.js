import React, { Component } from "react";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { DrawerForm1 } from "./widget_form";
import { DrowerView2 } from "./widget_view";
import { getAllCustomers, getAllSuppliers } from "../method/home_parties";
import { postSuplier } from "../method/home_parties";
import { postCustomer } from "../method/home_parties";
import { partiesHeads0, partiesHeads1 } from "../module/home_parties";
import { partiesTitles, patriesPageTitles } from "../module/home_parties";
import "../style/hdb.css";

const pTitles = patriesPageTitles;
const titles = partiesTitles;
const heads0 = partiesHeads0;
const heads1 = partiesHeads1;

const statDot = (v) => <div className={"hprA_" + v} />;

export default class HomeParties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      addPage: false,
      allCustomer: [],
      allSupplier: [],
      customerPaging: {},
      supplierPaging: {},
      customer: null,
      supplier: null,
      addCustomer: {},
      addSupplier: {},
      succesPop: props.succesPop,
    };
  }
  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getAllCustomers(state, setState);
    getAllSuppliers(state, setState);
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
        <HomePartiesCoustomerEditForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomePartiesCoustomerTable({ state, setState }) {
  const { page, customerPaging, allCustomer } = state;

  const onclick = (v) => setState({ customer: allCustomer[v] });

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
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name },
        { data: [statDot("y"), it.loyaltyTire], type: 2 },
        { data: [statDot("g"), it.status], type: 2 },
        { data: it.phone },
        { data: it.email },
        { data: it.last_seen_date },
        { data: it.credit_limit, data2: it.turnover, type: 2 },
        { data: it.opening_balance, data2: it.balance, type: 2 },
      ]);
    }
  const counterProps = {
    total: customerPaging.totalCount,
    onTap: (v) => {
      customerPaging.page_number = v;
      getAllCustomers(state, setState);
    },
  };
  if (page === 1) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads0} body={body} onclick={onclick} />
      <MyTableCounter1 props={counterProps} />
    </React.StrictMode>
  );
}
function HomePartiesSuppliersTable({ state, setState }) {
  const { page, supplierPaging, allSupplier } = state;

  const onclick = (v) => setState({ customer: allSupplier[v] });

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
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name },
        { data: [statDot("g"), it.status], type: 2 },
        { data: it.phone },
        { data: it.email },
        { data: it.last_seen_date },
        { data: it.total_invoice_amount },
      ]);
    }

  const counterProps = {
    total: supplierPaging.totalCount,
    onTap: (v) => {
      supplierPaging.page_number = v;
      getAllSuppliers(state, setState);
    },
  };

  if (page === 0) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads1} body={body} onclick={onclick} />
      <MyTableCounter1 props={counterProps} />
    </React.StrictMode>
  );
}

function HomePartiesCoustomerForm({ state, setState }) {
  const { loading, error, page, addPage, addCustomer } = state;
  const body = {
    title: "New customer",
    show: page === 0 && addPage,
    close: () => setState({ addPage: false }),
    submit: () => postCustomer(addCustomer, state, setState),
    loading,
    error,
    type: "customer",
  };
  return (
    <form onChange={(e) => (addCustomer[e.target.id] = e.target.value)}>
      <DrawerForm1 props={body} />
    </form>
  );
}

function HomePartiesSuppliersForm({ state, setState }) {
  const { loading, error, page, addPage, addSupplier } = state;
  const body = {
    title: "New suppliers",
    show: page === 1 && addPage,
    close: () => setState({ addPage: false }),
    submit: () => postSuplier(addSupplier, state, setState),
    loading,
    error,
    type: "supplier",
  };
  return (
    <form onChange={(e) => (addSupplier[e.target.id] = e.target.value)}>
      <DrawerForm1 props={body} />
    </form>
  );
}

function HomePartiesCoustomerEditForm({ state, setState }) {
  const { customer } = state;
  const body = {
    show: customer !== null,
    item: customer,
    close: () => setState({ customer: null }),
  };
  return (
    <form
      onChange={(e) => (customer[e.target.id] = e.target.value)}
      onSubmit={(e) => {
        e.preventDefault();
        console.log(customer);
      }}
    >
      <DrowerView2 props={body} />
    </form>
  );
}
