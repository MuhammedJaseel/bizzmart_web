import React, { Component, StrictMode } from "react";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { Header1, Header2, Header4 } from "./widget";
import { MyForm1 } from "./widget_form";
import { expenseGetExpenses } from "../method/home_expense";
import { expenseGetAllDetails } from "../method/home_expense";
import "../style/hdb.css";

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
      form: null,
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
        <Header1 title="EXPENSES > EXPENSES LIST" bodyR={bodyR} />
        <Header2 titles={pTitles} page={0} setState={setState} />
        <HomeExpenceTable state={state} setState={setState} />
        <HomeExpenceForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeExpenceTable({ state, setState }) {
  const { form, allExpense } = state;

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
        { data: it.invoice, type: 2 },
        { data: it.date },
        { data: it.expenseCategory, data2: it.type, type: 2 },
        { data: it.exenseDetails },
        { data: it.paidFrom },
        { data: it.amount },
      ]);
    }
  if (form !== null) return null;

  const filterBody = { searchPh: "Search an expenses" };
  const filter = <TitleFilter1 props={filterBody} />;

  return (
    <React.StrictMode>
      <Header4 title={"Expenses List"} desc={desc} body={filter} />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
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
