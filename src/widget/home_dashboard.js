import React, { Component } from "react";
import "../style/hdb.css";
import { Header1, Header2 } from "./widget";

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
              <div className="hdbAaA">
                <div className="hdbAaA_"></div>
                <div className="hdbAaA_"></div>
                <div className="hdbAaA_"></div>
                <div className="hdbAaA_"></div>
              </div>
              <div className="hdbAaB">
                <div className="hdbAaBa"></div>
                <div className="hdbAaBb"></div>
              </div>
            </div>
            <div className="hdbAb"></div>
          </div>
        </div>
      </React.StrictMode>
    );
  }
}
