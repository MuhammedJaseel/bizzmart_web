import { getHttp, postHttp } from "../module/api_int";

export const salesGetSales = async (state, setState) => {
  const { invoicePaging, estimatePaging } = state;
  setState({ loading: true, error: null });
  await postHttp("getOrders", invoicePaging).then((res) => {
    setState({ allInvoice: res.data, invoicePaging: res.page });
  });
  await postHttp("orderLastInvoiceNo", estimatePaging).then((res) => {
    setState({ allEstimate: res.data, estimatePaging: res.page });
  });
  setState({ loading: false });
};

export const salesGetSale = async (k, state, setState) => {
  var { allInvoice, addPaymentRecord } = state;
  addPaymentRecord = {};
  setState({ selected: allInvoice[k], addPaymentRecord });
  await postHttp("getInvoice", { order_id: allInvoice[k].id }).then((res) => {
    addPaymentRecord.order_id = res.data?.id;
    setState({ selected: { ...allInvoice[k], ...res.data } });
  });
  postHttp("getPaymentMethod", {}).then((res) => {
    setState({ allPaymentMethod: res.data });
  });
};

export async function salesSearchProduct(v, setData) {
  if (v === "") setData([]);
  else
    await postHttp("getSearchProducts", { serach: v }).then((res) =>
      setData(res.data)
    );
}
export async function salesSetSearchProduct(id, { setCost }) {
  await getHttp("getProduct/" + id).then((res) => {
    setCost(res.data?.cost_price);
  });
}

export const postInvoice = async (state, setState) => {
  const { form, succesPop } = state;
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addOrder", form)
    .then(async () => {
      await salesGetSales(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Sales list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};

export const postEstimate = async (state, setState) => {
  const { form, succesPop } = state;
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addOrder", form)
    .then(async () => {
      await salesGetSales(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Sales list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};

export const postSalesPaymentRecord = async (e, state, setState) => {
  e.preventDefault();
  const { addPaymentRecord, loding, succesPop } = state;
  if (loding) return 0;

  // --START-- Form validation
  if (addPaymentRecord.amount === undefined || addPaymentRecord.amount === "") {
    setState({ error: "Enter amount recived" });
    return;
  }
  if (
    addPaymentRecord.payment_id === undefined ||
    addPaymentRecord.payment_id === ""
  ) {
    setState({ error: "Select payment mode" });
    return;
  }
  // --END-- Form validation end
  //

  setState({ loading: true, error: null });
  await postHttp("recordPayment", addPaymentRecord)
    .then(async () => {
      setState({ addPaymentRecord: {} });
      await postHttp("getInvoice", {
        order_id: addPaymentRecord?.order_id,
      }).then((res) => setState({ selected: res.data }));
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your sales list was succesfully updated",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};
