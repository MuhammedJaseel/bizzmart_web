import { StrictMode, useState } from "react";
import "../style/zf.css";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////           FORMS            ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyForm1() {
  const dummyProduct = {
    name: "",
    qty: "1",
    price: "0.0",
    discount: "0.0",
    tax: "",
    taxAmount: "0.0",
    total: "0.0",
  };
  let [items, setItems] = useState([dummyProduct]);
  return (
    <div className="zfB">
      <div className="zfBa">
        <div className="zfBaA">
          <div className="zfBaAa">
            <div className="zfBaAaA">Customer*</div>
            <select className="zfBaAaB">
              <option>Name</option>
            </select>
          </div>
          <div className="zfBaAa">
            <div className="zfBaAaA">Invoice Date*</div>
            <div className="zfBaAaC"></div>
          </div>
        </div>
        <div className="zfBaB">
          <div className="zfBaBa">Address</div>
          <div className="zfBaBb">
            Jack Dorsea, 102A, Jami’a Street, New Delhi 12, India. GST:
            AAA456AE3423AZ Phone: 974 523 6674
          </div>
        </div>
      </div>
      <div className="zfBb">
        <div className="zfBbA">
          <div className="zfBbAa" />
          <div className="zfBbAb">Product / Service</div>
          <div className="zfBbAc">Qty</div>
          <div className="zfBbAd">Price / Rate</div>
          <div className="zfBbAe">Discount</div>
          <div className="zfBbAf">Tax Slab</div>
          <div className="zfBbAg">Tax Amount</div>
          <div className="zfBbAh">Total</div>
        </div>
        {items.map((it, k) => (
          <form
            key={k}
            className="zfBbB"
            onChange={() => {
              if (items.length === k + 1) setItems([...items, dummyProduct]);
            }}
          >
            <div
              className="zfBbBa"
              onClick={() => {
                items.splice(k, 1);
                setItems(items);
              }}
            />
            <select className="zfBbBb">
              <option hidden selected>
                Select Product / Service ...
              </option>
              <option>APPLE iPHONE 13 PRO/128GB/BLACK</option>
            </select>
            <input className="zfBbBc" defaultValue={it.qty} />
            <input className="zfBbBd" />
            <input className="zfBbBe" />
            <select className="zfBbBf">
              <option>Tax Slab</option>
            </select>
            <div className="zfBbBg">Tax Amount</div>
            <div className="zfBbBh">Total</div>
          </form>
        ))}
      </div>
      <div className="zfBc">
        <div className="zfBcA">
          <div className="zfBcAa">Delivery Address</div>
          <textarea className="zfBcAb" placeholder="Address" />
          <div className="zfBcAa">Invoice Note</div>
          <textarea
            className="zfBcAc"
            placeholder="Enter invoice terms / notes here"
          />
        </div>
        <div className="zfBcB">
          <div className="zfBcBa">
            <div>Discount</div>
            <input className="zfBcBb" placeholder="0.0" />
          </div>
          <div className="zfBcBa">
            <div>Subtotal</div>
            <div>4,685.00</div>
          </div>
          <div className="zfBcBa">
            <div>Tax</div>
            <div>0.00</div>
          </div>
          <div className="zfBcBc">
            <div>Total</div>
            <div>4,685.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////        DROWER FORMS        ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DrawerLayout1({ show, body }) {
  return (
    <StrictMode>
      <div className={show ? "zfDa" : "zfDa_"}></div>
      <div className={show ? "zfDb" : "zfDb_"}>{body}</div>
    </StrictMode>
  );
}
export function DrawerForm1({ props }) {
  const { show, close } = props;
  const body = (
    <StrictMode>
      <div className="zfEa">
        <div className="zfEaA">NEW CUSTOMER</div>
        <div className="zfEaB" onClick={close} />
      </div>
      <div className="zfEb">
        <div className="zfEbA">
          <div className="zfEbAa"></div>
          <div className="zfEbAb_">Basic information</div>
          <div className="zfEbAb">Contact information</div>
          <div className="zfEbAb">Financial Information</div>
          <div className="zfEbAb">Delivery Information</div>
        </div>
        <div className="zfEbB">
          <div className="zfEbBa">BASIC INFORMATION</div>
          <div className="zfEbBb">
            <div className="zfEbBbA">Full name *</div>
            <input className="zfEbBbB" />
            <div className="zfEbBbA">Loyalty Tier</div>
            <input className="zfEbBbB" />
            <div className="zfEbBbA">Lead Channel</div>
            <input className="zfEbBbB" />
          </div>
          <div className="zfEbBa">CONTACT INFORMATION</div>
          <div className="zfEbBb">
            <div className="zfEbBbA">Mobile Number *</div>
            <input className="zfEbBbB" />
            <div className="zfEbBbA">Email Address</div>
            <input className="zfEbBbB" />
          </div>
          <div className="zfEbBa">FINANCIAL INFORMATION</div>
          <div className="zfEbBb">
            <div className="zfEbBbA">Mobile Number *</div>
            <input className="zfEbBbB" />
            <div className="zfEbBbA">Email Address</div>
            <input className="zfEbBbB" />
          </div>
          <div className="zfEbBa">ADDRESS INFORMATION</div>
          <div className="zfEbBb">
            <div className="zfEbBbA">Mobile Number *</div>
            <input className="zfEbBbB" />
            <div className="zfEbBbA">Email Address</div>
            <input className="zfEbBbB" />
          </div>
        </div>
      </div>
      <div className="zfEd">
        <div className="zfEdA">CANCEL</div>
        <div className="zfEdB">SAVE</div>
      </div>
    </StrictMode>
  );
  return <DrawerLayout1 body={body} show={show} />;
}
