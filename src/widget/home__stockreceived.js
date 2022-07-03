import React, { Component, StrictMode } from "react";
import { stockIssue } from "../module/dummydata";
import { MyTable1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";

const title = "Stock Issue";
const desc = "Issue stock from your main branch to connected branches";
const heads = [
  null,
  "Transaction #",
  "Date",
  "Transfer From",
  "Description",
  "Count",
  "Amount",
];
const widths = [1, 16, 16, 16, 16, 16, 10];

export default class HomeInStockReceived extends Component {
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
        <Header1 title="INVENTORY > STOCK ISSUE" onclick={back} />
        <Header2 titles={["Products"]} page={0} />
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
        { data: it.transferTo },
        { data: it.desc },
        { data: it.count },
        { data: it.amount },
      ]);
    }
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads} body={body} />
    </React.StrictMode>
  );
}
