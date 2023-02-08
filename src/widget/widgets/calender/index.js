import "./index.css";
import React, { Component } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getToday = () => {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};
export const getTodayByList = (days) => {
  var d = new Date();
  if (days !== undefined)
    d = new Date(d.getTime() - days * 24 * 60 * 60 * 1000);
  var month = "" + (d.getMonth() + 1);
  var day = "" + d.getDate();
  var year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day];
};

export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      fromV: getTodayByList(),
      toV: getTodayByList(),
      from: getTodayByList(),
      to: getTodayByList(),
      category: "Today",
      viewCategory: "Today",
      _viewedCal: { year: 0, month: 0 },
    };
  }

  componentDidMount() {
    const { to } = this.state;
    var viewedCal = { year: to[0], month: to[1] - 1 };
    this._onClickMonthArrow(viewedCal, 0);
  }

  _makeDummyList = () => {
    var { _viewedCal } = this.state;
    const list = [];
    for (let i = 1; i <= 42; i++) list.push(i - _viewedCal.weekStart);
    return list;
  };

  _onClickMonthArrow = (it, v) => {
    if (it.month === 0 && v === -1) {
      it.month = 11;
      it.year -= 1;
    } else if (it.month === 11 && v === 1) {
      it.month = 0;
      it.year += 1;
    } else it.month += v;

    var d = new Date(
      `${(it.month < 9 ? "0" : "") + (it.month + 1)}-01-${it.year}`
    );
    it.weekStart = d.getDay();

    if (it.month === 1) it.lastDay = it.year % 4 === 0 ? 29 : 28;
    else if (
      it.month === 3 ||
      it.month === 5 ||
      it.month === 8 ||
      it.month === 10
    )
      it.lastDay = 30;
    else it.lastDay = 31;

    this.setState({ _viewedCal: it });
  };

  _checkDayInSide = (it, c) => {
    const { from, to } = this.state;
    var _from = from;
    var _to = to;

    var from_sec = new Date(_from).getTime();
    var to_sec = new Date(_to).getTime();
    var day_sec = new Date(
      `${(c.month < 9 ? "0" : "") + (c.month + 1)}-${it}-${c.year}`
    ).getTime();

    var style = {};
    if (day_sec <= to_sec && day_sec >= from_sec) style.background = "#eef2f5";
    if (day_sec === to_sec) {
      style.borderTopRightRadius = "0.3vw";
      style.borderBottomRightRadius = "0.3vw";
      style.color = "white";
      style.background = "#2d4c86";
    }
    if (day_sec === from_sec) {
      style.borderTopLeftRadius = "0.3vw";
      style.borderBottomLeftRadius = "0.3vw";
      style.color = "white";
      style.background = "#2d4c86";
    }
    return style;
  };

  render() {
    const { framed, onChange, style } = this.props;
    const { isClicked, fromV, toV, category, viewCategory, _viewedCal } =
      this.state;
    var { from, to } = this.state;
    const setState = (v) => this.setState(v);
    return (
      <div
        style={
          framed
            ? {
                background: "#eeeeee",
                padding: "0.3vw 1vw",
                width: "100%",
                ...style,
              }
            : { width: "100%", ...style }
        }
      >
        <div className="a">
          {isClicked ? (
            <div
              className="aA"
              onClick={() => setState({ isClicked: false })}
            />
          ) : null}
          <div
            className="aB"
            onClick={() => setState({ isClicked: !isClicked })}
          >
            {`${fromV[2] || ""} ${(months[fromV[1] - 1] || "").slice(0, 3)} ${
              fromV[0] || ""
            } to ${toV[2] || ""} ${(months[toV[1] - 1] || "").slice(0, 3)} ${
              toV[0] || ""
            }`}
          </div>
          <div
            className="aC"
            onClick={() => setState({ isClicked: !isClicked })}
          >
            {viewCategory}
          </div>
          {isClicked ? (
            <div className="aD" onClick={() => {}}>
              <div className="aDa">
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                <div style={{ width: "16vw" }}>
                  <div className="mdpCdBc">
                    <div
                      className="mdpCdBcA"
                      onClick={() => this._onClickMonthArrow(_viewedCal, -1)}
                    />
                    <div className="mdpCdBcB">
                      {months[_viewedCal?.month]} {_viewedCal?.year}
                    </div>
                    <div
                      className="mdpCdBcC"
                      onClick={() => this._onClickMonthArrow(_viewedCal, 1)}
                    />
                  </div>
                  <div className="mdpCdBd">
                    <div className="mdpCdBdA">Sun</div>
                    <div className="mdpCdBdA">Mon</div>
                    <div className="mdpCdBdA">Tue</div>
                    <div className="mdpCdBdA">Wed</div>
                    <div className="mdpCdBdA">Thu</div>
                    <div className="mdpCdBdA">Fri</div>
                    <div className="mdpCdBdA">Sat</div>
                  </div>
                  <div className="mdpCdBe">
                    {this._makeDummyList().map((it, k) =>
                      it > 0 && it <= _viewedCal?.lastDay ? (
                        <div
                          className="mdpCdBeA"
                          key={k}
                          onClick={() => {
                            var mm = _viewedCal.month + 1;
                            mm = mm > 9 ? mm : "0" + mm;
                            var dd = it > 9 ? it : "0" + it;
                            var clicked = new Date(
                              `${mm}-${dd}-${_viewedCal.year}`
                            );
                            var to_sec = new Date(to);
                            var from_sec = new Date(from);
                            if (clicked.getTime() >= to_sec.getTime())
                              setState({ to: [_viewedCal.year, mm, dd] });
                            else if (clicked.getTime() <= from_sec.getTime())
                              setState({
                                from: [_viewedCal.year, mm, dd],
                              });
                            else
                              setState({
                                to: [_viewedCal.year, mm, dd],
                                from: [_viewedCal.year, mm, dd],
                              });

                            setState({ category: "Between" });
                          }}
                          style={this._checkDayInSide(it, _viewedCal)}
                        >
                          {it}
                        </div>
                      ) : (
                        <div />
                      )
                    )}
                  </div>
                </div>
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                {/* ///////////////////////// */}
                <div className="aDaI">
                  <div
                    className="aDaIa"
                    onClick={() => {
                      setState({ viewCategory: category, isClicked: false });
                      setState({ fromV: from, toV: to });
                      onChange(
                        `${from[2]}-${from[1]}-${from[0]}`,
                        `${to[2]}-${to[1]}-${to[0]}`
                      );
                    }}
                  >
                    Update
                  </div>
                </div>
              </div>
              <div className="aDb">
                <div
                  className={category === "Today" ? "aDbA_" : "aDbA"}
                  onClick={() => {
                    from = getTodayByList();
                    to = from;
                    setState({ category: "Today", from, to });
                  }}
                >
                  Today
                </div>
                <div
                  className={category === "Yesterday" ? "aDbA_" : "aDbA"}
                  onClick={() => {
                    from = getTodayByList(1);
                    to = from;
                    setState({ category: "Yesterday", from, to });
                  }}
                >
                  Yesterday
                </div>
                <div
                  className={category === "This Week" ? "aDbA_" : "aDbA"}
                  onClick={() => {
                    from = getTodayByList(6);
                    to = getTodayByList(0);
                    setState({ category: "This Week", from, to });
                  }}
                >
                  This Week
                </div>
                <div
                  className={category === "This Month" ? "aDbA_" : "aDbA"}
                  onClick={() => {
                    from = getTodayByList();
                    to = getTodayByList();
                    from[2] = "01";
                    setState({ category: "This Month", from, to });
                  }}
                >
                  This Month
                </div>
                <div
                  className={category === "This Year" ? "aDbA_" : "aDbA"}
                  onClick={() => {
                    from = getTodayByList();
                    to = getTodayByList();
                    from[1] = "01";
                    from[2] = "01";
                    setState({ category: "This Year", from, to });
                  }}
                >
                  This Year
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
