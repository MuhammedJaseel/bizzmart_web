import React, { Component } from "react";
import "../style/hsl.css";
import { Header1, Header2 } from "./headers";

const pTitles = ["Sales Invoices", "Sales Estimates"];

export default class HomeSales extends Component {
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
        <Header1 title="SALES" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <div className="hslD"></div>
      </React.StrictMode>
    );
  }
}
