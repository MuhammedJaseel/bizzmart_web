import { StrictMode, useRef, useState } from "react";
import "../style/zv.css";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////            Drowerr 1           //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawerLayout1({ show, children }) {
  return (
    <StrictMode>
      <div className={show ? "zvAa" : "zvAa_"}></div>
      <div className={show ? "zvAb" : "zvAb_"}>{children}</div>
    </StrictMode>
  );
}
function DrawerLayout2({ show, children }) {
  return (
    <StrictMode>
      <div className={show ? "zvAa" : "zvAa_"}></div>
      <div className={show ? "zvAb1" : "zvAb_1"}>{children}</div>
    </StrictMode>
  );
}

export default function DrawerView1({ state, setState }) {
  const { item } = state;
  return (
    <DrawerLayout1 show={item !== null}>
      <div className="zvBa">
        <div className="zvBaA">
          <div className="zvBaAa">INV22-0653</div>
          <div className="zvBaAb">PARTIALLY PAID</div>
        </div>
        <div className="zvBaB" onClick={() => setState({ item: null })} />
      </div>
      <div className="zvB-body">
        <div className="zvBb">
          <div className="zvBbA">
            <div className="zvBbAa">To</div>
            <div className="zvBbAb">
              <div className="zvBbAbA">Shaji Muhammed</div>
              <div className="zvBbAbb">
                Ozole Digital Pvt Ltd, #4, IKP Knowledge Park Saraswathipuram,
                Mysuru Karnataka, 675 006
              </div>
            </div>
          </div>
          <div className="zvBbB">
            <div className="zvBbBa">
              <div className="zvBbBaA">Invoice Date:</div>
              <div className="zvBbBaB">Apr 12, 2022</div>
            </div>
            <div className="zvBbBa">
              <div className="zvBbBaA">Due Date:</div>
              <div className="zvBbBaB">Apr 12, 2022</div>
            </div>
          </div>
        </div>
        <div className="zvBc">
          <div className="zvBcA">Product</div>
          <div className="zvBcB">Qty</div>
          <div className="zvBcC">Price</div>
          <div className="zvBcD">Discount</div>
          <div className="zvBcE">Tax Slab</div>
          <div className="zvBcF">Tax Amount</div>
          <div className="zvBcG">Total</div>
        </div>
        {[1, 1, 1, 1, 1].map(() => (
          <div className="zvBc_">
            <div className="zvBcA">Apple iPhone 13 Pro / 256GB / BLACK</div>
            <div className="zvBcB">2</div>
            <div className="zvBcC">10,00,000</div>
            <div className="zvBcD">2</div>
            <div className="zvBcE">Tax Slab</div>
            <div className="zvBcF">24,00,000</div>
            <div className="zvBcG">2,22,2222</div>
          </div>
        ))}
        <div className="zvBd">
          <div className="zvBdA">
            <div className="zvBdAa">Amount Received</div>
            <div className="zvBdAb">4,00,000.00</div>
            <div className="zvBdAc">
              Paid 3,00,000.00 on Apr 12, 2022 by UPI
            </div>
          </div>
          <div className="zvBdB">
            <div className="zvBdBc">
              <div className="zvBdBcA">Subtotal:</div>
              <div className="zvBdBcB">4,46,760.00</div>
            </div>
            <div className="zvBdBd">Tax Breakdown</div>
            <div className="zvBdBe">
              <div className="zvBdBeA">SGST</div>
              <div className="zvBdBeB">22,560.00</div>
            </div>
            <div className="zvBdBf">
              <div>
                <div className="zvBdBfAa">Total:</div>
                <div className="zvBdBfAb">4 Items</div>
              </div>
              <div className="zvBdBfB">4,46,760.00</div>
            </div>
          </div>
        </div>
        <div className="zvBe">
          <div className="zvBeA">Record Payment</div>
          <div className="zvBeB">
            <div className="zvBeBc">
              <div className="zvBeBcA">
                <div className="zvBeBcAa">Amount Outstanding</div>
                <div className="zvBeBcAb">INR 46,760.00</div>
              </div>
              <div className="zvBeBcB">
                <div className="zvBeBcBa">Amount received</div>
                <input placeholder="0.0" />
              </div>
            </div>
            <div className="zvBeBd">
              <div className="zvBeBdA">CANCEL</div>
              <div className="zvBeBdB">SAVE</div>
            </div>
          </div>
        </div>
      </div>
      <div className="zvBf">
        <div className="zvBfA">
          <div className="zvBfAa" />
        </div>
        <div className="zvBfB">OK</div>
      </div>
    </DrawerLayout1>
  );
}

export function DrowerView2({ props }) {
  const { show, close, item, error, loading, type } = props;
  const { allPlaceofSupplay, allStates, allLoyaltyType } = props;
  const [page, setPage] = useState(0);
  const refForKey = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <DrawerLayout2 show={show}>
      <div className="zvDa">
        <div className="zvDaA">{item?.name}</div>
        <div
          className="zvDaB"
          onClick={() => {
            close();
            setImage(null);
          }}
        />
      </div>
      <div className="zvDb">
        <div className="zvDbA">
          <div
            className="zvDbAa"
            style={
              item?.image !== ""
                ? { backgroundImage: `url(${item?.image})` }
                : {}
            }
          >
            {image !== null ? (
              <img className="zvDbAaA" src={URL.createObjectURL(image)} />
            ) : null}
            <div className="zvDbAaB" onClick={() => refForKey.current.click()}>
              <div className="zvDbAaBa" />
            </div>
            <input
              ref={refForKey}
              type="file"
              id="image"
              className="zvDbAaC"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="zvDbB">SILVER MEMBER</div>
        <div className="zvDbC">
          <div className="zvDbCa">
            <div className="zvDbCaA" />
            <div className="zvDbCaB">{item?.invoice_count}</div>
            <div className="zvDbCaC">Invoices</div>
          </div>
          <div />
          <div className="zvDbCa">
            <div className="zvDbCaA1" />
            <div className="zvDbCaB">{item?.opening_balance}</div>
            <div className="zvDbCaC">Balance</div>
          </div>
        </div>
        <div className="zvDbD">
          <div
            className={page === 0 ? "zvDbDa" : "zvDbDb"}
            onClick={() => setPage(0)}
          >
            EDIT CUSTOMER
          </div>
          <div
            className={page === 1 ? "zvDbDa" : "zvDbDb"}
            onClick={() => setPage(1)}
          >
            INVOICES
          </div>
          <div
            className={page === 2 ? "zvDbDa" : "zvDbDb"}
            onClick={() => setPage(2)}
          >
            STATEMENT
          </div>
          <div
            className={page === 3 ? "zvDbDa" : "zvDbDb"}
            onClick={() => setPage(3)}
          >
            RECORD PAYMENT
          </div>
        </div>
        {item !== null && page === 0 ? (
          <StrictMode>
            <div className="zvDbE">BASIC INFORMATION</div>
            <div className="zvDbF">
              <div className="zvDbFa">Full name *</div>
              <input className="zvDbFb" defaultValue={item.name} id="name" />
              <div className="zvDbFa">Loyalty Tier</div>
              <select
                className="zvDbFb"
                defaultValue={item.loyalty_tire}
                id="loyalty_tire"
              >
                {allLoyaltyType.map((it, k) => (
                  <option value={it.title}>{it.title}</option>
                ))}
              </select>
              {type === "customer" ? (
                <StrictMode>
                  <div className="zvDbFa">Lead Channel</div>
                  <input
                    className="zvDbFb"
                    id="create_from"
                    defaultValue={item.create_from}
                    disabled
                  />
                </StrictMode>
              ) : null}
            </div>
            <div className="zvDbE">CONTACT INFORMATION</div>
            <div className="zvDbF">
              <div className="zvDbFa">Mobile Number *</div>
              <input className="zvDbFb" defaultValue={item.phone} id="phone" />
              <div className="zvDbFa">Email Address</div>
              <input className="zvDbFb" defaultValue={item.email} id="email" />
            </div>
            <div className="zvDbE">FINANCIAL INFORMATION</div>
            <div className="zvDbF">
              <div className="zvDbFc">
                <div className="zvDbFd">
                  <div className="zvDbFa">Credit Limit</div>
                  <div className="row">
                    <input
                      className="zvDbFb"
                      defaultValue={item.credit_limit}
                      id="credit_limit"
                    />
                    <div className="iamInputPrfix2">INR</div>
                  </div>
                </div>
                <div className="zvDbFd">
                  <div className="zvDbFa">Credit Period</div>
                  <div className="row">
                    <input
                      className="zvDbFb"
                      defaultValue={item.credit_period}
                      id="credit_period"
                    />
                    <div className="iamInputPrfix2">INR</div>
                  </div>
                </div>
              </div>
              <div className="zvDbFc">
                <div className="zvDbFd">
                  <div className="zvDbFa">GST Number</div>
                  <input
                    className="zvDbFb"
                    defaultValue={item.gst_number}
                    id="gst_number"
                  />
                </div>
                <div className="zvDbFd">
                  <div className="zvDbFa">Place of Supplay</div>
                  <select
                    className="zvDbFb"
                    id="place_of_supply"
                    defaultChecked={item.place_of_supply}
                  >
                    {allPlaceofSupplay.map((it, k) => (
                      <option key={k} value={it.state_name}>
                        {it.state_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="zvDbE">ADDRESS INFORMATION</div>
            <div className="zvDbF">
              <div className="zvDbFa">Full Address</div>
              <textarea
                className="zvDbFb"
                defaultValue={item.address}
                id="address"
              />
              <div className="zvDbFc">
                <div className="zvDbFd">
                  <div className="zvDbFa">PIN Code</div>
                  <input
                    className="zvDbFb"
                    defaultValue={item.phone}
                    id="phone"
                  />
                </div>
                <div className="zvDbFd">
                  <div className="zvDbFa">State</div>
                  <select
                    className="zvDbFb"
                    id="state_id"
                    defaultValue={item.state_id}
                  >
                    {allStates.map((it, k) => (
                      <option key={k} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </StrictMode>
        ) : null}
        {item !== null && page === 1 ? (
          <StrictMode>
            <div className="zvDbHa">
              <div className="zvDbHaA">01 Apr 2022 to 30 Apr 2022</div>
              <div className="zvDbHaB">This Month</div>
            </div>
            {[1, 1, 1, 1, 1, 1, 1].map((it, k) => (
              <StrictMode key={k}>
                <div className="zvDbHb">30 April 2022</div>
                <div className="zvDbHc">
                  <div className="zvDbHcA">
                    <div className="zvDbHcAa">2,47,800.00</div>
                    <div className="zvDbHcAb">INV22-745</div>
                  </div>
                  <div className="zvDbHcB">
                    <div className="zvDbHcBa">INV22-745</div>
                    <div className="zvDbHcBb">INV22-745</div>
                  </div>
                  <div className="zvDbHcC">
                    <div className="zvDbHcCa">INV22-745</div>
                    <div className="zvDbHcCb">INV22-745</div>
                  </div>
                </div>
              </StrictMode>
            ))}
          </StrictMode>
        ) : null}
        {item !== null && page === 2 ? (
          <StrictMode>
            <div className="zvDbHa">
              <div className="zvDbHaA">01 Apr 2022 to 30 Apr 2022</div>
              <div className="zvDbHaB">This Month</div>
            </div>
            <div className="zvDbIa">
              <div className="zvDbIaA">Date</div>
              <div className="zvDbIaA">Reference</div>
              <div className="zvDbIaB">Amount</div>
              <div className="zvDbIaB">Payment</div>
              <div className="zvDbIaB">Balance</div>
            </div>
            {[1, 1, 1, 1].map((it, k) => (
              <div className="zvDbIb" key={k}>
                <div className="zvDbIaA">Date</div>
                <div className="zvDbIaA">Reference</div>
                <div className="zvDbIaB">Amount</div>
                <div className="zvDbIaB">Payment</div>
                <div className="zvDbIaB">Balance</div>
              </div>
            ))}
          </StrictMode>
        ) : null}
        {item !== null && page === 3 ? (
          <StrictMode>
            <div className="zvDbJa">
              <div className="zvDbJaA">3,55,500.00</div>
              <div className="zvDbJaB">
                <div className="zvDbJaBa">You will get</div>
              </div>
              <div className="zvDbJaC">
                <div className="zvDbJaCa">Amount Received *</div>
                <div className="zvDbJaCa">Balance Amount</div>
              </div>
              <div className="zvDbJaC">
                <input className="zvDbJaCa" placeholder="0.00" type="number" />
                <input className="zvDbJaCa" placeholder="0.00" type="number" />
              </div>
              <div className="zvDbJaE">Note</div>
              <input
                className="zvDbJaF"
                placeholder="Enter a note against this transaction"
              />
              <div className="zvDbJaE">Payment Method *</div>
              <div className="zvDbJaH">
                <div className="zvDbJaHa">CASH</div>
                <div className="zvDbJaHb">UPI</div>
                <div className="zvDbJaHb">CARD</div>
              </div>
            </div>
            {[1, 1, 1, 1].map((it, k) => (
              <div key={k} className="zvDbJb">
                <div className="zvDbJbA" />
                <div className="zvDbJbB">
                  <div className="zvDbJbBa">INV22-745</div>
                  <div>12 Apr 2022</div>
                  <div>2,92,700.00</div>
                </div>
                <div className="zvDbJbC">
                  <div className="zvDbJbCa">30 Apr 2022</div>
                </div>
                <div className="zvDbJbD">
                  <div>&nbsp;</div>
                  <div>Received:</div>
                  <div className="zvDbJbDb">Balance:</div>
                </div>
                <div className="zvDbJbE">
                  <div className="zvDbJbEa">2,00,000.00</div>
                  <div>2,00,000.00</div>
                  <div className="zvDbJbEa">2,00,000.00</div>
                </div>
              </div>
            ))}
          </StrictMode>
        ) : null}
      </div>
      <div className="zvDc">
        <div className="zvDcA">{error}</div>
        {page !== 1 ? (
          <div
            className="zvDcB"
            onClick={() => {
              close();
              setImage(null);
            }}
          >
            {page === 2 ? "DOWNLOAD" : "CANCAL"}
          </div>
        ) : null}
        <button type="submit" className={loading ? "zvDcC_" : "zvDcC"}>
          {page === 1 || page === 2 ? "OK" : "SAVE"}
        </button>
      </div>
    </DrawerLayout2>
  );
}
