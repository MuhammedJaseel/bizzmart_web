import React, { StrictMode, useState } from "react";
import { fullMonths, makeCalenderDigits } from "../module/widget";
import { shortDays, typeDates } from "../module/widget";
import "../style/zc.css";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////          HEADERS           /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function Header1({ title, bodyL, bodyR, onclick }) {
  return (
    <div className="zcA">
      <div className="zcAa">
        <div className="zcAb" onClick={onclick}>
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
    <div className="zcB">
      {titles.map((it, k) => (
        <div
          className="zcBa"
          key={k}
          onClick={() => setState({ page: k, addPage: false })}
        >
          <div className={page === k ? "zcBb_" : "zcBb"}>{it}</div>
          <div className={page === k ? "zcBc" : "zcBc_"}></div>
        </div>
      ))}
    </div>
  );
}

export function Header3({ titles, page, setState }) {
  return (
    <div className="zcC">
      {titles.map((it, k) => (
        <div className="zcCa" key={k} onClick={() => setState({ page: k })}>
          <div className="zcCb">
            <div className={page === k ? "zcCc_" : "zcCc"}>{it.title}</div>
            {it.count !== 0 ? (
              <div className={k === 5 ? "zcCd zcCd-r" : "zcCd"}>{it.count}</div>
            ) : null}
          </div>
          <div className={page === k ? "zcCe" : "zcCe_"}></div>
        </div>
      ))}
    </div>
  );
}

export function Header4({ title, desc, body }) {
  return (
    <StrictMode>
      <div className="zcDa">{title}</div>
      <div className="zcDb">
        <div className="zcDc">{desc}</div>
        <div className="zcDd">{body}</div>
      </div>
    </StrictMode>
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
    <div className="zcI">
      {data.map((item, j) => (
        <div key={j}>
          {item.map((item1, k) => (
            <StrictMode key={k}>
              <div className="zcIa">
                <div className="zcIaA">{item1.t}</div>
                <div className="zcIaB">{item1.t1}</div>
              </div>
              {item1.data.map((it, k) => (
                <div className="zcIc" key={k} onClick={() => setPage(it)}>
                  <div className="zcIc_">
                    <div className="zcIcA">
                      <div className="zcIcB">{it.t}</div>
                      <div className="zcIcC">{it.d}</div>
                    </div>
                    <div className="zcIcD">{it.d1}</div>
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

export function TitleFilter1({ props }) {
  const { searchPh, noDate } = props;
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
      <input className="zmcKa" placeholder={searchPh} />
      <div className="zmcKb">SHOWING:</div>
      <select className="zmcKc">
        <option>Hallow</option>
      </select>
      {noDate ? null : (
        <StrictMode>
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
        </StrictMode>
      )}
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
export function HeaderButtens1({ props }) {
  const { makeAdd, title, drowelList, onShare, onDownload } = props;
  const [isDrower, setIsDrower] = useState(false);
  return (
    <div className="zmcN">
      <div className="zmcNa" onClick={onDownload} />
      <div className="zmcNb" onClick={onShare} />
      <div className="zmcNc">
        <div className="zmcNcA" onClick={makeAdd}>
          {title}
        </div>
        {drowelList !== null ? (
          <div className="zmcNcB" onClick={() => setIsDrower(!isDrower)} />
        ) : null}
        <div
          onClick={() => setIsDrower(!isDrower)}
          className={isDrower ? "zmcNcD_" : "zmcNcD"}
        />
        <div
          className={isDrower ? "zmcNcC_" : "zmcNcC"}
          onClick={() => setIsDrower(!isDrower)}
        >
          {drowelList?.map((it, k) => (
            <div className="zmcNcE" onClick={it.fun}>
              {it.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}