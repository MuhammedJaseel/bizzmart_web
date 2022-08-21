import { StrictMode, Component } from "react";
import { inventoryFormData, inventoryPages } from "../module/home_inventory";
import { inventoryStateData } from "../module/home_inventory";
import { getCategoryList, getProducts } from "../method/home_inventory";
import { Header1, TitleTable1 } from "./widget";
import { HomeInventoryModifersPopup } from "./home_inventory3";
import { InventoryAddProdectPop } from "./home_inventory3";
import HomeInventoryTables from "./home_inventory1";
import HomeInventoryForms from "./home_inventory2";
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
      productPaging: {},
      isEdit: false,
      addProdectPop: null,
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
    const { product } = state;
    getProducts(state, setState);
    getCategoryList(state, setState);
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
            if (inventoryFormData[i].path === "addService")
              setState({ product: { product, type: 2, is_service: 1 } });
            break;
          }
    } else this.setState({ page: null });
  }
  render() {
    const setState = (v) => this.setState(v);
    const state = this.state;
    return (
      <StrictMode>
        <InventoryLanding state={state} setState={setState} />
        <HomeInventoryTables state={state} setState={setState} />
        <HomeInventoryForms state={state} setState={setState} />
        <HomeInventoryModifersPopup state={state} setState={setState} />
        <InventoryAddProdectPop state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function InventoryLanding({ state, setState }) {
  const { page, setPage } = state;
  if (page !== null) return null;
  return (
    <StrictMode>
      <Header1 title="INVENTORY" bodyL="INVENTORY LANDING" onTap={setPage} />
      <TitleTable1 data={inventoryPages} setPage={setPage} />
    </StrictMode>
  );
}
