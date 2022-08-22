import { Component, StrictMode } from "react";
import { addPaymentDummy, allSettings } from "../module/home_settings";
import { Header1 } from "./widget";
import { getAllPayments, getBussinessSettings } from "../method/home_settings";
import { getMasterData } from "../method/home_settings";
import { HomeSettings1AddPaymentPopup } from "./home_settings1";
import { HomeSettings1CashAndBank } from "./home_settings1";
import { HomeSettings1BussinessSettings } from "./home_settings1";
import { HomeSettingsBody3, HomeSettingsBody4 } from "./home_settings1";
import { getAllCashandBank } from "../method/home_cashbank";
import { HomeSettings5ExpenseCategory } from "./home_settings5";
import { HomeSettings5ProdectionStations } from "./home_settings5";
import { HomeSettings5ProductCategory } from "./home_settings5";
import { HomeSettings5SalesTaxes } from "./home_settings5";
import { AccountAddPopUpLayout } from "./home_cashbank1";
import { accountStructure } from "../module/home_cashbank";
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
import { HomeSettings6AssetsExpenses, HomeSettings6EquityEarnings } from "./home_settings6";

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
      addAccountPopup: null,
      addAccount: accountStructure,
      addPayment: addPaymentDummy,
      addPaymentConfirmPop: null,
      // ////////////////////////////////////////////////////////////
      allKot: [],
      addKot: [],
      deleteKot: [],
      // ////////////////////////////////////////////////////////////
      allCategory: [],
      addCategory: [],
      deleteCategory: [],
      // FUNCTION ///////////////////////////////////////////////////
      succesPop: props.succesPop,
      setPage: (v) => {
        this.setState({ page: v, error: null });
        var url = "/dashboard/settings";
        if (v !== null) url = `/dashboard/settings/${v.path}`;
        window.history.replaceState("home", "home", url);
      },
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    let path = window.location.pathname.split("/");
    // if (path.length > 3) {
    //   path = path[3];
    //   for (let j = 0; j < allSettings.length; j++)
    //     for (let i = 0; i < allSettings[j].data.length; i++)
    //       if (allSettings[j].data[i].path === path) {
    //         this.setState({ page: allSettings[j].data[i] });
    //         break;
    //       }
    // } else this.setState({ page: null });
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
        {/* LANDING PAGE */}
        <HomeSettingsLanding state={state} setState={setState} />
        {/* FORM PAGE STARTS HERE */}
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
        <HomeSettings6AssetsExpenses state={state} setState={setState} />
        <HomeSettings6EquityEarnings state={state} setState={setState} />
        {/* POPUP STARTS */}
        <AccountAddPopUpLayout state={state} setState={setState} />
        <HomeSettings1AddPaymentPopup state={state} setState={setState} />
        <WidgetConfirmPopup props={state.addPaymentConfirmPop} />
      </StrictMode>
    );
  }
}

function HomeSettingsLanding({ state, setState }) {
  const { page, setPage } = state;
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
              <div className="hstAd" key={k} onClick={() => setPage(it1)}>
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
