import { StrictMode, Component } from "react";
import { inventoryPages } from "../module/home_inventory";
import { assetList, productList, stockIssue } from "../module/dummydata";
import HomeInventoryTables from "./home_inventory1";
import HomeInventoryForms from "./home_inventory2";
import "../style/hin.css";
import HomeInventoryPopups from "./home_inventory3";

export default class HomeInventory extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      page: null,
      addPage: false,
      popup: null,
      // DATA ///////////////////////////////////////////////////////////////////////\
      allProduct: [],
      allAsset: [],
      allIssue: [],
      setPage: (v) => {
        this.setState({ page: v.path === undefined ? null : v });
        const url = `/dashboard/inventory/${v.path || ""}`;
        window.history.replaceState("home", "home", url);
      },
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
            this.setState({ page: inventoryPages[0][j].data[i] });
            done = true;
            break;
          }
        }
      if (!done)
        for (let j = 0; j < inventoryPages[1].length; j++)
          for (let i = 0; i < inventoryPages[1][j].data.length; i++) {
            if (inventoryPages[1][j].data[i].path === path) {
              this.setState({ page: inventoryPages[1][j].data[i] });
              break;
            }
          }
      this.setState({ allAsset: assetList, allProduct: productList });
      this.setState({ allIssue: stockIssue });
    } else this.setState({ page: null });
  }

  render() {
    const setState = (v) => this.setState(v);
    const state = this.state;
    return (
      <StrictMode>
        <HomeInventoryTables state={state} setState={setState} />
        <HomeInventoryForms state={state} setState={setState} />
        <HomeInventoryPopups state={state} setState={setState} />
      </StrictMode>
    );
  }
}
