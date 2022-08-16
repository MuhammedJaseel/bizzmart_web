import React, { useState } from "react";
import { allTimeZone } from "../module/home_settings";
import { Header1, PaymentButton1, PaymentCard1 } from "./widget";
import { AddingForm1, AddingFormLayout, FormSwitch } from "./widget_form";
import { AddingFormLayout1 } from "./widget_form";
import icXl from "../asset/ic_xl.svg";
import {
  bussinessSettingsValidator,
  postBusinessDay,
  postBussinessSettings,
} from "../method/home_settings";
import "../style/hst.css";
import WidgetFooterSubmit from "./widget_footer";

export function HomeSettings1BussinessSettings({ state, setState }) {
  const { page, setPage, bussinessSettings, loading, error } = state;

  const body = "GENERAL SETTINGS";
  const bodyL = "BUSINESS & GST SETTINGS";

  const title = "CASH & BANK ACCOUNTS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";

  if (page?.path !== "bussnessSettings") return null;
  return (
    <form onChange={(e) => bussinessSettingsValidator(e, state, setState)}>
      <Header1
        title={body}
        bodyL={bodyL}
        onTap={() => setState({ page: null })}
      />
      <div className="hstD">
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Branch Name">
            <input
              className="hstDa"
              placeholder="Name"
              id="name"
              defaultValue={bussinessSettings.name}
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
              defaultValue={bussinessSettings.legal_buisness_name}
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
              defaultValue={bussinessSettings.adress}
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
              defaultValue={bussinessSettings.country_name}
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
              defaultValue={bussinessSettings.state_name}
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
              defaultValue={bussinessSettings.city_name}
            />
            <div className="hstDa_">
              The district where your store is located
            </div>
          </AddingForm1>
          <AddingForm1 title="PIN Code">
            <input
              className="hstDa"
              placeholder="Name"
              id="pin_code"
              defaultValue={bussinessSettings.pin_code}
            />
            <div className="hstDa_">PIN code of your store location</div>
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Registered Mobile">
            <input
              className="hstDa"
              placeholder="94xxxxxx63"
              id="contact_number"
              defaultValue={bussinessSettings.contact_number}
            />
          </AddingForm1>
          <AddingForm1 title="Sales Contact">
            <input
              className="hstDa"
              placeholder="94xxxxxx63"
              id="sales_number"
              defaultValue={bussinessSettings.sales_number}
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
              defaultValue={bussinessSettings.support_number}
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
              defaultValue={bussinessSettings.whatsApp_number}
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
              defaultValue={bussinessSettings.branch_email}
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
              defaultValue={bussinessSettings.web_site}
            />
            <div className="hstDa_">
              Business website, this will be displayed to your customers
            </div>
          </AddingForm1>
        </AddingFormLayout>
        <AddingFormLayout title={title} desc={desc}>
          <AddingForm1 title="Timezone*">
            <select className="hstDa" value={bussinessSettings.branch_timezone}>
              {allTimeZone.map((it, k) => (
                <option key={k} value={it}>
                  {it}
                </option>
              ))}
            </select>
          </AddingForm1>

          <AddingForm1 title="Working Days*">
            <BussinessSettingsDaysMarker />
          </AddingForm1>
          <AddingForm1 title="Base Currency*">
            <input
              className="hstDa"
              placeholder="Name"
              id="currency"
              defaultValue={bussinessSettings.currency}
            />
          </AddingForm1>
          <AddingForm1 title="Industry Type">
            <input
              className="hstDa"
              placeholder="Name"
              id="industry_type"
              defaultValue={bussinessSettings.industry_type}
            />
          </AddingForm1>
          <AddingForm1 title="Business Type">
            <input
              className="hstDa"
              placeholder="Name"
              id="buisness_type"
              defaultValue={bussinessSettings.buisness_type}
            />
          </AddingForm1>
          <AddingForm1 title="GST Number">
            <input
              className="hstDa"
              placeholder="GSTN!@#"
              id="gst_number"
              defaultValue={bussinessSettings.gst_number}
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
    </form>
  );
}

function BussinessSettingsDaysMarker({ state, setState }) {
  const [selected, setSelected] = useState(0);
  const [days, setDays] = useState([
    { flag: 0, tit: "SUN", day: "Sunday", from: "09:00", to: "18:30" },
    { flag: 0, tit: "MON", day: "Monday", from: "09:00", to: "18:30" },
    { flag: 0, tit: "TUE", day: "Tuesday", from: "09:00", to: "18:30" },
    { flag: 0, tit: "WED", day: "Wednesday", from: "09:00", to: "18:30" },
    { flag: 0, tit: "THU", day: "Thursday", from: "09:00", to: "18:30" },
    { flag: 0, tit: "FRI", day: "Friday", from: "09:00", to: "18:30" },
    { flag: 0, tit: "SAT", day: "Saturday", from: "09:00", to: "18:30" },
  ]);

  return (
    <div className="hstDc">
      <div className="hstDcA">
        {days.map((it, k) => (
          <div
            key={k}
            className={
              (it.flag === 1 ? "hstDcAa" : "hstDcAa_") +
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
          value={days[selected].flag === 1}
          onTap={() => {
            let newArr = [...days];
            newArr[selected].flag = days[selected].flag === 1 ? 0 : 1;
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
          disabled={days[selected].flag === 0}
          onChange={(e) => (days[selected].from = e.target.value)}
          value={days[selected].from}
        />
        <input
          type="time"
          className="hstDcDa"
          disabled={days[selected].flag === 0}
          onChange={(e) => (days[selected].to = e.target.value)}
          value={days[selected].to}
        />
        <div
          className="hstDcAa"
          onClick={() => postBusinessDay(days[selected])}
        >
          APPLY
        </div>
        &nbsp; &nbsp; &nbsp;
        <div
          className="hstDcAa"
          onClick={() =>
            postBusinessDay({
              flag: 2,
              day: "",
              from: days[selected].from,
              to: days[selected].to,
            })
          }
        >
          APPLY FOR ALL DAYS
        </div>
      </div>
    </div>
  );
}

export function HomeSettings1CashAndBank({ state, setState }) {
  const { page, allAccounts } = state;
  const title = "CASH & BANK ACCOUNTS";
  const desc =
    "Email sender address, You can select logged in users email or any email address of your choice";
  if (page?.path !== "paymentBank") return null;
  console.log(allAccounts);
  return (
    <div className="hstD">
      <AddingFormLayout title={title} desc={desc}>
        {allAccounts.map((it, k) => (
          <AddingForm1 key={k}>
            <PaymentCard1 props={it} />
          </AddingForm1>
        ))}
        <AddingForm1>
          <PaymentButton1 />
        </AddingForm1>
      </AddingFormLayout>
      <AddingFormLayout title={title} desc={desc}>
        {allAccounts.map((it, k) => (
          <AddingForm1 key={k}>
            <PaymentCard1 props={it} />
          </AddingForm1>
        ))}
      </AddingFormLayout>
    </div>
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
