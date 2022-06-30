import React, { Component } from "react";
import { expenseList } from "../module/dummydata";
import "../style/hdb.css";
import { Header1, Header2, Header4, MyTable1 } from "./widget";

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
    };
  }
  componentDidMount() {
    this.setState({ allExpense: expenseList });
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { allExpense } = state;

    const widths = [4, 10, 10, 20, 20, 15, 10];
    const body = [];
    if (allExpense !== null)
      for (let i = 0; i < allExpense.length; i++) {
        const it = allExpense[i];
        body.push([
          { data: it.image, data2: it.expenseCategory, type: 1 },
          { data: it.invoice, type: 2 },
          { data: it.date },
          { data: it.expenseCategory, data2: it.type, type: 2 },
          { data: it.exenseDetails },
          { data: it.paidFrom },
          { data: it.amount },
        ]);
      }

    return (
      <React.StrictMode>
        <Header1 title="EXPENSES > EXPENSES LIST" />
        <Header2 titles={pTitles} page={0} setState={setState} />
        <Header4 title={"Expenses List"} desc={desc} />
        <MyTable1 widths={widths} heads={heads} body={body} />
      </React.StrictMode>
    );
  }
}