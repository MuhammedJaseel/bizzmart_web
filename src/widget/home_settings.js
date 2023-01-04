import { Component, StrictMode } from "react";
import { allSettings } from "../module/home_settings";
import { Header1 } from "./widget";
import {
  getAllOtherSettings,
  getAllPayments,
  getBussinessSettings,
} from "../method/home_settings";
import { getMasterData } from "../method/home_settings";
import { HomeSettings1AddPaymentPopup } from "./home_settings1";
import { HomeSettings1CashAndBank } from "./home_settings1";
import { HomeSettings1BussinessSettings } from "./home_settings1";
import { HomeSettingsBody3, HomeSettingsBody4 } from "./home_settings1";
import { getAllCashandBank } from "../method/home_cashbank";
import {
  HomeSettings5AssetCategories,
  HomeSettings5CategotyAddModifiger,
  HomeSettings5ExpenseCategory,
} from "./home_settings5";
import { HomeSettings5ProdectionStations } from "./home_settings5";
import { HomeSettings5ProductCategory } from "./home_settings5";
import { HomeSettings5SalesTaxes } from "./home_settings5";
import { AccountAddPopUpLayout } from "./home_cashbank1";
import { WidgetConfirmPopup } from "./widget_popup";
import {
  HomeSettings2InvoiceForm,
  HomeSettings2DocumentPrefix,
  HomeSettings2ServiceAndJobOrder,
  HomeSettings2Barcode,
} from "./home_settings2";
import "../style/hst.css";
import "../style/hst2.css";
import { HomeSettings4AllowanceInceventves } from "./home_settings4";
import {
  HomeSettings6AssetsExpenses,
  HomeSettings6EquityEarnings,
} from "./home_settings6";

export default class HomeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      page: null,
      // STORAGE ///////////////////////////////////////////////////
      bussinessSettings: {},
      allAccounts: [],
      allPayments: [],
      allBusinessType: [],
      allTax: [],
      addAccount: null,
      addPayment: null,
      confirmPop: null,
      addTax: {},
      // ////////////////////////////////////////////////////////////
      assetAndRecExpense: {},
      allEquity: [],
      // ////////////////////////////////////////////////////////////
      allKot: [],
      allCategory: [],
      addCategoryModifier: null,
      // FUNCTION ///////////////////////////////////////////////////
      succesPop: props.succesPop,
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getBussinessSettings(state, setState);
    getAllCashandBank(state, setState);
    getMasterData(state, setState);
    getAllPayments(state, setState);
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    return (
      <StrictMode>
        <HomeSettingsLanding state={state} setState={setState} />
        <HomeSettings1BussinessSettings state={state} setState={setState} />
        <HomeSettings1CashAndBank state={state} setState={setState} />
        <HomeSettingsBody3 state={state} setState={setState} />
        <HomeSettingsBody4 state={state} setState={setState} />
        <HomeSettings2InvoiceForm state={state} setState={setState} />
        <HomeSettings2DocumentPrefix state={state} setState={setState} />
        <HomeSettings2ServiceAndJobOrder state={state} setState={setState} />
        <HomeSettings2Barcode state={state} setState={setState} />
        <HomeSettings4AllowanceInceventves state={state} setState={setState} />
        <HomeSettings5ExpenseCategory state={state} setState={setState} />
        <HomeSettings5ProductCategory state={state} setState={setState} />
        <HomeSettings5SalesTaxes state={state} setState={setState} />
        <HomeSettings5ProdectionStations state={state} setState={setState} />
        <HomeSettings5AssetCategories state={state} setState={setState} />
        <HomeSettings5CategotyAddModifiger state={state} setState={setState} />
        <HomeSettings6AssetsExpenses state={state} setState={setState} />
        <HomeSettings6EquityEarnings state={state} setState={setState} />
        <AccountAddPopUpLayout state={state} setState={setState} />
        <HomeSettings1AddPaymentPopup state={state} setState={setState} />
        <WidgetConfirmPopup props={state.confirmPop} />
      </StrictMode>
    );
  }
}

function HomeSettingsLanding({ state, setState }) {
  const { page } = state;
  if (page !== null) return null;
  return (
    <StrictMode>
      <Header1 title="SETTINGS" bodyL={"SETTINGS LANDING"} />
      <div className="hstA">
        {allSettings.map((it, k) => (
          <div className="hstAa" key={k}>
            <div className="hstAb">{it.title}</div>
            <div className="hstAc">{it.desc}</div>
            {it.data.map((it1, k) => (
              <div
                className="hstAd"
                key={k}
                onClick={() => {
                  setState({ page: it1, error: null });
                  it1?.myFunction(state, setState);
                }}
              >
                <div className="hstAe">{it1.title}</div>
                <div className="hstAf">{it1.desc}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </StrictMode>
  );
}
