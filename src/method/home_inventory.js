import axios from "axios";
import { baseApi } from "../module/api_int";
import { getTodayType1 } from "../module/simple";

const headers = {
  Authorization: "Bearer " + window.localStorage.getItem("bearer_token"),
  sessionId: window.localStorage.getItem("session_id"),
};

export async function getProduct(state, setState) {
  const { product } = state;
  await axios
    .get(baseApi + "getProduct/" + product.id, { headers })
    .then((res) => {
      if (res.data.statusCode === 700) {
        window.localStorage.setItem("bearer_token", "");
        window.localStorage.setItem("session_id", "");
        state.setScreen("/login");
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210)
        setState({ product: res.data.data });
    })
    .catch((e) => console.log(e));
  setState({ loading: false });
  return;
}

export async function getProducts(state, setState) {
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
        state.setScreen("/login");
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210) {
        setState({
          allProduct: res.data.data,
          totelProduct: res.data.page.totalCount,
        });
      }
    })
    .catch((e) => console.log(e));
  setState({ loading: false });
  return;
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
  const { allTax, allModifire, allStations, selectedUnits } = state;
  const { manageStock, sellOnline } = state;

  e.preventDefault();
  const data = e.target;
  const formData = new FormData(data);

  const conversion = selectedUnits[1] === null ? "" : data.conversion.value;

  // ///////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////
  // ////////////////////VALIDATION/////////////////////////
  // ///////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////
  if (selectedUnits[0] === null) return 0;
  if (selectedUnits[1] !== null && conversion === "") return 0;
  // ///////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////

  const taxType = data.tax_inclusion.value;
  const purchasePrice = data.purchase_price.value;

  var proTax = 0;
  var costPrice = "";
  var costTaxAmount = "";
  var costWithTax = "";

  for (let i = 0; i < allTax.length; i++)
    if (allTax[i].id.toString() === data.selling_tax.value) {
      proTax = parseInt(allTax[i].rate) + parseInt(allTax[i].cess);
      break;
    }
  if (taxType === "Inclusive") {
    costPrice = purchasePrice / ((1 + proTax) / 100);
    costTaxAmount = purchasePrice - costPrice;
    costWithTax = purchasePrice;
  } else {
    costPrice = purchasePrice;
    costTaxAmount = purchasePrice * (proTax / 100);
    costWithTax = costPrice + costTaxAmount;
  }

  formData.append("branch_id", window.localStorage.getItem("branch_id"));
  formData.append("product_name", data.product_name.value);
  // MISSING Select product type
  formData.append("category_id", data.category_id.value);
  formData.append("product_description", data.product_description.value);
  formData.append("is_service", manageStock ? 1 : 0);
  formData.append("primary_unit", JSON.parse(data.primary_unit.value).id);
  formData.append("secondry_unit", JSON.parse(data.secondry_unit.value).id);
  formData.append("enable_unit_conversion", selectedUnits[1] !== null);
  formData.append("conversion", conversion);
  formData.append("selling_tax", data.selling_tax.value);
  formData.append("cost_tax", data.selling_tax.value);
  formData.append("online_tax", data.selling_tax.value);
  formData.append("tax_inclusion", taxType);
  formData.append("hsncode", data.hsncode.value);
  formData.append("is_online", sellOnline ? 1 : 0);
  formData.append("product_kot", allStations);
  formData.append("product_type", type + 1);
  formData.append("bar_code", data.bar_code.value);
  // MISSING EAN
  formData.append("purchase_price", purchasePrice);
  formData.append("stock_unit", unit);
  formData.append("cost_price", costPrice);
  formData.append("cost_with_tax", costWithTax);
  formData.append("cost_tax_amount", costTaxAmount);
  formData.append("selling_price", data.selling_price.value);
  formData.append("online_price", data.online_price.value);
  formData.append("mrp", data.mrp.value);
  formData.append("opening_stock", data.opening_stock.value);
  formData.append("stock_date", getTodayType1());
  formData.append("stock_price", costPrice);
  formData.append("min_stock_level", data.min_stock_level.value);
  // MISSING Apply category defaults
  formData.append("product_modifier", allModifire);
  for (let i = 0; i < e.target.pro_imgs.files.length; i++)
    formData.append("image[]", e.target.pro_imgs.files[i], "[PROXY]");

  await axios
    .post(baseApi + "productStore", formData, { headers })
    .then(async (res) => {
      console.log(res.data);
      if (res.data.statusCode === 200) {
        await getProduct(state, setState);
        setState({
          succesPop: {
            type: 0,
            msg: "Product added successfully",
            subMsg: "Updated Successfully",
          },
          addpage: false,
        });
      } else
        setState({
          succesPop: { type: 1, msg: "Oop's", subMsg: res.data.message },
        });
    })
    .catch((e) =>
      setState({ succesPop: { type: 2, msg: "Not Adedd", subMsg: "Error" } })
    );
}

// formData.append("branch_id", "178");
// formData.append(
//   "product_name",
//   "SAMSUNG Galaxy F22 hj(Denjhj Blk, 64 G (4 GB RAM)" + Date()
// );
// formData.append("product_type", 1);
// formData.append("is_service", 0);
// formData.append("category_id", "425");
// formData.append("purchase_price", "9000");
// formData.append("cost_price", 900000);
// formData.append("tax_inclusion", "Inclusive");
// formData.append("cost_with_tax", "9000");
// formData.append("cost_tax_amount", -891000);
// formData.append("selling_price", "10499");
// formData.append("online_price", "10499");
// formData.append("mrp", "14999");
// formData.append("selling_tax", 0);
// formData.append("cost_tax", 0);
// formData.append("online_tax", 0);

// formData.append("bar_code", "bar" + new Date().getMilliseconds());

// formData.append("hsncode", "67676767");
// formData.append("primary_unit", "7465");
// formData.append("secondry_unit", "Select alternate unit (optional)");
// formData.append("enable_unit_conversion", true);
// formData.append("conversion", 0.1);
// formData.append("opening_stock", "10");
// formData.append("stock_date", "13-06-2022");
// formData.append("stock_price", 900000);
// formData.append("stock_unit", "PCS");
// formData.append("min_stock_level", "2");
// formData.append(
//   "product_description",
//   "Bid goodbye to screen stuttering, poor display quality, and low-resolution photos by getting your hands on the Samsung Galaxy F22 smartphone. Featuring a 90 Hz refresh rate, HD+ sAMOLED display, and True 48 MP quad-rear camera, this smartphone is sure to be your ideal companion for entertainment, gaming, and communication. What's more, its 6000 mAh battery ensures that a full charge can last for an entire day."
// );

// for (let i = 0; i < e.target.pro_imgs.files.length; i++) {
//   formData.append("image[]", e.target.pro_imgs.files[i], "[PROXY]");
// }

// formData.append("product_kot", allStations);
// formData.append("product_modifier", allModifire);
