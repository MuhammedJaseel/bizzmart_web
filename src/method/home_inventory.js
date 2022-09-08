import { type } from "@testing-library/user-event/dist/type";
import { getHttp, postHttp } from "../module/api_int";
import { getTodayType1 } from "../module/simple";

export async function getProduct(state, setState) {
  const { product } = state;
  await getHttp(`getProduct/${product?.id}`)
    .then((res) => setState({ product: res.data }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}

export async function getProducts(state, setState) {
  const { productPaging } = state;
  await postHttp("products", productPaging)
    .then((res) => setState({ allProduct: res.data, productPaging: res.page }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}

export async function inventorySearchProduct(v, state, setState) {
  if (v === "") {
    setState({ loading: false, error: null, allProductSearches: [] });
    return;
  }
  setState({ loading: true, error: null });

  await postHttp("getSearchProducts", { serach: v })
    .then((res) => setState({ allProductSearches: res.data }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}

export async function getServices(state, setState) {
  const { servicesPaging } = state;

  await postHttp("serviceProducts", servicesPaging)
    .then((res) => {
      setState({ allService: res.data, servicesPaging: res.page });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}

export async function getCategoryList(state, setState) {
  var getCat = postHttp("categoryLists", {});
  var getUnit = postHttp("unitLists", {});
  var getKot = postHttp("getKOT", {});
  var getTax = postHttp("taxLists", {});
  var getToppings = postHttp("getToppingsProducts", {});
  await Promise.all([getCat, getUnit, getKot, getTax, getToppings])
    .then((res) => {
      setState({ allCategoty: res[0].data });
      setState({ allUnits: res[1].data });
      setState({ allKot: res[2].data });
      setState({ allTax: res[3].data });
      setState({ allToppings: res[4].data });
    })
    .catch((error) => setState({ error }));
}

export async function setInventory(state, setState) {
  const { product } = state;
  var { variant_attribute, variant_products, isPrimary } = product;
  var { attributeName1, attribute1, attributeName2, attribute2 } = product;
  variant_attribute = [];
  variant_products = [];
  if (attributeName1 !== "") {
    variant_attribute.push({
      name: attributeName1,
      variants: [],
    });
    if (attribute1 !== "") {
      const eachs = attribute1.split(",");
      for (let i = 0; i < eachs.length; i++)
        if (eachs[i] !== "")
          variant_attribute[0].variants.push({
            title: eachs[i].replace(/^\s+|\s+$/gm, ""),
            is_primary: isPrimary ? 1 : 0,
          });
    }
  }
  if (attributeName2 !== "") {
    variant_attribute.push({
      name: attributeName2,
      variants: [],
    });
    if (attribute2 !== "") {
      const eachs = attribute2.split(",");
      for (let i = 0; i < eachs.length; i++)
        if (eachs[i] !== "")
          variant_attribute[1].variants.push({
            title: eachs[i],
            is_primary: 0,
          });
    }
  }
  product.variant_products = [];
  for (let i = 0; i < variant_attribute[0].variants.length; i++) {
    for (let j = 0; j < variant_attribute[1].variants.length; j++) {
      const el = variant_attribute[0].variants[i].title;
      const el1 = variant_attribute[1].variants[j].title;
      product.variant_products.push({
        variant_name: el + "/" + el1,
        bar_code: "",
        hsncode: "",
        ean: "",
        purchase_price: "",
        cost_price: "",
        cost_with_tax: "",
        selling_price: "",
        online_price: "",
        cost_tax_amount: "",
        mrp: "",
        stock_price: "",
        opening_stock: "",
        min_stock_level: "",
      });
    }
  }
  product.variant_attribute = variant_attribute;
  setState({ product });
}

export async function postInventoryProduct(state, setState) {
  const { product, allTax, succesPop } = state;
  var error = null;

  if (product.selling_tax === "") error = "Select Tax";

  var purchasePrice = "";
  var proTax = 0;
  var costPrice = "";
  var costTaxAmount = "";
  var costWithTax = "";
  var rate = "";
  var cess = "";
  try {
    rate = allTax.filter((it) => it.id == product.selling_tax)[0].rate;
    cess = allTax.filter((it) => it.id == product.selling_tax)[0].cess;
    if (product.type === 1) {
      purchasePrice = product.purchase_price;
      if (product.tax_inclusion === "Inclusive") {
        costPrice = purchasePrice / ((1 + proTax) / 100);
        costTaxAmount = purchasePrice - costPrice;
        costWithTax = purchasePrice;
      } else {
        costPrice = purchasePrice;
        costTaxAmount = purchasePrice * (proTax / 100);
        costWithTax = costPrice + costTaxAmount;
      }
      proTax = parseInt(rate) + parseInt(cess);
    }
    // if (product.type === 2) {
    else {
      for (let i = 0; i < product.variant_products.length; i++) {
        purchasePrice = product.variant_products[i].purchase_price;
        if (product.tax_inclusion === "Inclusive") {
          costPrice = purchasePrice / ((1 + proTax) / 100);
          costTaxAmount = purchasePrice - costPrice;
          costWithTax = purchasePrice;
        } else {
          costPrice = purchasePrice;
          costTaxAmount = purchasePrice * (proTax / 100);
          costWithTax = costPrice + costTaxAmount;
        }
        product.variant_products[i].cost_price = costPrice;
        product.variant_products[i].cost_tax_amount = costTaxAmount;
        product.variant_products[i].cost_with_tax = costWithTax; //set category default prodection station
      }
    }
  } catch (e) {
    error = "Something wrong at calculating tax, Check your tax details";
  }

  const isEdit = product?.hasOwnProperty("id");
  const formData = new FormData();
  try {
    if (product.secondry_unit !== "" && product.secUnit)
      formData.append("conversion", 1 / product.conversion);
    else formData.append("conversion", product.conversion);
  } catch (error) {
    error = "Error on unit convertion";
  }

  setState({ error });
  if (error !== null) return;
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  if (isEdit) formData.append("id", product.id);
  formData.append("product_name", product.product_name);
  formData.append("inventory_type", product.inventory_type);
  formData.append("category_id", product.category_id);
  formData.append("product_description", product.product_description);
  formData.append("is_service", product.is_service);
  formData.append("primary_unit", product.primary_unit);
  formData.append("secondry_unit", product.secondry_unit);
  formData.append("enable_unit_conversion", product.secondry_unit !== "");
  formData.append("selling_tax", product.selling_tax);
  formData.append("cost_tax", product.selling_tax);
  formData.append("online_tax", product.selling_tax);
  formData.append("tax_inclusion", product.tax_inclusion);
  formData.append("hsncode", product.hsncode);
  formData.append("is_online", product.is_online);
  formData.append("category_default_kot", product.category_default_kot);
  formData.append("product_kot", product.product_kot);
  formData.append("product_type", product.type);
  formData.append("product_modifier", JSON.stringify(product.product_modifier));
  formData.append(
    "category_default_modifier",
    product.category_default_kot === 0 ? "" : product.category_default_modifier
  );
  // TYPE 1
  formData.append("bar_code", product.bar_code);
  formData.append("ean", product.ean);
  formData.append("cost_price", costPrice);
  formData.append("purchase_price", purchasePrice);
  formData.append("stock_unit", product.primary_unit);
  formData.append("cost_with_tax", costWithTax);
  formData.append("cost_tax_amount", costTaxAmount);
  formData.append("selling_price", product.selling_price);
  formData.append("online_price", product.online_price);
  formData.append("mrp", product.mrp);
  formData.append("opening_stock", product.opening_stock);
  formData.append("stock_date", getTodayType1());
  formData.append("stock_price", costPrice);
  formData.append("min_stock_level", product.min_stock_level);
  //TYPE 2
  formData.append("variant_products", JSON.stringify(product.variant_products));
  formData.append(
    "variant_attribute",
    JSON.stringify(product.variant_attribute)
  );
  formData.append("selectable", product.selectable);
  formData.append("attribute_title", product.attribute_title);
  formData.append("classification", JSON.stringify(product.classification));
  //TYPE 3
  formData.append(
    "default_composites",
    JSON.stringify(product.default_composites)
  );
  formData.append(
    "selectable_composites",
    JSON.stringify(product.selectable_composites)
  );
  // IMAGE
  for (let i = 0; i < product.image.length; i++)
    formData.append("image[]", product.image[i]);

  setState({ loading: true });
  await postHttp(isEdit ? "updateStore" : "productStore", formData, true)
    .then(async (res) => {
      await getProducts(state, setState);
      succesPop({
        active: true,
        title: "Product added successfully",
        desc: "Updated Successfully",
      });
      setState({ product: null });
    })
    .catch((desc) =>
      succesPop({
        active: true,
        type: "error",
        title: "Error on Adding",
        desc,
      })
    );
  setState({ loading: false });
}
