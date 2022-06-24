import React, { Component } from "react";
import "../style/hdb.css";
import { Header1 } from "./widget";

export default class HomeCashbank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);

    return (
      <React.StrictMode>
        <Header1 title="CASH & BANK" bodyL="ACCOUNTS" />
      </React.StrictMode>
    );
  }
}
