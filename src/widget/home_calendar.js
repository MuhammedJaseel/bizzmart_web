import React, { Component, StrictMode } from "react";
import { Header1, Header2, Header4 } from "./widget";
import { calender } from "../module/dummydata";
import "../style/hcl.css";

export default class HomeCalender extends Component {
  constructor(props) {
    super(props);
    this.state = { day: null, today: "5-07-2020" };
  }

  current = false;

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { today } = state;
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const getByEachDay = () => {
      const stack = [];
      for (let i = 0; i < calender.length; i++) {
        const it = calender[i];
        if (it.date.split("-")[0] === "1") this.current = !this.current;
        stack.push(
          <div className="hclFd" key={i} onClick={() => setState({ day: it })}>
            <div className="hclFe">
              <div
                className={
                  it.date === today
                    ? "hclFf_"
                    : this.current
                    ? "hclFf"
                    : "hclFf_dis"
                }
              >
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
        );
      }
      return stack;
    };
    return (
      <StrictMode>
        <Header1 title="CALENDAR" />
        <Header2 titles={["Calendar"]} page={0} />
        <Header4
          title="5th July, Tuesday"
          desc="Shows all the recorded purchase enteries the selected date range"
          body={
            <StrictMode>
              <div className="hclEc" />
              <div className="hclEd" />
            </StrictMode>
          }
        />
        <div className="hclF">
          <div className="hclF_">
            <div className="hclFa">
              {days.map((it, k) => (
                <div key={k} className="hclFb">
                  {it}
                </div>
              ))}
            </div>
            <div className="hclFc">{getByEachDay()}</div>
          </div>
        </div>
        <HomeCalenderDetailsPop state={state} setState={setState} />
      </StrictMode>
    );
  }
}

function HomeCalenderDetailsPop({ state, setState }) {
  const { day } = state;
  return (
    <StrictMode>
      <div className={day === null ? "hclG" : "hclG_"} />
      <div className={day === null ? "hclGa" : "hclGa_"}>
        {day !== null ? (
          <StrictMode>
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
                    <div>
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
          </StrictMode>
        ) : null}
      </div>
    </StrictMode>
  );
}
