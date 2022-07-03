import React, { Component, StrictMode } from "react";
import { productList } from "../module/dummydata";
import { MyTable1 } from "./widget_table";
import { Header1, Header2, Header4 } from "./widget";

const title = "Stock Lookup";
const desc = "Shows stock positions across all the connected branches";
const heads = [
  null,
  "Product Name",
  "Code",
  "Category",
  "Type",
  "Stock (Primary)",
  "Stock (Secondary)",
];
const widths = [4, 25, 20, 20, 10, 10, 8];

export default class HomeInStockLookup extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      addpage: false,
      allProduct: [],
    };
  }

  componentDidMount() {
    this.setState({ allProduct: productList });
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const {} = state;
    const back = this.props.back;
    return (
      <StrictMode>
        <Header1 title="INVENTORY > STOCK LOOKUP" onclick={back} />
        <Header2 titles={["Products"]} page={0} />
        <Header4 title={title} desc={desc} />
        <HomeSalesProductTable state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function HomeSalesProductTable({ state, setState }) {
  const { allProduct } = state;

  const body = [];
  if (allProduct !== null)
    for (let i = 0; i < allProduct.length; i++) {
      const it = allProduct[i];
      body.push([
        { data: it.image, data2: it.name, type: 1 },
        { data: it.name, data2: it.product_type, type: 2 },
        { data: it.code, type: 2 },
        { data: it.categoryName },
        { data: it.type },
        { data: it.stockPrimary },
        { data: it.mslSecondary },
      ]);
    }
  return (
    <React.StrictMode>
      <MyTable1 widths={widths} heads={heads} body={body} />
    </React.StrictMode>
  );
}
