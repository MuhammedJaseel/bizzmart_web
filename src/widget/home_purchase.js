import React, { Component } from "react";
import "../style/hpr.css";
import { Header1, Header2 } from "./headers";

const pTitles = ["Purchase List", "Purchase Order"];

export default class HomePurchase extends Component {
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
        <Header1 title="Purchase" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <div className="hprD"></div>
      </React.StrictMode>
    );
  }
}
