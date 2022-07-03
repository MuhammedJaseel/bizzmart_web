import React, { StrictMode, useState } from "react";
import { fullMonths, makeCalenderDigits } from "../module/widget";
import { shortDays, typeDates } from "../module/widget";
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
        <div
          className="zcmBa"
          key={k}
          onClick={() => setState({ page: k, addPage: false })}
        >
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////           FORMS            ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyForm1() {
  return (
    <div className="zmcQ">
      <div className="zmcQa">
        <div className="zmcQaA">
          <div className="zmcQaAa">
            <div className="zmcQaAaA">Customer*</div>
            <select className="zmcQaAaB">
              <option>Name</option>
            </select>
          </div>
          <div className="zmcQaAa">
            <div className="zmcQaAaA">Invoice Date*</div>
            <div className="zmcQaAaC"></div>
          </div>
        </div>
        <div className="zmcQaB">
          <div className="zmcQaBa">Address</div>
          <div className="zmcQaBb">
            Jack Dorsea, 102A, Jami’a Street, New Delhi 12, India. GST:
            AAA456AE3423AZ Phone: 974 523 6674
          </div>
        </div>
      </div>
      <div className="zmcQb">
        <div className="zmcQbA">
          <div className="zmcQbAa"></div>
          <div className="zmcQbAb">Product / Service</div>
          <div className="zmcQbAc">Qty</div>
          <div className="zmcQbAd">Price / Rate</div>
          <div className="zmcQbAe">Discount</div>
          <div className="zmcQbAf">Tax Slab</div>
          <div className="zmcQbAg">Tax Amount</div>
          <div className="zmcQbAh">Total</div>
        </div>
        {[1, 1, 1, 1].map(() => (
          <div className="zmcQbB">
            <div className="zmcQbBa"></div>
            <select className="zmcQbBb">
              <option>APPLE iPHONE 13 PRO/128GB/BLACK</option>
            </select>
            <input className="zmcQbBc" />
            <input className="zmcQbBd" />
            <input className="zmcQbBe" />
            <select className="zmcQbBf">
              <option>Tax Slab</option>
            </select>
            <div className="zmcQbBg">Tax Amount</div>
            <div className="zmcQbBh">Total</div>
          </div>
        ))}
      </div>
      <div className="zmcQc">
        <div className="zmcQcA">
          <div className="zmcQcAa">Delivery Address</div>
          <textarea className="zmcQcAb" placeholder="Address" />
          <div className="zmcQcAa">Invoice Note</div>
          <textarea
            className="zmcQcAc"
            placeholder="Enter invoice terms / notes here"
          />
        </div>
        <div className="zmcQcB">
          <div className="zmcQcBa">
            <div>Discount</div>
            <input className="zmcQcBb" placeholder="0.0" />
          </div>
          <div className="zmcQcBa">
            <div>Subtotal</div>
            <div>4,685.00</div>
          </div>
          <div className="zmcQcBa">
            <div>Tax</div>
            <div>0.00</div>
          </div>
          <div className="zmcQcBc">
            <div>Total</div>
            <div>4,685.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
