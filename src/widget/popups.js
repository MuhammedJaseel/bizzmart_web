import React, { useState } from "react";
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
  const [locError, setlocError] = useState(null);
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
            setlocError(null);
            e.preventDefault();
            const title = e.target.mod_title.value;
            var charge = e.target.mod_price.value;
            if (charge === "") charge = 0;
            if (title === "") {
              setlocError("Enter Title");
              return;
            }
            allModifire.push({ title, charge });
            setState({ allModifire });
            e.target.reset();
          }}
        >
          <div className="popBj">
            <div className="popBk">
              <div className="popBl">
                Add Modifier*
                <div className="popBl-error">{locError}</div>
              </div>
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
              <button type="submit" className="popBn-btn" />
            </div>
          </div>
          <div className="popBq">
            {allModifire.map((it, k) => (
              <div key={k} className="popBr">
                {it.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {it.charge}
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


// Product added successfully
// Updated Successfully
