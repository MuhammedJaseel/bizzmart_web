export const addStockIssueStruct = {
  main_branch_id: "",
  issue_date: "",
  to_branch_id: "",
  description: "",
  delivary_address: "",
  stock_note: "",
  total: 0,
  rounded_amount: 0,
  tax: 0,
  SCGST: 0,
  CGST: 0,
  CESS: 0,
  cost_tax: 0,
  discount: 0,
  credit: 0,
  paid: 0,
  total_cost_price: 0,
  items: [],
};
export const addStockIssueItemStruct = {
  product_id: "",
  name: "",
  quantity: 0,
  price: 0,
  selling_price: 0,
  actual_price: 0,
  totalPrice: 0,
  cost_price: 0,
  cost_cgst: 0,
  SCGST: 0,
  CGST: 0,
  CESS: 0,
  cost_sgst: 0,
  cost_cess: 0,
  product_type: "",
  tax_amount: 0,
  tax_id: "",
  tax_rate: 10,
  cess_rate: 0,
  unit: "",
  total_with_tax: 0,
  taxable_amount: 0,
  discount_amount: 0,
  discount_percent: 0,
  variant: {},
};

export const setAddStockIssueItemStruct = () => {
  const value = { ...addStockIssueStruct };
  value.items = [];
  value.items.push({ ...addStockIssueItemStruct });
  return value;
};
