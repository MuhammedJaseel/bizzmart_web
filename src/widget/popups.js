import React from "react";
import "../style/pop.css";

export default function ForgrtPasswordPopup() {
  return (
    <div className="popA">
      <div className="popAa">
        <div className="popAb"></div>
        <div className="popAc"></div>
        <div className="popAd"></div>
        <div className="popAe"></div>
        <div className="popAf"></div>
      </div>
    </div>
  );
}

export function InventoryAddModifirePopup({ setState, state }) {
  const { allModifire } = state;
  return (
    <div className="popB">
      <div className="popBa">
        <div className="popBc">
          <div className="popBd">
            <div className="popBe">Add Modifier</div>
            <div className="popBf">American Choupsey</div>
          </div>
          <div
            className="popBg"
            onClick={() => setState({ modifirePop: false })}
          />
        </div>
        <div className="popBh">
          Add or edit modifiers for the selected product
        </div>
        <form
          className="popBi"
          onSubmit={(e) => {
            e.preventDefault();
            const title = e.target.mod_title.value;
            const price = e.target.mod_price.value;
            if (title === "") return;
            allModifire.push({ title, price });
            setState({ allModifire });
            e.target.reset();
          }}
        >
          <div className="popBj">
            <div className="popBk">
              <div className="popBl">Add Modifier*</div>
              <input
                className="popBm"
                id="mod_title"
                placeholder="Type and press enter to add a new type"
              />
            </div>
            <div className="popBn">
              <div className="popBl">Charge</div>
              <input
                type="number"
                id="mod_price"
                className="popBm"
                placeholder="0.00"
              />
              <div className="popBn-btn" />
            </div>
          </div>
          <div className="popBq">
            {allModifire.map((it, k) => (
              <div key={k} className="popBr">
                {it.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {it.price}
                <div
                  className="popBr-btn"
                  onClick={() => {
                    allModifire.splice(k, 1);
                    setState({ allModifire });
                  }}
                />
              </div>
            ))}
          </div>
          <button type="submit" />
        </form>
      </div>
    </div>
  );
}

export function SuccesPopup({ msg, setState }) {
  var msg_ = "";
  var subMsg = "";
  var style = {};
  if (msg != null) {
    msg_ = msg.msg;
    subMsg = msg.subMsg;
    if (msg.type === 1) style = { background: "#CC962A" };
    else if (msg.type === 2) style = { background: "#D10707" };
  }
  return (
    <div className={msg === null ? "popCa" : "popCa_"} style={style}>
      <div className="popCb">
        <div className="popCc" onClick={() => setState({ succesPop: null })} />
      </div>
      <div className="popCd">
        <div className="popCe" />
        <div className="popCf">
          <div className="popCg">{msg_}</div>
          <div className="popCh">{subMsg}</div>
        </div>
      </div>
    </div>
  );
}
// Product added successfully
// Updated Successfully
