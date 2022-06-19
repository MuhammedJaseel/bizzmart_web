import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./headers";

const pTitles = ["All About"];

export default class HomeAbout extends Component {
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
    const titleL = page === 0 ? "ABOUT US" : "PARTNERS";

    return (
      <React.StrictMode>
        <Header1 title="ABOUT" bodyL={titleL} />
        <Header2 titles={pTitles} page={page} setState={setState} />
      </React.StrictMode>
    );
  }
}
