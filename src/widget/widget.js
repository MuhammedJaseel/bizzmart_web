import React, { StrictMode } from "react";
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

export function TitleTable1({ data }) {
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
                <div className="zcmIc" key={k}>
                  <div className="zcmIcA">
                    <div className="zcmIcB">{it.t}</div>
                    <div className="zcmIcC">{it.d}</div>
                  </div>
                  <div className="zcmIcD">{it.d1}</div>
                </div>
              ))}
            </StrictMode>
          ))}{" "}
        </div>
      ))}
    </div>
  );
}
