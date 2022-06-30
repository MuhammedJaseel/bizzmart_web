import React, { StrictMode, useState } from "react";
import {
  fullMonths,
  makeCalenderDigits,
  shortDays,
  typeDates,
} from "../module/widget";
import "../style/zcm.css";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////          HEADERS           /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function Header1({ title, bodyL, bodyR, onclick }) {
  return (
    <div className="zcmA">
      <div className="zcmAa">
        <div className="zcmAb" onClick={onclick}>
          {title}
          {bodyL !== undefined ? " >" : null}&nbsp;
        </div>
        {bodyL}
      </div>
      {bodyR}
    </div>
  );
}

export function Header2({ titles, page, setState }) {
  return (
    <div className="zcmB">
      {titles.map((it, k) => (
        <div className="zcmBa" key={k} onClick={() => setState({ page: k })}>
          <div className={page === k ? "zcmBb_" : "zcmBb"}>{it}</div>
          <div className={page === k ? "zcmBc" : "zcmBc_"}></div>
        </div>
      ))}
    </div>
  );
}

export function Header3({ titles, page, setState }) {
  return (
    <div className="zcmC">
      {titles.map((it, k) => (
        <div className="zcmCa" key={k} onClick={() => setState({ page: k })}>
          <div className="zcmCb">
            <div className={page === k ? "zcmCc_" : "zcmCc"}>{it.title}</div>
            {it.count !== 0 ? (
              <div className={k === 5 ? "zcmCd zcmCd-r" : "zcmCd"}>
                {it.count}
              </div>
            ) : null}
          </div>
          <div className={page === k ? "zcmCe" : "zcmCe_"}></div>
        </div>
      ))}
    </div>
  );
}

export function Header4({ title, desc, body }) {
  return (
    <StrictMode>
      <div className="zcmDa">{title}</div>
      <div className="zcmDb">
        <div className="zcmDc">{desc}</div>
        <div className="zcmDd">{body}</div>
      </div>
    </StrictMode>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////          TABELS           /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyTable1({ widths, heads, body }) {
  const st = [];
  for (let i = 0; i < widths.length; i++) st.push({ width: widths[i] + "%" });

  if (widths.length !== heads.length) return <>Heading leagth different</>;
  if (body.length > 0)
    if (widths.length !== body[0].length) return <>Body leagth different</>;
  return (
    <div className="zcmH">
      <div className="zcmHa">
        {heads.map((it, k) => (
          <div key={k} style={st[k]}>
            {it}
          </div>
        ))}
      </div>
      <div className="zcmHb">
        {body.map((it, k) => (
          <div key={k} className="zcmHbA">
            {it.map((it2, j) => (
              <div
                key={j}
                style={st[j]}
                className={"zcmHbB" + (it2.type || "0")}
              >
                {it2.type === 1 ? (
                  it2.data === "" ||
                  it2.data === null ||
                  it2.data === undefined ? (
                    <div className="zcmHbB1A">
                      {it2.data2.substring(0, 2).toUpperCase()}
                    </div>
                  ) : (
                    <img className="zcmHbB1A" src={it2.data} />
                  )
                ) : it2.type === 2 ? (
                  <StrictMode>
                    <div className="zcmHbB2A">{it2.data}</div>
                    <div className="zcmHbB2B">{it2.data2}</div>
                  </StrictMode>
                ) : (
                  it2.data
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="zcmHc"></div>
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////          FILTERS           /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function TitleTable1({ data, setPage }) {
  return (
    <div className="zcmI">
      {data.map((item, j) => (
        <div key={j}>
          {item.map((item1, k) => (
            <StrictMode key={k}>
              <div className="zcmIa">
                <div className="zcmIaA">{item1.t}</div>
                <div className="zcmIaB">{item1.t1}</div>
              </div>
              {item1.data.map((it, k) => (
                <div className="zcmIc" key={k} onClick={() => setPage(it)}>
                  <div className="zcmIc_">
                    <div className="zcmIcA">
                      <div className="zcmIcB">{it.t}</div>
                      <div className="zcmIcC">{it.d}</div>
                    </div>
                    <div className="zcmIcD">{it.d1}</div>
                  </div>
                </div>
              ))}
            </StrictMode>
          ))}{" "}
        </div>
      ))}
    </div>
  );
}

export function TitleFilter1({}) {
  const [isCalender, setIsCalender] = useState(false);
  const [value, setValue] = useState(0);
  const [selected, setSelected] = useState([10, 20]);
  const today = new Date();
  today.setMonth(today.getMonth() + value);
  const month = today.getMonth();
  const month_ = month === 0 ? 11 : month - 1;
  const year = today.getFullYear();
  const year_ = month === 0 ? year - 1 : year;
  const add = (v) => setValue(parseInt(value) + v);
  return (
    <div className="zmcK">
      <input className="zmcKa" placeholder="Search an Invoices" />
      <div className="zmcKb">SHOWING:</div>
      <select className="zmcKc">
        <option>Hallow</option>
      </select>
      <div className="zmcKd">17 Feb 2022 to 28 Feb 2022</div>
      <div className="zmcKe">
        <div className="zmcKeA" onClick={() => setIsCalender(!isCalender)}>
          Today
        </div>
        <div
          className={isCalender ? "zmcKeB_" : "zmcKeB"}
          onClick={() => setIsCalender(!isCalender)}
        />
        <div className={isCalender ? "zmcKeC_" : "zmcKeC"}>
          <div className="zmcKeCa">
            <div className="zmcKeCb">
              <div className="zmcKeCc">
                <FilterCalender1
                  v={0}
                  y={year_}
                  m={month_}
                  add={add}
                  selected={selected}
                  setSelected={setSelected}
                />
                <FilterCalender1
                  v={1}
                  y={year}
                  m={month}
                  add={add}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
              <div className="zmcKeCd">Update</div>
            </div>
            <div className="zmcKeCe">
              {typeDates.map((it, k) => (
                <div
                  key={k}
                  className="zmcKeCf"
                  onClick={() => setSelected(it.fun)}
                >
                  {it.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterCalender1({ v, y, m, add, selected, setSelected }) {
  let dragger = null;
  let dropper = null;
  console.log(selected);
  return (
    <div className="zmcL">
      <div className="zmcL_">
        <div className="zmcLa">
          <div className="zmcLb" onClick={() => add(-1)} />
          <div className="zmcLc">
            {fullMonths[m]} {y}
          </div>
          <div className="zmcLd" onClick={() => add(1)} />
        </div>
        <div className="zmcLe">
          {shortDays.map((it, k) => (
            <div key={k} className="zmcLf">
              {it}
            </div>
          ))}
        </div>
        <div
          className="zmeLg"
          onDrop={() => {
            if (dropper !== null)
              if (dragger === 0) setSelected([dropper, selected[1]]);
              else setSelected([selected[0], dropper]);
          }}
        >
          {makeCalenderDigits(y, m).map((it, k) => (
            <div
              key={k}
              draggable={
                k + 42 * v === selected[0] || k + 42 * v === selected[1]
              }
              onDrag={() => (dragger = selected[0] === k ? 0 : 1)}
              onDragEnter={(e) => (dropper = it !== null ? k + 42 * v : null)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={() => (dragger = null)}
              // onClick={() => {
              //   if (it !== null) {
              //     if (selected[0] > k + 42 * v)
              //       setSelected([selected[0], k + 42 * v]);
              //     if (selected[0] < k + 42 * v)
              //       setSelected([k + 42 * v, selected[1]]);
              //   }
              // }}
              className={
                (k + 42 * v > selected[0] &&
                k + 42 * v < selected[1] &&
                it !== null
                  ? "zmeLh_ "
                  : "") +
                (k + 42 * v === selected[0] || k + 42 * v === selected[1]
                  ? "zmeLh__"
                  : "zmeLh")
              }
            >
              {it}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////          BUTTONS           ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function HeaderButtens1({}) {
  const [isDrower, setIsDrower] = useState(false);
  return (
    <div className="zmcN">
      <div className="zmcNa" />
      <div className="zmcNb" />
      <div className="zmcNc">
        <div className="zmcNcA">+ New Invoice</div>
        <div className="zmcNcB" onClick={() => setIsDrower(!isDrower)} />
        <div
          onClick={() => setIsDrower(!isDrower)}
          className={isDrower ? "zmcNcD_" : "zmcNcD"}
        />
        <div
          className={isDrower ? "zmcNcC_" : "zmcNcC"}
          onClick={() => setIsDrower(!isDrower)}
        >
          <div className="zmcNcE">Add New Invoice</div>
          <div className="zmcNcE">Add New Estimate</div>
        </div>
      </div>
    </div>
  );
}
