import React, { Component } from "react";
import { expenseList } from "../module/dummydata";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { HeaderButtens1, TitleFilter1 } from "./widget";
import { Header1, Header2, Header4 } from "./widget";
import { MyForm1 } from "./widget_form";
import "../style/hdb.css";
import { expenseGetExpenses } from "../method/home_expense";

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
      addPage: false,
      // /////////////////////////////
      allExpense: [],
      expensesPaging: {},
    };
  }
  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    expenseGetExpenses(state, setState);
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { allExpense, addPage } = state;

    const filterBody = {
      searchPh: "Search an expenses",
    };
    const filter = !addPage ? <TitleFilter1 props={filterBody} /> : null;
    const bodyRBody = {
      makeAdd: () => setState({ addPage: true }),
      title: "+ New Expense",
      drowelList: [],
    };
    const bodyR = <HeaderButtens1 props={bodyRBody} />;

    return (
      <React.StrictMode>
        <Header1 title="EXPENSES > EXPENSES LIST" bodyR={bodyR} />
        <Header2 titles={pTitles} page={0} setState={setState} />
        <Header4 title={"Expenses List"} desc={desc} body={filter} />
        <HomeExpenceTable state={state} setState={setState} />
        <HomeExpenceForm state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeExpenceTable({ state, setState }) {
  const { addPage, allExpense } = state;

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
  if (addPage) return null;
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={{ total: 100 }} />
    </React.StrictMode>
  );
}
function HomeExpenceForm({ state, setState }) {
  const { addPage } = state;
  if (!addPage) return null;
  return <MyForm1 />;
}
