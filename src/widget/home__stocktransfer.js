import React, { Component, StrictMode } from "react";
import { stockIssue } from "../module/dummydata";
import { Header1, Header2, Header4, MyTable1 } from "./widget";

const title = "Stock Transfer";
const desc = "Transfer stock from one branch to another";
const heads = [
  null,
  "Transaction #",
  "Date",
  "Transfer From",
  "Transfer To",
  "Description",
  "Count",
  "Amount",
  "Status",
];
const widths = [1, 12, 12, 12, 12, 12, 12, 12, 8];

export default class HomeInStockTransfer extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      addpage: false,
      allIssue: [],
    };
  }

  componentDidMount() {
    this.setState({ allIssue: stockIssue });
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const {} = state;
    const back = this.props.back;
    return (
      <StrictMode>
        <Header1 title="INVENTORY > STOCK TRANSFER" onclick={back} />
        <Header2 titles={["Issue"]} page={0} />
        <Header4 title={title} desc={desc} />
        <HomeStockIssueTable state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function HomeStockIssueTable({ state, setState }) {
  const { allIssue } = state;

  const body = [];
  if (allIssue !== null)
    for (let i = 0; i < allIssue.length; i++) {
      const it = allIssue[i];
      body.push([
        { data: "" },
        { data: it.id, type: 3 },
        { data: it.date },
        { data: it.transferFrom },
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
        { data: it.status },
      ]);
    }
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads} body={body} />
    </React.StrictMode>
  );
}
