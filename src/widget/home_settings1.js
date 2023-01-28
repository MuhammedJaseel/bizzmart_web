import React, { StrictMode, useState } from "react";
import icXl from "../asset/ic_xl.svg";
import WidgetFooterSubmit from "./widget_footer";
import { addPaymentDummy, allTimeZone } from "../module/home_settings";
import { Header1, PaymentButton1, PaymentCard1 } from "./widget";
import { AddingForm1, AddingFormLayout, FormSwitch } from "./widget_form";
import { AddingFormLayout1 } from "./widget_form";
import { addPayments, deletePayments } from "../method/home_settings";
import { bussinessSettingsValidator } from "../method/home_settings";
import { postBussinessSettings } from "../method/home_settings";
import { postBusinessDay } from "../method/home_settings";
import { WidgetPopUp2Body } from "./widget_popup";
import { WidgetPopUp1, WidgetPopUp1In1 } from "./widget_popup";
import { accountStructure } from "../module/home_cashbank";
import { deleteAccount } from "../method/home_cashbank";
import "../style/hst.css";

export function HomeSettings1BussinessSettings({ state, setState }) {
  const { page, setPage, bussinessSettings, loading, error, allBusinessType } =
    state;

  const body = "GENERAL SETTINGS";
  const bodyL = "BUSINESS & GST SETTINGS";

  if (page?.path !== "bussnessSettings") return null;
  return (
    <form onChange={(e) => bussinessSettingsValidator(e, state, setState)}>
      <fieldset disabled={loading} style={{ border: "none", padding: 0 }}>
        <Header1
          title={body}
          bodyL={bodyL}
          onTap={() => setState({ page: null })}
        />
        <div className="hstD">
          <AddingFormLayout
            title="BRANCH DETAILS"
            desc="Email sender address, You can select logged in user email or any email address of your coice"
          >
            <AddingForm1 title="Branch Name">
              <input
                className="hstDa"
                placeholder="Name"
                id="name"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.name}
              />
              <div className="hstDa_">
                Branch name of your business, this will be visible to your
                customers
              </div>
            </AddingForm1>
            <AddingForm1 title="Business Legal Name">
              <input
                className="hstDa"
                placeholder="Name"
                id="legal_buisness_name"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.legal_buisness_name}
              />
              <div className="hstDa_">
                Registered name of your business, this will be used in invoices
              </div>
            </AddingForm1>
            <AddingForm1 title="Business Address">
              <textarea
                className="hstDa"
                placeholder="Name"
                id="adress"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.adress}
              />
              <div className="hstDa_">
                Full address of your store, this will show to your customers
              </div>
            </AddingForm1>
            <AddingForm1 title="Business Country">
              <input
                className="hstDa"
                placeholder="Name"
                id="country_name"
                disabled
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.country_name}
              />
              <div className="hstDa_">
                The country where your store is functioning
              </div>
            </AddingForm1>
            <AddingForm1 title="State or Province">
              <input
                className="hstDa"
                placeholder="Name"
                id="state_name"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.state_name}
              />
              <div className="hstDa_">
                The state/province where your store is located
              </div>
            </AddingForm1>
            <AddingForm1 title="District">
              <input
                className="hstDa"
                placeholder="Name"
                id="city_name"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.city_name}
              />
              <div className="hstDa_">
                The district where your store is located
              </div>
            </AddingForm1>
            <AddingForm1 title="PIN Code">
              <input
                className="hstDa"
                placeholder="Name"
                type="number"
                id="pin_code"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.pin_code}
              />
              <div className="hstDa_">PIN code of your store location</div>
            </AddingForm1>
          </AddingFormLayout>
          <AddingFormLayout
            title="CONTACT DETAILS"
            desc="Email sender address, You can select logged in users email or any email address of your choice"
          >
            <AddingForm1 title="Registered Mobile">
              <input
                className="hstDa"
                placeholder="94xxxxxx63"
                id="contact_number"
                type="number"
                disabled
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.contact_number}
              />
            </AddingForm1>
            <AddingForm1 title="Sales Contact">
              <input
                className="hstDa"
                placeholder="94xxxxxx63"
                id="sales_number"
                type="number"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.sales_number}
              />
              <div className="hstDa_">
                Sales contact number, this will be displayed to your customers
              </div>
            </AddingForm1>
            <AddingForm1 title="Support Contact">
              <input
                className="hstDa"
                placeholder="94xxxxxx63"
                id="support_number"
                type="number"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.support_number}
              />
              <div className="hstDa_">
                Service contact number, this will be displayed to your customers
              </div>
            </AddingForm1>
            <AddingForm1 title="Whatsapp Number">
              <input
                className="hstDa"
                placeholder="94xxxxxx63"
                id="whatsApp_number"
                type="number"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.whatsApp_number}
              />
              <div className="hstDa_">
                WhatsApp number, this will be displayed to your customers
              </div>
            </AddingForm1>
            <AddingForm1 title="Business Email">
              <input
                className="hstDa"
                placeholder="name@example.com"
                id="branch_email"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.branch_email}
              />
              <div className="hstDa_">
                Email address, this will be displayed to your customers
              </div>
            </AddingForm1>
            <AddingForm1 title="Website">
              <input
                className="hstDa"
                placeholder="www.example.com"
                id="web_site"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.web_site}
              />
              <div className="hstDa_">
                Business website, this will be displayed to your customers
              </div>
            </AddingForm1>
          </AddingFormLayout>
          <AddingFormLayout
            title="OTHER DETAILS"
            desc="Email sender address, You can select logged in users email or any email address of your choice"
          >
            <AddingForm1 title="Timezone*">
              <select
                className="hstDa"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.branch_timezone}
              >
                {allTimeZone?.map((it, k) => (
                  <option key={k} value={it}>
                    {it}
                  </option>
                ))}
              </select>
            </AddingForm1>

            <AddingForm1 title="Working Days*">
              {!loading ? (
                <BussinessSettingsDaysMarker
                  state={state}
                  setState={setState}
                />
              ) : null}
            </AddingForm1>
            <AddingForm1 title="Base Currency*">
              <input
                className="hstDa"
                placeholder="Name"
                id="currency"
                disabled
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.currency}
              />
            </AddingForm1>
            <AddingForm1 title="Industry Type">
              <input
                className="hstDa"
                placeholder="Name"
                id="industry_type"
                disabled
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.industry_type}
              />
            </AddingForm1>
            <AddingForm1 title="Business Type">
              <select
                className="hstDa"
                placeholder="Name"
                id="buisness_type_id"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.buisness_type_id}
              >
                {allBusinessType.map((it, k) => (
                  <option key={k} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
            </AddingForm1>
            <AddingForm1 title="GST Number">
              <input
                className="hstDa"
                placeholder="GSTN!@#"
                id="gst_number"
                style={{ cursor: loading ? "progress" : "" }}
                value={bussinessSettings?.gst_number}
              />
              <div className="hstDa_">
                Tax registration number, this will be shown on the invoices
              </div>
            </AddingForm1>
          </AddingFormLayout>
          <WidgetFooterSubmit
            props={{
              onTap: () => postBussinessSettings(state, setState),
              onCancel: () => setPage(null),
              loading,
              error,
            }}
          />
        </div>
      </fieldset>
    </form>
  );
}

function BussinessSettingsDaysMarker({ state, setState }) {
  const { bussinessSettings } = state;
  const [selected, setSelected] = useState(0);

  var days_ = [];
  for (let j = 0; j < bussinessSettings?.days?.length; j++) {
    const day = bussinessSettings.days[j];
    const tit = bussinessSettings.days[j].slice(0, 3).toUpperCase();
    const from = "09:00";
    const to = "18:30";
    days_.push({ day, tit, flag: 1, active_status: 0, from, to });
  }
  for (let i = 0; i < days_.length; i++) {
    for (let j = 0; j < bussinessSettings?.active_days?.length; j++)
      if (bussinessSettings.active_days[j].day === days_[i].day) {
        days_[i].from = bussinessSettings.active_days[j].opening;
        days_[i].to = bussinessSettings.active_days[j].closing;
        days_[i].active_status = 1;
        break;
      }
  }
  const [days, setDays] = useState(days_);

  const setAllDay = (from, to, status) => {
    for (let i = 0; i < days.length; i++) {
      days[i].from = from;
      days[i].to = to;
      days[i].active_status = status;
    }
  };

  return (
    <div className="hstDc">
      <div className="hstDcA">
        {days?.map((it, k) => (
          <div
            key={k}
            className={
              (it.active_status === 1 ? "hstDcAa" : "hstDcAa_") +
              (selected === k ? " hstDcAa__" : "")
            }
            onClick={() => setSelected(k)}
          >
            {it.tit}
          </div>
        ))}
      </div>
      <div className="hstDcB">
        Open &nbsp;&nbsp;&nbsp;{" "}
        <FormSwitch
          value={days[selected]?.active_status === 1}
          onTap={() => {
            let newArr = [...days];
            newArr[selected].active_status =
              days[selected].active_status === 1 ? 0 : 1;
            setDays(newArr);
          }}
        />
      </div>
      <div className="hstDcC">
        Opening Time*<div>Closing Time*</div>
      </div>
      <div className="hstDcD">
        <input
          type="time"
          className="hstDcDa"
          disabled={days[selected]?.active_status === 0}
          onChange={(e) => (days[selected].from = e.target.value)}
          value={days[selected]?.from}
        />
        <input
          type="time"
          className="hstDcDa"
          disabled={days[selected]?.active_status === 0}
          onChange={(e) => (days[selected].to = e.target.value)}
          value={days[selected]?.to}
        />
        <div
          className="hstDcDb"
          onClick={() =>
            postBusinessDay(
              {
                flag: 2,
                day: "",
                active_status: days[selected].active_status,
                from: days[selected].from,
                to: days[selected].to,
              },
              state,
              setState,
              setAllDay
            )
          }
        >
          APPLY FOR ALL DAYS
        </div>
        <div
          className="hstDcAa"
          onClick={() => postBusinessDay(days[selected], state, setState)}
        >
          APPLY
        </div>
      </div>
    </div>
  );
}

// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
// HOME CASH AND BANK//////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
export function HomeSettings1CashAndBank({ state, setState }) {
  const { page, allAccounts, allPayments, error, loading } = state;
  const desc = `Email sender address, You can select logged in users email or any email address of your choice`;
  const desc1 = `Email sender address, You can select logged in users email or any email address of your choice`;
  if (page?.path !== "paymentBank") return null;
  return (
    <StrictMode>
      <Header1
        title="GENERAL SETTINGS"
        bodyL="PAYMENT METHODS"
        onTap={() => setState({ page: null })}
      />
      <div className="hstD">
        <AddingFormLayout title="CASH & BANK ACCOUNTS" desc={desc}>
          {allAccounts?.map((it, k) => (
            <AddingForm1 key={k}>
              <PaymentCard1
                props={it}
                hide={it.account_display_name === "Cash in hand"}
                onTap={null}
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
            </AddingForm1>
          ))}
          <AddingForm1>
            <PaymentButton1
              props={{
                title: "Add a new account",
                onTap: () => setState({ addAccount: accountStructure }),
              }}
            />
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title="PAYMENT METHODS" desc={desc1}>
          {allPayments?.map((it, k) => (
            <AddingForm1 key={k}>
              <PaymentCard1
                props={it}
                isPayment
                hide={it.type === "Cash"}
                hideBin={it.name === "Card" || it.name === "Upi"}
                onTap={null}
                onEdit={() => setState({ addPayment: it })}
                onDelete={() =>
                  setState({
                    confirmPop: {
                      desc: "Are you sure you want to delete this payment method",
                      error,
                      loading,
                      onSubmit: () => deletePayments(it.id, state, setState),
                      close: () => setState({ confirmPop: null }),
                    },
                  })
                }
              />
            </AddingForm1>
          ))}
          <AddingForm1>
            <PaymentButton1
              props={{
                title: "Add a new payment method",
                onTap: () => setState({ addPayment: addPaymentDummy }),
              }}
            />
          </AddingForm1>
        </AddingFormLayout>
      </div>
    </StrictMode>
  );
}
export function HomeSettings1AddPaymentPopup({ state, setState }) {
  const { error, loading, addPayment, allAccounts } = state;
  const tit = addPayment?.hasOwnProperty("id") ? "Edit" : "Add New";
  const popupProps1 = {
    close: () => setState({ addPayment: null, error: null }),
    title: tit + " Payment Method",
    desc: tit + " payment method to receive payments",
    error,
    loading,
    onChange: (e) => (addPayment[e.target.id] = e.target.value),
    submit: () => addPayments(state, setState),
    small: true,
  };
  if (addPayment === null) return null;
  return (
    <WidgetPopUp1 props={popupProps1}>
      <WidgetPopUp2Body>
        <WidgetPopUp1In1 title="Display Name">
          <input
            className="hcbAa"
            defaultValue={addPayment?.name}
            id="name"
            placeholder="Enter display name"
          />
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Target Account">
          <select
            className="hcbAa"
            id="target_account_id"
            defaultValue={addPayment?.target_account_id}
          >
            <option value="" hidden>
              Select account
            </option>
            {allAccounts.map((it, k) => (
              <option key={k} value={it.id}>
                {it.account_name}
              </option>
            ))}
          </select>
        </WidgetPopUp1In1>
      </WidgetPopUp2Body>
    </WidgetPopUp1>
  );
}

export function HomeSettingsBody3({ state, setState }) {
  const { page } = state;
  const title = "CASH & BANK ACCOUNTS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "uploadItems") return null;
  return (
    <div className="hstD">
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
      <AddingFormLayout1 title={title} desc={desc} ic={icXl} />
    </div>
  );
}
export function HomeSettingsBody4({ state, setState }) {
  const { page } = state;
  const title = "STORE PRESENCE";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "onlineStoreSetting") return null;
  return (
    <div className="hstD">
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="GST Number">
          <select className="hstDa">
            <option>Dissabled</option>
          </select>
        </AddingForm1>
        <AddingForm1 title="Store Cover Image">
          <img
            className="hstDb"
            alt="Bizz"
            src="https://lp-cms-production.imgix.net/2019-06/9483508eeee2b78a7356a15ed9c337a1-bengaluru-bangalore.jpg"
          />
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="GST Number">
          <select className="hstDa">
            <option>Dissabled</option>
          </select>
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        <AddingForm1 title="GST Number">
          <select className="hstDa">
            <option>Dissabled</option>
          </select>
        </AddingForm1>
      </AddingFormLayout>
    </div>
  );
}
