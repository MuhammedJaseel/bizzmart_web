export const addStockIssueStruct = {
  main_branch_id: "",
  issue_date: "",
  to_branch_id: "",
  description: "",
  delivary_address: "",
  stock_note: "",

  total: 0, // All totalPrice
  rounded_amount: 0,
  total_cost_price: 0, // All cost_price
  tax: 0, // All tax
  SCGST: 0, // All SCGST
  CGST: 0,
  CESS: 0,
  cost_tax: 0,

  discount: 0,
  credit: 0, // total
  paid: 0,
  items: [],
};
export const addStockIssueItemStruct = {
  product_id: "",
  name: "",
  quantity: 1,
  unit: "",
  tax_id: "",
  selling_price: 0, // Prodect selleing_price
  price: 0, // Prodect selleing_price
  actual_price: 0, // Prodect selleing_price

  tax_amount: 0, // Always exclusive (* qty)
  _CostTaxAmount: 0, // Always exclusive (* qty)
  totalPrice: 0, // Prodect cost_price + tax_amount * quantity
  cost_price: 0, // cost_price (VIEW IT) * qty

  cost_cgst: 0, //
  cost_sgst: 0,
  cost_cess: 0,
  SCGST: 0,
  CGST: 0,
  CESS: 0,

  product_type: "", // Prodect product_type
  tax_rate: 0, // tax pessentage
  cess_rate: 0, // tax pessentage
  total_with_tax: 0, // totalPrice + tax_amount
  taxable_amount: 0, // total_with_tax
  discount_amount: 0,
  discount_percent: 0,
  variant: {},
};

export const setAddStockIssueItemStruct = () => {
  const value = JSON.parse(JSON.stringify(addStockIssueStruct));
  value.items.push(JSON.parse(JSON.stringify(addStockIssueItemStruct)));
  value.main_branch_id = window.localStorage.getItem("branchId");
  return value;
};

export function calculateStockIssueTax(it, state, setState) {
  const { addIssueStock, allTax } = state;

  if (it.quantity !== "" && it.tax_id !== "" && it.product_id !== "") {
    const rate = allTax.filter((it1) => it1.id == it.tax_id)[0].rate;
    const cess = allTax.filter((it1) => it1.id == it.tax_id)[0].cess;
    const proTax = parseInt(rate) + parseInt(cess);

    if (it.tax_type === "Inclusive") {
      it.tax_amount = it.price - (it.price / (1 + proTax / 100)) * it.quantity;
      it._CostTaxAmount =
        it.cost_price - (it.cost_price / (1 + proTax / 100)) * it.quantity;
    } else {
      it.tax_amount = it.price * (proTax / 100) * it.quantity;
      it._CostTaxAmount = it.cost_price * (proTax / 100) * it.quantity;
    }

    it.totalPrice = it.price * it.quantity;
    it.cost_price = it.cost_price * it.quantity;

    it.CESS = (it.price - it.price / (1 + parseInt(cess) / 100)) * it.quantity;
    it.SCGST = it.tax_amount / 2;
    it.CGST = it.tax_amount / 2;

    it.cost_cess =
      (it.cost_price - it.cost_price / (1 + parseInt(cess) / 100)) *
      it.quantity;
    it.cost_sgst = it._CostTaxAmount / 2;
    it.cost_cgst = it._CostTaxAmount / 2;

    it.total_with_tax = it.price * it.quantity + it.tax_amount;
    it.taxable_amount = it.total_with_tax;

    it.tax_amount = Math.round(it.tax_amount);
    it.totalPrice = Math.round(it.totalPrice);
    it.cost_price = Math.round(it.cost_price);
    it.total_with_tax = Math.round(it.total_with_tax);
    it.taxable_amount = Math.round(it.taxable_amount);
  } else {
    it.tax_amount = "";
    it.totalPrice = "";
    it.cost_price = "";
    it.total_with_tax = "";
    it.taxable_amount = "";
  }

  addIssueStock.total = 0;
  addIssueStock.total_cost_price = 0;
  addIssueStock.tax = 0;
  addIssueStock.SCGST = 0;
  addIssueStock.CGST = 0;
  addIssueStock.CESS = 0;
  addIssueStock.cost_tax = 0;

  for (let i = 0; i < addIssueStock?.items.length; i++) {
    addIssueStock.total += addIssueStock.items[i].totalPrice;
    addIssueStock.total_cost_price += addIssueStock.items[i].cost_price;
    addIssueStock.tax += addIssueStock.items[i].tax_amount;
    addIssueStock.SCGST += addIssueStock.items[i].SCGST;
    addIssueStock.CGST += addIssueStock.items[i].CGST;
    addIssueStock.CESS += addIssueStock.items[i].CESS;
    addIssueStock.cost_tax += addIssueStock.items[i]._CostTaxAmount;
  }
  addIssueStock.total = Math.round(addIssueStock.total);
  addIssueStock.total_cost_price = Math.round(addIssueStock.total_cost_price);
  addIssueStock.tax = Math.round(addIssueStock.tax);
  addIssueStock.SCGST = Math.round(addIssueStock.SCGST);
  addIssueStock.CGST = Math.round(addIssueStock.CGST);
  addIssueStock.CESS = Math.round(addIssueStock.CESS);
  addIssueStock.cost_tax = Math.round(addIssueStock.cost_tax);

  setState(addIssueStock);
}

export const newInventoryCountStruct = {
  from_branch_id: "",
  to_branch_id: "",
  title: "",
  start_date: "",
  end_date: "",
  invetory_type: "",
  category: [],
  allCategory: [],
};
