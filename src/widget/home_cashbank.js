import React, { Component, StrictMode } from "react";
import { Header1, Header4, HeaderButtens1 } from "./widget";
import { homeCashbankTitles } from "../module/home_cashbank";
import { homeCashbankPopupTitles } from "../module/home_cashbank";
import "../style/hcb.css";

const tit = homeCashbankTitles;
const popTit = homeCashbankPopupTitles;

export default class HomeCashbank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      popUp: null,
    };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;

    const bodyRBody = {
      makeAdd: () => setState({ popUp: 0 }),
      title: "+ New Account",
      drowelList: [
        { title: "Add Account", fun: () => setState({ popUp: 0 }) },
        { title: "Fund Transfer", fun: () => setState({ popUp: 1 }) },
        { title: "Receive Money", fun: () => setState({ popUp: 2 }) },
        { title: "Spend Money", fun: () => setState({ popUp: 3 }) },
        { title: "PDC Tracking", fun: () => setState({ page: 2 }) },
      ],
    };
    const bodyR = page === 0 ? <HeaderButtens1 props={bodyRBody} /> : null;
    return (
      <React.StrictMode>
        <Header1 title="CASH & BANK" bodyL="ACCOUNTS" bodyR={bodyR} />
        <Header4 title={tit[page].title} desc={tit[page].desc} />
        <HomeCashBankBody state={state} setState={setState} />
        <BackacountList state={state} setState={setState} />
        <ChequeList state={state} setState={setState} />
        <PopUpLayout state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeCashBankBody({ state, setState }) {
  const { page } = state;
  if (page !== 0) return null;
  return (
    <div className="hcbB">
      {[1, 1].map(() => (
        <div className="hcbBa-body">
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
        </div>
      ))}
    </div>
  );
}

function BackacountList({ state, setState }) {
  const { page } = state;
  if (page !== 1) return null;
  return <div className="">BackacountList</div>;
}

function ChequeList({ state, setState }) {
  const { page } = state;
  if (page !== 1) return null;
  return <div className="">BackacountList</div>;
}

function PopUpLayout({ state, setState }) {
  const { popUp } = state;
  if (popUp === null) return null;
  return (
    <div className="hcbD">
      <div className="hcbDa">
        <div className="hcbDb">
          <div className="hcbDbA">{popTit[popUp].title}</div>
          <div className="hcbDbB" onClick={() => setState({ popUp: null })} />
        </div>
        <div className="hcbDc">{popTit[popUp].desc}</div>
        <PopUpAddAcount state={state} setState={setState} />
        <div className="hcbDd">
          <div className="hcbDdA">Errors on page</div>
          <div className="hcbDdB">
            <div className="hcbDdBa" onClick={() => setState({ popUp: null })}>
              CANCEL
            </div>
            <div className="hcbDdBb">SAVE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function PopUpAddAcount({ state, setState }) {
  return (
    <StrictMode>
      <div className="hcbEc">
        <div className="hcbEcA">
          <div className="hcbEcAa">Account Type*</div>
          <select className="hcbEcAb">
            <option>Select account type</option>
          </select>
        </div>
        <div className="hcbEcA">
          <div className="hcbEcAa">Select Bank*</div>
          <select className="hcbEcAb">
            <option>Select your bank</option>
          </select>
        </div>
      </div>
      <div className="hcbEc">
        <div className="hcbEcA">
          <div className="hcbEcAa">Account Holder*</div>
          <input className="hcbEcAb" />
        </div>
        <div className="hcbEcA">
          <div className="hcbEcAa">Account Number*</div>
          <input className="hcbEcAb" />
        </div>
      </div>
      <div className="hcbEc">
        <div className="hcbEcB">
          <div className="hcbEcBa">Branch*</div>
          <input className="hcbEcAb" />
        </div>
        <div className="hcbEcB">
          <div className="hcbEcBa">IBAN/IFSC*</div>
          <input className="hcbEcAb" />
        </div>
        <div />
        <div className="hcbEcB">
          <div className="hcbEcBa">Account Balance</div>
          <input className="hcbEcAb" />
        </div>
        <div className="hcbEcB">
          <div className="hcbEcBa">As On</div>
          <input className="hcbEcAb" />
        </div>
      </div>
    </StrictMode>
  );
}
