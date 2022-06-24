import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./widget";

const pTitles = ["Sales", "Purchase", "Expenses", "Analytics"];

export default class HomeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;

    return (
      <React.StrictMode>
        <Header1 title="Dashboard" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <div className="hdbD"></div>
      </React.StrictMode>
    );
  }
}
