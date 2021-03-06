import React, { Component } from "react";
import { Header1, Header4, HeaderButtens1, PaymentCard1 } from "./widget";
import { homeCashbankTitles } from "../module/home_cashbank";
import { homeCashbankPopupTitles } from "../module/home_cashbank";
import { WidgetPopUp1 } from "./widget_popup";
import "../style/hcb.css";

const tit = homeCashbankTitles;
const popTit = homeCashbankPopupTitles;

export default class HomeCashbank extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, popup: null };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;
    const bodyRBody = {
      makeAdd: () => setState({ popup: 0 }),
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
        <div className="hcbBa">
          <PaymentCard1 props={{}} />
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
  const { popup } = state;
  if (popup === null) return null;
  const popupProps1 = {
    close: () => setState({ popup: null }),
    title: popTit[popup]?.title,
    desc: popTit[popup]?.desc,
  };
  return <WidgetPopUp1 props={popupProps1} />;
}
