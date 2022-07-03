import React, { StrictMode } from "react";
import "../style/zcm.css";

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
