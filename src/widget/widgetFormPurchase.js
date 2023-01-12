import { StrictMode, useState } from "react";
import { getSingleProdect, postPurchaseList } from "../method/homePurchase";
import { salesSearchProduct } from "../method/home_sales";
import { WidgetInputSelect } from "./widget";
import "../style/zf.css";
import { calculatePurchaseTax } from "../module/homePurchase";

export const newPurchaseStructure = {
  // invoice_number: null,
  purchase_order_id: null,
  purchase_order_invoice_no: null,
  due_in: null,
  supplier_phone: null,
  account_id: null,
  account_name: null,
  additional_charges: [],
  // /////////////////
  supplier_invoice_no: "",
  purchase_date: "",
  due_date: "",
  supplier_id: "",
  supplier_name: "",
  cashier_id: "",
  cashier_name: "", //Logined person name and I
  discount: 0,
  round_off: 0,
  paid: 0,
  total_amount: 0,
  notes: "",
  balance_amount: 0,
  delivery_address: "",
  items: [
    {
      product_id: "",
      product_name: "",
      quantity: 0,
      price: 0,
      discount_percent: 0, // Calculate discount persentage
      discount_amount: 0,
      tax_id: "",
      tax_rate: 0,
      tax_amount: 0,
      SCGST: 0,
      CGST: 0,
      CESS: 0,
      total_price: 0,
      unit_name: "", // Primery unit
      unit_converion: 0,
      stock: 0, // quantity
      stock_tax: 0, // Total Tax
      cost_with_tax: 0, // Price + Tax
      stock_price: 0, // Purchase price
    },
  ],
};

export function FormNewPurchase({ state, setState }) {
  const { form, addPayment, error } = state;
  const { allTax, allSuppliers } = state;
  const typeSaves = [
    {
      title: "Save Invoice",
      fun: () => postPurchaseList("save", state, setState),
    },
    {
      title: "Save & Add New",
      fun: () => postPurchaseList("addnew", state, setState),
    },
    {
      title: "Save & Payment",
      fun: () => postPurchaseList("payment", state, setState),
    },
  ];

  const [isDrower, setIsDrower] = useState(false);
  return (
    <div className="zfB">
      <form onChange={() => setState(form)}>
        <div className="zfBa">
          <div className="zfBaA">
            {/* <div className="zfBaAa">
                <div className="zfBaAaA">Ref/PO#</div>
                <input
                  className="zfBaAaC"
                  disabled
                  id="invoice_number"
                  value={lastInvoice}
                />
              </div> */}
            <div className="zfBaAa">
              <div className="zfBaAaA">Supplier Invoice #</div>
              <input
                className="zfBaAaC"
                value={form?.supplier_invoice_no}
                onChange={(e) => (form.supplier_invoice_no = e.target.value)}
              />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Supplier*</div>
              <select
                className="zfBaAaB"
                value={form?.supplier_id}
                onChange={(e) => {
                  form.supplier_id = e.target.value;
                  form.supplier_name = allSuppliers.filter(
                    (it) => it.id.toString() === e.target.value
                  )[0]?.name;
                  form.supplier_address = allSuppliers.filter(
                    (it) => it.id.toString() === e.target.value
                  )[0]?.address;
                  console.log(form);
                }}
              >
                <option hidden>Select Supplier</option>
                {allSuppliers?.map((it, k) => (
                  <option key={k} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Purchase Date*</div>
              <input
                type="date"
                value={form?.purchase_date}
                className="zfBaAaC"
                onChange={(e) => (form.purchase_date = e.target.value)}
              />
            </div>
            <div className="zfBaAa">
              <div className="zfBaAaA">Due Date</div>
              <input
                type="date"
                value={form?.due_date}
                className="zfBaAaC"
                onChange={(e) => (form.due_date = e.target.value)}
              />
            </div>
            {/* <div className="zfBaAa">
              <div className="zfBaAaA">Contact Person</div>
              <input className="zfBaAaC" />
            </div> */}
          </div>
          <div className="zfBaB">
            <div className="zfBaBa">Address</div>
            <div className="zfBaBb">{form.supplier_address}</div>
          </div>
        </div>
      </form>
      <div className="zfBb">
        <div className="zfBbA">
          <div className="zfBbAa" />
          <StrictMode>
            <div className="zfBbAb zfBbA_t">Product / Service</div>
            <div className="zfBbAc zfBbA_t">Qty</div>
            <div className="zfBbAd zfBbA_t">Price / Rate</div>
            <div className="zfBbAe zfBbA_t">Discount</div>
            <div className="zfBbAd zfBbA_t">Tax Slab</div>
            <div className="zfBbAg zfBbA_t">Tax Amount</div>
            <div className="zfBbAg zfBbA_t">Total</div>
          </StrictMode>
        </div>
        {(form?.items || [])?.map((it, k) => (
          <form
            key={k}
            className="zfBbB"
            onChange={() => {
              setState({ form });
              calculatePurchaseTax(it, state, setState);
            }}
          >
            <div
              className="zfBbAa zfBbA_d zfBbAa_"
              onClick={() => {
                if ((form?.items || []).length !== k) {
                  form.items.splice(k, 1);
                  setState(form);
                }
              }}
            />
            <StrictMode>
              <WidgetInputSelect
                className="zfBbAb zfBbA_d"
                props={{
                  onChange: async (e) => {
                    await salesSearchProduct(
                      e.target.value,
                      (v) => (it.list = v)
                    );
                    setState({ form });
                  },
                  list: it?.list || [],
                  clearlist: () => {
                    it.list = [];
                    setState({ form });
                  },
                  setValue: (v) => {
                    getSingleProdect(it.list[k].id).then((res) => {
                      it.product_id = res.data.id;
                      it.name = res.data.name;
                      it.unit_name = res.data.primary_unit;
                      it.unit_converion = res.data.conversion;
                      it.tax_type = res.data.tax_inclusion;
                      it.tax_id = res.data.selling_tax.toString();
                      it.quantity = 1;
                      it.stock = 1;
                      it.discount_amount = 0;
                      it.rate = res.data.purchase_price;
                      // it.stock_price = res.data.purchase_price;

                      calculatePurchaseTax(it, state, setState);
                      if (k + 1 === form.items.length)
                        form.items.push(
                          JSON.parse(
                            JSON.stringify(newPurchaseStructure.items[0])
                          )
                        );
                      setState(form);
                    });
                  },
                  placeholder: "Search your product",
                }}
              />
              <input
                className="zfBbAc zfBbBa zfBbA_d"
                type="number"
                onChange={(e) => {
                  it.quantity = e.target.value;
                  it.stock = e.target.value;
                }}
                placeholder="00"
                value={it.quantity}
              />
              <input
                className="zfBbAd zfBbA_d"
                type="number"
                onChange={(e) => {
                  it.price = e.target.value;
                  it.stock_price = e.target.value;
                }}
                value={it.price}
                placeholder="0.0"
              />
              <input
                className="zfBbAd zfBbA_d"
                placeholder="0.00"
                onChange={(e) => (it.discount_amount = e.target.value)}
                type="number"
                value={it.discount_amount}
              />
              <select
                className="zfBbAd zfBbA_d"
                value={it.tax_id}
                onChange={(e) => (it.tax_id = e.target.value)}
              >
                <option>Tax Slab</option>
                {allTax.map((it, k) => (
                  <option key={k} value={it.id}>
                    {it.name}
                  </option>
                ))}
              </select>
              <div className="zfBbAg zfBbA_d">{it?.tax_amount}</div>
              <div className="zfBbAg zfBbA_d">{it?.taxTotal}</div>
            </StrictMode>
          </form>
        ))}
      </div>
      {/* ///////////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////////////////////////////// */}

      <StrictMode>
        <div className="zfBc">
          <div className="zfBcA">
            <div className="zfBcAa">Delivery Address</div>
            <textarea
              className="zfBcAb"
              placeholder="Address"
              value={form?.delivery_address}
              onChange={(e) => {
                form.delivery_address = e.target.value;
                setState({ form });
              }}
            />
            <div className="zfBcAa">Purchase Note</div>
            <textarea
              className="zfBcAc"
              value={form?.notes}
              onChange={(e) => {
                form.notes = e.target.value;
                setState({ form });
              }}
              placeholder="Enter invoice terms / notes here"
            />
          </div>

          <div className="zfBcB">
            <div className="zfBcBa">
              <div>Discount</div>
              <input
                type="number"
                className="zfBcBb"
                placeholder="0.0"
                value={form?.discount}
                onChange={(e) => {
                  form.discount = e.target.value;
                  setState({ form });
                }}
              />
            </div>
            <div className="zfBcBa">
              <div>Subtotal</div>
              <div>{form.total_amount}</div>
            </div>
            <div className="zfBcBa">
              <div>Tax</div>
              <div>{form?.totalTax}</div>
            </div>
            <div className="zfBcBc">
              <div>Total</div>
              <div>
                {form?.totalTax + form.total_amount - Number(form?.discount)}
              </div>
            </div>
          </div>
        </div>
        {addPayment === null ? (
          <div className="zfBd">
            <div className="zfBdA">
              <div
                style={{
                  color: "red",
                  fontSize: ".8vw",
                  padding: ".3vw .5vw",
                }}
              >
                {error}
              </div>
              <div
                className="zfBdAa"
                onClick={() => postPurchaseList("save", state, setState)}
              >
                SAVE
              </div>
              {typeSaves !== null ? (
                <div
                  className="zfBdAb"
                  onClick={() => setIsDrower(!isDrower)}
                />
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
            <div className="zfBdB" onClick={() => setState({ form: null })}>
              CANCEL
            </div>
          </div>
        ) : (
          <form
            className="zvBeB"
            style={{
              marginRight: "20vw",
              marginTop: "1vw",
              background: "white",
            }}
            // onSubmit={(e) => postSalesPaymentRecord(e, state, setState)}
            onChange={(e) => setState(addPayment)}
          >
            <div className="zvBeBc">
              <div className="zvBeBcA">
                <div className="zvBeBcBa">Amount paying</div>
                <input
                  placeholder="0.0"
                  className="zvBeBcBb"
                  id="amount"
                  value={addPayment?.amount || ""}
                  onChange={(e) => {
                    // if (e.target.value > Number(selected?.balance_amount))
                    //   e.target.value = Number(selected?.balance_amount);
                    // addPayment.amount = e.target.value;
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
                    addPayment.payment_id = e.target.value;
                    // addPayment.paymemt_method_name = allPaymentMethod.filter(
                    //   (it1) => it1.id.toString() === e.target.value
                    // )[0]?.name;
                  }}
                  defaultValue={addPayment?.patment_methord_id || ""}
                >
                  <option hidden>Select payment method</option>
                  {/* {allPaymentMethod?.map((it, k) => (
                    <option key={k} value={it.id}>
                      {it.name}
                    </option>
                  ))} */}
                </select>
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Payment Mode *</div>
                <select
                  placeholder="0.0"
                  className="zvBeBcBb"
                  onChange={(e) => {
                    addPayment.payment_id = e.target.value;
                    // addPayment.paymemt_method_name = allPaymentMethod.filter(
                    //   (it1) => it1.id.toString() === e.target.value
                    // )[0]?.name;
                  }}
                  defaultValue={addPayment?.patment_methord_id || ""}
                >
                  <option hidden>Select payment method</option>
                  {/* {allPaymentMethod?.map((it, k) => (
                    <option key={k} value={it.id}>
                      {it.name}
                    </option>
                  ))} */}
                </select>
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Payment Due</div>
                <input
                  placeholder="Enter reference / note"
                  className="zvBeBcBb"
                  type="date"
                  onChange={(e) => (addPayment.reference = e.target.value)}
                  value={addPayment?.reference || ""}
                />
              </div>
              <div className="zvBeBcC">
                <div className="zvBeBcBa">Reference</div>
                <input
                  placeholder="Enter reference / note"
                  className="zvBeBcBb"
                  onChange={(e) => (addPayment.reference = e.target.value)}
                  value={addPayment?.reference || ""}
                />
              </div>
            </div>
            <div className="zvBeBd">
              <div className="imaError">{error}</div> &nbsp;
              <div className="zvBeBdA" onClick={() => setState({ form: null })}>
                CANCEL
              </div>
              <button className="zvBeBdB" type="submit">
                SAVE
              </button>
            </div>
          </form>
        )}
      </StrictMode>
    </div>
  );
}
