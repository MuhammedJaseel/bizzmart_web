import React, { Component, StrictMode } from "react";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { HeaderButtens1 } from "./widget";
import { Header1, Header2, Header4 } from "./widget";
import { MyForm1 } from "./widget_form";
import {
  expenseGetExpenses,
  expenseGetSingleExpense,
} from "../method/homeExpense";
import { expenseGetAllDetails } from "../method/homeExpense";
import "../style/hdb.css";
import DrawerView1 from "./widget_view";

const pTitles = ["Expense Enteries"];
const desc =
  "Shows all the recorded expense entries against the selected date range";
const heads = [
  null,
  "Invoice #",
  "Date",
  "Expense Category",
  "Exense Details",
  "Paid From",
  "Amount",
];

export default class HomeExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: false,
      // /////////////////////////////
      allExpense: [],
      allExpenseHead: [],
      expensesPaging: {},
      invoiceNumber: "",
      allAccounts: [],
      allTransferType: [],
      allTax: [],
      form: null,
      selected: null,
      // FUNCTION ///////////////////////////////////////////////////
      succesPop: props.succesPop,
    };
  }
  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    expenseGetExpenses(state, setState);
    expenseGetAllDetails(state, setState);
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { invoiceNumber } = state;

    const bodyRBody = {
      makeAdd: () =>
        setState({ form: { formType: "expense", invoice_no: invoiceNumber } }),
      title: "+ New Expense",
      drowelList: null,
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1
          title="EXPENSES > EXPENSES LIST"
          bodyR={bodyR}
          onTap={() => setState({ form: null })}
        />
        <Header2 titles={pTitles} page={0} setState={setState} />
        <HomeExpenceTable state={state} setState={setState} />
        <HomeExpenceForm state={state} setState={setState} />
        <DrawerView1 state={state} setState={setState} expence />
      </React.StrictMode>
    );
  }
}

function HomeExpenceTable({ state, setState }) {
  const { form, allExpense, expensesPaging } = state;
  const widths = [
    { width: 4 },
    { width: 10 },
    { width: 10 },
    { width: 20 },
    { width: 24 },
    { width: 10 },
    { width: 10, right: true },
  ];
  const body = [];
  if (allExpense !== null)
    for (let i = 0; i < allExpense.length; i++) {
      const it = allExpense[i];
      body.push([
        { data: it.image, data2: "it.expenseCategory", type: 1 },
        { data: it.invoice_no, type: 2 },
        { data: it.date },
        { data: it.expense_head_name, type: 2 },
        { data: it.notes },
        { data: it.account_name },
        { data: it.total_amount },
      ]);
    }
  if (form !== null) return null;

  const filterBody = { searchPh: "Search an expenses" };
  const filter = ""; // <TitleFilter1 props={filterBody} />;

  const counterProps = {
    total: expensesPaging?.totalCount,
    onTap: (v, limit) => {
      expensesPaging.page_number = v;
      expensesPaging.limit = limit;
      expenseGetExpenses(state, setState);
    },
  };

  const _onclick = (v) =>
    expenseGetSingleExpense(allExpense[v], state, setState);
  return (
    <React.StrictMode>
      <Header4 title={"Expenses List"} desc={desc} body={filter} />
      <MyTable1 widths={widths} heads={heads} body={body} onclick={_onclick} />
      <MyTableCounter1 props={counterProps} />
    </React.StrictMode>
  );
}
function HomeExpenceForm({ state, setState }) {
  const { form } = state;
  if (form === null) return null;
  const desc = "Record a new expense entry for your businsee";
  return (
    <StrictMode>
      <Header4 title="New Expenses Entry" desc={desc} />
      <MyForm1 state={state} setState={setState} />;
    </StrictMode>
  );
}
