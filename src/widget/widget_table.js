import React, { StrictMode, useState } from "react";
import "../style/zc1.css";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////          TABELS           /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyTable1({ widths, heads, body, onclick, lg, xl }) {
  const st = [];
  for (let i = 0; i < widths.length; i++)
    st.push({
      width: widths[i].width + "%",
      textAlign: widths[i].align || (widths[i].right ? "right" : "left"),
      paddingRight: widths[i].right ? "2vw" : "0",
    });

  if (widths.length !== heads.length) return <>Heading leagth different</>;
  if (body.length > 0)
    if (widths.length !== body[0].length) return <>Body leagth different</>;
  return (
    <div className="zc1A">
      <div className="zc1Aa">
        {heads.map((it, k) => (
          <div key={k} style={st[k]}>
            {it}
          </div>
        ))}
      </div>
      <div
        className={lg ? "zc1Ab_lg" : "zc1Ab"}
        style={xl ? { height: "calc(100vh - 13.5vw)" } : {}}
      >
        {body.map((it, k) => (
          <div key={k} className="zc1AbA" onClick={() => onclick(k)}>
            {it.map((it2, j) => (
              <div
                key={j}
                style={st[j]}
                className={"zc1AbB" + (it2.type || "0")}
              >
                {it2.type === 1 ? (
                  it2.data === "" ||
                  it2.data === null ||
                  it2.data === undefined ? (
                    <div className="zc1AbB1A">
                      {(it2.data2 || "**").substring(0, 2).toUpperCase()}
                    </div>
                  ) : (
                    <img className="zc1AbB1A" alt="Bizz" src={it2.data} />
                  )
                ) : it2.type === 2 ? (
                  <StrictMode>
                    <div className="zc1AbB2A">{it2.data}</div>
                    <div className="zc1AbB2B">{it2.data2}</div>
                  </StrictMode>
                ) : (
                  it2.data
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="zc1Ac"></div>
    </div>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////       TABLE COUNTER       /////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyTableCounter1({ props }) {
  const { total, onTap } = props;
  const [sel, setSel] = useState(1);
  const [limit, setLimit] = useState(10);
  const n = total / limit;
  let numbers = [];
  if (n < limit) for (let i = 0; i < n; i++) numbers.push(i + 1);
  else if (sel > n - 2) numbers = [1, "...", n - 2, n - 1, n];
  else if (sel < n - 1 && sel > 3)
    numbers = [1, "...", sel - 1, sel, sel + 1, sel + 2, "...", n];
  else numbers = [1, 2, 3, 4, 5, "...", n];

  return (
    <div className="zc1B">
      <div className="zc1Ba">
        SHOW:
        <input
          onChange={(e) => {
            const value = e.target.value;
            if (value !== "" && value !== "1" && value !== "2") {
              setSel(1);
              setLimit(value);
              onTap(1, value);
            }
          }}
          defaultValue={limit}
          className="zc1BaB"
          type="number"
        />
        ENTRIES
      </div>
      <div className="zc1Bb">
        Showing {(sel - 1) * limit} to{" "}
        {sel * limit > total ? total : sel * limit} of {total} entries
      </div>
      <div className="zc1Bb">
        <div
          className={sel === 1 ? "zc1BbA_" : "zc1BbA"}
          onClick={() => {
            if (sel !== 1) {
              setSel(sel - 1);
              onTap(sel - 1, limit);
            }
          }}
        >
          Previous
        </div>
        {numbers.map((i, k) => (
          <div
            key={k}
            onClick={() => {
              if (typeof i === "number") {
                setSel(i);
                onTap(i, limit);
              }
            }}
            className={i === sel ? "zc1BbB zc1BbB_" : "zc1BbB"}
          >
            {typeof i === "number" ? parseInt(i) : i}
          </div>
        ))}
        <div
          className={sel === n ? "zc1BbA_" : "zc1BbA"}
          onClick={() => {
            if (sel !== n) {
              setSel(sel + 1);
              onTap(sel + 1);
            }
          }}
        >
          Next
        </div>
      </div>
    </div>
  );
}
