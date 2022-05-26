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

export function addInventory(e, state, setState) {
  e.preventDefault();
  const body = {
    productName: "Onion",
    category: 1,
    productDescription: "Big Red Onion",
    produvtType: "Friuts",
    selleingUnit: "Kg",
    alternateUnit: "g",
    taxSlab: "",
    taxTreatment: "",
    sellOnline: true,
    selectProductionStation: "",
    produvtType_: "Standard Product",
    productBarcod: "JK3K3434KJ43",
    purchasePrice: 8000,
    mrp: 10000,
    rrp: 9000,
    onlinePrice: 9500,
    currentStock: 1000,
    images: [],
  };
  console.log(e.target);
}
