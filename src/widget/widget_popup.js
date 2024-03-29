import "../style/zp.css";

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////    POPUP TYPE 1   /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export function WidgetPopUp1({ props, children }) {
  const { close, title, desc, btnTitle, submit } = props;
  const { error, loading, small, medium, hide } = props;
  const { onChange } = props;
  if (hide) return;
  return (
    <form
      className="zpA"
      onChange={onChange}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className={small ? "zpAa_" : "zpAa"}
        style={medium ? { width: "38vw" } : {}}
      >
        <div className="zpAb">
          <div className="zpAbA">{title}</div>
          <div className="zpAbB" onClick={close} />
        </div>
        <div className="zpAc">{desc}</div>
        <div className="zpAd">{children}</div>
        <div className="zpAe">
          {error !== null ? (
            <div className="zpAeA">{error?.toString()}</div>
          ) : (
            <div />
          )}
          <div className="zpAeB">
            <div className="zpAeBa" onClick={close}>
              CANCEL
            </div>
            <div className={loading ? "zpAeBb_" : "zpAeBb"} onClick={submit}>
              {btnTitle || "SAVE"}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export function WidgetPopUp1Body({ children }) {
  return <div className="zpAf">{children}</div>;
}
export function WidgetPopUp2Body({ children }) {
  return <div className="zpAf2">{children}</div>;
}
export function WidgetPopUp1In1({ children, title, t2 }) {
  return (
    <div className="zpAg">
      <div className="zpAgA">
        {title}
        <div>{t2}</div>
      </div>
      {children}
    </div>
  );
}
export function WidgetPopUp1In2({ children, title1, title2 }) {
  return (
    <div className="zpAh">
      <div className="zpAhA">
        <div className="zpAhAa zpAgA">{title1}</div>
        <div className="zpAhAa zpAgA">{title2}</div>
      </div>
      <div className="zpAhB">{children}</div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////    POPUP TYPE 2   /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export function WidgetSuccesPopup({ props }) {
  const { active, title, desc, type, close } = props;

  var style = {};
  if (type === "warning") style = { background: "#CC962A" };
  else if (type === "error") style = { background: "#D10707" };

  return (
    <div className={active ? "zpCa_" : "zpCa"} style={style}>
      <div className="zpCb">
        <div className="zpCc" onClick={close} />
      </div>
      <div className="zpCd">
        <div className="zpCe" />
        <div className="zpCf">
          <div className="zpCg">{title}</div>
          <div className="zpCh">{desc}</div>
        </div>
      </div>
    </div>
  );
}

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////    CONFIRM POPUP   /////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
export function WidgetConfirmPopup({ props }) {
  if (props !== null)
    return (
      <WidgetPopUp1
        props={{
          title: "Confirm",
          desc: props?.desc,
          small: true,
          error: props?.error,
          loading: props?.loading,
          close: props?.close,
          btnTitle: "YES",
          submit: props?.onSubmit,
        }}
      />
    );
}
