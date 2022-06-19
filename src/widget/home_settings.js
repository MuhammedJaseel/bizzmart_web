import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./headers";

const pTitles = ["All Settings"];

export default class HomeSettings extends Component {
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
    const titleL = page === 0 ? "SETTINGS LANDING" : "PARTNERS";

    return (
      <React.StrictMode>
        <Header1 title="SETTINGS" bodyL={titleL} />
        <Header2 titles={pTitles} page={page} setState={setState} />
      </React.StrictMode>
    );
  }
}
