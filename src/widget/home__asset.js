import React, { Component, StrictMode } from "react";
import { assetList } from "../module/dummydata";
import { MyTable1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";

const title = "Asset List";
const desc = "Shows all the team members recorded against your business";
const heads = [
  null,
  "Asset detail",
  "Category",
  "Branch",
  "Custodian",
  "Date bougth",
  "Cost",
  "Book value",
];
const widths = [
  { width: 4 },
  { width: 20 },
  { width: 15 },
  { width: 10 },
  { width: 15 },
  { width: 10 },
  { width: 10 },
  { width: 10 },
];

export default class HomeInAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      addpage: false,
      allAsset: [],
    };
  }

  componentDidMount() {
    this.setState({ allAsset: assetList });
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const {} = state;
    const back = this.props.back;
    return (
      <StrictMode>
        <Header1 title="INVENTORY > ASSETS  LIST" onclick={back} />
        <Header2 titles={["Fixed Assets"]} page={0} />
        <Header4 title={title} desc={desc} />
        <HomeSalesAssetTable state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function HomeSalesAssetTable({ state, setState }) {
  const { allAsset } = state;

  const body = [];
  if (allAsset !== null)
    for (let i = 0; i < allAsset.length; i++) {
      const it = allAsset[i];
      body.push([
        { data: it.image, data2: it.assetName, type: 1 },
        { data: it.assetName, data2: it.assetCode, type: 2 },
        { data: it.category },
        { data: it.branch },
        { data: it.custodian },
        { data: it.bougthDate },
        { data: it.cost },
        { data: it.bookValue },
      ]);
    }
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads} body={body} />
    </React.StrictMode>
  );
}
