import React, { Component } from "react";
import bizzMartLogo2 from "../asset/bizzmart_logo2.png";
import sidebarIc from "../module/sidebar_ic";
import icBack from "../asset/icon/ic_back.png";
import icPlus from "../asset/icon/ic_plus.png";
import icarrow1 from "../asset/icon/ic_arrow1.png";
import icHelp from "../asset/icon/ic_help.png";
import icNoti from "../asset/icon/ic_noti.png";
import "../style/hm.css";

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = { selectedDash: 0 };
  }

  componentDidMount() {
    const path = window.location.pathname.split("/")[2];
    for (let i = 0; i < sidebarIc.length; i++)
      if (sidebarIc[i].path === path) this.setState({ selectedDash: i });
  }

  render() {
    const { selectedDash } = this.state;
    const SubWidget = sidebarIc[selectedDash].widget;
    return (
      <React.StrictMode>
        <div className="hmA">
          <div className="hmAa">
            <div className="hmAaA">
              <div className="hmAaB">
                <div className="hmAaC"></div>
              </div>
              <div className="hmAaD">
                <div className="hmAaE">Sharma Mobiile World</div>
                <div className="hmAaF">Phonix mall, Mumbai</div>
              </div>
            </div>
            <div className="hmAaG">
              <div className="hmAaH">
                <img alt="ic" className="hmAaI" src={icPlus} />
              </div>
              <div className="hmAaJ">
                <img alt="ic" className="hmAaK" src={icNoti} />
              </div>
              <div className="hmAaM">
                <img alt="ic" className="hmAaN" src={icHelp} />
                <div className="hmAaO">Help</div>
                <img alt="ic" className="hmAaP" src={icarrow1} />
              </div>
              <div className="hmAaQ">
                <img
                  alt="ic"
                  className="hmAaR"
                  src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg"
                  // src={window.localStorage.getItem("profile_pic")}
                />
                <img alt="ic" className="hmAaP" src={icarrow1} />
              </div>
            </div>
          </div>
          <SubWidget />
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
              <React.StrictMode key={k}>
                <div
                  className={selectedDash === k ? "hmBi_" : "hmBi"}
                  onClick={() => {
                    this.setState({ selectedDash: k });
                    window.history.replaceState(
                      "home",
                      "Home",
                      `/dashboard/${ic.path}`
                    );
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
                {k === 2 || k === 12 ? <div className="hmBi_a" /> : null}
              </React.StrictMode>
            ))}
          </div>
          <div className="hmBl">
            <img alt="ic" src={icBack} className="hmBm" />
            <div className="hmBn">All Branches</div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}
