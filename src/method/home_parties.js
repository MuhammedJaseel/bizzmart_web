import { postHttp } from "../module/api_int";

export async function getAllCustomers(state, setState) {
  await postHttp("getCustomers", {}).then((res) => {
    setState({ allCustomer: res.data, customerPaging: res.page });
  });
}
export async function getAllSuppliers(state, setState) {
  await postHttp("getSuppliers", {}).then((res) => {
    setState({ allSupplier: res.data, supplierPaging: res.page });
  });
}

export async function postCustomer(body, state, setState) {
  const { loading } = state;
  if (loading) return;

  console.log(body);

  body.image = null;

  setState({ loading: true, error: null });
  await postHttp("addCustomer", body)
    .then(async (res) => {
      await getAllCustomers(state, setState);
      setState({ addPage: false, addCustomer: {} });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
