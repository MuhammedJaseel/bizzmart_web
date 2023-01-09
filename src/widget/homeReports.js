import React, { Component, StrictMode } from "react";
import { reportPages } from "../module/homeReports";
import { Header1, Header2, HeaderButtens1 } from "./widget";
import { TitleFilter1, TitleTable1 } from "./widget";
import "../style/hrp.css";
import { getReport } from "../method/homeReports";
import { getTodayType1, getTodayType2 } from "../module/simple";

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
      categoryIndex: 0,
      selectedDate: { from: "", to: "" },
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
      </React.StrictMode>
    );
  }
}

function HomeReportLandingPage({ state, setState }) {
  const { viewPage, page } = state;

  const setPage = (v, i) => {
    setState({ viewPage: v, categoryIndex: i });
    window.history.replaceState("home", "home", "/dashboard/reports/" + v.path);
    getReport(v.apiPath, state, setState);
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
  const bodyRBody = {
    title: "Sales Summery",
    drowelList: [],
  };

  const bodyR = <HeaderButtens1 props={bodyRBody} />;
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
          <input
            type="date"
            className="hrpAaA"
            defaultValue={getTodayType2()}
            onChange={(e) => {
              selectedDate.from = e.target.value;
              setState(selectedDate);
              getReport(null, state, setState);
            }}
          />
          &ensp; to &ensp;
          <input
            type="date"
            className="hrpAaA"
            defaultValue={getTodayType2()}
            onChange={(e) => {
              selectedDate.from = e.target.value;
              setState(selectedDate);
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
            <div>Cash</div>
            <div>Total</div>
          </div>
        </div>
        <div className="hrpBb">
          Currency: {window.localStorage.getItem("branchCurrency")}
        </div>
      </div>
    </StrictMode>
  );
}
