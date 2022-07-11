import React, { Component } from "react";
import bizzMartLogo from "../asset/bizzmart_logo.png";
import "../style/ln.css";
import { branchFind, branchLogin } from "../method/login";
import { getLoginPageData, hosLogin } from "../method/login";
import { LoadingScreen1 } from "../widget/warnings";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setScreen: props.setScreen,
      pageloading: true,
      loading: false,
      error: null,
      pageData: {},
      logintype: "branch",
      logintitle: "bizzSmart ERP",
      brcode: "",
      forgetState: 0,
      showPassword: false,
    };
  }

  componentDidMount() {
    getLoginPageData(this);
  }

  onNext = (e) => {
    e.preventDefault();
    if (this.state.loading) return;
    const { logintype } = this.state;
    if (logintype === "branch") branchFind(this, e);
    else if (logintype === "branchlogin") branchLogin(this, e);
    else if (logintype === "hoslogin") hosLogin(this, e);
  };

  render() {
    const { pageloading, loading, error, pageData, logintype } = this.state;
    const { logintitle, forgetState } = this.state;
    if (pageloading) return <LoadingScreen1 />;
    return (
      <React.StrictMode>
        <img className="lnA" alt="img" src={pageData.url} />
        {/* <div className="lnC" /> */}
        <div className="lnB">
          <div className="lnBa">
            <div className="lnBaA">{pageData.title}</div>
            <div className="lnBaB">{pageData.description}</div>
          </div>
          <div className="lnBb">
            <div className="lnBbA">
              <img className="lnBbB" alt="img" src={bizzMartLogo} />
            </div>
            <div className="lnBbC">{logintitle}</div>
            <div className="lnBbD">Login</div>
            <div className="lnBbE">
              <div
                onClick={() => this.setState({ logintype: "branch" })}
                className={logintype === "hoslogin" ? "lnBbF_" : "lnBbF"}
              >
                <div>Branch Login</div>
                {logintype !== "hoslogin" ? <div className="lnBbH" /> : null}
              </div>
              <div
                onClick={() => this.setState({ logintype: "hoslogin" })}
                className={logintype !== "hoslogin" ? "lnBbF_" : "lnBbF"}
              >
                <div>HOS Login</div>
                {logintype === "hoslogin" ? <div className="lnBbH" /> : null}
              </div>
            </div>
            <form onSubmit={this.onNext}>
              {logintype === "branch" ? <BranchForm /> : null}
              {logintype === "branchlogin" ? (
                <BranchLoginForm props={this} />
              ) : null}
              {logintype === "hoslogin" ? <HOSLoginForm /> : null}
              <div className="lnBbI">{error}</div>
              <button
                className="lnBbL"
                type="submit"
                style={loading ? { backgroundColor: "#21306087" } : null}
              >
                {logintype === "branch" ? "NEXT" : "LOGIN"}
              </button>
            </form>
            <div className="lnBbM">Don’t have access?</div>
            <div className="lnBbN">Contact your business admin </div>
          </div>
        </div>
        {forgetState !== 0 ? (
          <div className="lnC">
            <div className="lnCa">
              <div className="lnCb">Reset Password</div>
              <div className="lnBbJ">Username</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (forgetState === 1) this.setState({ forgetState: 2 });
                  if (forgetState === 2) this.setState({ forgetState: 0 });
                }}
              >
                <input
                  id="br_li_username"
                  className="lnBbK"
                  placeholder="Enter your registered mobile number"
                />
                {forgetState === 2 ? (
                  <React.StrictMode>
                    <div className="lnBbJ">OTP</div>
                    <input
                      id="br_li_username"
                      className="lnBbK"
                      placeholder="Enter OTP"
                    />
                  </React.StrictMode>
                ) : null}
                <button
                  className="lnBbL"
                  type="submit"
                  style={loading ? { backgroundColor: "#21306087" } : null}
                >
                  {forgetState === 1 ? "SEND OTP" : "VERIFY & PROCEED"}
                </button>
              </form>
              <div className="lnCc">
                We will send you 6 digit code to your mobile number
              </div>
            </div>
          </div>
        ) : null}
      </React.StrictMode>
    );
  }
}

function BranchForm() {
  return (
    <React.StrictMode>
      <div className="lnBbJ">Branch Code</div>
      <input
        id="br_code"
        className="lnBbK"
        placeholder="Enter your branch code here"
      />
    </React.StrictMode>
  );
}
function BranchLoginForm({ props }) {
  const { showPassword } = props.state;
  return (
    <React.StrictMode>
      <div className="lnBbJ">
        <div>Branch Code</div>
        <div
          onClick={() => props.setState({ logintype: "branch" })}
          className="lnBbJa"
        >
          CHANGE BRANCH CODE
        </div>
      </div>
      <input
        id="br_li_code"
        className="lnBbK"
        defaultValue={props.state.brcode}
        disabled
        placeholder="Enter your branch code here"
      />
      <div className="lnBbJ">Username</div>
      <input
        id="br_li_username"
        className="lnBbK"
        placeholder="Enter your registered mobile number"
      />
      <div className="lnBbJ">
        <div>Password</div>
        <div
          onClick={() => props.setState({ forgetState: 1 })}
          className="lnBbJa"
        >
          FORGET PASSWORD
        </div>
      </div>
      <input
        id="br_li_password"
        type={showPassword ? "text" : "password"}
        className="lnBbK"
        placeholder="Enter password"
      />
      <div
        className="lnBbK-ic"
        onClick={() => props.setState({ showPassword: !showPassword })}
      />
    </React.StrictMode>
  );
}
function HOSLoginForm() {
  return (
    <React.StrictMode>
      <div className="lnBbJ">Username</div>
      <input
        id="hos_username"
        className="lnBbK"
        placeholder="Enter your mobile number here"
      />
      <div className="lnBbJ">Password</div>
      <input
        id="hos_password"
        type="password"
        className="lnBbK"
        placeholder="Enter password"
      />
    </React.StrictMode>
  );
}
