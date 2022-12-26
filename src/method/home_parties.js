import { getHttp, postHttp } from "../module/api_int";
import { getToday } from "../widget/widgets/calender";

export async function getAllCustomers(state, setState) {
  var customerPaging = state.customerPaging;
  const body = {
    page_number: customerPaging.page_number,
    limit: customerPaging.limit,
  };
  await postHttp("getCustomers", body).then((res) => {
    customerPaging.totalCount = res.page.totalCount;
    setState({ allCustomer: res.data, customerPaging: res.page });
  });
}
export async function getAllSuppliers(state, setState) {
  await postHttp("getSuppliers", {}).then((res) => {
    setState({ allSupplier: res.data, supplierPaging: res.page });
  });
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
  formData.append("name", addParties.name);
  formData.append("phone", addParties.phone);
  formData.append("email", addParties.email);
  formData.append("address", addParties.address);
  formData.append("image", addParties.image);
  formData.append("credit_period", addParties.credit_period);
  formData.append("opening_balance", addParties.opening_balance);
  formData.append("credit_limit", addParties.credit_limit);
  formData.append("gst_number", addParties.gst_number);
  formData.append("place_of_supply", addParties.place_of_supply);
  formData.append("pin_code", addParties.pin_code);
  formData.append("state", addParties.state);
  formData.append("loyality_tier", addParties.loyality_tier);
  formData.append("image[]", addParties.image);
  setState({ loading: true, error: null });
  await postHttp("addCustomer", addParties, true)
    .then(async (res) => {
      await getAllCustomers(state, setState);
      setState({ addPage: false, addParties: {}, partie: null });
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
  const { loading, succesPop, addParties, partie } = state;
  if (loading) return;
  if (addParties?.isToPay) addParties.opening_balance *= -1;
  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("name", addParties.name);
  formData.append("nick_name", addParties.nick_name);
  formData.append("phone", addParties.phone);
  formData.append("email", addParties.email);
  formData.append("address", addParties.address);
  formData.append("image", addParties.image);
  formData.append("credit_period", addParties.credit_period);
  formData.append("opening_balance", addParties.opening_balance);
  formData.append("credit_limit", addParties.credit_limit);
  formData.append("gst_number", addParties.gst_number);
  formData.append("place_of_supply", addParties.place_of_supply);
  formData.append("pin_code", addParties.pin_code);
  formData.append("state", addParties.state);
  formData.append("state_id", addParties.state_id);
  formData.append("supplier_type", addParties.supplier_type);
  formData.append("balance_type", addParties.balance_type);
  if (typeof addParties.image === "object")
    formData.append("image[]", addParties.image, "[PROXY]");
  setState({ loading: true, error: null });
  await postHttp("addSupplier", addParties, true)
    .then(async (res) => {
      await getAllSuppliers(state, setState);
      setState({ addPage: false, addParties: {}, partie: null });
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
  formData.append("name", partie.name);
  formData.append("phone", partie.phone);
  formData.append("email", partie.email);
  formData.append("address", partie.address);
  formData.append("image", partie.image);
  formData.append("credit_period", partie.credit_period);
  formData.append("opening_balance", partie.opening_balance);
  formData.append("credit_limit", partie.credit_limit);
  formData.append("gst_number", partie.gst_number);
  formData.append("place_of_supply", partie.place_of_supply);
  formData.append("pin_code", partie.pin_code);
  formData.append("state", partie.state);
  formData.append("loyality_tier", partie.loyality_tier);
  formData.append("image", partie.image);
  setState({ loading: true, error: null });
  await postHttp("updateCustomer", partie, true)
    .then(async (res) => {
      await getAllCustomers(state, setState);
      setState({ addPage: false, partie: {}, partie: null });
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
  formData.append("name", partie.name);
  formData.append("nick_name", partie.nick_name);
  formData.append("phone", partie.phone);
  formData.append("email", partie.email);
  formData.append("address", partie.address);
  formData.append("image", partie.image);
  formData.append("credit_period", partie.credit_period);
  formData.append("opening_balance", partie.opening_balance);
  formData.append("credit_limit", partie.credit_limit);
  formData.append("gst_number", partie.gst_number);
  formData.append("place_of_supply", partie.place_of_supply);
  formData.append("pin_code", partie.pin_code);
  formData.append("state", partie.state);
  formData.append("state_id", partie.state_id);
  formData.append("supplier_type", partie.supplier_type);
  formData.append("balance_type", partie.balance_type);
  if (typeof partie.image === "object")
    formData.append("image[]", partie.image, "[PROXY]");
  setState({ loading: true, error: null });
  await postHttp("updateSupplier", partie, true)
    .then(async (res) => {
      await getAllSuppliers(state, setState);
      setState({ addPage: false, addParties: {}, partie: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The supplier has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export const getCustomer = (item, state, setState, from, to) => {
  var { partie } = state;
  partie = item;

  const body = {
    customer_id: partie.id,
    from_date: from || getToday(),
    to_date: to || getToday(),
  };

  postHttp("getCustomerInvoices", body).then(
    (res) => (partie.invoiceList = res.data.invoice_lists)
  );
  postHttp("report/member/memberStatements", body).then(
    (res) => (partie.statmentList = res.data)
  );
  postHttp("getCustomerInvoices", { customer_id: partie.id }).then(
    (res) => (partie.invoiceList2 = res.data.invoice_lists)
  );
  setState({ partie });
};
