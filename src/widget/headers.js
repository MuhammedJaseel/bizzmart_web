import React from "react";
import "../style/zcm.css";

export function Header1({ title, bodyL, bodyR }) {
  return (
    <div className="zcmA">
      <div className="zcmAa">
        <div className="zcmAb">
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
