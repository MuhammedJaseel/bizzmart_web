import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./widget";
import icTag from "../asset/ic_tag.svg";
import icWalk from "../asset/ic_walk.svg";
import icCart1 from "../asset/ic_cart1.svg";
import icGraph from "../asset/ic_graph.svg";

const pTitles = ["Dashboard", "Analytics"];

export default class HomeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page } = state;

    return (
      <React.StrictMode>
        <Header1 title="Dashboard" />
        <Header2 titles={pTitles} page={page} setState={setState} />
        <div className="hdb">
          <div className="hdbA">
            <div className="hdbAa">
              <HDBG1 tit="Today Sale" value="15,312.00" ic={icTag} />
              <HDBG1 tit="Walk in" value="15,312.00" ic={icWalk} />
              <HDBG1 tit="Online" value="15,312.00" ic={icCart1} />
              <HDBG1
                tit="Gross Profit"
                value="5235.00"
                ic={icGraph}
                value2="+35.52%"
              />
            </div>
            <div className="hdbAa">
              <HDBG2 />
              <HDBG3 />
            </div>
            <HDBG4 />
            <div className="hdbAa">
              <HDBG5 />
              <HDBG6 />
            </div>
            {/* This line is a dunmmy line for showing the padding under the page */}
            <div className="hdbAb" />
          </div>
          <div className="hdbB">
            <HDBG7 />
            <div className="hdbBa">
              <HDBG8 />
              <HDBG8 />
            </div>
            <div className="hdbBa">
              <HDBG8 />
              <HDBG8 />
            </div>
            <div className="hdbBa">
              <HDBG8 />
              <HDBG8 />
            </div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

function HDBG1({ ic, value, value2, tit }) {
  return (
    <div className="hdb_1">
      <img className="hdb_1A" src={ic} />
      <div className="hdb_1B">
        <div className="hdb_1Ba">{tit}</div>
        <div className="hdb_1Bb">{value}</div>
        <div className="hdb_1Bc">{value2}</div>
      </div>
    </div>
  );
}
function HDBG2() {
  return <div className="hdb_2"></div>;
}
function HDBG3() {
  return <div className="hdb_3"></div>;
}
function HDBG4() {
  return <div className="hdb_4"></div>;
}
function HDBG5() {
  return (
    <div className="hdb_5">
      <div className="hdb_5A">
        Trending Items
        <div className="hdb_5Ab" />
      </div>
      <div className="hdb_5B">
        {[1, 1, 1, 1, 1, 1, 1].map((it, k) => (
          <div key={k} className="hdb_5Ba">
            <img className="hdb_5BaA" />
            <div className="hdb_5BaB">I Phone 13 Pro Max 128GB</div>
            <div className="hdb_5BaC">Avilable</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function HDBG6() {
  return (
    <div className="hdb_6">
      <div className="hdb_6A">
        Low Stock Items <div className="hdb_6Ab" />
      </div>
      <div className="hdb_6B">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((it, k) => (
          <div className="hdb_6Ba">
            <div className="hdb_6BaA">I Phone 13 Pro Max 128GB</div>
            <div className="hdb_6BaB">Mobile Phones</div>
            <div className="hdb_6BaC">1</div>
            <div className="hdb_6BaD">PSC</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function HDBG7() {
  return (
    <div className="hdb_7">
      <div>
        <div className="hdb_7Aa">Total online order</div>
        <div className="hdb_7Ab">125</div>
      </div>
      <div>
        <div className="hdb_7Ba">New</div>
        <div className="hdb_7Bb">16</div>
      </div>
      <div className="hdb_7C" />
      <div>
        <div className="hdb_7Ba">Accepted</div>
        <div className="hdb_7Bb1">16</div>
      </div>
      <div className="hdb_7C" />
      <div>
        <div className="hdb_7Ba">Transit</div>
        <div className="hdb_7Bb2">16</div>
      </div>
      <div className="hdb_7C" />
      <div>
        <div className="hdb_7Ba">Fulfilled</div>
        <div className="hdb_7Bb3">16</div>
      </div>
    </div>
  );
}
function HDBG8() {
  return (
    <div className="hdb_8">
      <div className="hdb_8A">Net Sales Unit</div>
      <div className="hdb_8B"></div>
      <div className="hdb_8C">
        <div className="hdb_8Ca"></div>
        <div className="hdb_8Cb"></div>
      </div>
    </div>
  );
}
