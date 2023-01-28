import { Component, StrictMode } from "react";
import { Header1, Header4 } from "./widget";
import { getAllAddedvalue, getWeekDay } from "../method/homeCalendar";
import { getAllCalenderData, getMonth } from "../method/homeCalendar";
import { getTodayType1 } from "../module/simple";
import "../style/hcl.css";

export default class HomeCalender extends Component {
  constructor(props) {
    super(props); 
    this.state = { day: null, today: getTodayType1(), calender: [] };
  }
  componentDidMount() {
    getAllCalenderData(this.state, (v) => this.setState(v));
  }
  current = false;
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { today, calender } = state;
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const tD = new Date();
    return (
      <StrictMode>
        <Header1 title="CALENDAR" />
        {/* <Header2 titles={["Calendar"]} page={0} /> */}
        <Header4
          title={`${tD.getDate()}th ${getMonth(tD.getMonth())}, ${getWeekDay(
            tD.getDay()
          )}`}
          desc="Shows all the recorded purchase enteries the selected date range"
          body={
            <StrictMode>
              {/* <div className="hclEc" />
              <div className="hclEd" /> */}
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
            <div className="hclFc">
              {calender.map((it, k) => (
                <div
                  className="hclFd"
                  key={k}
                  onClick={() => setState({ day: it })}
                >
                  <div className="hclFe">
                    <div
                      className={
                        it?.date === today
                          ? "hclFf_"
                          : this.current
                          ? "hclFf"
                          : "hclFf_dis"
                      }
                    >
                      {it?.day}
                    </div>
                  </div>
                  <div className="hclFg">
                    {/* <div className="hclFh2">
                      <div className="hclFi">Upcoming Payments</div>
                      <div>0</div>
                    </div> */}
                    {it?.events?.customerPaymentDueCount !== undefined &&
                    it?.events?.customerPaymentDueCount !== 0 ? (
                      <div className="hclFh1">
                        <div className="hclFi">Customer Payments Due</div>
                        <div>{it?.events?.customerPaymentDueCount}</div>
                      </div>
                    ) : null}
                    {it?.events?.upcommingPaymentCount !== undefined &&
                    it?.events?.upcommingPaymentCount !== 0 ? (
                      <div className="hclFh">
                        <div className="hclFi">Upcoming Payments</div>
                        <div>{it?.events?.upcommingPaymentCount}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
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
                {day?.events?.team_birthday?.map((d, k) => (
                  <div key={k} className="hclGaBaA">
                    {d?.image !== "" ? (
                      <img className="hclGaBaB" alt="er" src={d.image} />
                    ) : null}
                    <div>
                      <div className="hclGaBaD">{d.name}</div>
                      <div className="hclGaBaE">Birthday</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hclGaBb">Check Payments to be made</div>
              <div className="hclGaBc">
                <div className="hclGaBcA">Party</div>
                <div className="hclGaBcB">Mode</div>
                <div className="hclGaBcC">Bank</div>
                <div className="hclGaBcD">Reference</div>
                <div className="hclGaBcE">Amount</div>
              </div>
              {day?.events?.cheque_payment_lists?.map((it, k) => (
                <div className="hclGaBd" key={k}>
                  <div className="hclGaBcA hclGaBdA">{it.party}</div>
                  <div className="hclGaBcB hclGaBdB">{it.mode}</div>
                  <div className="hclGaBcC hclGaBdC">{it.bank}</div>
                  <div className="hclGaBcD hclGaBdD">{it.reference}</div>
                  <div className="hclGaBcE hclGaBdE">{it.amount}</div>
                </div>
              ))}
              <div className="hclGaBe">
                <div className="hclGaBeA">
                  <div className="hclGaBeB">
                    <div className="hclGaBeC">Account Balance </div>
                    <div className="hclGaBeD">
                      {getAllAddedvalue(
                        day?.events?.account_lists || [],
                        "balance"
                      )}
                    </div>
                  </div>
                  <div className="hclGaBeB">
                    <div className="hclGaBeC">Total to be paid</div>
                    <div className="hclGaBeD_">
                      {getAllAddedvalue(
                        day?.events?.cheque_payment_lists || [],
                        "amount"
                      )}
                    </div>
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
              {day?.events?.pending_invoice_lists?.map((it, k) => (
                <div className="hclGaBh" key={k}>
                  <div className="hclGaBgA hclGaBhA">{it.customer_name}</div>
                  <div className="hclGaBgB hclGaBhB">{it.customer_phone}</div>
                  <div className="hclGaBgC hclGaBhC">{it.due_date}</div>
                  <div className="hclGaBgD hclGaBhD">{it.invoice_no}</div>
                  <div className="hclGaBgE hclGaBhE">{it.balance_amount}</div>
                </div>
              ))}
              <div className="hclGaBi">
                <div className="hclGaBiA">
                  <div className="hclGaBiB">Total to be collected</div>
                  <div className="hclGaBiC">
                    {getAllAddedvalue(
                      day?.events?.pending_invoice_lists || [],
                      "balance_amount"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="hclGaC">
              <div className="hclGaCa" onClick={() => setState({ day: null })}>
                OK
              </div>
            </div>
          </StrictMode>
        ) : null}
      </div>
    </StrictMode>
  );
}
