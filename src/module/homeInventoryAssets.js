export function calculateAssetPurchaseTax(it, state, setState) {
  const { addAssetPurchase, allTax } = state;
  if (
    it.asset_id !== "" &&
    it.quantity !== "" &&
    it.price !== "" &&
    it.tax_id !== ""
  ) {
    const rate = allTax.filter((it1) => it1.id == it.tax_id)[0].rate;
    const cess = allTax.filter((it1) => it1.id == it.tax_id)[0].cess;
    const proTax = parseInt(rate) + parseInt(cess);

    it.item_tax = it.price * (proTax / 100) * Number(it.quantity);
    it.item_total = it.price * Number(it.quantity) + it.item_tax;

    it.item_tax = Math.round(it.item_tax);
    it.item_total = Math.round(it.item_total);
    
  } else {
    it.item_tax = "";
    it.item_total = "";
  }
  addAssetPurchase.tax_amount = 0;
  addAssetPurchase.total_amount = 0;
  addAssetPurchase.sub_total = 0;
  for (let i = 0; i < addAssetPurchase?.items.length; i++) {
    addAssetPurchase.tax_amount += Number(addAssetPurchase?.items[i].item_tax);
    addAssetPurchase.total_amount += Number(
      addAssetPurchase?.items[i].item_total
    );
  }
  addAssetPurchase.sub_total =
    addAssetPurchase.total_amount - addAssetPurchase.tax_amount;

  setState(addAssetPurchase);
}

export const assetPurchaseStruct = {
  supplier_id: "",
  purchase_date: "",
  account_id: "",
  payment_mode: "",
  due_date: "",
  reference: "",
  purchase_note: "",
  discount: "",

  sub_total: "",
  tax_amount: "",
  total_amount: "",

  received_amount: 0,
  balance_amount: 0,
  is_credit: 0,

  items: [
    {
      asset_id: "",
      asset_category_id: "",
      asset_category: "",
      quantity: 1,
      price: "",
      tax_id: "",
      item_tax: "",
      item_total: "",
    },
  ],
};

export const assetPurchaseSinglrStruct = {
  asset_id: "",
  asset_category_id: "",
  asset_category: "",
  quantity: 1,
  price: "",
  tax_id: "",
  item_tax: "",
  item_total: "",
};
