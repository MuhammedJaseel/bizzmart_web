import { getHttp, postHttp } from "../module/api_int";
import { getTodayType1 } from "../module/simple";

export async function getProduct(state, setState) {
  const { product } = state;
  await getHttp(`getProduct/${product.id}`)
    .then((res) => setState({ product: res.data }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}

export async function getProducts(state, setState) {
  const { productPaging } = state;

  await postHttp("products", productPaging)
    .then((res) => {
      setState({ allProduct: res.data, productPaging: res.page });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}

export async function getCategoryList(state, setState) {
  var getCat = postHttp("categoryLists", {});
  var getUnit = postHttp("unitLists", {});
  var getKot = postHttp("KOTLists", {});
  var getTax = postHttp("taxLists", {});
  await Promise.all([getCat, getUnit, getKot, getTax])
    .then((res) => {
      setState({ allCategoty: res[0].data });
      setState({ allUnits: res[1].data });
      setState({ allKot: res[2].data });
      setState({ allTax: res[3].data });
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
  setState({ product });
}

export async function postInventoryProduct(state, setState) {
  const { product, allTax } = state;
  const formData = new FormData();

  const taxType = product.tax_inclusion;
  const purchasePrice = product.purchase_price;

  var proTax = 0;
  var costPrice = "";
  var costTaxAmount = "";
  var costWithTax = "";

  const rate = JSON.parse(product.selling_tax).rate;
  const cess = JSON.parse(product.selling_tax).cess;
  proTax = parseInt(rate) + parseInt(cess);

  if (taxType === "Inclusive") {
    costPrice = purchasePrice / ((1 + proTax) / 100);
    costTaxAmount = purchasePrice - costPrice;
    costWithTax = purchasePrice;
  } else {
    costPrice = purchasePrice;
    costTaxAmount = purchasePrice * (proTax / 100);
    costWithTax = costPrice + costTaxAmount;
  }
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("product_name", product.product_name);
  // MISSING Select product type
  formData.append("category_id", product.category_id);
  formData.append("product_description", product.product_description);
  formData.append("is_service", product.is_service);
  formData.append("primary_unit", product.primary_unit);
  formData.append("secondry_unit", product.secondry_unit);
  formData.append("enable_unit_conversion", product.secondry_unit !== "");
  formData.append("conversion", product.conversion);
  formData.append("selling_tax", JSON.parse(product.selling_tax).id);
  formData.append("cost_tax", JSON.parse(product.selling_tax).id);
  formData.append("online_tax", JSON.parse(product.selling_tax).id);
  formData.append("tax_inclusion", taxType);
  formData.append("hsncode", product.hsncode);
  formData.append("is_online", product.is_online);
  formData.append("product_kot", product.product_kot);
  formData.append("product_type", product.type);
  if (product.type === 1) {
    formData.append("bar_code", product.bar_code);
    formData.append("ean", product.ean);
    formData.append("purchase_price", purchasePrice);
    formData.append("stock_unit", product.primary_unit);
    formData.append("cost_price", costPrice);
    formData.append("cost_with_tax", costWithTax);
    formData.append("cost_tax_amount", costTaxAmount);
    formData.append("selling_price", product.selling_price);
    formData.append("online_price", product.online_price);
    formData.append("mrp", product.mrp);
    formData.append("opening_stock", product.opening_stock);
    formData.append("stock_date", getTodayType1());
    formData.append("stock_price", costPrice);
    formData.append("min_stock_level", product.min_stock_level);
  }
  if (product.type === 2) {
    formData.append("variant_products", product.variant_products);
    formData.append("variant_attribute", product.variant_attribute);
    formData.append("selectable", product.selectable);
    formData.append("classification", product.classification);
  }
  if (product.type === 3) {
    formData.append("default_composites", product.default_composites);
    formData.append("selectable_composites", product.selectable_composites);
  }
  // MISSING Apply category defaults
  // formData.append("product_modifier", allModifire);
  for (let i = 0; i < product.image.length; i++)
    formData.append("image[]", product.image[i], "[PROXY]");

  await postHttp("productStore", formData, true)
    .then(async (res) => {
      await getProducts(state, setState);
      setState({
        succesPop: {
          type: 0,
          msg: "Product added successfully",
          subMsg: "Updated Successfully",
        },
        product: null,
      });
    })
    .then((error) =>
      setState({ succesPop: { type: 1, msg: "Oop's", subMsg: error } })
    );
}
