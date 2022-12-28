import { StrictMode, Component } from "react";
import { inventoryPages } from "../module/home_inventory";
import {
  getCategoryList,
  getProducts,
  getServices,
} from "../method/home_inventory";
import { Header1, TitleTable1 } from "./widget";
import {
  HomeInventoryModifersPopup,
  InventoryAddToppingsPop,
} from "./home_inventory3";
import { InventoryAddProdectPop } from "./home_inventory3";
import HomeInventoryForms from "./homeInventoryProduct2";
import "../style/hin.css";
import { getAllassets, getAllAssetsList } from "../method/homeInventoryAssest";
import { InventoryAddAssetPurchase } from "./homeInventoryAssest";
import { getPriceManagment } from "../method/homeInventoryPriceMgmnt";

import { AssetTable } from "./homeInventoryAssest";
import {
  PromotionsTable,
  StockIssueTable,
  StockLabelsTable,
  StockReceivedTable,
  StockReturnTable,
  StockTakingTable,
  StockTrailTable,
  StockTransferTable,
} from "./homeInventoryInventoryMgmnt";
import { MslLookupTable, PriceChargeTable } from "./homeInventoryPriceMgmnt";
import { PriceLookupTable, StockLookupTable } from "./homeInventoryPriceMgmnt";
import { ProductTable, ServiceTable } from "./homeInventoryProduct1";

export default class HomeInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      page: null,
      addPage: false,
      popup: null,
      // DATA //////////////////////////////////////////////////////
      allProduct: [],
      allService: [],
      allProductSearches: [],
      allAssets: [],
      allIssue: [],
      allCategoty: [],
      allUnits: [],
      allKot: [],
      allTax: [],
      allToppings: [],
      product: null,
      productPaging: {},
      servicesPaging: {},
      addProdectPop: null,
      addToppings: null,
      allFixedAssets: [],
      allAssignedAssets: [],
      // ////////////////////////
      priceLookupList: {},
      stockLookupList: {},
      maslLookupList: {},
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
    getAllassets(state, setState);
    getAllassets(state, setState);
    getAllAssetsList(state, setState);
    // ///////////////////////////
    getPriceManagment(state, setState);
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
        <InventoryAddToppingsPop state={state} setState={setState} />
        <InventoryAddAssetPurchase state={state} setState={setState} />
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

function HomeInventoryTables({ state, setState }) {
  const { product } = state;
  if (product !== null) return null;
  return (
    <StrictMode>
      <ProductTable state={state} setState={setState} />
      <ServiceTable state={state} setState={setState} />
      <AssetTable state={state} setState={setState} />
      {/*  */}
      <PriceLookupTable state={state} setState={setState} />
      <StockLookupTable state={state} setState={setState} />
      <PriceChargeTable state={state} setState={setState} />
      <MslLookupTable state={state} setState={setState} />
      {/*  */}
      <StockIssueTable state={state} setState={setState} />
      <StockTransferTable state={state} setState={setState} />
      <StockReceivedTable state={state} setState={setState} />
      <StockReturnTable state={state} setState={setState} />
      <StockTakingTable state={state} setState={setState} />
      <StockTrailTable state={state} setState={setState} />
      <StockLabelsTable state={state} setState={setState} />
      <PromotionsTable state={state} setState={setState} />
    </StrictMode>
  );
}
