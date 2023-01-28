import React, { Component, StrictMode } from "react";
import { Header1, Header2, Header4 } from "./widget";
import { HeaderButtens1, PaymentCard1 } from "./widget";
import { accountStructure } from "../module/home_cashbank";
import { WidgetConfirmPopup } from "./widget_popup";
import { getAllCashandBank, getBankHistory } from "../method/home_cashbank";
import { deleteAccount } from "../method/home_cashbank";
import { MyTable1, MyTableCounter1 } from "./widget_table";
import { AccountAddPopUpLayout } from "./home_cashbank1";
import { FundTransferPopUpLayout } from "./home_cashbank1";
import { ReciveMoneyPopUpLayout } from "./home_cashbank1";
import { SpendMoneyPopUpLayout } from "./home_cashbank1";
import { TitleFilter1 } from "./widget";
import "../style/hcb.css";
import { getTodayType1, getTodayType2 } from "../module/simple";

export default class HomeCashbank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      loading: false,
      error: null,
      allAccounts: [],
      allBanks: [],
      allTransferType: [],
      allContact: [],
      allPaymenyMode: [],
      addAccount: null,
      confirmPop: null,
      account: null,
      fundTransfer: null,
      receiveMoney: null,
      spendMoney: null,
      allCheque: [],
      chequePaging: {},
      chequePage: 0,
      // FUNCTION ///////////////////////////////////////////////////
      succesPop: props.succesPop,
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
    const { page, confirmPop } = state;
    const bodyRBody = {
      makeAdd: () => setState({ addAccount: accountStructure }),
      title: "+ New Account",
      drowelList: [
        {
          title: "Add Account",
          fun: () => setState({ addAccount: accountStructure }),
        },
        { title: "Fund Transfer", fun: () => setState({ fundTransfer: {} }) },
        { title: "Receive Money", fun: () => setState({ receiveMoney: {} }) },
        { title: "Spend Money", fun: () => setState({ spendMoney: {} }) },
        // { title: "PDC Tracking", fun: () => setState({ page: 2 }) },
      ],
    };
    const bodyR = page === 0 ? <HeaderButtens1 props={bodyRBody} /> : null;

    return (
      <StrictMode>
        <Header1
          title="CASH & BANK"
          bodyL="ACCOUNTS"
          bodyR={bodyR}
          onTap={() => setState({ page: 0 })}
        />
        <HomeCashBankBody state={state} setState={setState} />
        <BankHistory state={state} setState={setState} />
        <ChequeList state={state} setState={setState} />
        <AccountAddPopUpLayout state={state} setState={setState} />
        <FundTransferPopUpLayout state={state} setState={setState} />
        <ReciveMoneyPopUpLayout state={state} setState={setState} />
        <SpendMoneyPopUpLayout state={state} setState={setState} />
        <WidgetConfirmPopup props={confirmPop} />
      </StrictMode>
    );
  }
}

function HomeCashBankBody({ state, setState }) {
  const { page, allAccounts, error, loading } = state;
  const title = "Cash & Bank Accounts";
  const desc =
    "Add your bank accounts, cash and loan accounts. click to view all the recorded transactions on the respective accounts.";

  if (page !== 0) return null;
  return (
    <StrictMode>
      <Header4 title={title} desc={desc} />
      <div className="hcbB">
        {allAccounts.map((it, k) => (
          <div className="hcbBa" key={k}>
            <PaymentCard1
              props={it}
              hide={it.account_display_name === "Cash in hand"}
              onTap={() => {
                it.from_date = getTodayType2();
                it.to_date = getTodayType2();
                getBankHistory(it, state, setState);
              }}
              onEdit={() => setState({ addAccount: it })}
              onDelete={() =>
                setState({
                  confirmPop: {
                    desc: "Are you sure you want to delete this Account",
                    loading,
                    error,
                    onSubmit: () => deleteAccount(it.id, state, setState),
                    close: () => setState({ confirmPop: null, error: null }),
                  },
                })
              }
            />
          </div>
        ))}
      </div>
    </StrictMode>
  );
}

function BankHistory({ state, setState }) {
  const { page, account, loading, error } = state;

  const balanceBody = (
    <div className="hcbCa">
      ACCOUNT BALANCE:
      <div className="hcbCaA">&nbsp;{account?.total}</div>
    </div>
  );

  // const filterBody = { onlyDate: true };
  // const filter = <TitleFilter1 props={filterBody} />;
  const filter = (
    <div className="hrpAa">
      <input
        type="date"
        className="hrpAaA"
        defaultValue={account?.from_date}
        onChange={(e) => {
          account.from_date = e.target.value;
          getBankHistory(account, state, setState);
        }}
      />
      &ensp; to &ensp;
      <input
        type="date"
        className="hrpAaA"
        defaultValue={account?.to_date}
        onChange={(e) => {
          account.to_date = e.target.value;
          getBankHistory(account, state, setState);
        }}
      />
    </div>
  );

  const heads = [
    "",
    "Date",
    "Type",
    "Reference",
    "Name",
    "Received",
    "Paid",
    "Balance",
  ];

  const widths = [
    { width: 1 },
    { width: 10 },
    { width: 15 },
    { width: 15 },
    { width: 10 },
    { width: 10, right: true },
    { width: 15, right: true },
    { width: 15, right: true },
  ];
  const body = [];

  for (let i = 0; i < account?.transactions?.length; i++) {
    const it = account?.transactions[i];
    body.push([
      { data: null },
      { data: it.date },
      { data: it.type },
      { data: it.description },
      { data: it.name },
      { data: it.received },
      { data: it.paid },
      { data: it.balance },
    ]);
  }

  const counterProps = {
    noPaging: true,
    total: account?.transactions?.length,
    loading,
    error,
  };

  if (page !== 1) return null;
  return (
    <React.StrictMode>
      <Header1 title={account.account_display_name} bodyR={filter} />
      <Header4
        title="Review Account Activites"
        desc="Review all the account activities against the given date range, you can reconsile for any mismatch or charges here"
        body={balanceBody}
      />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={counterProps} />
    </React.StrictMode>
  );
}

function ChequeList({ state, setState }) {
  const { page, allCheque, chequePaging, chequePage } = state;
  const heads = [
    null,
    "Party Name",
    "Due Date #",
    "Bank Account",
    "Phone Number",
    "Transaction",
    "Reference",
    "Amount",
    "Actions",
  ];

  const title = "Cheque List";
  const desc = "Shows all the cheques recorded and to be realized.";

  const widths = [
    { width: 10 },
    { width: 15 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
    { width: 10, right: true },
    { width: 10, right: true },
  ];
  const body = [];
  // for (let i = 0; i < allCheque.length; i++) {
  for (let i = 0; i < 20; i++) {
    // const it = allCheque[i];
    body.push([
      { data: "it.date" },
      { data: "it.name" },
      { data: "it.reference" },
      { data: "it.name" },
      { data: "it.recevied" },
      { data: "it.paid" },
      { data: "it.balance" },
      { data: "it.balance" },
      { data: "it.balance" },
    ]);
  }
  const counterProps = {
    total: chequePaging?.totalCount,
    page: chequePaging?.page_number,
    onTap: (v) => {
      chequePaging.page_number = v;
      // getAllCustomers(state, setState);TODO
    },
  };
  if (page !== 2) return null;
  return (
    <React.StrictMode>
      <Header4 title={title} desc={desc} />
      <Header2
        titles={["All Cheques", "Outward", "Inward"]}
        page={chequePage}
        onTap={(k) => setState({ chequePage: k })}
      />
      <MyTable1 widths={widths} heads={heads} body={body} />
      <MyTableCounter1 props={counterProps} />
    </React.StrictMode>
  );
}
