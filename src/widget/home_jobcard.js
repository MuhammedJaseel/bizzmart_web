import React from "react";
import { Header1, Header3 } from "./headers";
import "../style/hon.css";

const pTitles = [
  { title: "New", count: 2 },
  { title: "In Process", count: 10 },
  { title: "On Hold", count: 100 },
  { title: "Processed", count: 2 },
  { title: "Ready", count: 0 },
];

export default class HomeJobcard extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      titles: pTitles,
      isPopup: false,
    };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, titles } = state;

    const titleBR = "";

    return (
      <React.StrictMode>
        <Header1 title="Job card" bodyR={titleBR} />
        <Header3 titles={titles} page={page} setState={setState} />
      </React.StrictMode>
    );
  }
}
