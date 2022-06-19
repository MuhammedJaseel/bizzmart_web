import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./headers";

const pTitles = ["Expense Enteries"];

export default class HomeExpense extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
    };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;

    return (
      <React.StrictMode>
        <Header1 title="Expenses" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <div className="hdbD"></div>
      </React.StrictMode>
    );
  }
}
