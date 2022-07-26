import { StrictMode, Component } from "react";
import { inventoryFormData, inventoryPages } from "../module/home_inventory";
import { inventoryStateData } from "../module/home_inventory";
import { assetList, productList, stockIssue } from "../module/dummydata";
import { getCategoryList, getProducts } from "../method/home_inventory";
import HomeInventoryTables from "./home_inventory1";
import HomeInventoryForms from "./home_inventory2";
import HomeInventoryPopups from "./home_inventory3";
import "../style/hin.css";

export default class HomeInventory extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      page: null,
      addPage: false,
      popup: null,
      // DATA ///////////////////////////////////////////////////////////////////////
      allProduct: [],
      allAsset: [],
      allIssue: [],
      allCategoty: [],
      allUnits: [],
      allKot: [],
      allTax: [],
      product: inventoryStateData.product,
      isEdit: true,
      // FUNCTION ///////////////////////////////////////////////////////////////////
      setPage: (v) => {
        this.setState({ page: v.path === undefined ? null : v });
        const url = `/dashboard/inventory/${v.path || ""}`;
        window.history.replaceState("home", "home", url);
      },
    };
  }
  componentDidMount() {
    const setState = (v) => this.setState(v);
    const state = this.state;
    getProducts(state, setState);
    getCategoryList(state, setState);
    this.setState({ allAsset: assetList, allProduct: productList });
    this.setState({ allIssue: stockIssue });
    let path = window.location.pathname.split("/");
    let done = false;
    if (path.length > 3) {
      path = path[3];
      for (let j = 0; j < inventoryPages[0].length; j++)
        for (let i = 0; i < inventoryPages[0][j].data.length; i++)
          if (inventoryPages[0][j].data[i].path === path) {
            this.setState({ page: inventoryPages[0][j].data[i] });
            done = true;
            break;
          }
      if (!done)
        for (let j = 0; j < inventoryPages[1].length; j++)
          for (let i = 0; i < inventoryPages[1][j].data.length; i++)
            if (inventoryPages[1][j].data[i].path === path) {
              this.setState({ page: inventoryPages[1][j].data[i] });
              done = true;
              break;
            }
      if (!done)
        for (let i = 0; i < inventoryFormData.length; i++)
          if (inventoryFormData[i].path === path) {
            this.setState({ page: inventoryFormData[i] });
            break;
          }
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
