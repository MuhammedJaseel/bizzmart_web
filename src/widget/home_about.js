import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2, MyTable1 } from "./widget";

const pTitles = ["All About"];

export default class HomeAbout extends Component {
  constructor(props) {
    super(props);
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
        <MyTable1
          widths={[4, 50, 10, 35]}
          heads={["", "Two", "Three", "Four"]}
          body={[
            [
              {
                data: "https://bizzdropzone.s3.ap-south-1.amazonaws.com/uploads/products/products1205774248.",
                data2: "r",
                type: 1,
              },
              { data: "Test Product: Shaji" },
              { data: 1 },
              { data: 1 },
            ],
            [
              { data: "", data2: "r", type: 1 },
              { data: 1 },
              { data: 1 },
              { data: 1 },
            ],
          ]}
        />
      </React.StrictMode>
    );
  }
}
