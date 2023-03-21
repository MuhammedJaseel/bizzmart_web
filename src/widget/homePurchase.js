import React, { Component } from "react";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { purchaseGetAllPurchase, purchaseGetDatas } from "../method/homePurchase";
import { purchaseGetPurchase } from "../method/homePurchase";
import { FormNewPurchase, newPurchaseStructure } from "./widgetPurchaseForm";
import { DrawerViewPurchase } from "./widget_view";
import "../style/hpr.css";

const pTitles = [
  "Purchase List",
  //  "Purchase Order"
];
const desc = [
  `Shows all the recorded purchase entries against the selected date range`,
  `Shows all the recorded purchase order  against the selected date range`,
];

const heads0 = [
  null,
  "GRN#",
  "Date",
  "Supplier",
  "Invoice #",
  "Total",
  "Amount Due",
  "Status",
];
const heads1 = [null, "PON#", "Date", "Supplier", "Total", "Action"];

export default class HomePurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      error: null,
      loading: false,
      // ////////////////////////////////////////////////////////////
      allPurchaseList: [],
      allPurchaseOrder: [],
      purchasePaging: {},
      estimatePaging: {},
      allSuppliers: [],
      allTax: [],
      allAccount: [],
      form: null,
      selected: null,
      addPayment: null,
      // FUNCTION ///////////////////////////////////////////////////
      succesPop: props.succesPop,
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    purchaseGetAllPurchase(state, setState);
    purchaseGetDatas(state, setState);
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, form } = state;

    const bodyRBody = {
      makeAdd: () => {
        setState({
          form: JSON.parse(JSON.stringify(newPurchaseStructure)),
        });
      },
      title: page === 0 ? "+ New Purchase" : "+ New Purchase Order",
      drowelList: null,
      // drowelList: [
      //   {
      //     title: "Add Purchase",
      //     fun: () =>
      //       setState({
      //         form: JSON.parse(JSON.stringify(newPurchaseStructure)),
      //       }),
      //   },
      //   {
      //     title: "Add Purchase Order",
      //     fun: () =>
      //       setState({
      //         form: JSON.parse(JSON.stringify(newPurchaseStructure)),
      //       }),
      //   },
      // ],
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1
          title="PURCHASE"
          onTap={() => setState({ form: null })}
          bodyR={form !== null ? null : bodyR}
          bodyL={form !== null ? "INVOICE" : null}
        />
        <HomePurchaseListTable state={state} setState={setState} />
        <HomePurchaseOrderTable state={state} setState={setState} />
        <HomePurchaseForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomePurchaseListTable({ state, setState }) {
  const { page, allPurchaseList, form, purchasePaging, loading, error } = state;

  const filterBody = { searchPh: "Search an asset" };
  const filter = ""; //<TitleFilter1 props={filterBody} />;

  const widths = [
    { width: 4 },
    { width: 12 },
    { width: 12 },
    { width: 22 },
    { width: 10 },
    { width: 12, right: true },
    { width: 12, right: true },
    { width: 5 },
  ];
  const body = [];
  if (allPurchaseList !== null)
    for (let i = 0; i < allPurchaseList.length; i++) {
      const it = allPurchaseList[i];
      body.push([
        { data: it.image, data2: it.supplier_name, type: 1 },
        { data: it.reference_number, type: 3 },
        { data: it.date },
        { data: it.supplier_name, type: 3 },
        { data: it.invoice_no },
        { data: it.total_amount },
        { data: it.balance_amount },
        { data: it.status },
      ]);
    }
  const onclick = (v) => purchaseGetPurchase(v, state, setState);
  if (page !== 0 || form !== null) return null;

  const counterProps = {
    total: purchasePaging?.totalCount,
    page: purchasePaging?.page_number,
    loading,
    error,
    onTap: (v, limit) => {
      purchasePaging.page_number = v;
      purchasePaging.limit = limit;
      purchaseGetAllPurchase(state, setState);
    },
  };

  return (
    <React.StrictMode>
      <Header2
        titles={pTitles}
        page={page}
        onTap={(k) => setState({ page: k, addPage: false })}
      />
      <Header4 title={pTitles[page]} desc={desc[page]} body={filter} />
      <MyTable1 widths={widths} heads={heads0} body={body} onclick={onclick} />
      <MyTableCounter1 props={counterProps} />
      <DrawerViewPurchase state={state} setState={setState} />
    </React.StrictMode>
  );
}
function HomePurchaseOrderTable({ state, setState }) {
  const { page, allPurchaseOrder, form } = state;

  const filterBody = { searchPh: "Search an asset" };
  const filter = <TitleFilter1 props={filterBody} />;

  const widths = [
    { width: 4 },
    { width: 8 },
    { width: 8 },
    { width: 35 },
    { width: 15, right: true },
    { width: 5 },
  ];
  const body = [];
  if (allPurchaseOrder !== null)
    for (let i = 0; i < allPurchaseOrder.length; i++) {
      const it = allPurchaseOrder[i];
      body.push([
        { data: it.image, data2: it.supplier, type: 1 },
        { data: it.pon, type: 2 },
        { data: it.date },
        { data: it.supplier_name, type: 2 },
        { data: it.total_amount },
        { data: it.action, type: 2 },
      ]);
    }

  const onclick = (v) => purchaseGetPurchase(v, state, setState);

  if (page !== 1 || form !== null) return null;
  return (
    <React.StrictMode>
      <Header2 titles={pTitles} page={page} onTap={onclick} />
      <Header4 title={pTitles[page]} desc={desc[page]} body={filter} />
      <MyTable1 widths={widths} heads={heads1} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}

function HomePurchaseForm({ state, setState }) {
  const { form } = state;
  if (form === null) return null;
  return (
    <React.StrictMode>
      <Header4
        title={"New Purchase Invoice"}
        desc={"Record a new purchase entry from your supplier"}
      />
      <FormNewPurchase state={state} setState={setState} />
    </React.StrictMode>
  );
}
