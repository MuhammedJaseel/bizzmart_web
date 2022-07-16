import "../style/zp.css";

export function WidgetPopUp1({ props }) {
  const { close, title, desc } = props;
  return (
    <div className="zpA">
      <div className="zpAa">
        <div className="zpAb">
          <div className="zpAbA">{title}</div>
          <div className="zpAbB" onClick={close} />
        </div>
        <div className="zpAc">{desc}</div>
        <div className="zpAc">
          <div className="zpAcA">
            <div className="zpAcAa">Account Type*</div>
            <select className="zpAcAb">
              <option>Select account type</option>
            </select>
          </div>
          <div className="zpAcA">
            <div className="zpAcAa">Select Bank*</div>
            <select className="zpAcAb">
              <option>Select your bank</option>
            </select>
          </div>
        </div>
        <div className="zpAc">
          <div className="zpAcA">
            <div className="zpAcAa">Account Holder*</div>
            <input className="zpAcAb" />
          </div>
          <div className="zpAcA">
            <div className="zpAcAa">Account Number*</div>
            <input className="zpAcAb" />
          </div>
        </div>
        <div className="zpAc">
          <div className="zpAcB">
            <div className="zpAcBa">Branch*</div>
            <input className="zpAcAb" />
          </div>
          <div className="zpAcB">
            <div className="zpAcBa">IBAN/IFSC*</div>
            <input className="zpAcAb" />
          </div>
          <div />
          <div className="zpAcB">
            <div className="zpAcBa">Account Balance</div>
            <input className="zpAcAb" />
          </div>
          <div className="zpAcB">
            <div className="zpAcBa">As On</div>
            <input className="zpAcAb" />
          </div>
        </div>
        <div className="zpAd">
          <div className="zpAdA">Errors on page</div>
          <div className="zpAdB">
            <div className="zpAdBa" onClick={close}>
              CANCEL
            </div>
            <div className="zpAdBb">SAVE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
