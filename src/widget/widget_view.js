import { StrictMode, useRef, useState } from "react";
import { postSalesPaymentRecord } from "../method/home_sales";
import { addNumberList } from "../module/simple";
import "../style/zv.css";
import { DatePicker } from "./widgets/calender";

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

export default function DrawerView1({ state, setState, expence }) {
  const { selected, allPaymentMethod, addPaymentRecord, error } = state;
  return (
    <DrawerLayout1 show={selected !== null}>
      <div className="zvBa">
        <div className="zvBaA">
          <div className="zvBaAa">{selected?.invoice_no}</div>
          {selected?.balance_amount > 0 ? (
            <div className="zvBaAb" style={{ background: "orange" }}>
              PARTIALLY PAID
            </div>
          ) : (
            <div className="zvBaAb">PAID </div>
          )}
        </div>
        <div className="zvBaB" onClick={() => setState({ selected: null })} />
      </div>
      <div className="zvB-body">
        <div className="zvBb">
          <div className="zvBbA">
            {!expence ? <div className="zvBbAa">To</div> : null}
            <div className="zvBbAb">
              <div className="zvBbAbA">
                {selected?.customer_name || selected?.expense_head_name}
              </div>
              <div className="zvBbAbb">{selected?.customer_address}</div>
            </div>
          </div>
          <div className="zvBbB">
            <div className="zvBbBa">
              <div className="zvBbBaA">Invoice Date:</div>
              <div className="zvBbBaB">
                {selected?.invoice_date?.slice(0, 10) ||
                  selected?.payment_date?.slice(0, 10)}
              </div>
            </div>
            <br />
            <div className="zvBbBa">
              <div className="zvBbBaA">Due Date:</div>
              <div className="zvBbBaB">
                {selected?.due_date?.slice(0, 10) ||
                  selected?.date?.slice(0, 10)}
              </div>
            </div>
          </div>
        </div>
        <div className="zvBc">
          <div className="zvBcA">Product</div>
          <div className="zvBcB">Qty</div>
          <div className="zvBcC">Price</div>
          {!expence ? <div className="zvBcD">Discount</div> : null}
          <div className="zvBcE">Tax Slab</div>
          <div className="zvBcF">Tax Amount</div>
          <div className="zvBcG">Total</div>
        </div>
        {selected?.items?.map((it, k) => (
          <div className="zvBc_" key={k}>
            <div className="zvBcA">{it.product || it.item_name}</div>
            <div className="zvBcB">{it.qty || it.quantity}</div>
            <div className="zvBcC">{it.price || it.rate}</div>
            {!expence ? <div className="zvBcD">{it.discount}</div> : null}
            <div className="zvBcE">{it.tax_type}</div>
            <div className="zvBcF">{it.tax_amount}</div>
            <div className="zvBcG">
              {it.total ||
                Number(it.quantity) * Number(it.rate) + Number(it.tax_amount)}
            </div>
          </div>
        ))}
        <div className="zvBd">
          <div>
            <div className="zvBdA" style={{ display: "flex" }}>
              <div>
                <div className="zvBdAa">
                  Amount {!expence ? "Received" : "Spent"}
                </div>
                <div className="zvBdAb">
                  {selected?.received_amount || selected?.total_amount}
                </div>
              </div>
              <div>
                <div className="zvBdAa">Amount Outstanding</div>
                <div className="zvBdAb">{selected?.balance_amount}</div>
              </div>
            </div>
            {selected?.payment_decription?.map((it, k) => (
              <div className="zvBdAc" style={{ paddingTop: ".3vw" }} key={k}>
                {it}
              </div>
            ))}
          </div>
          <div className="zvBdB">
            <div className="zvBdBc">
              <div className="zvBdBcA">Subtotal:</div>
              <div className="zvBdBcB">
                {!expence
                  ? selected?.total_amount - selected?.CGST - selected?.SCGST
                  : selected?.total_amount}
              </div>
            </div>
            {!expence ? (
              <StrictMode>
                <div className="zvBdBd">Tax Breakdown</div>
                <div className="zvBdBe">
                  <div className="zvBdBeA">SGST</div>
                  <div className="zvBdBeB">{selected?.SCGST}</div>
                </div>
                <div className="zvBdBe">
                  <div className="zvBdBeA">CGST</div>
                  <div className="zvBdBeB">{selected?.CGST}</div>
                </div>
              </StrictMode>
            ) : null}
            <div className="zvBdBf">
              <div>
                <div className="zvBdBfAa">Total:</div>
                <div className="zvBdBfAb">{selected?.items?.length} Items</div>
              </div>
              <div className="zvBdBfB">{selected?.total_amount}</div>
            </div>
          </div>
        </div>
        {!expence ? (
          <div className="zvBe">
            <div className="zvBeA">Record Payment</div>
            <form
              className="zvBeB"
              onSubmit={(e) => postSalesPaymentRecord(e, state, setState)}
              onChange={(e) => setState(addPaymentRecord)}
            >
              <div className="zvBeBc">
                <div className="zvBeBcA">
                  <div className="zvBeBcAa">Amount Outstanding</div>
                  <div className="zvBeBcAb">{selected?.balance_amount}</div>
                </div>
                <div className="zvBeBcB">
                  <div className="zvBeBcBa">Amount received</div>
                  <input
                    placeholder="0.0"
                    className="zvBeBcBb"
                    id="amount"
                    value={addPaymentRecord?.amount || ""}
                    onChange={(e) => {
                      if (e.target.value > Number(selected?.balance_amount))
                        e.target.value = Number(selected?.balance_amount);
                      addPaymentRecord.amount = e.target.value;
                    }}
                    type="number"
                  />
                </div>
                <div className="zvBeBcB">
                  <div className="zvBeBcBa">Payment Method</div>
                  <select
                    placeholder="0.0"
                    className="zvBeBcBb"
                    onChange={(e) => {
                      addPaymentRecord.payment_id = e.target.value;
                      addPaymentRecord.paymemt_method_name =
                        allPaymentMethod.filter(
                          (it1) => it1.id.toString() === e.target.value
                        )[0]?.name;
                    }}
                    defaultValue={addPaymentRecord?.patment_methord_id || ""}
                  >
                    <option hidden>Select payment method</option>
                    {allPaymentMethod?.map((it, k) => (
                      <option key={k} value={it.id}>
                        {it.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="zvBeBcB">
                  <div className="zvBeBcBa">Reference</div>
                  <input
                    placeholder="Enter reference / note"
                    className="zvBeBcBb"
                    onChange={(e) =>
                      (addPaymentRecord.reference = e.target.value)
                    }
                    value={addPaymentRecord?.reference || ""}
                  />
                </div>
              </div>
              <div className="zvBeBd">
                <div className="imaError">{error}</div> &nbsp;
                {/* <div
                className="zvBeBdA"
                onClick={() => setState({ addPaymentRecord: {} })}
              >
                CANCEL
              </div> */}
                <button className="zvBeBdB" type="submit">
                  SAVE
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
      <div className="zvBf">
        <div className="zvBfA">
          <div className="zvBfAa" />
        </div>
        <div className="zvBfB" onClick={() => setState({ selected: null })}>
          OK
        </div>
      </div>
    </DrawerLayout1>
  );
}

export function DrawerViewPurchase({ state, setState }) {
  const { selected, allPaymentMethod, addPaymentRecord, error } = state;
  return (
    <DrawerLayout1 show={selected !== null}>
      <div className="zvBa">
        <div className="zvBaA">
          <div className="zvBaAa">{selected?.invoice_no}</div>
          {selected?.balance_amount > 0 ? (
            <div className="zvBaAb" style={{ background: "orange" }}>
              PARTIALLY PAID
            </div>
          ) : (
            <div className="zvBaAb">PAID </div>
          )}
        </div>
        <div className="zvBaB" onClick={() => setState({ selected: null })} />
      </div>
      <div className="zvB-body">
        <div className="zvBb">
          <div className="zvBbA">
            <div className="zvBbAa">From</div>
            <div className="zvBbAb">
              <div className="zvBbAbA">{selected?.customer_name}</div>
              <div className="zvBbAbb">{selected?.from_address}</div>
            </div>
          </div>
          <div className="zvBbB">
            <div className="zvBbBa">
              <div className="zvBbBaA">Invoice Date:</div>
              <div className="zvBbBaB">{selected?.invoice_date}</div>
            </div>
            <br />
            <div className="zvBbBa">
              <div className="zvBbBaA">Due Date:</div>
              <div className="zvBbBaB">{selected?.due_date}</div>
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
        {selected?.items?.map((it, k) => (
          <div className="zvBc_" key={k}>
            <div className="zvBcA">{it.product}</div>
            <div className="zvBcB">{it.qty}</div>
            <div className="zvBcC">{it.price}</div>
            <div className="zvBcD">{it.discount}</div>
            <div className="zvBcE">{it.tax_type}</div>
            <div className="zvBcF">{it.tax_amount}</div>
            <div className="zvBcG">{it.total}</div>
          </div>
        ))}
        <div className="zvBd">
          <div>
            <div className="zvBdA" style={{ display: "flex" }}>
              <div>
                <div className="zvBdAa">Amount Received</div>
                <div className="zvBdAb">{selected?.received_amount}</div>
              </div>
              <div>
                <div className="zvBdAa">Amount Outstanding</div>
                <div className="zvBdAb">{selected?.balance_amount}</div>
              </div>
            </div>
            {selected?.payment_decription?.map((it, k) => (
              <div className="zvBdAc" style={{ paddingTop: ".3vw" }} key={k}>
                {it}
              </div>
            ))}
          </div>
          <div className="zvBdB">
            <div className="zvBdBc">
              <div className="zvBdBcA">Subtotal:</div>
              <div className="zvBdBcB">
                {Math.round(
                  selected?.total_amount - selected?.CGST - selected?.SCGST
                )}
              </div>
            </div>
            <div className="zvBdBd">Tax Breakdown</div>
            <div className="zvBdBe">
              <div className="zvBdBeA">SGST</div>
              <div className="zvBdBeB">{selected?.SCGST}</div>
            </div>
            <div className="zvBdBe">
              <div className="zvBdBeA">CGST</div>
              <div className="zvBdBeB">{selected?.CGST}</div>
            </div>
            <div className="zvBdBf">
              <div>
                <div className="zvBdBfAa">Total:</div>
                <div className="zvBdBfAb">{selected?.items?.length} Items</div>
              </div>
              <div className="zvBdBfB">{selected?.total_amount}</div>
            </div>
          </div>
        </div>
        <div className="zvBe">
          <div className="zvBeA">Record Payment</div>
          <form
            className="zvBeB"
            onSubmit={(e) => postSalesPaymentRecord(e, state, setState)}
            onChange={(e) => setState(addPaymentRecord)}
          >
            <div className="zvBeBc">
              <div className="zvBeBcA">
                <div className="zvBeBcBa">Amount paying</div>
                <input
                  placeholder="0.0"
                  className="zvBeBcBb"
                  id="amount"
                  value={addPaymentRecord?.amount || ""}
                  onChange={(e) => {
                    if (e.target.value > Number(selected?.balance_amount))
                      e.target.value = Number(selected?.balance_amount);
                    addPaymentRecord.amount = e.target.value;
                  }}
                  type="number"
                />
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Account *</div>
                <select
                  placeholder="0.0"
                  className="zvBeBcBb"
                  onChange={(e) => {
                    addPaymentRecord.payment_id = e.target.value;
                    addPaymentRecord.paymemt_method_name =
                      allPaymentMethod.filter(
                        (it1) => it1.id.toString() === e.target.value
                      )[0]?.name;
                  }}
                  defaultValue={addPaymentRecord?.patment_methord_id || ""}
                >
                  <option hidden>Select payment method</option>
                  {allPaymentMethod?.map((it, k) => (
                    <option key={k} value={it.id}>
                      {it.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Payment Mode *</div>
                <select
                  placeholder="0.0"
                  className="zvBeBcBb"
                  onChange={(e) => {
                    addPaymentRecord.payment_id = e.target.value;
                    addPaymentRecord.paymemt_method_name =
                      allPaymentMethod.filter(
                        (it1) => it1.id.toString() === e.target.value
                      )[0]?.name;
                  }}
                  defaultValue={addPaymentRecord?.patment_methord_id || ""}
                >
                  <option hidden>Select payment method</option>
                  {allPaymentMethod?.map((it, k) => (
                    <option key={k} value={it.id}>
                      {it.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Payment Due</div>
                <input
                  placeholder="Enter reference / note"
                  className="zvBeBcBb"
                  type="date"
                  onChange={(e) =>
                    (addPaymentRecord.reference = e.target.value)
                  }
                  value={addPaymentRecord?.reference || ""}
                />
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Reference</div>
                <input
                  placeholder="Enter reference / note"
                  className="zvBeBcBb"
                  onChange={(e) =>
                    (addPaymentRecord.reference = e.target.value)
                  }
                  value={addPaymentRecord?.reference || ""}
                />
              </div>
            </div>
            <div className="zvBeBd">
              <div className="imaError">{error}</div> &nbsp;
              {/* <div
                className="zvBeBdA"
                onClick={() => setState({ addPaymentRecord: {} })}
              >
                CANCEL
              </div> */}
              <button className="zvBeBdB" type="submit">
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="zvBf">
        <div className="zvBfA">
          <div className="zvBfAa" />
        </div>
        <div className="zvBfB" onClick={() => setState({ selected: null })}>
          OK
        </div>
      </div>
    </DrawerLayout1>
  );
}

export function DrowerView2({ props }) {
  const { show, close, item, error, loading, type, setPaymentMethord } = props;
  const { allPlaceofSupplay, allStates, allLoyaltyType, getItem } = props;
  const { reduceCreditOneByOne } = props;
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
              <img
                className="zvDbAaA"
                alt="Pic"
                src={URL.createObjectURL(image)}
              />
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
              <input className="zvDbFb" value={item.name} id="name" />
              <div className="zvDbFa">Loyalty Tier</div>
              <select
                className="zvDbFb"
                value={item.loyalty_tire}
                id="loyalty_tire"
              >
                <option hidden>Select Loyelty</option>
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
                    value={item.create_from}
                    disabled
                  />
                </StrictMode>
              ) : null}
            </div>
            <div className="zvDbE">CONTACT INFORMATION</div>
            <div className="zvDbF">
              <div className="zvDbFa">Mobile Number *</div>
              <input className="zvDbFb" value={item.phone} id="phone" />
              <div className="zvDbFa">Email Address</div>
              <input className="zvDbFb" value={item.email} id="email" />
            </div>
            <div className="zvDbE">FINANCIAL INFORMATION</div>
            <div className="zvDbF">
              <div className="zvDbFc">
                <div className="zvDbFd">
                  <div className="zvDbFa">Credit Limit</div>
                  <div className="row">
                    <input
                      className="zvDbFb"
                      value={item.credit_limit}
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
                      value={item.credit_period}
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
                    value={item.gst_number}
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
              <textarea className="zvDbFb" value={item.address} id="address" />
              <div className="zvDbFc">
                <div className="zvDbFd">
                  <div className="zvDbFa">PIN Code</div>
                  <input className="zvDbFb" value={item.phone} id="phone" />
                </div>
                <div className="zvDbFd">
                  <div className="zvDbFa">State</div>
                  <select
                    className="zvDbFb"
                    id="state_id"
                    value={item.state_id}
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
            <DatePicker onChange={getItem} />
            {item?.invoiceList?.map((it, k) => (
              <StrictMode key={k}>
                <div className="zvDbHb">{it.date}</div>
                <div className="zvDbHc">
                  <div className="zvDbHcA">
                    <div className="zvDbHcAa">{it.total_amount}</div>
                    <div className="zvDbHcAb">{it.invoice_no}</div>
                  </div>
                  {it.credit > 0 ? (
                    <div className="zvDbHcB">
                      <div className="zvDbHcBa">CREDIT</div>
                      <div className="zvDbHcBb">{it.credit}</div>
                    </div>
                  ) : null}
                  <div className="zvDbHcC">
                    <div className="zvDbHcCa">RECEIPT</div>
                    <div className="zvDbHcCb">{it.paid}</div>
                  </div>
                </div>
              </StrictMode>
            ))}
          </StrictMode>
        ) : null}
        {item !== null && page === 2 ? (
          <StrictMode>
            <DatePicker onChange={getItem} />
            <div className="zvDbIa">
              <div className="zvDbIaA">Date</div>
              <div className="zvDbIaA">Reference</div>
              <div className="zvDbIaB">Amount</div>
              <div className="zvDbIaB">Payment</div>
              <div className="zvDbIaB">Balance</div>
            </div>
            {item?.statmentList?.map((it, k) => (
              <div className="zvDbIb" key={k}>
                <div className="zvDbIaA">{it?.date}</div>
                <div className="zvDbIaA">{it?.reference}</div>
                <div className="zvDbIaB">{it?.to_pay}</div>
                <div className="zvDbIaB">{it?.payment}</div>
                <div className="zvDbIaB">{it?.current_balance}</div>
              </div>
            ))}
          </StrictMode>
        ) : null}
        {item !== null && page === 3 ? (
          <StrictMode>
            {/* MULTIPLE PAYMENT RECORD */}
            <div className="zvDbJa">
              <div className="zvDbJaA">{item?.paymentRecord?.balance}</div>
              <div className="zvDbJaB">
                <div className="zvDbJaBa">You will get</div>
              </div>
              <div className="zvDbJaC">
                <div className="zvDbJaCa">Amount Received *</div>
                <div className="zvDbJaCa">Balance Amount</div>
              </div>
              <div className="zvDbJaC">
                <input
                  className="zvDbJaCa"
                  placeholder="0.00"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value > item?.paymentRecord?.balance)
                      e.target.value = item?.paymentRecord?.balance;
                    reduceCreditOneByOne(e.target.value);
                  }}
                />
                <input
                  className="zvDbJaCa"
                  placeholder="0.00"
                  type="number"
                  disabled
                  value={addNumberList(item?.paymentRecord?.orders, "credit")}
                />
              </div>
              <div className="zvDbJaE">Note</div>
              <input
                className="zvDbJaF"
                placeholder="Enter a note against this transaction"
                onChange={(e) => (item.paymentRecord.note = e.target.value)}
              />
              <div className="zvDbJaE">Payment Method *</div>
              <div className="zvDbJaH">
                {item?.paymentList.map((it, k) => (
                  <div
                    key={k}
                    onClick={() => setPaymentMethord(it.id)}
                    className={
                      it.id === item?.paymentRecord?.payment_method_id
                        ? "zvDbJaHa"
                        : "zvDbJaHb"
                    }
                  >
                    {it.name}
                  </div>
                ))}
              </div>
            </div>
            {item?.paymentRecord?.orders?.map((it, k) => (
              <div key={k} className="zvDbJb">
                <div
                  className="zvDbJbA"
                  style={it.redused ? {} : { backgroundImage: "none" }}
                />
                <div className="zvDbJbB">
                  <div className="zvDbJbBa">{it.invoice_no}</div>
                  <div>{it.date}</div>
                  <div>{it.total_amount}</div>
                </div>
                <div className="zvDbJbC">
                  <div className="zvDbJbCa">{it.credit_due_date}</div>
                </div>
                <div className="zvDbJbD">
                  <div>&nbsp;</div>
                  <div>Received:</div>
                  <div className="zvDbJbDb">Balance:</div>
                </div>
                <div className="zvDbJbE">
                  <div className="zvDbJbEa">{it.credit}</div>
                  <div>{it.total_amount - it.credit}</div>
                  <div className="zvDbJbEa">{it.credit}</div>
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
        <button
          type="submit"
          className={loading ? "zvDcC_" : "zvDcC"}
          id={page}
        >
          {page === 1 || page === 2 ? "OK" : "SAVE"}
        </button>
      </div>
    </DrawerLayout2>
  );
}
