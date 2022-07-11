import React, { Component } from "react";
import "../style/br.css";

export default class BranchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setScreen: this.props.setScreen,
    };
  }
  render() {
    const { setScreen } = this.state;
    return (
      <div className="brA">
        <div className="brB">
          <div className="brC">
            <div className="brD">
              <div className="brE" />
              <div className="brF">bizzWorks</div>
            </div>
            <select className="brG">
              <option>My Business</option>
            </select>
          </div>
          <div className="brJ">
            <div className="hmAaJ"></div>
            <div className="hmAaM">
              <div className="hmAaO">Help</div>
            </div>
            <div className="hmAaQ">
              <img
                alt="ic"
                className="hmAaR"
                src="https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg"
                // src={window.localStorage.getItem("profile_pic")}
              />
            </div>
          </div>
        </div>
        <div className="brO">My Branches</div>
        <div className="brP">
          <select className="brQ">
            <option>Show: All Branches</option>
          </select>
          <input className="brR" placeholder="Search Branch" />
        </div>

        <div className="brS">
          <div className="brT">
            <div className="brU">BUSSNESS & BRANCH</div>
            <div className="brW">STATUS</div>
            <div className="brX">LAST LOGIN</div>
            <div className="brY">ONLINE STORE</div>
            <div className="brZ">PLAN</div>
            <div className="brAa">VALID TILL</div>
          </div>
          {[1, 1].map((v, k) => (
            <div key={k} className="brAb">
              <div className="brU brAc">
                <img
                  className="brAd"
                  src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shopping-logo-icon-template-design-95efa314ac0a8841eaf2f864f61b1ee7_screen.jpg?ts=1604166712"
                  alt="LOgo"
                />
                <div className="brAe">
                  <div className="brAf">Sharma Mobile world</div>
                  <div className="brAg">Phoenix Mall, Mumbai</div>
                </div>
              </div>
              <div className="brW brAh">OPEN</div>
              <div className="brX brAi">2 Feb 2022, 09:30:14</div>
              <div className="brY brAj">LIVE</div>
              <div className="brZ brAk">BLOSSOM</div>
              <div className="brAa brAl">2 Feb 2022, 09:30:14</div>
              <div className="brAm" onClick={() => setScreen("/dashboard")}>
                VIEW STORE
              </div>
            </div>
          ))}
        </div>
        <div className="brAo">
          <div className="brAp">
            <div className="brAq" />
            <div className="brAr">Add Branch</div>
          </div>
        </div>
      </div>
    );
  }
}
