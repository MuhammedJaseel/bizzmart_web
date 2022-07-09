import React, { Component, StrictMode } from "react";
import { allSettings } from "../module/home_settings";
import { Header1, Header2, PaymentCard1 } from "./widget";
import {
  AddingForm1,
  AddingFormLayout,
  AddingFormLayout1,
} from "./widget_form";
import icXl from "../asset/ic_xl.svg";
import "../style/hst.css";

const pTitles = ["All Settings"];

export default class HomeSettings extends Component {
  constructor() {
    super();
    this.state = { page: null };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;
    const titleL = page === 0 ? "SETTINGS LANDING" : "PARTNERS";
    const hOnClick = () => setState({ page: null });

    return (
      <StrictMode>
        <Header1 title="SETTINGS" bodyL={titleL} onclick={hOnClick} />
        <Header2 hidden={page !== null} titles={pTitles} setState={setState} />
        <HomeSettingsLanding state={state} setState={setState} />
        <HomeSettingsBody1 state={state} setState={setState} />
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
  );
}

function HomeSettingsBody1({ state, setState }) {
  const { page } = state;
  const title = "CASH & BANK ACCOUNTS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "bussnessSettings" && page?.path !== "") return null;
  return (
    <div className="hstD">
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="Branch Name">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Business Legal Name">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Business Address">
          <textarea className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Business Country">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="District">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="PIN Code">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="Registered Mobile">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Sales Contact">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Support Contact">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Whatsapp Number">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Business Email">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Website">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="Timezone*">
          <select className="hstDa"></select>
        </AddingForm1>
        <AddingForm1 title="Opening Time*">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Working Days*">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Base Currency*">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Industry Type">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="Business Type">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
        <AddingForm1 title="GST Number">
          <input className="hstDa" placeholder="Name" />
        </AddingForm1>
      </AddingFormLayout>
    </div>
  );
}

function HomeSettingsBody2({ state, setState }) {
  const { page } = state;
  const title = "CASH & BANK ACCOUNTS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "paymentBank") return null;
  return (
    <div className="hstD">
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
        <AddingForm1>
          <PaymentCard1 props={{}} />
        </AddingForm1>
      </AddingFormLayout>
    </div>
  );
}

function HomeSettingsBody3({ state, setState }) {
  const { page } = state;
  const title = "CASH & BANK ACCOUNTS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "uploadItems") return null;
  return (
    <div className="hstD">
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
    </div>
  );
}
function HomeSettingsBody4({ state, setState }) {
  const { page } = state;
  const title = "STORE PRESENCE";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "onlineStoreSetting") return null;
  return (
    <div className="hstD">
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="GST Number">
          <select className="hstDa">
            <option>Dissabled</option>
          </select>
        </AddingForm1>
        <AddingForm1 title="Store Cover Image">
          <img
            className="hstDb"
            src="https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg"
          />
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="GST Number">
          <select className="hstDa">
            <option>Dissabled</option>
          </select>
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="GST Number">
          <select className="hstDa">
            <option>Dissabled</option>
          </select>
        </AddingForm1>
      </AddingFormLayout>
    </div>
  );
}
