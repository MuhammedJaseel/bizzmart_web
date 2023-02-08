import React, { Component, StrictMode } from "react";
import { reportPages } from "../module/homeReports";
import { Header1, WidgetInputSelect } from "./widget";
import { TitleTable1 } from "./widget";
import { getReport, reportSearchProduct } from "../method/homeReports";
import { getTodayType1, getTodayType2 } from "../module/simple";
import { WidgetPopUp1, WidgetPopUp1In1 } from "./widget_popup";
import "../style/hrp.css";
import { DatePicker } from "./widgets/calender";

const pTitles = [
  "All Report",
  "Favorites",
  "Sales",
  "Inventory",
  "Purchase",
  "Expence",
  "Cash",
  "Finance",
  "Tax",
];

export default class HomeReports extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      viewPage: null,
      report: {},
      error: null,
      categoryIndex: 0,
      selectedDate: { from: "", to: "" },
      selectedProdect: null,
    };
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <Header1
          title="REPORTS"
          bodyL={state.viewPage?.t || ""}
          onTap={() => setState({ viewPage: null })}
        />
        <HomeReportLandingPage state={state} setState={setState} />
        <HomeReportPage state={state} setState={setState} />
        <SelectProdectPopup state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeReportLandingPage({ state, setState }) {
  const { viewPage, page } = state;

  const setPage = (v, i) => {
    setState({ viewPage: v, categoryIndex: i });
    if (v.path === "salesComparison ") {
      setState({ selectedProdect: { apiPath: v.apiPath } });
    } else {
      getReport(v.apiPath, state, setState);
    }
    // window.history.replaceState("home", "home", "/dashboard/reports/" + v.path);
  };

  if (viewPage !== null) return null;
  return (
    <StrictMode>
      {/* <Header2
        titles={pTitles}
        page={page}
        onTap={(k) => setState({ page: k, addPage: false })}
      /> */}
      <TitleTable1 data={reportPages[page]} setPage={setPage} />
    </StrictMode>
  );
}

function HomeReportPage({ state, setState }) {
  const { viewPage, report, categoryIndex, selectedDate } = state;
  // const bodyRBody = {
  //   title: "Sales Summery",
  //   drowelList: [],
  // };

  // const bodyR = <HeaderButtens1 props={bodyRBody} />;
  // const filterBody = { onlyDate: true };
  // const filter = <TitleFilter1 props={filterBody} />;

  const getTotal = (list, name) => {
    var value = 0;
    for (let i = 0; i < list?.length; i++) value += Number(list[i][name]);
    return value;
  };

  if (viewPage === null) return null;
  return (
    <StrictMode>
      <div className="hrpA">
        {/* {bodyR} */}
        <div />
        {/* {filter} */}
        <div className="hrpAa">
          <DatePicker
            onChange={(from, to) => {
              state.selectedDate = { from, to };
              getReport(null, state, setState);
            }}
          />
        </div>
      </div>
      <div className="hrpB">
        <div className="hrpBa">
          {viewPage.t}
          <div className="hrpBaB">
            {window.localStorage.getItem("buisnessName")}
          </div>
        </div>
        <div className="hrpBb">
          {selectedDate?.from || getTodayType1()} to{" "}
          {selectedDate?.to || getTodayType1()}
        </div>
        <div className="hrpBc">
          {viewPage?.table?.map((it, k) => (
            <div key={k} style={{ width: it.width, textAlign: it?.align }}>
              {it.title}
            </div>
          ))}
        </div>
        <div className="hrpBd">
          {report?.items?.map((it, k) => (
            <div className="hrpBdA" key={k}>
              {viewPage?.table?.map((it1, k) => (
                <div
                  key={k}
                  style={{ width: it1.width, textAlign: it1?.align }}
                >
                  {it[it1.name]}
                </div>
              ))}
            </div>
          ))}
          <div className="hrpBc" style={{ paddingTop: ".4vw" }}>
            {viewPage?.table?.map((it, k) => (
              <div key={k} style={{ width: it.width, textAlign: it?.align }}>
                {it.sum ? getTotal(report?.items, it.name) : null}
              </div>
            ))}
          </div>
          <div className="hrpBdC">
            <div>{viewPage?.bottamTitle}</div>
            <div>{report[viewPage?.bottamValue]}</div>
          </div>
        </div>
        <div className="hrpBb">
          Currency: {window.localStorage.getItem("branchCurrency")}
        </div>
      </div>
    </StrictMode>
  );
}

function SelectProdectPopup({ state, setState }) {
  const { error, loading, selectedProdect } = state;
  if (selectedProdect === null) return null;
  const popupProps1 = {
    close: () => setState({ selectedProdect: null }),
    title: "Select Product",
    desc: "Select a prodect to view report",
    error,
    loading,
    small: true,
    btnTitle: "ADD",
    onChange: (e) => (selectedProdect[e.target.id] = e.target.value),
    submit: async () => {
      await getReport(selectedProdect.apiPath, state, setState);
      setState({ selectedProdect: null });
    },
  };
  return (
    <WidgetPopUp1 props={popupProps1}>
      <div style={{ width: "100%" }}>
        <WidgetPopUp1In1 title="Branch">
          <select style={{ width: "100%" }} id="branch">
            <option hidden>Select branch</option>
            {[]?.map((it) => (
              <option value={it.branch_id}>{it.branch_name}</option>
            ))}
          </select>
        </WidgetPopUp1In1>
        <WidgetPopUp1In1 title="Select a Prodect">
          <WidgetInputSelect
            props={{
              onChange: async (v) => {
                await reportSearchProduct(
                  v,
                  (v1) => (selectedProdect.list = v1)
                );
                setState(selectedProdect);
              },
              list: selectedProdect?.list || [],
              clearlist: () => {
                selectedProdect.list = [];
                setState(selectedProdect);
              },
              setValue: (v) => {
                selectedProdect.id = selectedProdect?.list[v].id;
                selectedProdect.name = selectedProdect?.list[v].name;
              },
              placeholder: "Search your product",
            }}
          />
        </WidgetPopUp1In1>
      </div>
    </WidgetPopUp1>
  );
}
