export function calculateAssetPurchaseTax(it, state, setState) {
  const { addAssetPurchase, allTax } = state;
  console.log(it);
  if (
    it.asset_id !== undefined &&
    it.asset_id !== "" &&
    it.quantity !== undefined &&
    it.quantity !== "" &&
    it.price !== undefined &&
    it.price !== "" &&
    it.tax_id !== undefined &&
    it.tax_id !== ""
  ) {
    const rate = allTax.filter((it1) => it1.id == it.tax_id)[0].rate;
    const cess = allTax.filter((it1) => it1.id == it.tax_id)[0].cess;
    const proTax = parseInt(rate) + parseInt(cess);
    //   console.log(it.tax_type === "Inclusive");
    if (it.tax_type === "Inclusive") {
      // it.tax_amount = it.rate * (proTax / 100) * it.quantity;
      it.tax_amount = it.rate - it.rate / (1 + proTax / 100);
      it.total = it.rate * it.quantity;
      it.taxTotal = it.rate * it.quantity;
    } else {
      it.tax_amount = it.rate * (proTax / 100) * it.quantity;
      it.total = it.rate * it.quantity;
      it.taxTotal = it.tax_amount + it.rate * it.quantity;
    }
    it.tax_amount = Math.round(it.tax_amount);
    it.total = Math.round(it.total);
    it.taxTotal = Math.round(it.taxTotal);
  } else {
    it.tax_amount = "";
    it.total = "";
    it.taxTotal = "";
  }
  addAssetPurchase.total_amount = 0;
  addAssetPurchase.totalTax = 0;
  addAssetPurchase.totalAmount = 0;
  for (let i = 0; i < addAssetPurchase?.items.length; i++)
    if (addAssetPurchase?.items[i]?.tax_amount !== "") {
      addAssetPurchase.total_amount += addAssetPurchase.items[i].taxTotal;
      addAssetPurchase.totalTax += addAssetPurchase.items[i].tax_amount;
      addAssetPurchase.totalAmount += addAssetPurchase.items[i].total;
    }
  setState(addAssetPurchase);
}
