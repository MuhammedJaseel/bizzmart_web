import React, { Component } from "react";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { DrawerFormParties } from "./widget_form";
import { DrowerView2 } from "./widget_view";
import { getAllData, getSupplier } from "../method/home_parties";
import { reduceCreditOneByOne } from "../method/home_parties";
import { postMultiplePaymentRecord } from "../method/home_parties";
import { getCustomer, updateCustomer } from "../method/home_parties";
import { getAllCustomers, getAllSuppliers } from "../method/home_parties";
import { postSuplier, updateSuplier } from "../method/home_parties";
import { partiesHeads0, partiesHeads1 } from "../module/home_parties";
import { partiesTitles, patriesPageTitles } from "../module/home_parties";
import { postCustomer } from "../method/home_parties";
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
      allPlaceofSupplay: [],
      allLoyaltyType: [],
      allStates: [],
      allSupplierType: [],
      customerPaging: {},
      supplierPaging: {},
      partie: null,
      addParties: {},
      succesPop: props.succesPop,
    };
  }
  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getAllCustomers(state, setState);
    getAllSuppliers(state, setState);
    getAllData(state, setState);
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, addPage } = state;
    const titleL = page === 0 ? "COUSTOMERS" : "SUPPLIERS";

    const filterBody = {
      searchPh: "Search a " + (page === 0 ? "customer" : "sippliers"),
      noDate: true,
      onlyDate: true,
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAdd: () =>
        setState({ addPage: true, addCustomer: {}, addSupplier: {} }),
      title: page === 0 ? "+ New Customer" : "+ New Suppliers",
      drowelList: null,
    };
    const bodyR = addPage ? null : <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1 title="PARTIES" bodyL={titleL} bodyR={bodyR} />
        <Header2
          titles={pTitles}
          page={page}
          onTap={(k) => setState({ page: k, addPage: false })}
        />
        <Header4
          title={titles.title[page]}
          desc={titles.desc[page]}
          body={filter}
        />
        <HomePartiesCoustomerTable state={state} setState={setState} />
        <HomePartiesSuppliersTable state={state} setState={setState} />
        <HomePartiesAddForm state={state} setState={setState} />
        <HomePartiesEditForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomePartiesCoustomerTable({ state, setState }) {
  const { page, customerPaging, allCustomer } = state;
  const onclick = (v) => getCustomer(allCustomer[v], state, setState);
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
        { data: [statDot("y"), it.loyality_tier], type: 2 },
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
    onTap: (v, limit) => {
      customerPaging.page_number = v;
      customerPaging.limit = limit;
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

  const onclick = (v) => getSupplier(allSupplier[v], state, setState);

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
        {
          data: [
            statDot(
              it.status === "ACTIVE" ? "g" : it.status === "IDLE" ? "y" : "r"
            ),
            it.status,
          ],
          type: 2,
        },
        { data: it.phone },
        { data: it.email },
        { data: it.last_seen_date },
        { data: it.total_invoice_amount },
      ]);
    }

  const counterProps = {
    total: supplierPaging.totalCount,
    onTap: (page, limit) => {
      supplierPaging.page_number = page;
      supplierPaging.limit = limit;
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

function HomePartiesAddForm({ state, setState }) {
  const { loading, error, page, addPage, addParties } = state;
  const { allPlaceofSupplay, allStates, allLoyaltyType, allSupplierType } =
    state;
  const body = {
    title: "New " + (page === 0 ? "customer" : "suppliers"),
    show: addPage,
    close: () => setState({ addPage: false, addParties: null, error: null }),
    submit: () =>
      page === 0 ? postCustomer(state, setState) : postSuplier(state, setState),
    loading,
    error,
    type: page === 0 ? "customer" : "supplier",
    setToPay: (v) => (addParties.isToPay = v),
    allPlaceofSupplay,
    allStates,
    allLoyaltyType,
    allSupplierType,
    addParties: addParties,
  };
  return (
    <form
      onChange={(e) => {
        if (e.target.id === "image") addParties.image = e.target.files[0];
        else addParties[e.target.id] = e.target.value;
        setState({ addParties });
      }}
    >
      <DrawerFormParties props={body} />
    </form>
  );
}

function HomePartiesEditForm({ state, setState }) {
  const { partie, error, loading, page, allSupplierType } = state;
  const { allPlaceofSupplay, allStates, allLoyaltyType } = state;
  const body = {
    show: partie !== null,
    item: partie,
    error,
    loading,
    close: () => setState({ partie: null, error: null }),
    type: page === 0 ? "customer" : "supplier",
    allPlaceofSupplay,
    allStates,
    allLoyaltyType,
    allSupplierType,
    getItem: (from, to) => getCustomer(partie, state, setState, from, to),
    setPaymentMethord: (v) => {
      partie.paymentRecord.payment_method_id = v;
      setState({ partie });
    },
    reduceCreditOneByOne: (v) => reduceCreditOneByOne(v, state, setState),
  };
  return (
    <form
      onChange={(e) => {
        if (e.target.id === "image") partie.image = e.target.files[0];
        else partie[e.target.id] = e.target.value;
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const thisPage = e.target[e.target.length - 1].id;
        if (thisPage === "0") {
          page === 0
            ? updateCustomer(state, setState)
            : updateSuplier(state, setState);
        } else if (thisPage === "3") postMultiplePaymentRecord(state, setState);
        else setState({ partie: null, error: null });
      }}
    >
      <DrowerView2 props={body} />
    </form>
  );
}
