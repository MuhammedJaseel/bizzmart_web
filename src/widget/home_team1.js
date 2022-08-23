import React, { StrictMode } from "react";
import { Header1, Header4 } from "./widget";
import WidgetFooterSubmit from "./widget_footer";
import {
  WidgetPopUp1,
  WidgetPopUp1Body,
  WidgetPopUp1In1,
} from "./widget_popup";

export function HomeTeamPaySlip({ state, setState }) {
  const { page } = state;
  if (page !== 2) return null;
  return (
    <StrictMode>
      <Header1
        title="TEAM"
        bodyL="PAYSLIP"
        onTap={() => setState({ page: 0 })}
      />
      <Header4
        title="PAYSLIP"
        desc="Manage employee wages, working days, overtime and allowances. Process employee spayslips for future financial transactions"
      />
      <div className="htmE">
        <div className="htmEa">Date range</div>
        <div className="htmEb">
          <select className="htmEbA"></select>
          <div className="htmEbB">Load</div>
        </div>
        <div className="htmEc">
          <div className="htmEcA">
            <div className="htmEcAa">Employee list (16)</div>
            <div className="htmEcAb">
              {[1, 1, 1, 1, 1, 1, 1].map((it, k) => (
                <div className={k === 2 ? "htmEcAbA_" : "htmEcAbA"} key={k}>
                  Afras Muhammed
                  <div className="htmEcAbAa">PROCESSED</div>
                </div>
              ))}
            </div>
          </div>
          <div className="htmEcB">
            <div className="htmEcBa">
              <div className="htmEcBaA">Employee name</div>
              <div className="htmEcBaA">Designation</div>
              <div className="htmEcBaB">Regular daily pay</div>
              <div className="htmEcBaB">Days/Month</div>
              <div className="htmEcBaB">Basic salary</div>
              <div className="htmEcBaB">Drawings</div>
            </div>
            <div className="htmEcBb">
              <div className="htmEcBaA">Ubaid NK</div>
              <div className="htmEcBaA">Ubaid NK</div>
              <div className="htmEcBaB">Ubaid NK</div>
              <div className="htmEcBaB">Ubaid NK</div>
              <div className="htmEcBaB">Ubaid NK</div>
              <div className="htmEcBaB">Ubaid NK</div>
            </div>
            <div className="htmEcBc">
              <div className="htmEcBcA" />
              <div className="htmEcBcB">Item</div>
              <div className="htmEcBcC">Qty*</div>
              <div className="htmEcBcD">Unit Wage*</div>
              <div className="htmEcBcE">Total</div>
            </div>
            <div className="htmEcBd">
              {[1, 1, 1, 1].map((it, k) => (
                <div className="htmEcBdA">
                  <div className="htmEcBcA">1</div>
                  <div className="htmEcBcB">Item</div>
                  <div className="htmEcBcC">Qty*</div>
                  <div className="htmEcBcD">Unit Wage*</div>
                  <div className="htmEcBcE">Total</div>
                </div>
              ))}
            </div>
            <div className="htmEcBe">
              Subtotal<div>4,175.00</div>
            </div>
            <div className="htmEcBe">
              Subtotal<div>4,175.00</div>
            </div>
            <div className="htmEcBe">
              Subtotal<div>4,175.00</div>
            </div>
            <div className="htmEcBf">
              Net payable<div>4,175.00</div>
            </div>
            <WidgetFooterSubmit props={{}} />
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
export function HomeTeamPayRoll({ state, setState }) {
  const { page } = state;
  if (page !== 3) return null;
  return (
    <StrictMode>
      <Header1
        title="EMPLOYEES"
        bodyL="PAYRUN"
        onTap={() => setState({ page: 0 })}
      />
      <Header4
        title="Process Payrun"
        desc="Record payroll payment against processed payslips"
      />
      <div className="htmF">
        <div className="htmFa">
          <div className="htmFaA">
            Month*
            <select className="htmFaAa"></select>
          </div>
          <div className="htmFaA">
            <div className="htmFaAb">LOAD ALL</div>
          </div>
          <div className="htmFaA">
            Date
            <input type="date" className="htmFaAa" />
          </div>
          <div className="htmFaA">
            Paid From Account*
            <select className="htmFaAa"></select>
          </div>
          <div className="htmFaA">
            Payment Method*
            <select className="htmFaAa"></select>
          </div>
          <div className="htmFaA">
            Reference
            <input
              className="htmFaAc"
              placeholder="Enter transaction referance here"
            />
          </div>
        </div>
        <div className="htmFb">
          <div className="htmFbA"></div>
          <div className="htmFbB">Select Employee*</div>
          <div className="htmFbC">Designation</div>
          <div className="htmFbD">Employee ID</div>
          <div className="htmFbD">Wages</div>
          <div className="htmFbD">Allowances</div>
          <div className="htmFbD">Bonus</div>
          <div className="htmFbD">Total</div>
        </div>
        <div className="htmFc">
          {[1, 1, 1, 1].map((it, k) => (
            <div key={k} className="htmFcA">
              <div className="htmFbA"></div>
              <div className="htmFbB">Select Employee*</div>
              <div className="htmFbC">Designation</div>
              <div className="htmFbD">Employee ID</div>
              <div className="htmFbD">Wages</div>
              <div className="htmFbD">Allowances</div>
              <div className="htmFbD">Bonus</div>
              <div className="htmFbD">Total</div>
            </div>
          ))}
        </div>
        <div className="htmFd">
          <div className="htmFdA">
            <div>Note</div>
            <textarea
              className="htmFdAa"
              placeholder="Enter note if required"
            />
          </div>
          <div className="htmFdA">
            <div className="htmFdAb">
              <div>Subtotal</div>75,000.00
            </div>
            <div className="htmFdAb">
              <div>Subtotal</div>75,000.00
            </div>
            <div className="htmFdAc">
              <div>Total</div>75,000.00
            </div>
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
export function HomeTeamPayAdpancePop({ state, setState }) {
  const { payrollAdvance, error, loading } = state;
  if (payrollAdvance === null) return null;
  const popupProps1 = {
    close: () => setState({ payrollAdvance: null }),
    title: "Payroll Advance",
    desc: "Record an advance payroll payment to your employee.",
    error,
    loading,
    onChange: (e) => (payrollAdvance[e.target.id] = e.target.value),
    submit: () => {},
  };
  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select the employee*">
          <select className="fullWidth"></select>
        </WidgetPopUp1In1>
        <div className="row">
          <WidgetPopUp1In1 title="Amount paying*">
            <input className="fullWidth" placeholder="0.00" type="number" />
          </WidgetPopUp1In1>
          &nbsp;
          <WidgetPopUp1In1 title="Mode of payment*">
            <input className="fullWidth" />
          </WidgetPopUp1In1>
        </div>
        <WidgetPopUp1In1 title="Reference">
          <input className="fullWidth" placeholder="Enter payment reference" />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
      <WidgetPopUp1Body>
        <WidgetPopUp1In1 title="Select a cash or bank account to receive money*">
          <select className="fullWidth"></select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Description">
          <textarea
            className="fullWidth"
            placeholder="Enter the description for this transaction"
          />
        </WidgetPopUp1In1>
      </WidgetPopUp1Body>
    </WidgetPopUp1>
  );
}
