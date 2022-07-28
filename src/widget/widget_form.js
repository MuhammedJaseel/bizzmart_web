import { StrictMode, useState } from "react";
import "../style/zf.css";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////           FORMS            ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyForm1({ props }) {
  const { noHeader } = props;
  const typeSaves = [
    { title: "Save Invoice", fun: null },
    { title: "Save & Add New", fun: null },
    { title: "Save & Payment", fun: null },
  ];
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
  const [isDrower, setIsDrower] = useState(false);
  return (
    <div className="zfB">
      {noHeader ? null : (
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
              <input type="date" className="zfBaAaC" />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Due Date*</div>
              <input type="date" className="zfBaAaC" />
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
      )}
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
            <input type="number" className="zfBcBb" placeholder="0.0" />
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
      <div className="zfBd">
        <div className="zfBdA">
          <div className="zfBdAa">SAVE</div>
          {typeSaves !== null ? (
            <div className="zfBdAb" onClick={() => setIsDrower(!isDrower)} />
          ) : null}
          <div
            onClick={() => setIsDrower(!isDrower)}
            className={isDrower ? "zfBdAd_" : "zfBdAd"}
          />
          <div
            className={isDrower ? "zfBdAc_" : "zfBdAc"}
            onClick={() => setIsDrower(!isDrower)}
          >
            {typeSaves?.map((it, k) => (
              <div className="zfBdAe" onClick={it.fun}>
                {it.title}
              </div>
            ))}
          </div>
        </div>
        <div className="zfBdB">CANCEL</div>
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
  const { show, close, submit, loading, error, title, type } = props;
  const [selected, setSelected] = useState(0);
  const body = (
    <StrictMode>
      <div className="zfEa">
        <div className="zfEaA">{title}</div>
        <div className="zfEaB" onClick={close} />
      </div>
      <div className="zfEb">
        <div className="zfEbA">
          <div className="zfEbAa" />
          <div className={selected === 0 ? "zfEbAb_" : "zfEbAb"}>
            Basic information
          </div>
          {type !== "member" ? (
            <StrictMode>
              <div className={selected === 1 ? "zfEbAb_" : "zfEbAb"}>
                Contact information
              </div>
              <div className={selected === 2 ? "zfEbAb_" : "zfEbAb"}>
                Financial Information
              </div>
              <div className={selected === 3 ? "zfEbAb_" : "zfEbAb"}>
                Delivery Information
              </div>
            </StrictMode>
          ) : (
            <StrictMode>
              <div className={selected === 1 ? "zfEbAb_" : "zfEbAb"}>
                Financial Information
              </div>
              <div className={selected === 2 ? "zfEbAb_" : "zfEbAb"}>
                Ststem Information
              </div>
            </StrictMode>
          )}
        </div>
        <div className="zfEbB">
          <div className="zfEbBa">BASIC INFORMATION</div>
          <div className="zfEbBb">
            {type === "member" ? (
              <StrictMode>
                <div className="zfEbBbA">Full name *</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Enter customer full name"
                  id="name"
                />
                <div className="zfEbBbA">Mobile Number *</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  type="number"
                  placeholder="Enter customer mobile number"
                  id="phone"
                />
                <div className="zfEbBbA">Email Address</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Enter customer email address"
                  id="email"
                />
                <div className="zfEbBbA">Address</div>
                <textarea
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Enter customer’s default address"
                  id="address"
                />
              </StrictMode>
            ) : null}
            {type === "customer" ? (
              <StrictMode>
                <div className="zfEbBbA">Full name *</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Enter customer full name"
                  id="name"
                />
                <div className="zfEbBbA">Loyalty Tier</div>
                <select
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  id="loyality_tier"
                >
                  <option value="SILVER">SILVER</option>
                </select>
                <div className="zfEbBbA">Lead Channel</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Walk-In"
                  disabled
                />
              </StrictMode>
            ) : null}
            {type === "supplier" ? (
              <StrictMode>
                <div className="zfEbBbA">Supplier Name*</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Enter supplier name"
                  id="name"
                />
                <div className="zfEbBbA">Nickname / Contact Person</div>
                <select
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Supplier contact person name"
                  id="loyality_tier"
                />
                <div className="zfEbBbA">Supplier Type</div>
                <select
                  className="zfEbBbB"
                  onFocus={() => setSelected(0)}
                  placeholder="Distributor"
                  disabled
                />
              </StrictMode>
            ) : null}
          </div>
          {type !== "member" ? (
            <StrictMode>
              <div className="zfEbBa">CONTACT INFORMATION</div>
              <div className="zfEbBb">
                <div className="zfEbBbA">Mobile Number *</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(1)}
                  type="number"
                  placeholder="Enter customer mobile number"
                  id="phone"
                />
                <div className="zfEbBbA">Email Address</div>
                <input
                  className="zfEbBbB"
                  onFocus={() => setSelected(1)}
                  placeholder="Enter customer email address"
                  id="email"
                />
              </div>
              <div className="zfEbBa">FINANCIAL INFORMATION</div>
              <div className="zfEbBb">
                <div className="zfEbBbA">
                  <div className="zfEbBbAa">Opening Balance</div>
                  <div className="zfEbBbAa" />
                </div>
                <div className="zfEbBbB">
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    placeholder="0.00"
                    id="opening_balance"
                    type="number"
                  />
                  <div className="zfEbBbBb">
                    <div className="zfEbBbBbA_">To Recive</div>
                    <div className="zfEbBbBbA">To Pay</div>
                  </div>
                </div>
                <div className="zfEbBbA">
                  <div className="zfEbBbAa">Credit Limit</div>
                  <div className="zfEbBbAa">Credit Period</div>
                </div>
                <div className="zfEbBbB">
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    type="number"
                    placeholder="0.00"
                    id="credit_limit"
                  />
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    type="number"
                    placeholder="0"
                    id="credit_period"
                  />
                </div>
                <div className="zfEbBbA">
                  <div className="zfEbBbAa">GST Number</div>
                  <div className="zfEbBbAa">Place of Supply</div>
                </div>
                <div className="zfEbBbB">
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    id="gst_number"
                    placeholder="Enter GST number"
                  />
                  <select
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    id="place_of_supply"
                    placeholder="Place of supply"
                  />
                </div>
              </div>
              <div className="zfEbBa">ADDRESS INFORMATION</div>
              <div className="zfEbBb">
                <div className="zfEbBbA">Address</div>
                <textarea
                  className="zfEbBbB"
                  onFocus={() => setSelected(3)}
                  placeholder="Enter customer’s default address"
                  id="address"
                />
                <div className="zfEbBbA">
                  <div className="zfEbBbAa">PIN Code</div>
                  <div className="zfEbBbAa">State</div>
                </div>
                <div className="zfEbBbB">
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    type="number"
                    placeholder="PIN code"
                    id="pin_code"
                  />
                  <select
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    id="state"
                    //
                    //
                    //
                    //
                    //
                    // TODO: how i get states
                    //
                    //
                    //
                    //
                    //
                    //
                  />
                </div>
              </div>
            </StrictMode>
          ) : (
            <StrictMode>
              <div className="zfEbBa">FINANCIAL INFORMATION</div>
              <div className="zfEbBb">
                <div className="zfEbBbA">
                  <div className="zfEbBbAa">Salary*</div>
                  <div className="zfEbBbAa">Type*</div>
                </div>
                <div className="zfEbBbB">
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(1)}
                    id="gst_number"
                    placeholder="Enter GST number"
                  />
                  <select
                    className="zfEbBbBa"
                    onFocus={() => setSelected(1)}
                    id="place_of_supply"
                    placeholder="Place of supply"
                  />
                </div>
                <div className="zfEbBbA">
                  <div className="zfEbBbAa">Joining Date</div>
                  <div className="zfEbBbAa">Birth Date</div>
                </div>
                <div className="zfEbBbB">
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(1)}
                    type="date"
                    id="gst_number"
                    placeholder="Enter GST number"
                  />
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(1)}
                    type="date"
                    id="place_of_supply"
                    placeholder="Place of supply"
                  />
                </div>
              </div>
              <div className="zfEbBa">SYSTEM INFORMATION</div>
              <div className="zfEbBb">
                <div className="zfEbBbA">Role</div>
                <select
                  className="zfEbBbB"
                  onFocus={() => setSelected(2)}
                  type="number"
                  placeholder="Enter customer mobile number"
                  id="phone"
                >
                  <option hidden disabled>
                    Select Role
                  </option>
                </select>
                <div className="zfEbBbA" />
                <div className="zfEbBbB">
                  <FormSwitch />
                  <div className="zfEbBbBc">
                    <div>System User</div>
                    <div className="zfEbBbBcA">
                      Enable to set user credentials
                    </div>
                  </div>
                </div>
              </div>
            </StrictMode>
          )}
        </div>
      </div>
      <div className="zfEd">
        <div className="zfEdA">{error}</div>
        <div className="zfEdB" onClick={close}>
          CANCEL
        </div>
        <div className={loading ? "zfEdC_" : "zfEdC"} onClick={submit}>
          SAVE
        </div>
      </div>
    </StrictMode>
  );
  return <DrawerLayout1 body={body} show={show} />;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        ADDING FORM LAYOUT        ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function AddingFormLayout({ title, desc, children }) {
  return (
    <div className="zfG">
      <div className="zfGa">{title}</div>
      <div className="zfGb" />
      <div className="zfGc">
        <div className="zfGcA">{desc}</div>
        <div className="zfGcB">{children}</div>
      </div>
    </div>
  );
}
export function AddingFormLayout1({ title, desc, ic }) {
  return (
    <AddingFormLayout title={title} desc={desc}>
      <div className="zfH">
        <input className="zfHa" placeholder="Name" />
        <div className="zfHb">
          <div className="zfHbA" style={{ backgroundImage: `url(${ic})` }} />
          <div className="zfHbB">
            <div className="zfHbBa">UPLOAD EXCEL FILE</div>
            <div className="zfHbBb">
              Drop or click here to upload excel file here
            </div>
          </div>
        </div>
        <div className="zfHc">
          <div className="zfHcA"></div>
          <div className="zfHcB">Download sample template</div>
        </div>
      </div>
    </AddingFormLayout>
  );
}
export function AddingForm1({ title, children }) {
  return (
    <div className="zfJ">
      <div className="zfJa">{title}</div>
      <div className="zfJb">{children}</div>
    </div>
  );
}
export function AddingForm2({ children }) {
  return <div className="zfK">{children}</div>;
}
export function FormSwitch({ value, onTap }) {
  return (
    <div className={value ? "zfL" : "zfL_"} onClick={onTap}>
      <div className="zfLa" />
    </div>
  );
}
