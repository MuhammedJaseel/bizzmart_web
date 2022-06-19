import React from "react";
import { Header1 } from "./headers";
import "../style/hin.css";
import icDownload from "../asset/icon/ic_download.png";
import icShare from "../asset/icon/ic_share.png";
import icArrow2 from "../asset/icon/ic_arrow2.png";
import { getCategoryList } from "../method/home_inventory";
import { getProducts } from "../method/home_inventory";
import { InventoryAddModifirePopup, SuccesPopup } from "./popups";
import { AddProdect, ProdectList } from "./home_inventory1";

export default class HomeInventory extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      page: 0,
      addpage: false,
      // Product data
      allProduct: null,
      prodectMaxCount: 10,
      productPage: 1,
      totelProduct: 0,
      product: null,
      // sub data /////////
      allCategoty: [],
      allUnits: [],
      allKot: [],
      allTax: [],
      //type1 ///////////
      modifirePop: false,
      allModifire: [],
      allStations: [],
      sellOnline: true,
      manageStock: true,
      categoryDefault: true,
      allImages: [],
      selectedUnits: [null, null],
      // type 2
      allVariant1: [],
      allVariant2: [],
      allVariantList: [],

      succesPop: null,
    };
  }

  componentDidUpdate() {
    this.state.succesPop = null;
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getProducts(state, setState);
    getCategoryList(state, setState);
  }

  render() {
    const { page, addpage, modifirePop, succesPop } = this.state;

    const setState = (v) => this.setState(v);
    const state = this.state;

    const titleBL = (
      <div className="hinB" onClick={() => this.setState({ addpage: false })}>
        PRODUCRS LIST
      </div>
    );
    const titleBR = (
      <div className="hinC">
        <div className="hinCa">
          <img alt="ic" className="hinCaA" src={icDownload} />
        </div>
        <div className="hinCa">
          <img alt="ic" className="hinCaA" src={icShare} />
        </div>
        <div className="hinCc">
          <div
            className="hinCcA"
            onClick={() => this.setState({ addpage: true, product: null })}
          >
            + New {page === 0 ? "Product" : "Service"}
          </div>
          <div className="hinCcB">
            <img alt="ic" className="hinCcBa" src={icArrow2} />
          </div>
          <div className="hinCcC">
            <div
              className="hinCcCa"
              onClick={() =>
                this.setState({ page: 0, addpage: true, product: null })
              }
            >
              Add Product
            </div>
            <div className="hinCcCa">Add Service</div>
            <div className="hinCcCa">Inventory Count</div>
          </div>
        </div>
      </div>
    );

    return (
      <React.StrictMode>
        <Header1
          title="INVENTORY"
          bodyL={titleBL}
          bodyR={!addpage ? titleBR : null}
        />
        <div className="hinE">
          <div
            className="hinEa"
            onClick={() => setState({ page: 0, addpage: false })}
          >
            <div className={page === 0 ? "hinEb_" : "hinEb"}>Product</div>
            <div className={page === 0 ? "hinEc_" : "hinEc"} />
          </div>
          <div
            className="hinEa"
            onClick={() => setState({ page: 1, addpage: false })}
          >
            <div className={page === 1 ? "hinEb_" : "hinEb"}>Service</div>
            <div className={page === 1 ? "hinEc_" : "hinEc"} />
          </div>
        </div>
        {page === 0 ? (
          addpage ? (
            <AddProdect state={state} setState={setState} />
          ) : (
            <ProdectList state={state} setState={setState} />
          )
        ) : null}
        {modifirePop ? (
          <InventoryAddModifirePopup setState={setState} state={state} />
        ) : null}
        <SuccesPopup msg={succesPop} setState={setState} />
      </React.StrictMode>
    );
  }
}
