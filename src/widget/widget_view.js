import { StrictMode } from "react";
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
  const { invoice } = state;
  return (
    <DrawerLayout1 show={invoice !== null}>
      <div className="zvBa">
        <div className="zvBaA">
          <div className="zvBaAa">INV22-0653</div>
          <div className="zvBaAb">PARTIALLY PAID</div>
        </div>
        <div className="zvBaB" onClick={() => setState({ invoice: null })} />
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

export function DrowerView2({ show ,close }) {
  return (
    <DrawerLayout2 show={show}>
      <div className="zvDa">
        <div className="zvDaA">Sunder Pitch</div>
        <div className="zvDaB" onClick={close} />
      </div>
      <div className="zvDb">
        <div className="zvDbA">
          <div className="zvDbAa"></div>
        </div>
        <div className="zvDbB">SILVER MEMBER</div>
        <div className="zvDbC">
          <div className="zvDbCa">
            <div className="zvDbCaA" />
            <div className="zvDbCaB">32</div>
            <div className="zvDbCaC">Invoices</div>
          </div>
          <div />
          <div className="zvDbCa">
            <div className="zvDbCaA1" />
            <div className="zvDbCaB">32</div>
            <div className="zvDbCaC">Invoices</div>
          </div>
        </div>
        <div className="zvDbD">
          <div className="zvDbDa">EDIT CUSTOMER</div>
          <div className="zvDbDb">INVOICES</div>
          <div className="zvDbDb">STATEMENT</div>
          <div className="zvDbDb">RECORD PAYMENT</div>
        </div>
        <div className="zvDbE">BASIC INFORMATION</div>
        <div className="zvDbF">
          <div className="zvDbFa">Full name *</div>
          <input className="zvDbFb" />
          <div className="zvDbFa">Loyalty Tier</div>
          <select className="zvDbFb">
            <option>GOLD</option>
          </select>
          <div className="zvDbFa">Lead Channel</div>
          <input className="zvDbFb" />
        </div>
        <div className="zvDbE">CONTACT INFORMATION</div>
        <div className="zvDbF">
          <div className="zvDbFa">Mobile Number *</div>
          <input className="zvDbFb" />
          <div className="zvDbFa">Email Address</div>
          <input className="zvDbFb" />
        </div>
      </div>
      <div className="zvDc">
        <div className="zvDcA">CANCAL</div>
        <div className="zvDcB">SAVE</div>
      </div>
    </DrawerLayout2>
  );
}
