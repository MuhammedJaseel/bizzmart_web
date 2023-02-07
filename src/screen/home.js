import { Component, StrictMode } from "react";
import { quickButtons } from "../module/home";
import { WidgetSuccesPopup } from "../widget/widget_popup";
import { onClickUserLogout } from "../method/login";
import bizzMartLogo2 from "../asset/bizzmart_logo2.png";
import sidebarIc from "../module/sidebarItems";
import icBack from "../asset/icon/ic_back.png";
import "../style/hm.css";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setScreen: props.setScreen,
      selectedDash: null,
      isNoti: false,
      isQuickPop: false,
      msgSucces: {},
      isProfilePopup: false,
      succesPop: (v) => {
        v.close = this.setState({ msgSucces: {} });
        this.setState({ msgSucces: v });
        setTimeout(() => this.setState({ msgSucces: {} }), 3000);
      },
    };
  }
  componentDidMount() {
    const path = window.location.pathname.split("/")[2];
    var setted = false;
    for (let i = 0; i < sidebarIc.length; i++)
      if (sidebarIc[i].path === path) {
        this.setState({ selectedDash: i });
        setted = true;
      }
    if (!setted) this.setState({ selectedDash: 0 });
  }

  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { selectedDash, setScreen, isQuickPop, msgSucces, succesPop } = state;
    const { isProfilePopup } = state;
    const SubWidget = sidebarIc[selectedDash]?.widget;
    if (selectedDash == null) return null;
    return (
      <StrictMode>
        <div className="hmA">
          <div className="hmAa">
            <div className="hmAaA">
              <div className="hmAaB">
                <img
                  className="hmAaC"
                  alt="Bizz"
                  src={window.localStorage.getItem("branchImage")}
                />
              </div>
              <div className="hmAaD">
                <div className="hmAaE">
                  {window.localStorage.getItem("buisnessName")}
                </div>
                <div className="hmAaF">
                  {window.localStorage.getItem("branchName")}
                </div>
              </div>
            </div>
            <div className="hmAaG">
              {/* <div
                className="hmAaH"
                onClick={() => setState({ isQuickPop: !isQuickPop })}
              >
                {isQuickPop ? (
                  <StrictMode>
                    <div className="hmAaH_" />
                    <div className="hmAaHa">
                      {quickButtons.map((it, k) => (
                        <StrictMode key={k}>
                          <div className="hmAaHaA">{it.title}</div>
                          <div className="hmAaHaB">
                            {it.data.map((it2, k1) => (
                              <div
                                key={k}
                                className="hmAaHaBa"
                                onClick={() => {
                                  setScreen(it2.path);
                                  setState({ selectedDash: 3 });
                                }}
                              >
                                {it2.title}
                              </div>
                            ))}
                          </div>
                        </StrictMode>
                      ))}
                    </div>
                  </StrictMode>
                ) : null}
              </div>
              <div
                className="hmAaJ"
                onClick={() => setState({ isNoti: true })}
              />
              <div className="hmAaM">
                <div className="hmAaO">Help</div>
              </div> */}

              <div className="hmAaQ">
                <img
                  alt="ic"
                  className="hmAaR"
                  // src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg"
                  src={window.localStorage.getItem("profilePic")}
                  onClick={() => setState({ isProfilePopup: true })}
                />
                {isProfilePopup ? (
                  <div
                    className="hmAaQa"
                    onClick={() => setState({ isProfilePopup: false })}
                  />
                ) : null}
                {isProfilePopup ? (
                  <div
                    className="hmAaQb"
                    onClick={() => onClickUserLogout(state)}
                  >
                    Logout
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <SubWidget succesPop={succesPop} />
        </div>
        <div className="hmB">
          <div>
            <div className="hmBa">
              <div className="hmBb">
                <img alt="lg" className="hmBc" src={bizzMartLogo2} />
              </div>
              <div className="hmBd">
                <div className="hmBe">
                  <div className="hmBf">bizzSmart&nbsp;</div>
                  <div className="hmBg">ERP</div>
                </div>
                <div className="hmBh">Workspace</div>
              </div>
            </div>
            {sidebarIc.map((ic, k) => (
              <StrictMode key={k}>
                <div
                  className={selectedDash === k ? "hmBi_" : "hmBi"}
                  onClick={() => {
                    setState({ selectedDash: k });
                    window.history.replaceState(
                      "home",
                      "Home",
                      `/dashboard/${ic.path}`
                    );
                    if (selectedDash === k) window.location.reload();
                  }}
                >
                  <div className="hmBj">
                    <img
                      alt="ic"
                      className="hmBjA"
                      src={selectedDash === k ? ic.iconW : ic.icon}
                    />
                  </div>
                  <div className="hmBk">{ic.title}</div>
                </div>
                {k === 1 || k === 8 ? <div className="hmBi_a" /> : null}
              </StrictMode>
            ))}
          </div>
          <div className="hmBl" onClick={() => setScreen("/branches")}>
            <img alt="ic" src={icBack} className="hmBm" />
            <div className="hmBn">All Branches</div>
          </div>
        </div>
        <HomeNotificationPopup state={state} setState={setState} />
        <WidgetSuccesPopup props={msgSucces} />
      </StrictMode>
    );
  }
}

function HomeNotificationPopup({ state, setState }) {
  const { isNoti } = state;
  return (
    <StrictMode>
      <div className={isNoti ? "hmC" : "hmC_"} />
      <div className={isNoti ? "hmCa" : "hmCa_"}>
        <div
          className={isNoti ? "hmCa_x" : ""}
          onClick={() => setState({ isNoti: false })}
        />
        {[1, 1, 1].map((it, k) => (
          <StrictMode key={k}>
            <div className="hmCb">
              <div className="hmCbA">PAYMENT DUE</div>
            </div>
            {[1, 1, 1].map((it1, k1) => (
              <div className="hmCc" key={k1}>
                <div className="hmCcA" />
                <div className="hmCcB">
                  <div className="hmCcBa">Rahul Commerce</div>
                  <div className="hmCcBb">
                    Cheque #1235 for 125,500.00 is due today
                  </div>
                </div>
                <div className="hmCcC">12 MAY</div>
              </div>
            ))}
          </StrictMode>
        ))}
      </div>
    </StrictMode>
  );
}
