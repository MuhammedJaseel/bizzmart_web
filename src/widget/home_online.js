import React from "react";
import { Header1, Header3 } from "./headers";
import "../style/hon.css";

const pTitles = [
  { title: "New", count: 2 },
  { title: "Accepted", count: 10 },
  { title: "Ready", count: 100 },
  { title: "Transit", count: 2 },
  { title: "Fulfilled", count: 0 },
  { title: "Rejected", count: 2 },
];

export default class HomeOnline extends React.Component {
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

    const titleBL = (
      <div className="hinB" onClick={() => this.setState({ addpage: false })}>
        &nbsp; PRODUCRS LIST
      </div>
    );
    const titleBR = "";
    const hTitle = <React.StrictMode>ONLINE {">"} </React.StrictMode>;
    return (
      <React.StrictMode>
        <Header1 title={hTitle} bodyL={titleBL} bodyR={titleBR} />
        <Header3 titles={pTitles} page={page} setState={setState} />
        <div className="honB">
          <div className="honBa">
            <div className="honC">
              <div className="honCa" />
              <div>
                <div className="honCc">{titles[page].title} Orders</div>
                <div className="honCd">2 Rejected</div>
              </div>
            </div>
            <div className="honD">
              {[1, 1, 1, 1, 1].map(() => (
                <div className="honDa">
                  <div className="honDaAa">
                    <div className="honDaAb">
                      <div className="honDaAc" />
                      <div className="honDaAd">
                        <div className="honDaAe">Amalkiran P</div>
                        <div className="honDaAf">
                          <div className="honDaAg">L254-095681</div>
                          <div className="honDaAh">5 items </div>
                        </div>
                      </div>
                    </div>
                    <div className="honDaAi">
                      <div className="honDaAj">Favory</div>
                      <div className="honDaAk">
                        11:32
                        <div className="honDaAl" />
                        12:12
                      </div>
                    </div>
                  </div>
                  <div className="honDaB">
                    <div className="honDaBa">45,750.00 - Paid Online</div>
                    <div className="honDaBb">3.2 km</div>
                    <div>12 Minutes ago</div>
                    <div className="honDaBb">
                      G1, Rise Apartment, Gokulam Road, Mysore
                    </div>
                  </div>

                  <div className="honDaC">
                    <div className="honDaCa">
                      {page === 0 || page === 1 ? (
                        <div className="honDaCb">TAKEAWAY</div>
                      ) : null}
                      <div className="honDaCc">
                        <div className="honDaCd" />
                        NEW ORDER
                      </div>
                    </div>
                    <div className="honDaCe">
                      {page === 0 ? (
                        <div className="honDaCf-wrong">
                          <div>REJECT</div>
                        </div>
                      ) : null}
                      {page === 0 || page === 1 ? (
                        <div className="honDaCf-mark">
                          <div>{page === 0 ? "ACCEPT" : "READY"}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="honBb">
            <div className="honBb_">
              <div className="honBbA">
                <div>
                  <div className="honBbAb">Order Details</div>
                  <div className="honBbAc">L254-095681</div>
                </div>
                <div className="honBbAd">
                  <div className="honBbAe" />
                  <div className="honBbAe honBbAf" />
                </div>
              </div>
              <div className="honBbB">
                <div className="honBbBa">
                  <div>Status</div>
                  <div>11:20 AM</div>
                </div>
                <div className="honBbBd">
                  <div className="honBbBe">
                    <div>New</div>
                    <div className="honBbBg">
                      <div className="honBbBh honBbBh_" />
                      <div
                        className={page !== 5 ? "honBbBi honBbBi_" : "honBbBi"}
                      />
                      <div
                        className={page !== 5 ? "honBbBh honBbBi_" : "honBbBh"}
                      />
                    </div>
                  </div>
                  <div className="honBbBe">
                    <div>Acccepted</div>
                    <div className="honBbBg">
                      <div
                        className={
                          page !== 5 && page > 0
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 0
                            ? "honBbBi honBbBi_"
                            : "honBbBi"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 0
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                    </div>
                  </div>
                  <div className="honBbBe">
                    <div>Ready</div>
                    <div className="honBbBg">
                      <div
                        className={
                          page !== 5 && page > 1
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 1
                            ? "honBbBi honBbBi_"
                            : "honBbBi"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 1
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                    </div>
                  </div>
                  <div className="honBbBe">
                    <div>Dispatched</div>
                    <div className="honBbBg">
                      <div
                        className={
                          page !== 5 && page > 2
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 2
                            ? "honBbBi honBbBi_"
                            : "honBbBi"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 2
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                    </div>
                  </div>
                  <div className="honBbBe">
                    <div>Fulfilled</div>
                    <div className="honBbBg">
                      <div
                        className={
                          page !== 5 && page > 3
                            ? "honBbBh honBbBi_"
                            : "honBbBh"
                        }
                      />
                      <div
                        className={
                          page !== 5 && page > 3
                            ? "honBbBi honBbBi_"
                            : "honBbBi"
                        }
                      />
                      <div className="honBbBh honBbBh_" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="honBbC">PAID ONLINE</div>
              <div className="honBbD">
                <div className="honBbDa">QTY</div>
                <div className="honBbDb">ITEM</div>
                <div className="honBbDc">AMOUNT</div>
              </div>
              <div className="honBbE">
                {[1, 1, 1].map((it, k) => (
                  <div key={k} className="honBbEa">
                    <div className="honBbEb">1</div>
                    <div className="honBbDb honBbEc">
                      <div className="honBbEd">
                        iPhone 13 Pro / 256GB / Black
                      </div>
                      <div className="honBbEe">1x 92490</div>
                    </div>
                    <div className="honBbDc honBbEf">92,490.00</div>
                  </div>
                ))}
              </div>
              <div className="honBbF">
                <div>4 ITEMS</div>
                <div>Subtotal: 1,20,720.00</div>
              </div>
              <div className="honBbG">Tax Incl: 22,720.00</div>
              <div className="honBbH">
                <div className="honBbHa">
                  <div>Customer</div>
                  <div>REGULAR</div>
                </div>
                <div className="honBbHd">Amalkiran P</div>
                <div className="honBbHe">
                  G1, Rise Apartment, Gokulam Main Road Mysore, Karnataka
                </div>
                <div className="honBbHd">Mobile: 9745553365</div>
              </div>
            </div>
            {page === 0 ? (
              <div className="honBb_A">
                <div
                  className="honBb_Aa"
                  onClick={() => setState({ isPopup: true })}
                >
                  ACCEPT
                </div>
                <div className="honBb_Ab">REJECT</div>
              </div>
            ) : null}
            {page === 1 ? <div className="honBb_B">MARK AS READY</div> : null}
            {page === 5 ? <div className="honBb_F">REJECTED</div> : null}
          </div>
        </div>
        <HomeOnlinePopup state={state} setState={setState} />
      </React.StrictMode>
    );
  }
}

function HomeOnlinePopup({ state, setState }) {
  const { isPopup } = state;
  if (!isPopup) return null;
  return (
    <div className="honG">
      <div className="honG_">
        <div className="honGa">
          <div className="honGaA">REJECT ORDER</div>
          <div
            className="honGaB"
            onClick={() => setState({ isPopup: false })}
          />
        </div>
        <div className="honGb">
          <div className="honGbA">Select order rejection reason</div>
          <div className="honGbB">Rejection Reason*</div>
          <select className="honGbC"></select>
          <div className="honGbB">Rejection Reason*</div>
          <select className="honGbC"></select>
        </div>
        <div className="honGc">
          <div className="honGcA honGcB">CANCEL</div>
          <div className="honGcA">SAVE</div>
        </div>
      </div>
    </div>
  );
}
