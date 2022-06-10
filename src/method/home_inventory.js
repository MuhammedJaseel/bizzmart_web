import { logDOM } from "@testing-library/react";
import axios from "axios";
import { baseApi } from "../module/api_int";
import { getTodayType1 } from "../module/simple";

const headers = {
  Authorization: "Bearer " + window.localStorage.getItem("bearer_token"),
  sessionId: window.localStorage.getItem("session_id"),
};

export async function getProduct(state, setState) {
  const { prodectMaxCount, productPage } = state;
  const body = {
    branch_id: window.localStorage.getItem("branch_id"),
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
    { branch_id: window.localStorage.getItem("branch_id") },
    { headers }
  );
  var getUnit = axios.post(
    baseApi + "unitLists",
    { branch_id: window.localStorage.getItem("branch_id") },
    { headers }
  );
  var getKot = axios.post(
    baseApi + "KOTLists",
    { branch_id: window.localStorage.getItem("branch_id") },
    { headers }
  );
  var getTax = axios.post(
    baseApi + "taxLists",
    { branch_id: window.localStorage.getItem("branch_id") },
    { headers }
  );

  await Promise.all([getCat, getUnit, getKot, getTax])
    .then((res) => {
      if (res[0].data.statusCode === 200 || res[0].data.statusCode === 210)
        setState({ allCategoty: res[0].data.data });
      if (res[1].data.statusCode === 200)
        setState({ allUnits: res[1].data.data });
      if (res[2].data.statusCode === 200)
        setState({ allKot: res[2].data.data });
      if (res[3].data.statusCode === 200)
        setState({ allTax: res[3].data.data });
    })
    .catch(() => setState({ error: "Not Fount" }));
}

export async function addInventory(e, state, setState, type, unit) {
  const { allTax } = state;

  e.preventDefault();
  const data = e.target;
  const formData = new FormData(e.target);

  const taxType = data.tax_inclusion.value;
  const purchasePrice = data.purchase_price.value;

  var proTax = 0;
  var costPrice = "";
  var costTaxAmount = "";
  var costWithTax = "";

  for (let i = 0; i < allTax.length; i++) {
    if (allTax[i].id.toString() === data.selling_tax.value) {
      proTax = allTax[i].rate + allTax[i].cess;
      break;
    }
  }

  if (taxType === "Inclusive") {
    costPrice = purchasePrice / ((1 + proTax) / 100); //rate + cess
    costTaxAmount = purchasePrice - costPrice;
    costWithTax = purchasePrice;
  } else {
    costPrice = purchasePrice; //rate + cess
    costTaxAmount = purchasePrice * (proTax / 100);
    costWithTax = costPrice + costTaxAmount;
  }

  formData.append("branch_id", window.localStorage.getItem("branch_id"));
  formData.append("product_name", data.product_name.value);
  formData.append("product_type", type + 1);
  formData.append("is_service", 0);
  formData.append("category_id", data.category_id.value);
  formData.append("purchase_price", purchasePrice);
  formData.append("cost_price", costPrice);

  formData.append("tax_inclusion", taxType);
  formData.append("cost_with_tax", costWithTax);
  formData.append("cost_tax_amount", costTaxAmount);

  formData.append("selling_price", data.selling_price.value);
  formData.append("online_price", data.online_price.value);
  formData.append("mrp", data.mrp.value);
  formData.append("selling_tax", proTax);
  formData.append("cost_tax", proTax);
  formData.append("online_tax", proTax);
  formData.append("bar_code", data.bar_code.value);
  formData.append("hsncode", data.hsncode.value);
  formData.append("primary_unit", data.primary_unit.value);
  formData.append("secondry_unit", data.secondry_unit.value);
  formData.append("enable_unit_conversion", true);
  formData.append("conversion", "0.1"); // converted value
  formData.append("opening_stock", data.opening_stock.value);
  formData.append("stock_date", getTodayType1());
  formData.append("stock_price", costPrice);
  formData.append("stock_unit", unit);
  formData.append("min_stock_level", data.min_stock_level.value);
  formData.append("product_description", data.product_description.value);
  formData.append("image", []);

  await axios
    .post(baseApi + "productStore", formData, { headers })
    .then((res) => {
      console.log(res.data);
      if (res.data.statusCode === 200)
        setState({
          succesPop: {
            type: 0,
            msg: "Product added successfully",
            subMsg: "Updated Successfully",
          },
          addpage: false,
        });
      else
        setState({
          succesPop: { type: 1, msg: "Oop's", subMsg: res.data.message },
        });
    })
    .catch((e) =>
      setState({ succesPop: { type: 2, msg: "Not Adedd", subMsg: "Error" } })
    );
}
