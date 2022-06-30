import React from "react";
import { Header1, TitleTable1 } from "./widget";
import { inventoryPages } from "../module/home_inventory";
import "../style/hin.css";

export default class HomeInventory extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      page: null,
    };
  }

  componentDidMount() {
    let path = window.location.pathname.split("/");
    let done = false;
    if (path.length > 3) {
      path = path[3];
      for (let j = 0; j < inventoryPages[0].length; j++)
        for (let i = 0; i < inventoryPages[0][j].data.length; i++) {
          if (inventoryPages[0][j].data[i].path === path) {
            this.setState({ page: inventoryPages[0][j].data[i].widget });
            done = true;
            break;
          }
        }
      if (!done)
        for (let j = 0; j < inventoryPages[1].length; j++)
          for (let i = 0; i < inventoryPages[1][j].data.length; i++) {
            if (inventoryPages[1][j].data[i].path === path) {
              this.setState({ page: inventoryPages[1][j].data[i].widget });
              break;
            }
          }
    } else this.setState({ page: null });
  }

  setPage = (v) => {
    this.setState({ page: v.widget });
    window.history.replaceState(
      "home",
      "home",
      "/dashboard/inventory/" + v.path
    );
  };

  render() {
    const setState = (v) => this.setState(v);
    const state = this.state;
    const { page } = this.state;
    const Page = page;
    if (page === null)
      return (
        <React.StrictMode>
          <Header1 title="INVENTORY > INVENTORY LANDING" />
          <TitleTable1 data={inventoryPages} setPage={this.setPage} />
        </React.StrictMode>
      );
    return (
      <Page
        back={() => {
          setState({ page: null });
          window.history.replaceState("home", "home", "/dashboard/inventory");
        }}
      />
    );
  }
}
