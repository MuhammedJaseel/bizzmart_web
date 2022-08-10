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

export async function postCustomer(body, state, setState) {
  const { loading, succesPop } = state;
  if (loading) return;
  body.image = null;
  setState({ loading: true, error: null });
  await postHttp("addCustomer", body)
    .then(async (res) => {
      await getAllCustomers(state, setState);
      setState({ addPage: false, addCustomer: {} });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The customer has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function postSuplier(body, state, setState) {
  const { loading, succesPop } = state;
  if (loading) return;
  body.image = null;
  console.log(body);
  setState({ loading: true, error: null });
  await postHttp("addSupplier", body)
    .then(async (res) => {
      await getAllSuppliers(state, setState);
      setState({ addPage: false, addSupplier: {} });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "The supplier has been succesfully Added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
