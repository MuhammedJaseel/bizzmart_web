import { postHttp } from "../module/api_int";

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
  await postHttp("addCustomer", addParties)
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
  const isEdit = partie !== null;
  const body = isEdit ? partie : addParties;
  if (body?.isToPay) body.opening_balance *= -1;
  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("name", body.name);
  formData.append("nick_name", body.nick_name);
  formData.append("phone", body.phone);
  formData.append("email", body.email);
  formData.append("address", body.address);
  formData.append("image", body.image);
  formData.append("credit_period", body.credit_period);
  formData.append("opening_balance", body.opening_balance);
  formData.append("credit_limit", body.credit_limit);
  formData.append("gst_number", body.gst_number);
  formData.append("place_of_supply", body.place_of_supply);
  formData.append("pin_code", body.pin_code);
  formData.append("state", body.state);
  formData.append("state_id", body.state_id);
  formData.append("supplier_type", body.supplier_type);
  formData.append("balance_type", body.balance_type);
  if (typeof body.image === "object")
    formData.append("image[]", body.image, "[PROXY]");
  setState({ loading: true, error: null });
  await postHttp(isEdit ? "updateSupplier" : "addSupplier", body)
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
