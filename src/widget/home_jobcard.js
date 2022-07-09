import React from "react";
import { Header1, Header3 } from "./widget";
import "../style/hjc.css";

const pTitles = [
  { title: "New", count: 2 },
  { title: "In Process", count: 10 },
  { title: "On Hold", count: 100 },
  { title: "Processed", count: 2 },
  { title: "Ready", count: 0 },
];

export default class HomeJobcard extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      titles: pTitles,
      isPopup: false,
    };
  }
  render() {
    const state = this.state;
    const setState = (v) => this.setState(v);
    const { page, titles } = state;

    const titleBR = "";

    return (
      <React.StrictMode>
        <Header1 title="Job card" bodyR={titleBR} />
        <Header3 titles={titles} page={page} setState={setState} />
        <HomeJobCardBody state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeJobCardBody({ state, setState }) {
  return (
    <div className="hjcA">
      <div className="hjcAa">
        <div className="hjcAaA">
          <div className="hjcAaAa" />
          <div>
            <div className="hjcAaAb">New Job Cards</div>
            <div className="hjcAaAc">2 New</div>
          </div>
        </div>
        <div className="hjcAaB">
          {[1, 1, 1, 1].map(() => (
            <div className="hjcAaBa">
              <div className="hjcAaBaA" />
              <div className="hjcAaBaB">
                <div className="hjcAaBaBa">RPA22-234</div>
                <div>
                  <div className="hjcAaBaBb">Amalkiran P</div>
                  <div className="hjcAaBaBc">Gold Member</div>
                </div>
                <div>9745552299</div>
              </div>
              <div className="hjcAaBaC">
                <div>18 APR 2022</div>
                <div>
                  <div className="hjcAaBaBc">Deliver by</div>
                  <div>27 APR 2022</div>
                </div>
              </div>
              <div className="hjcAaBaD" />
              <div className="hjcAaBaE">
                <div>
                  <div>iPhone 13 Pro 512GB Black</div>
                  <div className="hjcAaBaBc">Battery Replacement</div>
                </div>
                <div>
                  <div className="hjcAaBaBc">Condition</div>
                  <div>Dead</div>
                </div>
              </div>
              <div className="hjcAaBaF">
                <div className="hjcAaBaFa">+1</div>
              </div>
              <div className="hjcAaBaD" />
              <div className="hjcAaBaG">
                <div>
                  <div className="hjcAaBaBc">Estimated Charge</div>
                  <div>INR 5,800.00</div>
                </div>
                <div>
                  <div className="hjcAaBaBc">Paid Amount</div>
                  <div>INR 1,000.00</div>
                </div>
              </div>
              <div className="hjcAaBaH"></div>
              <div className="hjcAaBaI"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="hjcAb">
        <div className="hjcAbA">
          <div className="hjcAbAa">
            <div>
              <div className="hjcAbAaB">Job Card Details</div>
              <div className="hjcAbAaC">RPA22-234</div>
              <div className="hjcAbAaD">Technision oedjjnjn</div>
            </div>
            <div className="hjcAbAd">
              <div className="hjcAbAdA" />
              <div className="hjcAbAdB" />
              <div className="hjcAbAdC" />
            </div>
          </div>
          <div className="hjcAbAe">
            <div className="hjcAbAeA">Ready</div>
            <div className="hjcAbAeA">Processed</div>
            <div className="hjcAbAeA">On Hold</div>
            <div className="hjcAbAeA">In Process</div>
            <div className="hjcAbAeA">New</div>
          </div>
          <div className="hjcAbAf">ITEMS</div>
          {[1, 1,1,1,1,1, 1].map(() => (
            <div className="hjcAbAg">
              <div className="hjcAbAgA">iPhone 13 Pro / 256GB / Black</div>
              <div className="hjcAbAgB">
                <div className="hjcAbAgBa">IMEI/SN</div>
                <div className="hjcAbAgBb">123456789876543</div>
              </div>
              <div className="hjcAbAgC">
                <div>Job Type</div>
                <div>Risk</div>
              </div>
              <div className="hjcAbAgD">
                <div>Battery Replacement</div>
                <div>Normal</div>
              </div>
              <div className="hjcAbAgE">
                handset in dead condition and seems due to battery drained
              </div>
            </div>
          ))}
        </div>
        <div className="hjcAbB">
          <div className="hjcAbBa">
            <div className="hjcAbBaA">
              <div className="hjcAbBaAa">Customer</div>
              <div className="hjcAbBaAb">GOLD MEMBER</div>
            </div>
            <div className="hjcAbBaB">Amalkiran P</div>
          </div>
          <div className="hjcAbBb">Select Technician</div>
          <select className="hjcAbBc">
            <option>Select Technician</option>
          </select>
          <div className="hjcAbBd">IN PROCESS</div>
        </div>
      </div>
    </div>
  );
}
