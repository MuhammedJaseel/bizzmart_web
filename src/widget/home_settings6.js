import React, { StrictMode } from "react";
import {
  updateAssetAndRecExpense,
  updateEquity,
} from "../method/home_settings";
import { Header1 } from "./widget";
import WidgetFooterSubmit from "./widget_footer";
import { AddingForm1, AddingForm2, AddingFormLayout } from "./widget_form";

export function HomeSettings6AssetsExpenses({ state, setState }) {
  const { page, loading, error, assetAndRecExpense } = state;
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
          {assetAndRecExpense?.fixed_assets?.map((it, k) => (
            <StrictMode key={k}>
              <AddingForm2>{it.title}</AddingForm2>
              <AddingForm1 title={it.description}>
                <input
                  placeholder="0.00"
                  defaultValue={it.amount}
                  onChange={(e) => (it.amount = e.target.value)}
                />
              </AddingForm1>
            </StrictMode>
          ))}
        </AddingFormLayout>
        <AddingFormLayout title={title1} desc={desc1}>
          {assetAndRecExpense?.recurring_expense?.map((it, k) => (
            <StrictMode key={k}>
              <AddingForm2>{it.title}</AddingForm2>
              <AddingForm1 title={it.description}>
                <input
                  placeholder="0.00"
                  defaultValue={it.amount}
                  onChange={(e) => (it.amount = e.target.value)}
                />
              </AddingForm1>
            </StrictMode>
          ))}
        </AddingFormLayout>
      </div>
      <WidgetFooterSubmit
        props={{
          onTap: () => updateAssetAndRecExpense(state, setState),
          onCancel: () => setState({ page: null }),
          loading,
          error,
        }}
      />
    </StrictMode>
  );
}

export function HomeSettings6EquityEarnings({ state, setState }) {
  const { page, loading, error, allEquity } = state;
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
          {allEquity?.map((it, k) => (
            <StrictMode key={k}>
              <AddingForm2>{it.title}</AddingForm2>
              <AddingForm1 title={it.description}>
                <input
                  placeholder="0.00"
                  defaultValue={it.amount}
                  onChange={(e) => (it.amount = e.target.value)}
                />
              </AddingForm1>
            </StrictMode>
          ))}
        </AddingFormLayout>
      </div>
      <WidgetFooterSubmit
        props={{
          onTap: () => updateEquity(state, setState),
          onCancel: () => setState({ page: null }),
          loading,
          error,
        }}
      />
    </StrictMode>
  );
}
