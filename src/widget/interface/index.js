import React, { Component, StrictMode, useState } from "react";
import "./index.css";

export class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      focused: false,
    };
  }
  render() {
    const { className, placeholder, list, propertyName, bottom, onChange } =
      this.props;
    const { focused, selected } = this.state;
    return (
      <StrictMode>
        {focused ? (
          <div
            className="interfaceDubbyScreen"
            onClick={() => this.setState({ focused: false })}
          />
        ) : null}
        <div
          className={"select " + className || ""}
          onClick={() => this.setState({ focused: !focused })}
        >
          {selected === null ? (
            <div style={{ color: "gray" }}>{placeholder}</div>
          ) : (
            selected[propertyName]
          )}
          {focused ? (
            <div className="a">
              <div className="aA">
                {(list ?? []).map((it, k) => (
                  <div
                    className="aAa"
                    key={k}
                    onClick={() => {
                      this.setState({ selected: it });
                      onChange(it);
                    }}
                  >
                    {it[propertyName]}
                  </div>
                ))}
              </div>
              {bottom ? (
                <div className="aB" onClick={bottom.onClick}>
                  {bottom?.title}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </StrictMode>
    );
  }
}

export function Input({
  style,
  placeholder,
  value,
  defaultValue,
  onChange,
  unit,
  id,
  type,
}) {
  const [view, setview] = useState(false);

  return (
    <div className="myInput" style={style}>
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        id={id}
        type={type === "password" ? (view ? "text" : type) : type}
      />
      <div
        className={type === "password" ? (view ? "unit__" : "unit_") : "unit"}
        onClick={() => setview(!view)}
      >
        {unit}
      </div>
    </div>
  );
}
