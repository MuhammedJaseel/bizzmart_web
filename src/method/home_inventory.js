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
  var getCat = axios.post(
    baseApi + "categoryLists",
    { branch_id: 178 },
    { headers }
  );
  var getUnit = axios.post(
    baseApi + "unitLists",
    { branch_id: 178 },
    { headers }
  );
  var getKot = axios.post(
    baseApi + "KOTLists",
    { branch_id: 178 },
    { headers }
  );
  var getKot = axios.post(
    baseApi + "taxLists",
    { branch_id: 178 },
    { headers }
  );

  await Promise.all([getCat, getUnit, getKot])
    .then((res) => {
      if (res[0].data.statusCode === 200 || res[0].data.statusCode === 210)
        setState({ allCategoty: res[0].data.data });
      if (res[1].data.statusCode === 200)
        setState({ allUnits: res[1].data.data });
      if (res[2].data.statusCode === 200)
        setState({ allKot: res[2].data.data });
      if (res[2].data.statusCode === 200)
        setState({ allTax: res[2].data.data });
    })
    .catch(() => setState({ error: "Not Fount" }));
}

export async function addInventory(e, state, setState) {
  e.preventDefault();

  const data = e.target;

  const formData = new FormData(e.target);

  formData.append("branch_id", "178");
  formData.append("product_name", data.product_name.value);
  formData.append("product_type", data.product_type.value);
  formData.append("is_service", 0);
  formData.append("category_id", data.category_id.value);
  formData.append("purchase_price", "test");
  formData.append("cost_price", "test");
  formData.append("cost_with_tax", "test");
  formData.append("selling_price", "test");
  formData.append("online_price", "test");
  formData.append("cost_tax_amount", "test");
  formData.append("mrp", "test");
  formData.append("selling_tax", "test");
  formData.append("cost_tax", "test");
  formData.append("online_tax", "test");
  formData.append("bar_code", "test");
  formData.append("hsncode", "test");
  formData.append("primary_unit", "test");
  formData.append("secondry_unit", "test");
  formData.append("enable_unit_conversion", "test");
  formData.append("conversion", "test");
  formData.append("opening_stock", "test");
  formData.append("stock_date", "test");
  formData.append("stock_price", "test");
  formData.append("stock_unit", "test");
  formData.append("min_stock_level", "test");
  formData.append("product_description", "test");
  formData.append("tax_inclusion", "test");
  formData.append("image", "test");

  console.log(formData.branch_id);

  // const body = {
  //   branch_id: "178",
  //   product_name: data.product_name.value,
  //   product_type: data.product_type.value,
  //   is_service: "0",
  //   category_id: data.category_id.value,
  //   purchase_price: data.purchase_price.value,
  //   // cost_price: data.cost_price.value,
  //   // cost_with_tax: data.cost_with_tax.value,
  //   selling_price: data.selling_price.value,
  //   online_price: data.online_price.value,
  //   // cost_tax_amount: data.cost_tax_amount.value,
  //   mrp: data.mrp.value,
  //   selling_tax: data.selling_tax.value,
  //   cost_tax: data.selling_tax.value,
  //   online_tax: data.selling_tax.value,
  //   bar_code: data.bar_code.value,
  //   hsncode: data.hsncode.value,
  //   primary_unit: data.primary_unit.value,
  //   secondry_unit: data.secondry_unit.value,
  //   // enable_unit_conversion: data.enable_unit_conversion.value,if secendory unit
  //   // conversion: data.conversion.value,
  //   opening_stock: data.opening_stock.value,
  //   stock_date: new Date(),
  //   // stock_price: data.stock_price.value, => cost price
  //   // stock_unit: data.stock_unit.value, => purchase unit
  //   min_stock_level: data.min_stock_level.value,
  //   product_description: data.product_description.value,
  //   // tax_inclusion: data.tax_inclusion.value,// tax treatment
  //   // image: [{}, {}],
  // };

  // await axios
  //   .post(baseApi + "productStore", body, { headers })
  //   .then((res) => {
  //     console.log(res.data);
  //   })
  //   .catch((e) => console.log(e));

  setState({ succesPop: true });
}
