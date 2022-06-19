import React, { Component } from "react";
import "../style/hrp.css";
import { Header1, Header2 } from "./headers";

const pTitles = [
  "All Report",
  "Favorites",
  "Sales",
  "Inventory",
  "Purchase",
  "Expence",
  "Cash",
  "Finance",
  "Tax",
];

export default class HomeReports extends Component {
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
        <Header1 title="REPORTS" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <div className="hrpD"></div>
      </React.StrictMode>
    );
  }
}
