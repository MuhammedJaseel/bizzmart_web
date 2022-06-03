import { logDOM } from "@testing-library/react";
import axios from "axios";
import { baseApi } from "../module/api_int";

const headers = {
  Authorization: "Bearer " + window.localStorage.getItem("bearer_token"),
  sessionId: window.localStorage.getItem("session_id"),
};

export async function getProduct(state, setState) {
  const { prodectMaxCount, productPage } = state;
  const body = {
    branch_id: 178,
    page_number: productPage,
    limit: prodectMaxCount,
  };
  await axios
    .post(baseApi + "products", body, { headers })
    .then((res) => {
      if (res.data.statusCode === 700) {
        window.localStorage.setItem("bearer_token", "");
        window.localStorage.setItem("session_id", "");
        window.location.href = "/login";
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210)
        setState({
          allProduct: res.data.data,
          totelProduct: res.data.page.totalCount,
        });
    })
    .catch((e) => console.log(e));
  setState({ loading: false });
}

export async function getCategoryList(state, setState) {
  await axios
    .post(baseApi + "categoryLists", { branch_id: 178 }, { headers })
    .then((res) => {
      console.log(res.data);
      if (res.data.statusCode === 200 || res.data.statusCode === 210)
        setState({ allCategoty: res.data.data });
    })
    .catch((e) => console.log(e));
}

export async function addInventory(e, state, setState) {
  e.preventDefault();

  const data = e.target;

  const body = {
    branch_id: "178",
    product_name: data.product_name.value,
    product_type: data.product_type.value,
    is_service: "0",
    category_id: data.category_id.value,
    // purchase_price: data.purchase_price.value,
    // cost_price: data.cost_price.value,
    // cost_with_tax: data.cost_with_tax.value,
    selling_price: data.selling_price.value,
    online_price: data.online_price.value,
    // cost_tax_amount: data.cost_tax_amount.value,
    mrp: data.mrp.value,
    // selling_tax: data.selling_tax.value,
    // cost_tax: data.cost_tax.value,
    // online_tax: data.online_tax.value,
    // bar_code: data.bar_code.value,
    // hsncode: data.hsncode.value,
    primary_unit: data.primary_unit.value,
    secondry_unit: data.secondry_unit.value,
    // enable_unit_conversion: data.enable_unit_conversion.value,
    // conversion: data.conversion.value,
    // opening_stock: data.opening_stock.value,
    // stock_date: data.stock_date.value,
    // stock_price: data.stock_price.value,
    // stock_unit: data.stock_unit.value,
    min_stock_level: data.min_stock_level.value,
    product_description: data.product_description.value,
    // tax_inclusion: data.tax_inclusion.value,
    // image: [{}, {}],
  };

  // await axios
  //   .post(baseApi + "productStore", body, { headers })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((e) => console.log(e));
}
