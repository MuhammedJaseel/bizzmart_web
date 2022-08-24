import { StrictMode, Component } from "react";
import { inventoryFormData, inventoryPages } from "../module/home_inventory";
import { inventoryStateData } from "../module/home_inventory";
import {
  getCategoryList,
  getProducts,
  getServices,
} from "../method/home_inventory";
import { Header1, TitleTable1 } from "./widget";
import { HomeInventoryModifersPopup } from "./home_inventory3";
import { InventoryAddProdectPop } from "./home_inventory3";
import HomeInventoryTables from "./home_inventory1";
import HomeInventoryForms from "./home_inventory2";
import "../style/hin.css";

export default class HomeInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      page: 0,
      addPage: false,
      popup: null,
      // DATA //////////////////////////////////////////////////////
      allProduct: [],
      allService: [],
      allAsset: [],
      allIssue: [],
      allCategoty: [],
      allUnits: [],
      allKot: [],
      allTax: [],
      product: inventoryStateData.product,
      productPaging: {},
      servicesPaging: {},
      addProdectPop: null,
      // FUNCTION ///////////////////////////////////////////////////
      succesPop: props.succesPop,
    };
  }
  componentDidMount() {
    const setState = (v) => this.setState(v);
    const state = this.state;
    getProducts(state, setState);
    getServices(state, setState);
    getCategoryList(state, setState);
  }
  render() {
    const setState = (v) => this.setState(v);
    const state = this.state;
    return (
      <StrictMode>
        <InventoryLanding state={state} setState={setState} />
        <HomeInventoryTables state={state} setState={setState} />
        <HomeInventoryForms state={state} setState={setState} />
        {/* <HomeInventoryModifersPopup state={state} setState={setState} /> */}
        {/* <InventoryAddProdectPop state={state} setState={setState} /> */}
      </StrictMode>
    );
  }
}

function InventoryLanding({ state, setState }) {
  const { page } = state;
  if (page !== null) return null;
  return (
    <StrictMode>
      <Header1
        title="INVENTORY"
        bodyL="INVENTORY LANDING"
        onTap={() => setState({ page: null })}
      />
      <TitleTable1
        data={inventoryPages}
        setPage={(page) => setState({ page })}
      />
    </StrictMode>
  );
}
