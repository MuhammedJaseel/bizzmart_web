import "./index.css";
import React, { Component } from "react";

export const getToday = () => {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
};

export class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      selectedFrom: props.from || "",
      selectedTo: props.to || "",
    };
  }

  componentDidMount() {
    const today = getToday();

    if (this.state.selectedFrom === "") this.setState({ selectedFrom: today });
    if (this.state.selectedTo === "") this.setState({ selectedTo: today });
  }

  render() {
    const setState = (v) => this.setState(v);
    var { clicked, selectedFrom, selectedTo } = this.state;
    return (
      <div className="body">
        {clicked ? (
          <div
            className="blankBody"
            onClick={() => setState({ clicked: false })}
          />
        ) : null}
        <div className="zvDbHa">
          <div className="zvDbHaA" onClick={() => setState({ clicked: true })}>
            {/* {!clicked ? "01 Apr 2022 to 30 Apr 2022" : null} */}
            {!clicked ? `${selectedFrom} to ${selectedTo}` : null}
            {clicked ? (
              <form
                className="datePicker"
                onFocus={() => setState({ clicked: true })}
                onBlur={() => {
                  setState({ clicked: false });
                  this.props.onChange(selectedFrom, selectedTo);
                }}
                onChange={(e) => {
                  if (e.target.id === "from") selectedFrom = e.target.value;
                  else selectedTo = e.target.value;
                  setState({ selectedFrom, selectedTo });
                  this.props.onChange(selectedFrom, selectedTo);
                }}
              >
                <input type="date" id="from" defaultValue={selectedFrom} />
                to
                <input type="date" id="to" defaultValue={selectedTo} />
              </form>
            ) : null}
          </div>
          <div className="zvDbHaB">This Month</div>
        </div>
      </div>
    );
  }
}
