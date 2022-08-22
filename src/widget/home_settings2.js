import React, { StrictMode } from "react";
import { Header1 } from "./widget";
import WidgetFooterSubmit from "./widget_footer";
import {
  AddingForm1,
  AddingFormLayout,
  AddingFormLayout2,
  FormSwitch,
} from "./widget_form";

export function HomeSettings2InvoiceForm({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "invoiceForm") return null;
  const title = "Invoice Form Settings";
  const desc =
    "Add the service types for your business, these service types will be available when you are making a job card.";
  const title1 = "Invoice Customizations ";
  const desc1 =
    "Add the service types for your business, these service types will be available when you are making a job card.";
  return (
    <StrictMode>
      <Header1
        title="DOCUMENT SETTINGS"
        bodyL="INVOICE FORM SETTINGS"
        onTap={() => setState({ page: null })}
      />
      <div className="hst_2A">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1>
            <div className="hst_2Aa">
              <div className="hst_2AaA">
                <div className="hst_2AaAa">A4</div>
                <div className="hst_2AaAb">A5</div>
              </div>
            </div>
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title={title1} desc={desc1}>
          <AddingForm1 title="Select Logo">
            <AddingFormLayout2
              t1="+ Add Logo Here"
              t2="1:1 aspect ratio"
              t3="Transparent PNG, 512 X 512 Pixels"
              setImg={(v) => {}}
            />
          </AddingForm1>
          <AddingForm1 title="Select Signature">
            <AddingFormLayout2
              t1="+ Add Signature Here"
              t2="4:2 aspect ratio"
              t3="White background, 512 X 256 Pixels"
              setImg={(v) => {}}
            />
          </AddingForm1>
          <AddingForm1 title="Show Bank Details">
            <FormSwitch />
          </AddingForm1>
          <AddingForm1 title="Show Online Store QR">
            <FormSwitch />
          </AddingForm1>
          <AddingForm1 title="Invoice Note">
            <textarea className="hst_2Af" placeholder="Enter note here" />
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
export function HomeSettings2DocumentPrefix({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "documentPrefix") return null;
  const title = "Document Prefix";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  const title1 = "Document Title Settings";
  const desc1 =
    "Email sender address, You can select logged in users email or any email address of your choice";
  return (
    <StrictMode>
      <Header1
        title="DOCUMENT SETTINGS"
        bodyL="DOCUMENT PREFIX"
        onTap={() => setState({ page: null })}
      />
      <div className="hst_2B">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Sales Invoice">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Purchase Invoice">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Expense Transaction">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Fund Transfer">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Payment Receipt">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Payment Voucher">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Salary Payments">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Invoice Return">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Purchase Return">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>

          <AddingForm1 title="Store Credit">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Supplier Advance">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Estimate Invoice">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
          <AddingForm1 title="Purchase Order">
            <div className="hst_2Ba">
              <input className="hst_2BaA" />
              <div className="hst_2BaB">Starting Serial</div>
              <input className="hst_2BaA" />
            </div>
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title={title1} desc={desc1}>
          <AddingForm1 title="Estimate Title">
            <select className="hst_2Bc" />
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
export function HomeSettings2Barcode({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "barcode") return null;
  const title = "SERVICE TYPES";
  const desc =
    "Add the service types for your business, these service types will be available when you are making a job card.";

  return (
    <StrictMode>
      <Header1
        title="DOCUMENT SETTINGS"
        bodyL="SERVICE & JOB ORDER SETTINGS"
        onTap={() => setState({ page: null })}
      />
      <div className="hst_2C">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Selling information *"></AddingForm1>
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
export function HomeSettings2ServiceAndJobOrder({ state, setState }) {
  const { page, loading, error } = state;
  if (page?.path !== "serviceAndOrder") return null;
  const title = "SERVICE TYPES";
  const desc =
    "Add the service types for your business, these service types will be available when you are making a job card.";

  return (
    <StrictMode>
      <Header1
        title="DOCUMENT SETTINGS"
        bodyL="SERVICE & JOB ORDER SETTINGS"
        onTap={() => setState({ page: null })}
      />
      <div className="hst_2D">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Selling information *">
            <div className="hst_2Da">
              <select className="hst_2DaA">
                <option value="A4">A4</option>
                <option value="A5">A5</option>
              </select>
              <select className="hst_2DaA">
                <option value="Normal">Normal</option>
                <option value="Letter Head">Letter Head</option>
              </select>
            </div>
          </AddingForm1>
          <AddingForm1 title="Bottom T&C Image">
            <AddingFormLayout2
              t1="+ Add Image Here"
              t2="1:1.5 aspect ratio"
              t3="2000 X 3000 Px for A4 | 1000 X 1500 Px for A5"
              setImg={(v) => {}}
            />
          </AddingForm1>
          <AddingForm1 title="Bottom T&C Image">
            <select className="hst_2DaB">
              <option value="Normal">Normal</option>
              <option value="Letter Head">Letter Head</option>
            </select>
            <div className="hst_2DaC">
              {[1, 1, 1].map((it, k) => (
                <div className="hst_2DaCa" key={k}>
                  TItle
                  <div className="hst_2DaCc" onClick={() => alert("Delete")} />
                </div>
              ))}
            </div>
          </AddingForm1>
          <AddingForm1 title="Service Types*">
            <input className="hst_2DaB" />
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title="MOBILE / TABLET SERVICE" desc={"desc"}>
          <AddingForm1>
            <div className="hst_2DaE">
              Mobile / Tablet Service
              <div className="hst_2DaEa" />
            </div>
            <div className="hst_2DaF">
              <div className="hst_2DaFa">Job Types</div>
              <div className="hst_2DaFb">
                <input
                  className="hst_2DaFbA"
                  placeholder="Enter job types seperated by comma and add"
                />
                <div className="hst_2DaFbB">+</div>
              </div>
              <div className="hst_2DaFa">Product Condition</div>
              <div className="hst_2DaFb">
                <input
                  className="hst_2DaFbA"
                  placeholder="Enter values seperated by comma and add"
                />
                <div className="hst_2DaFbB">+</div>
              </div>
              <div className="hst_2DaFa">Recovery Probability</div>
              <div className="hst_2DaFb">
                <input
                  className="hst_2DaFbA"
                  placeholder="Enter values seperated by comma and add"
                />
                <div className="hst_2DaFbB">+</div>
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
