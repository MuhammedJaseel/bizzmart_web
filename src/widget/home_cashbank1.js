import React, { StrictMode } from "react";
import { WidgetPopUp1, WidgetPopUp1Body } from "./widget_popup";
import { WidgetPopUp1In1, WidgetPopUp1In2 } from "./widget_popup";
import { addCashandBank } from "../method/home_cashbank";

export function AccountAddPopUpLayout({ state, setState }) {
  const { loading, error, addAccount, allBanks } = state;
  if (addAccount === null) return null;
  const popupProps1 = {
    close: () => setState({ addAccount: null }),
    title: "Add Account",
    desc: `Setup a new cash or bank account here for your business on bizzSmart.`,
    error,
    loading,
    onChange: (e) => {
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

  function setDate(d) {
    const s = d.split("-");
    return `${s[2]}-${s[1]}-${s[0]}`;
  }

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Account Type*">
          <select
            className="hcbAa"
            id="account_type"
            defaultValue={addAccount?.account_type}
          >
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
            defaultValue={addAccount?.account_name}
            placeholder="Enter account holder name here"
          />
        </WidgetPopUp1In1>
        {type === 0 ? (
          <WidgetPopUp1In2 title1="Branch*" title2="IBAN/IFSC*">
            <input
              className="hcbAb"
              defaultValue={addAccount?.branch}
              placeholder="Enter branch"
              id="branch"
            />
            <input
              className="hcbAb"
              placeholder="Enter IFSC/IBAN"
              defaultValue={addAccount?.ifsc_code}
              id="ifsc_code"
            />
          </WidgetPopUp1In2>
        ) : null}
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        {type === 0 ? (
          <StrictMode>
            <WidgetPopUp1In1 title="Select Bank*">
              <select
                className="hcbAa"
                id="account_display_name"
                defaultValue={addAccount?.account_display_name}
              >
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
                defaultValue={addAccount?.account_number}
                id="account_number"
                type="number"
              />
            </WidgetPopUp1In1>
          </StrictMode>
        ) : null}
        <WidgetPopUp1In2 title1="Account Balance" title2="As On">
          <input
            className="hcbAb"
            type="number"
            placeholder="0.00"
            id="account_balance"
            defaultValue={addAccount?.account_balance}
          />
          <input
            className="hcbAb"
            type={addAccount?.date === undefined ? "" : "date"}
            disabled
            placeholder="dd-mm-yyyy"
            value={setDate(addAccount?.date)}
          />
        </WidgetPopUp1In2>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
export function FundTransferPopUpLayout({ state, setState }) {
  const { loading, makePayment, error, allBanks } = state;
  if (makePayment === null) return null;
  const popupProps1 = {
    close: () => setState({ makePayment: null }),
    title: "Transfer Money",
    desc: "Record the transfer of money between your bank and the cash or credit",
    error,
    loading,
    onChange: (e) => (makePayment[e.target.id] = e.target.value),
    submit: () => {},
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Paid from Account*">
          <select className="hcbAa" id="account_type">
            <option disabled>Select bank</option>
            {allBanks.map((it, k) => (
              <option key={k} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In2 title1="Amount Transferred*" title2="Transfer Method*">
          <input className="hcbAb" placeholder="Enter branch" id="branch" />
          <select className="hcbAb" id="ifsc_code">
            <option>Cash Deposit</option>
          </select>
        </WidgetPopUp1In2>
        <WidgetPopUp1In1 title="Reference">
          <input className="hcbAa" id="reference" placeholder="Type here.." />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Paid into Account*">
          <select className="hcbAa" id="account_type">
            <option disabled>Select bank</option>
            {allBanks.map((it, k) => (
              <option key={k} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In2 title1="As On">
          <input className="hcbAb" type="date" disabled />
        </WidgetPopUp1In2>
        <WidgetPopUp1In1 title="Description">
          <input className="hcbAa" id="description" placeholder="Type here.." />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
export function ReciveMoneyPopUpLayout({ state, setState }) {
  const { loading, receiveMoney, error, allBanks } = state;
  if (receiveMoney === null) return null;
  const popupProps1 = {
    close: () => setState({ receiveMoney: null }),
    title: "Receive Money",
    desc: "Record a cashflow in transaction from your contact to cash or bank account.",
    error,
    loading,
    onChange: (e) => (receiveMoney[e.target.id] = e.target.value),
    submit: () => {},
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select a contact to receive money from*">
          <select className="hcbAa" id="account_type">
            <option disabled>Select bank</option>
            {allBanks.map((it, k) => (
              <option key={k} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In2 title1="Amount receiving*" title2="Mode of payment*">
          <input
            className="hcbAb"
            placeholder="0.00"
            id="branch"
            type="number"
          />
          <select className="hcbAb" id="ifsc_code">
            <option>Fund Transfer</option>
          </select>
        </WidgetPopUp1In2>
        <WidgetPopUp1In1 title="Reference">
          <input
            className="hcbAa"
            id="reference"
            placeholder="Enter payment reference"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select a cash or bank account to receive money*">
          <select className="hcbAa" id="account_type">
            <option disabled>Select bank</option>
            {allBanks.map((it, k) => (
              <option key={k} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title1="Description">
          <textarea
            className="hcbAa"
            type="date"
            placeholder="Enter the description for this transaction"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
export function SpendMoneyPopUpLayout({ state, setState }) {
  const { loading, spendMoney, error, allBanks } = state;
  if (spendMoney === null) return null;
  const popupProps1 = {
    close: () => setState({ spendMoney: null }),
    title: "Spend Money",
    desc: "Record a cashflow out transaction from your cash or bank account to a contact.",
    error,
    loading,
    onChange: (e) => (spendMoney[e.target.id] = e.target.value),
    submit: () => {},
  };

  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select a contact to receive money from*">
          <select className="hcbAa" id="account_type">
            <option disabled>Select bank</option>
            {allBanks.map((it, k) => (
              <option key={k} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In2 title1="Amount Spending*" title2="Mode of payment*">
          <input
            className="hcbAb"
            placeholder="0.00"
            id="branch"
            type="number"
          />
          <select className="hcbAb" id="ifsc_code">
            <option>Fund Transfer</option>
          </select>
        </WidgetPopUp1In2>
        <WidgetPopUp1In1 title="Reference">
          <input
            className="hcbAa"
            id="reference"
            placeholder="Enter payment reference"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select a cash or bank account to receive money*">
          <select className="hcbAa" id="account_type">
            <option disabled>Select bank</option>
            {allBanks.map((it, k) => (
              <option key={k} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title1="Description">
          <textarea
            className="hcbAa"
            type="date"
            placeholder="Enter the description for this transaction"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
