import React, { Component, StrictMode } from "react";
import { Header1, Header4, HeaderButtens1, PaymentCard1 } from "./widget";
import { accountStructure, homeCashbankTitles } from "../module/home_cashbank";
import { homeCashbankPopupTitles } from "../module/home_cashbank";
import {
  WidgetConfirmPopup,
  WidgetPopUp1,
  WidgetPopUp1Body,
} from "./widget_popup";
import { WidgetPopUp1In1, WidgetPopUp1In2 } from "./widget_popup";
import {
  addCashandBank,
  deleteAccount,
  getAllCashandBank,
} from "../method/home_cashbank";
import "../style/hcb.css";

const tit = homeCashbankTitles;
const popTit = homeCashbankPopupTitles;

export default class HomeCashbank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      loading: false,
      addAccountPopup: null,
      error: null,
      allAccounts: [],
      allBanks: [],
      addAccount: accountStructure,
      accountConfirmPop: null,
    };
  }
  componentDidMount() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    getAllCashandBank(state, setState);
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, accountConfirmPop } = state;
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
      <StrictMode>
        <Header1 title="CASH & BANK" bodyL="ACCOUNTS" bodyR={bodyR} />
        <Header4 title={tit[page].title} desc={tit[page].desc} />
        <HomeCashBankBody state={state} setState={setState} />
        <BackacountList state={state} setState={setState} />
        <ChequeList state={state} setState={setState} />
        <AccountAddPopUpLayout state={state} setState={setState} />
        <WidgetConfirmPopup props={accountConfirmPop} />
      </StrictMode>
    );
  }
}

function HomeCashBankBody({ state, setState }) {
  const { page, allAccounts, error, loading } = state;
  if (page !== 0) return null;
  return (
    <div className="hcbB">
      {allAccounts.map((it, k) => (
        <div className="hcbBa" key={k}>
          <PaymentCard1
            props={it}
            onTap={() => {}}
            // onEdit={() => setState({ addPaymentPop: "Edit", addPayment: it })}
            onDelete={() =>
              setState({
                accountConfirmPop: {
                  desc: "Are you sure you want to delete this Account",
                  error,
                  loading,
                  onSubmit: () => deleteAccount(it.id, state, setState),
                  close: () =>
                    setState({ accountConfirmPop: null, error: null }),
                },
              })
            }
          />
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

export function AccountAddPopUpLayout({ state, setState }) {
  const { loading, addAccountPopup, error, addAccount, allBanks } = state;
  if (addAccountPopup === null) return null;
  const popupProps1 = {
    close: () => setState({ addAccountPopup: null }),
    title: popTit[addAccountPopup]?.title,
    desc: popTit[addAccountPopup]?.desc,
    error,
    loading,
    onChnage: (e) => {
      if (e.target.id === "account_display_name") {
        addAccount.account_display_name = JSON.parse(e.target.value).name;
        addAccount.bank_id = JSON.parse(e.target.value).id;
      } else addAccount[e.target.id] = e.target.value;
      setState({ addAccount });
    },
    submit: () => addCashandBank(state, setState),
  };

  var type = 0;
  switch (addAccount.account_type) {
    case "Bank Account":
      type = 0;
      break;
    case "Cash Account":
      type = 1;
      break;
    case "Loan Account":
      type = 0;
      break;
    case "Aggregator Account":
      type = 1;
      break;
  }

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Account Type*">
          <select className="hcbAa" id="account_type">
            <option value="Bank Account">Bank Account</option>
            <option value="Cash Account">Cash Account</option>
            <option value="Loan Account">Loan Account</option>
            <option value="Aggregator Account">Aggregator Account</option>
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1
          title={type === 0 ? "Account Holder*" : "Account display name"}
        >
          <input
            className="hcbAa"
            id="account_name"
            placeholder="Enter account holder name here"
          />
        </WidgetPopUp1In1>
        {type === 0 ? (
          <WidgetPopUp1In2 title1="Branch*" title2="IBAN/IFSC*">
            <input className="hcbAb" placeholder="Enter branch" id="branch" />
            <input
              className="hcbAb"
              placeholder="Enter IFSC/IBAN"
              id="ifsc_code"
            />
          </WidgetPopUp1In2>
        ) : null}
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        {type === 0 ? (
          <StrictMode>
            <WidgetPopUp1In1 title="Select Bank*">
              <select className="hcbAa" id="account_display_name">
                <option>Select your bank</option>
                {allBanks.map((it, k) => (
                  <option value={JSON.stringify(it)}>{it.name}</option>
                ))}
              </select>
            </WidgetPopUp1In1>
            <WidgetPopUp1In1 title="Account Number*">
              <input
                className="hcbAa"
                placeholder="Enter account number here"
                id="account_number"
              />
            </WidgetPopUp1In1>
          </StrictMode>
        ) : null}
        <WidgetPopUp1In2 title1="Account Balance" title2="As On">
          <input className="hcbAb" placeholder="0.00" id="account_balance" />
          <input className="hcbAb" type="date" disabled />
        </WidgetPopUp1In2>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
