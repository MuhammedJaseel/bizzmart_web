import React, { Component } from "react";
import "../style/br.css";

export default class BranchScreen extends Component {
  render() {
    return (
      <div className="br_a">
        <div className="br_b">
          <div className="br_c">
            <div className="br_d">
              <img className="br_e" />
              <div className="br_f">bizzWorks</div>
            </div>
            <div className="br_g">
              <img className="br_h" />
              <div className="br_i">My Business</div>
            </div>
          </div>
          <div className="br_j">
            <img className="br_k" alt="logo" />
            <img className="br_l" alt="logo" />
            <div className="br_m">Help</div>
            <div className="br_n"></div>
          </div>
        </div>
        <div className="br_o">My Branches</div>
        <div className="br_p">
          <select className="br_q"></select>
          <select className="br_r"></select>
        </div>

        <div className="br_s">
          <div className="br_t">
            <div className="br_u">
              <img className="br_v" alt="logo" />
              BUSSNESS & BRANCH
            </div>
            <div className="br_w">STATUS</div>
            <div className="br_x">LAST LOGIN</div>
            <div className="br_y">ONLINE STORE</div>
            <div className="br_z">PLAN</div>
            <div className="br_aa">VALID TILL</div>
          </div>
          {[1, 1].map((v, k) => (
            <div key={k} className="br_ab">
              <div className="br_u br_ac">
                <img
                  className="br_ad"
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shopping-logo-icon-template-design-95efa314ac0a8841eaf2f864f61b1ee7_screen.jpg?ts=1604166712"
                  alt="LOgo"
                />
                <div className="br_ae">
                  <div className="br_af">Sharma Mobile world</div>
                  <div className="br_ag">Phoenix Mall, Mumbai</div>
                </div>
              </div>
              <div className="br_w br_ah">OPEN</div>
              <div className="br_x br_ai">2 Feb 2022, 09:30:14</div>
              <div className="br_y br_aj">LIVE</div>
              <div className="br_z br_ak">BLOSSOM</div>
              <div className="br_aa br_al">2 Feb 2022, 09:30:14</div>
              <div className="br_am">
                VIEW STORE
                <img className="br_an" alt="icon" />˝
              </div>
            </div>
          ))}
        </div>
        <div className="br_ao">
          <div className="br_ap">
            <div className="br_aq">
              <img />
            </div>
            <div  className="br_ar">Add Branch</div>
          </div>
        </div>
      </div>
    );
  }
}
