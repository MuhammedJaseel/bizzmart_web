import React, { Component, StrictMode } from "react";
import { allSettings } from "../module/home_settings";
import { Header1, Header2 } from "./widget";
import "../style/hst.css";

const pTitles = ["All Settings"];

export default class HomeSettings extends Component {
  constructor() {
    super();
    this.state = {
      page: null,
    };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;
    const titleL = page === 0 ? "SETTINGS LANDING" : "PARTNERS";

    return (
      <React.StrictMode>
        <Header1 title="SETTINGS" bodyL={titleL} />
        <Header2 titles={pTitles} page={0} setState={setState} />
        <HomeSettingsLanding state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeSettingsLanding({ state, setState }) {
  const { page } = state;
  if (page !== null) return null;
  return (
    <div className="hstA">
      {allSettings.map((it, k) => (
        <div className="hstAa" key={k}>
          <div className="hstAb">{it.title}</div>
          <div className="hstAc">{it.desc}</div>
          {it.data.map((it, k) => (
            <div className="hstAd" key={k}>
              <div className="hstAe">{it.title}</div>
              <div className="hstAf">{it.desc}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
