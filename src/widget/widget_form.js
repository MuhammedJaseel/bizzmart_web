import { useState } from "react";
import "../style/zc1.css";
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
    <div className="zc1D">
      <div className="zc1Da">
        <div className="zc1DaA">
          <div className="zc1DaAa">
            <div className="zc1DaAaA">Customer*</div>
            <select className="zc1DaAaB">
              <option>Name</option>
            </select>
          </div>
          <div className="zc1DaAa">
            <div className="zc1DaAaA">Invoice Date*</div>
            <div className="zc1DaAaC"></div>
          </div>
        </div>
        <div className="zc1DaB">
          <div className="zc1DaBa">Address</div>
          <div className="zc1DaBb">
            Jack Dorsea, 102A, Jami’a Street, New Delhi 12, India. GST:
            AAA456AE3423AZ Phone: 974 523 6674
          </div>
        </div>
      </div>
      <div className="zc1Db">
        <div className="zc1DbA">
          <div className="zc1DbAa" />
          <div className="zc1DbAb">Product / Service</div>
          <div className="zc1DbAc">Qty</div>
          <div className="zc1DbAd">Price / Rate</div>
          <div className="zc1DbAe">Discount</div>
          <div className="zc1DbAf">Tax Slab</div>
          <div className="zc1DbAg">Tax Amount</div>
          <div className="zc1DbAh">Total</div>
        </div>
        {items.map((it, k) => (
          <form
            key={k}
            className="zc1DbB"
            onChange={() => {
              if (items.length === k + 1) setItems([...items, dummyProduct]);
            }}
          >
            <div
              className="zc1DbBa"
              onClick={() => {
                items.splice(k, 1);
                setItems(items);
              }}
            />
            <select className="zc1DbBb">
              <option hidden selected>
                Select Product / Service ...
              </option>
              <option>APPLE iPHONE 13 PRO/128GB/BLACK</option>
            </select>
            <input className="zc1DbBc" defaultValue={it.qty} />
            <input className="zc1DbBd" />
            <input className="zc1DbBe" />
            <select className="zc1DbBf">
              <option>Tax Slab</option>
            </select>
            <div className="zc1DbBg">Tax Amount</div>
            <div className="zc1DbBh">Total</div>
          </form>
        ))}
      </div>
      <div className="zc1Dc">
        <div className="zc1DcA">
          <div className="zc1DcAa">Delivery Address</div>
          <textarea className="zc1DcAb" placeholder="Address" />
          <div className="zc1DcAa">Invoice Note</div>
          <textarea
            className="zc1DcAc"
            placeholder="Enter invoice terms / notes here"
          />
        </div>
        <div className="zc1DcB">
          <div className="zc1DcBa">
            <div>Discount</div>
            <input className="zc1DcBb" placeholder="0.0" />
          </div>
          <div className="zc1DcBa">
            <div>Subtotal</div>
            <div>4,685.00</div>
          </div>
          <div className="zc1DcBa">
            <div>Tax</div>
            <div>0.00</div>
          </div>
          <div className="zc1DcBc">
            <div>Total</div>
            <div>4,685.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
