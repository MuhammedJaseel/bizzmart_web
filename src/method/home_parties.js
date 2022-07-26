import { postHttp } from "../module/api_int";

export async function getAllCustomers(state, setState) {
  await postHttp("getCustomers", {}).then((res) => {
    // console.log(res.data);
    setState({ allCustomer: res.data });
  });
}
export async function getAllSuppliers(state, setState) {
  await postHttp("getSuppliers", {}).then((res) => {
    console.log(res.data);
    setState({ allSupplier: res.data });
  });
}

export async function postCustomer(body, state, setState) {
  body.address = "Enter Address";
  body.image = null;
  body.credit_period = "10";
  body.opening_balance = "0.0";
  body.credit_limit = "200000.0";
  body.gst_number = "14425";
  body.place_of_supply = "KERALA";
  body.pin_code = "134265";
  body.state = "Kerala";

  console.log(body);
  await postHttp("addCustomer", body).then((res) => {
    console.log(res.data);
  });
}
