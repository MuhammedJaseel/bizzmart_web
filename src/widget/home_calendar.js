import React, { Component } from "react";
import { Header1, Header2 } from "./headers";
import "../style/hcl.css";
import { calender } from "../module/dummydata";

export default class HomeCalender extends Component {
  constructor() {
    super();
    this.state = {
      day: null,
      today: "5-07-2020",
    };
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const { today } = state;

    return (
      <React.StrictMode>
        <Header1 title="CALENDAR" />
        <Header2 titles={["Calendar"]} page={0} />
        <div className="hclD">5th July, Tuesday</div>
        <div className="hclE">
          <div className="hclEa">
            Shows all the recorded purchase enteries the selected date range
          </div>
          <div className="hclEb">
            <div className="hclEc" />
            <div className="hclEd" />
          </div>
        </div>
        <div className="hclF">
          <div className="hclF_">
            <div className="hclFa">
              {days.map((it, k) => (
                <div key={k} className="hclFb">
                  {it}
                </div>
              ))}
            </div>
            <div className="hclFc">
              {calender.map((it, k) => (
                <div
                  className="hclFd"
                  key={k}
                  onClick={() => setState({ day: it })}
                >
                  <div className="hclFe">
                    <div className={it.date === today ? "hclFf_" : "hclFf"}>
                      {it.date.split("-")[0]}
                    </div>
                  </div>
                  <div className="hclFg">
                    {it.events.map((e, j) => (
                      <div key={j} className="hclFh">
                        <div className="hclFi">{e.title}</div>
                        <div>{e.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <HomeCalenderDetailsPop state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeCalenderDetailsPop({ state, setState }) {
  const { day } = state;
  return (
    <React.StrictMode>
      <div className={day === null ? "hclG" : "hclG_"} />
      <div className={day === null ? "hclGa" : "hclGa_"}>
        {day !== null ? (
          <React.StrictMode>
            <div className="hclGaA">
              <div className="hclGaAa">5th July, Tuesday</div>
              <div
                className="hclGaAb"
                onClick={() => setState({ day: null })}
              />
            </div>
            <div className="hclGaB">
              <div className="hclGaBa">
                {day.events.map((d, k) => (
                  <div key={k} className="hclGaBaA">
                    <div className="hclGaBaB"></div>
                    <div className="hclGaBaC">
                      <div className="hclGaBaD">{d.title}</div>
                      <div className="hclGaBaE">{d.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hclGaBb">Payments to be made</div>
              <div className="hclGaBc">
                <div className="hclGaBcA">Party</div>
                <div className="hclGaBcB">Mode</div>
                <div className="hclGaBcC">Bank</div>
                <div className="hclGaBcD">Reference</div>
                <div className="hclGaBcE">Amount</div>
              </div>
              {[1, 1].map(() => (
                <div className="hclGaBd">
                  <div className="hclGaBcA hclGaBdA">
                    Conquer Technologies Pvt Ltd
                  </div>
                  <div className="hclGaBcB hclGaBdB">Cheque</div>
                  <div className="hclGaBcC hclGaBdC">HDFC Bank 0045</div>
                  <div className="hclGaBcD hclGaBdD">#00056</div>
                  <div className="hclGaBcE hclGaBdE">256,700.00</div>
                </div>
              ))}
              <div className="hclGaBe">
                <div className="hclGaBeA">
                  <div className="hclGaBeB">
                    <div className="hclGaBeC">Account Balance </div>
                    <div className="hclGaBeD">INR 699,990.00 </div>
                  </div>
                  <div className="hclGaBeB">
                    <div className="hclGaBeC">Account Balance </div>
                    <div className="hclGaBeD_">INR 699,990.00 </div>
                  </div>
                </div>
              </div>
              <div className="hclGaBb">Payments to be collected </div>
              <div className="hclGaBg">
                <div className="hclGaBgA">Party </div>
                <div className="hclGaBgB">Contact </div>
                <div className="hclGaBgC">Due Date </div>
                <div className="hclGaBgD">Reference</div>
                <div className="hclGaBgE">Amount </div>
              </div>
              {[1, 1, 1, 1, 1, 1, 1].map(() => (
                <div className="hclGaBh">
                  <div className="hclGaBgA hclGaBhA">John Mathew Mathan</div>
                  <div className="hclGaBgB hclGaBhB">9756765453</div>
                  <div className="hclGaBgC hclGaBhC">Today</div>
                  <div className="hclGaBgD hclGaBhD">INV22-0675</div>
                  <div className="hclGaBgE hclGaBhE">256,700.00</div>
                </div>
              ))}
              <div className="hclGaBi">
                <div className="hclGaBiA">
                  <div className="hclGaBiB">Total to be collected</div>
                  <div className="hclGaBiC">INR 13,91,260.00</div>
                </div>
              </div>
            </div>
            <div className="hclGaC">
              <div className="hclGaCa">OK</div>
            </div>
          </React.StrictMode>
        ) : null}
      </div>
    </React.StrictMode>
  );
}
