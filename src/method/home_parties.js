import { postHttp } from "../module/api_int";
import { addNumberList } from "../module/simple";
import { getToday } from "../widget/widgets/calender";

export async function getAllCustomers(state, setState) {
  const { allCustomer } = state;
  setState({ loading: true });
  await postHttp("getCustomers", allCustomer?.page || {})
    .then((res) => setState({ allCustomer: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function getAllSuppliers(state, setState) {
  const { allSupplier } = state;
  setState({ loading: true });
  await postHttp("getSuppliers", allSupplier?.page || {})
    .then((res) => setState({ allSupplier: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function getAllData(state, setState) {
  await postHttp("getPlaceOfSupply", {}).then((res) =>
    setState({ allPlaceofSupplay: res.data })
  );
  await postHttp("getStateLists", {}).then((res) =>
    setState({ allStates: res.data })
  );
  await postHttp("getLoyaltyTypes", {}).then((res) =>
    setState({ allLoyaltyType: res.data })
  );
  await postHttp("getSupplierTypes", {}).then((res) =>
    setState({ allSupplierType: res.data })
  );
}

export async function postCustomer(state, setState) {
  const { loading, succesPop, addParties } = state;
  if (loading) return;
  if (addParties?.isToPay) addParties.opening_balance *= -1;
  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("name", addParties.name || "");
  formData.append("phone", addParties.phone || "");
  formData.append("email", addParties.email || "");
  formData.append("address", addParties.address || "");
  formData.append("credit_period", addParties.credit_period || "");
  formData.append("opening_balance", addParties.opening_balance || "");
  formData.append("credit_limit", addParties.credit_limit || "");
  formData.append("gst_number", addParties.gst_number || "");
  formData.append("place_of_supply", addParties.place_of_supply || "");
  formData.append("pin_code", addParties.pin_code || "");
  formData.append("state", addParties.state || "");
  formData.append("loyality_tier", addParties.loyality_tier || "");
  if (typeof addParties.image === "object") {
    formData.append("image", addParties.image);
    formData.append("thumbnail", addParties.image);
  }
  setState({ loading: true, error: null });
  await postHttp("addCustomer", formData, true)
    .then(async (res) => {
      await getAllCustomers(state, setState);
      setState({ addParties: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The customer has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function postSuplier(state, setState) {
  const { loading, succesPop, addParties } = state;
  if (loading) return;
  if (addParties?.isToPay) addParties.opening_balance *= -1;
  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("name", addParties?.name || "");
  formData.append("nick_name", addParties?.nick_name || "");
  formData.append("phone", addParties?.phone || "");
  formData.append("email", addParties?.email || "");
  formData.append("address", addParties?.address || "");
  formData.append("credit_period", addParties?.credit_period || "");
  formData.append("opening_balance", addParties?.opening_balance || "");
  formData.append("credit_limit", addParties?.credit_limit || "");
  formData.append("gst_number", addParties?.gst_number || "");
  formData.append("place_of_supply", addParties?.place_of_supply || "");
  formData.append("pin_code", addParties?.pin_code || "");
  formData.append("state", addParties?.state || "");
  formData.append("state_id", addParties?.state_id || "");
  formData.append("supplier_type", addParties?.supplier_type || "");
  formData.append("balance_type", addParties?.balance_type || "");
  if (typeof addParties.image === "object") {
    formData.append("image", addParties.image);
    formData.append("thumbnail", addParties.image);
  }
  setState({ loading: true, error: null });
  await postHttp("addSupplier", formData, true)
    .then(async (res) => {
      await getAllSuppliers(state, setState);
      setState({ addParties: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The supplier has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function updateCustomer(state, setState) {
  const { loading, succesPop, partie } = state;
  if (loading) return;
  if (partie?.isToPay) partie.opening_balance *= -1;
  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("id", partie?.id || "");
  formData.append("name", partie?.name || "");
  formData.append("phone", partie?.phone || "");
  formData.append("email", partie?.email || "");
  formData.append("address", partie?.address || "");
  formData.append("credit_period", partie?.credit_period || "");
  formData.append("opening_balance", partie?.opening_balance || "");
  formData.append("credit_limit", partie?.credit_limit || "");
  formData.append("gst_number", partie?.gst_number || "");
  formData.append("place_of_supply", partie?.place_of_supply || "");
  formData.append("pin_code", partie?.pin_code || "");
  formData.append("state", partie?.state || "");
  formData.append("loyality_tier", partie?.loyality_tier || "");
  if (typeof partie.image === "object") formData.append("image", partie.image);
  else formData.append("image", null);

  setState({ loading: true, error: null });
  await postHttp("updateCustomer", formData, true)
    .then(async (res) => {
      await getAllCustomers(state, setState);
      setState({ partie: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The customer has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function updateSuplier(state, setState) {
  const { loading, succesPop, partie } = state;
  if (loading) return;
  if (partie?.isToPay) partie.opening_balance *= -1;
  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("id", partie.id || "");
  formData.append("name", partie.name || "");
  formData.append("nick_name", partie.nick_name || "");
  formData.append("phone", partie.phone || "");
  formData.append("email", partie.email || "");
  formData.append("address", partie.address || "");
  formData.append("credit_period", partie.credit_period || "");
  formData.append("opening_balance", partie.opening_balance || "");
  formData.append("credit_limit", partie.credit_limit || "");
  formData.append("gst_number", partie.gst_number || "");
  formData.append("place_of_supply", partie.place_of_supply || "");
  formData.append("pin_code", partie.pin_code || "");
  formData.append("state", partie.state || "");
  formData.append("state_id", partie.state_id || "");
  formData.append("supplier_type", partie.supplier_type || "");
  formData.append("balance_type", partie.balance_type || "");
  if (typeof partie.image === "object") formData.append("image", partie.image);
  else formData.append("image", null);

  setState({ loading: true, error: null });
  await postHttp("updateSupplier", formData, true)
    .then(async (res) => {
      await getAllSuppliers(state, setState);
      setState({ partie: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The supplier has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export const getCustomer = async (partie, setState, from, to) => {
  setState({ partie });
  const body = {
    customer_id: partie.id,
    from_date: from || getToday(),
    to_date: to || getToday(),
  };
  await postHttp("getPaymentMethod", { customer_id: partie.id }).then(
    (res) => (partie.paymentList = res.data)
  );
  postHttp("report/member/memberSummaryDetails", body).then(
    (res) => (partie.invoiceList = res.data)
  );
  postHttp("report/member/memberStatements", body).then(
    (res) => (partie.statmentList = res.data)
  );
  postHttp("getCustomerInvoices", { customer_id: partie.id }).then((res) => {
    partie.paymentRecord = {
      orders: res.data.invoice_lists,
      ordersTemp: res.data.invoice_lists,
      payment_method_id: partie?.paymentList[0]?.id ?? "",
      balance: addNumberList(res.data.invoice_lists, "credit"),
    };
  });
  setState({ partie });
};

export const getSupplier = async (partie, setState, from, to) => {
  setState({ partie });
  const body = {
    supplier_id: partie.id,
    from_date: from || getToday(),
    to_date: to || getToday(),
  };
  await postHttp("getPaymentMethod", { customer_id: partie.id }).then(
    (res) => (partie.paymentList = res.data)
  );
  postHttp("report/member/memberSummaryDetails", body).then(
    (res) => (partie.invoiceList = res.data)
  );
  postHttp("report/purchase/memberStatements", body).then(
    (res) => (partie.statmentList = res.data)
  );
  postHttp("getSupplierPendingInvoices", {
    supplier_id: partie.id,
  }).then((res) => {
    partie.paymentRecord = {
      orders: res.data.invoice_lists,
      ordersTemp: res.data.invoice_lists,
      payment_method_id: partie?.paymentList[0]?.id ?? "",
      balance: addNumberList(res.data.invoice_lists, "credit"),
    };
  });
  setState({ partie });
};

export const reduceCreditOneByOne = (v, state, setState) => {
  const { ordersTemp } = state.partie.paymentRecord;
  state.partie.paymentRecord.orders = JSON.parse(JSON.stringify(ordersTemp));
  for (let i = 0; i < state.partie.paymentRecord.orders.length; i++) {
    if (v > 0) state.partie.paymentRecord.orders[i].redused = true;
    if (state.partie.paymentRecord.orders[i].credit > v) {
      state.partie.paymentRecord.orders[i].credit -= v;
      break;
    } else {
      v = v - state.partie.paymentRecord.orders[i].credit;
      state.partie.paymentRecord.orders[i].credit = 0;
    }
  }
  setState({ partie: state.partie });
};

export const postMultiplePaymentRecord = async (state, setState) => {
  const { page, loading, succesPop, partie } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  const body = {
    orders: [],
    payment_method_id: partie.paymentRecord.payment_method_id,
    supplier_id: null,
    opening_balance_settled: 0,
  };

  for (let i = 0; i < partie?.paymentRecord?.orders?.length; i++) {
    if (partie?.paymentRecord?.orders[i].redused)
      body.orders.push({
        id: partie?.paymentRecord?.orders[i].id,
        invoice_no: partie?.paymentRecord?.orders[i].invoice_no,
        amount:
          partie?.paymentRecord?.orders[i].total_amount -
          partie?.paymentRecord?.orders[i].credit,
        payment_method_id: partie.paymentRecord.payment_method_id,
        account_id:
          partie.paymentList.filter(
            (it) => it.id === partie?.paymentRecord?.payment_method_id
          )[0]?.target_account_id || "",
        method_name:
          partie.paymentList.filter(
            (it) => it.id === partie?.paymentRecord?.payment_method_id
          )[0]?.name || "",
        note: partie.paymentRecord.note || "",
      });
  }

  await postHttp(
    page === 0 ? "multiRecordPayment" : "purchaseMultyMakePayment",
    body
  )
    .then(async (res) => {
      setState({ addPage: false, addParties: {}, partie: null });
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: `The ${
          page === 0 ? "custmer" : "supplier"
        } payment record has succesfully updated`,
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};
