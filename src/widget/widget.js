import React, { StrictMode, useRef, useState } from "react";
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
export function Header1({ title, bodyL, bodyR, onTap }) {
  return (
    <div className="zcA">
      <div className="zcAa">
        <div className="zcAb" onClick={onTap}>
          {title}
          {bodyL !== undefined ? " >" : null}&nbsp;
        </div>
        {bodyL?.toUpperCase()}
      </div>
      {bodyR}
    </div>
  );
}

export function Header2({ hidden, titles, page, onTap }) {
  if (page === undefined) page = 0;
  if (hidden) return null;
  return (
    <div className="zcB">
      {titles.map((it, k) => (
        <div className="zcBa" key={k} onClick={() => onTap(k)}>
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
              {item1.data.map((it, k1) => (
                <div className="zcIc" key={k1} onClick={() => setPage(it, k)}>
                  <div className="zcIc_">
                    <div className="zcIcA">
                      <div className="zcIcB">{it.t}</div>
                      <div className="zcIcC">{it.d}</div>
                    </div>
                    <div className="zcIcD">
                      {it.d1}
                      {/* <div className="zcIcDa">s</div> */}
                    </div>
                  </div>
                </div>
              ))}
            </StrictMode>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TitleFilter1({ props }) {
  const { searchPh, noDate, onlyDate } = props;
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
    <div className="zcK">
      {onlyDate ? null : <input className="zcKa" placeholder={searchPh} />}
      {onlyDate ? null : <div className="zcKb">SHOWING:</div>}
      {onlyDate ? null : (
        <select className="zcKc">
          <option>Hallow</option>
        </select>
      )}
      {noDate ? null : (
        <StrictMode>
          <div className="zcKd">17 Feb 2022 to 28 Feb 2022</div>
          <div className="zcKe">
            <div className="zcKeA" onClick={() => setIsCalender(!isCalender)}>
              Today
            </div>
            <div
              className={isCalender ? "zcKeB_" : "zcKeB"}
              onClick={() => setIsCalender(!isCalender)}
            />
            <div className={isCalender ? "zcKeC_" : "zcKeC"}>
              <div className="zcKeCa">
                <div className="zcKeCb">
                  <div className="zcKeCc">
                    <FilterCalender1
                      v={0}
                      y={year_}
                      m={month_}
                      add={add}
                      selected={selected}
                      setSelected={setSelected}
                      title="From Date"
                    />
                    <FilterCalender1
                      v={1}
                      y={year}
                      m={month}
                      add={add}
                      selected={selected}
                      setSelected={setSelected}
                      title="To Date"
                    />
                  </div>
                  <div className="zcKeCd">Update</div>
                </div>
                <div className="zcKeCe">
                  {typeDates.map((it, k) => (
                    <div
                      key={k}
                      className="zcKeCf"
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

function FilterCalender1({ v, y, m, add, selected, setSelected, title }) {
  let dragger = null;
  let dropper = null;
  return (
    <div className="zcL">
      {/* <div
        style={{ fontSize: ".8vw", fontWeight: "bold", marginBottom: ".6vw" }}
      >
        {title}
      </div> */}
      <div className="zcL_">
        <div className="zcLa">
          <div className="zcLb" onClick={() => add(-1)} />
          <div className="zcLc">
            {fullMonths[m]} {y}
          </div>
          <div className="zcLd" onClick={() => add(1)} />
        </div>
        <div className="zcLe">
          {shortDays.map((it, k) => (
            <div key={k} className="zcLf">
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
    <div className="zcN">
      {onDownload !== undefined ? (
        <div className="zcNa" onClick={onDownload} />
      ) : null}
      {onShare !== undefined ? (
        <div className="zcNb" onClick={onShare} />
      ) : null}
      <div className="zcNc">
        {title !== undefined ? (
          <div
            className={drowelList === null ? "zcNcA_" : "zcNcA"}
            onClick={() =>
              makeAdd === undefined ? setIsDrower(true) : makeAdd()
            }
          >
            {title}
          </div>
        ) : null}
        {drowelList !== null ? (
          <div className="zcNcB" onClick={() => setIsDrower(!isDrower)} />
        ) : null}
        <div
          onClick={() => setIsDrower(!isDrower)}
          className={isDrower ? "zcNcD_" : "zcNcD"}
        />
        <div
          className={isDrower ? "zcNcC_" : "zcNcC"}
          onClick={() => setIsDrower(!isDrower)}
        >
          {drowelList?.map((it, k) => (
            <div className="zcNcE" onClick={it.fun}>
              {it?.title}
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
/////////////////////////////////////////         PAYMENT CARD         ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function PaymentCard1(prams) {
  const { props, onTap, isPayment, onEdit, onDelete, hide, hideBin } = prams;
  const { account_balance, account_display_name, account_type } = props;
  const { last_entry_date, account_name } = props;
  const st = { backgroundImage: `url(${props.image})` };
  return (
    <div className="zc1D-body">
      <div className="zc1D">
        <div onClick={onTap}>
          <div className="zc1Da">
            <div className="zc1DaA">{account_display_name}</div>
            <div className="zc1DaB" style={st} />
          </div>
          {!isPayment ? <div className="zc1Db">Balance</div> : <br />}
          <div className="zc1Dc">
            {!isPayment ? "INR " + account_balance : account_name}
          </div>
          {!isPayment ? (
            <div className="zc1Dd">Last entry: {last_entry_date}</div>
          ) : null}
        </div>
        <div className="zc1De">
          <div className="zc1DeA">{account_type}</div>
          {!hide ? (
            <div className="zc1DeB">
              {!hideBin ? <div className="zc1DeC" onClick={onDelete} /> : null}
              <div className="zc1DeD" onClick={onEdit} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////        PAYMENT BUTTON        ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function PaymentButton1({ props }) {
  const { title, onTap } = props;
  return (
    <div className="zc1E" onClick={onTap}>
      <div className="zc1Ea">+</div>
      <div className="zc1Eb">{title}</div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////     INPUT SELECT DROPDOWN     //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function WidgetInputSelect({ className, props }) {
  var { onChange, list, clearlist, name, setValue } = props;
  var { placeholder, defaultValue, disabled, value } = props;
  const inputRef = useRef(null);
  if (list === undefined || list === null) list = [];
  return (
    <StrictMode>
      {list.length !== 0 ? <div className="zc1F_" onClick={clearlist} /> : null}
      <div className={className}>
        <div className={list.length !== 0 ? "zc1Fa_" : "zc1Fa"}>
          <input
            ref={inputRef}
            className="zc1Fb default"
            onChange={(e) => {
              inputRef.current.value = e.target.value;
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            defaultValue={defaultValue || ""}
            disabled={disabled}
            value={value}
          />
          <div className="zc1Fc" onClick={clearlist}>
            {list?.map((it, k) => (
              <div
                key={k}
                className="zc1FcA"
                onClick={() => {
                  setValue(k);
                  inputRef.current.value = it[name || "name"];
                }}
              >
                {it[name || "name"]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </StrictMode>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////        INPUT DROPDOWN        ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function WidgetSelect({ className, props }) {
  var { list, name, setValue } = props;

  const [hidden, setHidden] = useState(true);
  const inputRef = useRef(null);
  if (list === undefined || list === null) list = [];
  return (
    <StrictMode>
      {list.length !== 0 ? (
        <div className="zc1F_" onClick={() => setHidden(true)} />
      ) : null}
      <div className={className}>
        <div className={list.length !== 0 ? "zc1Fa_" : "zc1Fa"}>
          <input
            ref={inputRef}
            id="name"
            onFocus={() => setHidden(false)}
            disabled={!hidden}
          />
          <div className="zc1Fc" onClick={() => setHidden(true)}>
            {!hidden
              ? list?.map((it, k) => (
                  <div
                    key={k}
                    className="zc1FcA"
                    onClick={() => {
                      setValue(k);
                      inputRef.current.value = it[name || "name"];
                    }}
                  >
                    {it[name || "name"]}
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </StrictMode>
  );
}
