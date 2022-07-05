import React, { Component } from "react";
import "../style/hcb.css";
import { Header1, Header4 } from "./widget";

const titles = {
  title: "Cash & Bank Accounts",
  desc: "Add your bank accounts, cash and loan accounts. click to view all the recorded transactions on the respective accounts.",
};

export default class HomeCashbank extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);

    return (
      <React.StrictMode>
        <Header1 title="CASH & BANK" bodyL="ACCOUNTS" />
        <Header4 title={titles.title} desc={titles.desc} />
        <HomeCashBankBody state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeCashBankBody({ state, setState }) {
  return (
    <div className="hcbB">
      {[1, 1].map(() => (
        <div className="hcbBa">
          <div className="hcbBaA">
            <div className="hcbBaAa">Cash in hand</div>
            <div className="hcbBaAb" />
          </div>
          <div className="hcbBaB">Balance</div>
          <div className="hcbBaC">INR 123,556.00</div>
          <div className="hcbBaD">Last entry: Today</div>
          <div className="hcbBaE">
            <div className="hcbBaEa">Cash Account</div>
            <div className="hcbBaEb">
              <div className="hcbBaEc" />
              <div className="hcbBaEd" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
