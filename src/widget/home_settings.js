import React, { Component, StrictMode } from "react";
import { allSettings } from "../module/home_settings";
import { Header1 } from "./widget";
import { getAllData } from "../method/home_settings";
import "../style/hst.css";
import { HomeSettingsBody2, HomeSettingsBody3, HomeSettingsBody4, HomeSettingsBussinessSettings } from "./home_settings1";

export default class HomeSettings extends Component {
  constructor() {
    super();
    this.state = {
      page: null,
      // STORAGE ////////////////////////////////////
      bussinessSettings: {},
    };
  }

  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getAllData(state, setState);
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    return (
      <StrictMode>
        <HomeSettingsLanding state={state} setState={setState} />
        <HomeSettingsBussinessSettings state={state} setState={setState} />
        <HomeSettingsBody2 state={state} setState={setState} />
        <HomeSettingsBody3 state={state} setState={setState} />
        <HomeSettingsBody4 state={state} setState={setState} />
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
                onClick={() => setState({ page: it1 })}
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
