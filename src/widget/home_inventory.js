import React from "react";
import { Header1, TitleTable1 } from "./widget";
import "../style/hin.css";
import { inventoryPages } from "../module/home_inventory";

export default class HomeInventory extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      page: 0,
      addpage: false,
    };
  }

  componentDidMount() {}

  render() {
    const { page, addpage } = this.state;
    const setState = (v) => this.setState(v);
    const state = this.state;

    return (
      <React.StrictMode>
        <Header1 title="INVENTORY > INVENTORY LANDING" />
        <TitleTable1 data={inventoryPages} />
      </React.StrictMode>
    );
  }
}
