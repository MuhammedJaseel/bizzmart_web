import { StrictMode, useRef, useState } from "react";
import "../style/zf.css";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////           FORMS            ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function MyForm1({ state, setState }) {
  const { form } = state;
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
  const [isDrower, setIsDrower] = useState(false);
  return (
    <div className="zfB">
      {form.formType === "invoice" || form.formType === "estimate" ? (
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
      ) : null}
      {form.formType === "estimate" ? <div className="zfBa"></div> : null}
      {form.formType !== "purchaseList" ? (
        <div className="zfBa">
          <div className="zfBaA">
            <div className="zfBaAa">
              <div className="zfBaAaA">Ref/PO#</div>
              <input className="zfBaAaC" id="invoice_number" />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Supplier Invoice #</div>
              <input className="zfBaAaC" id="supplier_invoice_no" />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Supplier*</div>
              <select className="zfBaAaB" id="supplier_id">
                <option>Name</option>
              </select>
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Purchase Date*</div>
              <input type="date" className="zfBaAaC" id="purchase_date" />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Due Date</div>
              <input className="zfBaAaC" />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Contact Person</div>
              <input className="zfBaAaC" />
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
      ) : null}
      <div className="zfBb">
        <div className="zfBbA">
          <div className="zfBbAa" />
          <div className="zfBbAb zfBbA_t">Product / Service</div>
          <div className="zfBbAc zfBbA_t">Qty</div>
          <div className="zfBbAd zfBbA_t">Price / Rate</div>
          <div className="zfBbAe zfBbA_t">Discount</div>
          <div className="zfBbAd zfBbA_t">Tax Slab</div>
          <div className="zfBbAg zfBbA_t">Tax Amount</div>
          <div className="zfBbAg zfBbA_t">Total</div>
        </div>
        {form?.items.map((it, k) => (
          <form key={k} className="zfBbB" onChange={() => {}}>
            <div className="zfBbAa zfBbA_d" onClick={() => {}} />
            <select
              className="zfBbAb zfBbA_d"
              onChange={(e) => {
                it.product_name = e.target.value;
              }}
            >
              <option hidden selected>
                Select Product / Service ...
              </option>
              <option>APPLE iPHONE 13 PRO/128GB/BLACK</option>
            </select>
            <input
              className="zfBbAc zfBbBa zfBbA_d"
              type="number"
              onChange={(e) => (it.quantity = e.target.value)}
            />
            <input
              className="zfBbAd zfBbA_d"
              type="number"
              onChange={(e) => (it.price = e.target.value)}
            />
            <input
              className="zfBbAe zfBbA_d"
              type="number"
              onChange={(e) => (it.discount_amount = e.target.value)}
            />
            <select className="zfBbAd zfBbA_d">
              <option>Tax Slab</option>
            </select>
            <div className="zfBbAg zfBbA_d">Tax Amount</div>
            <div className="zfBbAg zfBbA_d">Total</div>
          </form>
        ))}
      </div>
      <div className="zfBc">
        {true ? (
          <div className="zfBcA">
            <div className="zfBcAa">Delivery Address</div>
            <textarea className="zfBcAb" placeholder="Address" />
            <div className="zfBcAa">Purchase Note</div>
            <textarea
              className="zfBcAc"
              placeholder="Enter invoice terms / notes here"
            />
          </div>
        ) : null}
        <div className="zfBcB">
          <div className="zfBcBa">
            <div>Discount</div>
            <input
              type="number"
              id="discount"
              className="zfBcBb"
              placeholder="0.0"
            />
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
  const { show, close, submit, loading, error, title, type, setToPay } = props;
  const { allPlaceofSupplay, allStates, allLoyaltyType, allSupplierType } =
    props;
  const [selected, setSelected] = useState(0);
  const [isToPay, setIsToPay] = useState(false);
  const [image, setImage] = useState(null);
  const refForKey = useRef(null);
  const body = (
    <StrictMode>
      <div className="zfEa">
        <div className="zfEaA">{title}</div>
        <div
          className="zfEaB"
          onClick={() => {
            close();
            setImage(null);
          }}
        />
      </div>
      <div className="zfEb">
        <div className="zfEbA">
          <div className="zfEbAa">
            {image !== null ? (
              <img className="zfEbAaA" src={URL.createObjectURL(image)} />
            ) : (
              <div className="zfEbAaA" />
            )}
            <div className="zfEbAaB" onClick={() => refForKey.current.click()}>
              <div className="zfEbAaBa"></div>
            </div>
            <input
              ref={refForKey}
              type="file"
              id="image"
              className="zfEbAaC"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
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
          {false ? (
            <div className={selected === 4 ? "zfEbAb_" : "zfEbAb"}>
              Access Information
            </div>
          ) : null}
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
                  <option hidden>Select Loyelty</option>
                  {allLoyaltyType.map((it, k) => (
                    <option key={k} value={it.title}>
                      {it.title}
                    </option>
                  ))}
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
                <input
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
                >
                  {allSupplierType.map((it, k) => (
                    <option value={it.title}>{it.title}</option>
                  ))}
                </select>
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
                  <div className="iamInputPrfix">INR</div>
                  <div
                    className="zfEbBbBb"
                    onClick={() => {
                      setIsToPay(!isToPay);
                      setToPay(!isToPay);
                    }}
                  >
                    <div className={!isToPay ? "zfEbBbBbA_" : "zfEbBbBbA"}>
                      To Recive
                    </div>
                    <div className={isToPay ? "zfEbBbBbA__" : "zfEbBbBbA"}>
                      To Pay
                    </div>
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
                  <div className="iamInputPrfix">INR</div>
                  <input
                    className="zfEbBbBa"
                    onFocus={() => setSelected(2)}
                    type="number"
                    placeholder="0"
                    id="credit_period"
                  />
                  <div className="iamInputPrfix">DAY</div>
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
                  >
                    {allPlaceofSupplay?.map((it, k) => (
                      <option key={k} value={it.state_name}>
                        {it.state_name}
                      </option>
                    ))}
                  </select>
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
                    id="state_id"
                  >
                    {allStates?.map((it, k) => (
                      <option key={k} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
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
                {false ? (
                  <StrictMode>
                    <div className="zfEbBbA">User ID*</div>
                    <input
                      className="zfEbBbB"
                      onFocus={() => setSelected(1)}
                      placeholder="Enter user ID"
                      id="number"
                    />
                    <div className="zfEbBbA">
                      <div className="zfEbBbAa">Password*</div>
                      <div className="zfEbBbAa">PIN*</div>
                    </div>
                    <div className="zfEbBbB">
                      <input
                        className="zfEbBbBa"
                        onFocus={() => setSelected(1)}
                        type="password"
                        id="gst_number"
                        placeholder="Password"
                      />
                      <input
                        className="zfEbBbBa"
                        onFocus={() => setSelected(1)}
                        type="password"
                        id="place_of_supply"
                        placeholder="PinCode"
                      />
                    </div>
                  </StrictMode>
                ) : null}
              </div>
            </StrictMode>
          )}
          {false ? (
            <StrictMode>
              <div className="zfEbBa">ACCES INFORMATION</div>
              <br />
              <div className="zfEbBc">
                Head office System (HoS)
                <select
                  onFocus={() => setSelected(4)}
                  className="zfEbBcB"
                ></select>
              </div>
              <div className="zfEbBc">
                Back office System (BoS)
                <select
                  onFocus={() => setSelected(4)}
                  className="zfEbBcB"
                ></select>
              </div>
              <div className="zfEbBc">
                Point of Sale (PoS)
                <select
                  onFocus={() => setSelected(4)}
                  className="zfEbBcB"
                ></select>
              </div>
              <div className="zfEbBc">
                Mobile Reporting
                <select
                  onFocus={() => setSelected(4)}
                  className="zfEbBcB"
                ></select>
              </div>
              <div className="zfEbBc">
                Runner App
                <select
                  onFocus={() => setSelected(4)}
                  className="zfEbBcB"
                ></select>
              </div>
              <div className="zfEbBc">
                Scanner App
                <select
                  onFocus={() => setSelected(4)}
                  className="zfEbBcB"
                ></select>
              </div>
              <br />
              <br />
            </StrictMode>
          ) : null}
        </div>
      </div>
      <div className="zfEd">
        <div className="zfEdA">{error}</div>
        <div
          className="zfEdB"
          onClick={() => {
            close();
            setImage(null);
          }}
        >
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
export function AddingFormLayout2({ t1, t2, t3, setImg }) {
  const refForKey = useRef(null);
  const [image, setImage] = useState(null);
  return (
    <div className="zfM">
      <div className="zfMa" onClick={() => refForKey.current.click()}>
        <div className="zfMaA">{t1}</div>
        <div className="zfMaB">{t2}</div>
        <div className="zfMaC">{t3}</div>
      </div>
      {image !== null ? (
        <div className="zfMb">
          <img className="zfMbA" src={URL.createObjectURL(image)} />
          <div
            className="zfMbB"
            onClick={() => {
              setImage(null);
              setImg(null);
            }}
          />
        </div>
      ) : null}
      <input
        ref={refForKey}
        type="file"
        className="zfMc"
        onChange={(e) => {
          if (e.target.files[0].type.split("/")[0] === "image") {
            setImage(e.target.files[0]);
            setImg(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
