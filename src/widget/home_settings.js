import React, { Component, StrictMode } from "react";
import { allSettings } from "../module/home_settings";
import { Header1 } from "./widget";
import { getBussinessSettings, getKots } from "../method/home_settings";
import "../style/hst.css";
import { HomeSettingsCashAndBank } from "./home_settings1";
import { HomeSettingsBussinessSettings } from "./home_settings1";
import { HomeSettingsBody3, HomeSettingsBody4 } from "./home_settings1";
import { getAllCashandBank } from "../method/home_cashbank";
import { HomeSettingsProdectionStations } from "./home_settings5";

export default class HomeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      page: null,
      // STORAGE ////////////////////////////////////
      bussinessSettings: {},
      allAccounts: [],
      allKot: [],
      addKot: [],
      deleteKot: [],
      // FUNCTION ///////////////////////////////////////////////////////////////////
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
    if (path.length > 3) {
      path = path[3];
      for (let j = 0; j < allSettings.length; j++)
        for (let i = 0; i < allSettings[j].data.length; i++)
          if (allSettings[j].data[i].path === path) {
            this.setState({ page: allSettings[j].data[i] });
            break;
          }
    } else this.setState({ page: null });
    getBussinessSettings(state, setState);
    getAllCashandBank(state, setState);
    getKots(state, setState);
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    return (
      <StrictMode>
        <HomeSettingsLanding state={state} setState={setState} />
        <HomeSettingsBussinessSettings state={state} setState={setState} />
        <HomeSettingsCashAndBank state={state} setState={setState} />
        <HomeSettingsBody3 state={state} setState={setState} />
        <HomeSettingsBody4 state={state} setState={setState} />
        <HomeSettingsProdectionStations state={state} setState={setState} />
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
