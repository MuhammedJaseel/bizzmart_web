import React, { Component, StrictMode } from "react";
import { reportPages } from "../module/home_reports";
import { Header1, Header2, HeaderButtens1 } from "./widget";
import { TitleFilter1, TitleTable1 } from "./widget";
import "../style/hrp.css";

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
    this.state = { page: 0, viewPage: null };
  }

  // componentDidMount() {
  //   let path = window.location.pathname.split("/");
  //   let done = false;
  //   if (path.length > 3) {
  //     path = path[3];
  //     for (let j = 0; j < inventoryPages[0].length; j++)
  //       for (let i = 0; i < inventoryPages[0][j].data.length; i++) {
  //         if (inventoryPages[0][j].data[i].path === path) {
  //           this.setState({ page: inventoryPages[0][j].data[i].widget });
  //           done = true;
  //           break;
  //         }
  //       }
  //     if (!done)
  //       for (let j = 0; j < inventoryPages[1].length; j++)
  //         for (let i = 0; i < inventoryPages[1][j].data.length; i++) {
  //           if (inventoryPages[1][j].data[i].path === path) {
  //             this.setState({ page: inventoryPages[1][j].data[i].widget });
  //             break;
  //           }
  //         }
  //   } else this.setState({ page: null });
  // }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    return (
      <React.StrictMode>
        <Header1 title="REPORTS" bodyL={""} />
        <HomeReportLandingPage state={state} setState={setState} />
        <HomeReportPage state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeReportLandingPage({ state, setState }) {
  const { viewPage, page } = state;

  const setPage = (v) => {
    setState({ viewPage: v });
    window.history.replaceState("home", "home", "/dashboard/reports/" + v.path);
  };

  if (viewPage !== null) return null;
  return (
    <StrictMode>
      <Header2 titles={pTitles} page={page} setState={setState} />
      <TitleTable1 data={reportPages[page]} setPage={setPage} />
    </StrictMode>
  );
}

function HomeReportPage({ state, setState }) {
  const { viewPage } = state;
  const bodyRBody = {
    title: "Sales Summery",
    drowelList: [
      { title: "Sales Summary", fun: () => alert() },
      { title: "Sales Invoices", fun: () => alert() },
      { title: "Sales Rank", fun: () => alert() },
      { title: "Sales Comparison", fun: () => alert() },
      { title: "Profit Analysis", fun: () => alert() },
    ],
  };
  const bodyR = <HeaderButtens1 props={bodyRBody} />;
  const filterBody = { onlyDate: true };
  const filter = <TitleFilter1 props={filterBody} />;

  if (viewPage === null) return null;
  return (
    <StrictMode>
      <div className="hrpA">
        {bodyR}
        {filter}
      </div>
      <div className="hrpB">
        <div className="hrpBa">
          {viewPage.t}
          <div className="hrpBaB">Sharma Mobiworld Pvt Ltd</div>
        </div>
        <div className="hrpBb">13 Feb 2022 to 16 Feb 2022</div>
        <div className="hrpBc">
          <div className="hrpBcA">Date </div>
          <div className="hrpBcA">Invoices</div>
          <div className="hrpBcB">Credit</div>
          <div className="hrpBcB">Cash</div>
          <div className="hrpBcB">Total</div>
        </div>
        <div className="hrpBd">
          {[1, 1, 1, 1].map(() => (
            <div className="hrpBdA">
              <div className="hrpBcA">13 Feb 2023</div>
              <div className="hrpBcA">Invoices</div>
              <div className="hrpBcB">Credit</div>
              <div className="hrpBcB">Cash</div>
              <div className="hrpBcB">Total</div>
            </div>
          ))}
          <div className="hrpBdB">
            <div className="hrpBcA" />
            <div className="hrpBcA" />
            <div className="hrpBcB">Credit</div>
            <div className="hrpBcB">Cash</div>
            <div className="hrpBcB">Total</div>
          </div>
          <div className="hrpBdC">
            <div>Cash</div>
            <div>Total</div>
          </div>
        </div>
        <div className="hrpBb">Currency: INR (Indian Rupee)</div>
      </div>
    </StrictMode>
  );
}
