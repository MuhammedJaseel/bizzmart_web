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
      allCustomer: {},
      allSupplier: {},
      allPlaceofSupplay: [],
      allLoyaltyType: [],
      allStates: [],
      allSupplierType: [],
      partie: null,
      addParties: null,
      succesPop: props.succesPop,
    };
  }
  async componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    await getAllCustomers(state, setState);
    await getAllSuppliers(state, setState);
    getAllData(state, setState);
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;
    const titleL = page === 0 ? "COUSTOMERS" : "SUPPLIERS";

    const filterBody = {
      searchPh: "Search a " + (page === 0 ? "customer" : "sippliers"),
      noDate: true,
      onlyDate: true,
    };
    const filter = <TitleFilter1 props={filterBody} />;
    const bodyRBody = {
      makeAdd: () => setState({ addParties: {} }),
      title: page === 0 ? "+ New Customer" : "+ New Suppliers",
      drowelList: null,
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1 title="PARTIES" bodyL={titleL} bodyR={bodyR} />
        <Header2
          titles={pTitles}
          page={page}
          onTap={(k) => setState({ page: k })}
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
  const { page, allCustomer, loading, error } = state;
  var { partie } = state;
  const onclick = (v) => {
    partie = JSON.parse(JSON.stringify(allCustomer?.data[v]));
    getCustomer(partie, setState);
  };
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
  for (let i = 0; i < allCustomer?.data?.length; i++) {
    const it = allCustomer?.data[i];
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
    total: allCustomer?.page?.totalCount,
    page: allCustomer?.page?.page_number,
    loading,
    error,
    onTap: (v, limit) => {
      allCustomer.page.page_number = v;
      allCustomer.page.limit = limit;
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
  const { page, allSupplier, loading, error } = state;
  var { partie } = state;
  const onclick = (v) => {
    partie = JSON.parse(JSON.stringify(allSupplier?.data[v]));
    getSupplier(partie, setState);
  };

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
  for (let i = 0; i < allSupplier?.data?.length; i++) {
    const it = allSupplier?.data[i];
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
    total: allSupplier?.page?.totalCount,
    page: allSupplier?.page?.page_number,
    loading,
    error,
    onTap: (v, limit) => {
      allSupplier.page.page_number = v;
      allSupplier.page.limit = limit;
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
  const { loading, error, page, addParties } = state;
  const { allPlaceofSupplay, allStates, allLoyaltyType, allSupplierType } =
    state;
  const body = {
    title: "New " + (page === 0 ? "customer" : "suppliers"),
    show: addParties !== null,
    close: () => setState({ addParties: null, error: null }),
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
    addParties,
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
    getItem: (from, to) =>
      page === 0
        ? getCustomer(partie, setState, from, to)
        : getSupplier(partie, setState, from, to),
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
        setState({ partie });
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
