import React, { StrictMode } from "react";
import { Header1 } from "./widget";
import WidgetFooterSubmit from "./widget_footer";
import { AddingForm1, AddingForm2, AddingFormLayout } from "./widget_form";

export function HomeSettings6AssetsExpenses({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "assetsAndExpenses") return null;
  const title = "FIXED ACCETS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  const title1 = "RECURRING EXPENSES";
  const desc1 =
    "Email sender address, You can select logged in users email or any email address of your choice";

  return (
    <StrictMode>
      <Header1
        title="OTHER SETTINGS"
        bodyL="ASSETS & RECURRING EXPENSES"
        onTap={() => setState({ page: null })}
      />
      <div className="hst2_6A">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Security Deposits">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Furnishings">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Computer & Accessories">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Tools">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Vehicles">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Promotion Expenses">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Other Fixed Assets">
            <input placeholder="0.00" />
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title={title1} desc={desc1}>
          <AddingForm2></AddingForm2>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Rent & Rates">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2></AddingForm2>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Employee Wages">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Electricity & Water">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Telephone & Internet">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Transportation ">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Subscriptions">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Other Ezpenses">
            <input placeholder="0.00" />
          </AddingForm1>
        </AddingFormLayout>
      </div>
      <WidgetFooterSubmit
        props={{
          // onTap: () => submitCategorys(state, setState),
          onCancel: () => state.setPage(null),
          loading,
          error,
        }}
      />
    </StrictMode>
  );
}

export function HomeSettings6EquityEarnings({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "equityEarnings") return null;
  const title = "EQUITY & EARNINGS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";

  return (
    <StrictMode>
      <Header1
        title="OTHER SETTINGS"
        bodyL="Equity & Earnings"
        onTap={() => setState({ page: null })}
      />
      <div className="hst2_6B">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Equity Investment">
            <input placeholder="0.00" />
          </AddingForm1>
          <AddingForm2>Amount</AddingForm2>
          <AddingForm1 title="Retained Earnings">
            <input placeholder="0.00" />
          </AddingForm1>
        </AddingFormLayout>
      </div>
      <WidgetFooterSubmit
        props={{
          // onTap: () => submitCategorys(state, setState),
          onCancel: () => state.setPage(null),
          loading,
          error,
        }}
      />
    </StrictMode>
  );
}
