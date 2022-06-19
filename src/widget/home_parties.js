import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./headers";

const pTitles = ["Customers", "Suppliers"];

export default class HomeParties extends Component {
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
    const titleL = page === 0 ? "COUSTOMERS" : "SUPPLIERS";

    return (
      <React.StrictMode>
        <Header1 title="PARTIES" bodyL={titleL} />
        <Header2 titles={pTitles} page={page} setState={setState} />
      </React.StrictMode>
    );
  }
}
