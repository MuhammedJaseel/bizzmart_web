import React, { StrictMode } from "react";
import { Header1 } from "./widget";
import WidgetFooterSubmit from "./widget_footer";
import { AddingForm1, AddingFormLayout } from "./widget_form";

export function HomeSettings4AllowanceInceventves({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "allowenceAndIncentives") return null;
  const title = "ALLOWANCES & INCENTIVES";
  const desc =
    "Add the allowances and incentives for your business, these  types will be available when you are making a pay slip.";

  return (
    <StrictMode>
      <Header1
        title="EMPLOYEE SETTINGS"
        bodyL="ALLOWANCES & INCENTIVES"
        onTap={() => setState({ page: null })}
      />
      <div className="hst2_4A">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Allowances">
            <input
              className="hst2_4Aa"
              placeholder="Type allowance head separated by comma and add"
            />
          </AddingForm1>
          <AddingForm1>
            <div className="hst2_4Ab">
              <div className="hst2_4AbA">
                <div className="hst2_4AbAa">Allowance Title</div>
                <div className="hst2_4AbAb">Description</div>
              </div>
              <div className="hst2_4AbB">
                <input className="hst2_4AbBa" />
                <input
                  className="hst2_4AbBb"
                  placeholder="Enter description here"
                />
                <div className="hst2_4AbBc"></div>
              </div>
            </div>
          </AddingForm1>
          <AddingForm1 title="Incentives">
            <input
              className="hst2_4Aa"
              placeholder="Type Incentives head separated by comma and add"
            />
          </AddingForm1>
          <AddingForm1>
            <div className="hst2_4Ab">
              <div className="hst2_4AbA">
                <div className="hst2_4AbAa">Incentives Title</div>
                <div className="hst2_4AbAb">Description</div>
              </div>
              <div className="hst2_4AbB">
                <input className="hst2_4AbBa" />
                <input
                  className="hst2_4AbBb"
                  placeholder="Enter description here"
                />
                <div className="hst2_4AbBc"></div>
              </div>
            </div>
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
