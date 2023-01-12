export function calculatePurchaseTax(it, state, setState) {
  const { form, allTax } = state;

  if (
    it.quantity !== undefined &&
    it.quantity !== "" &&
    //   it.rate !== undefined &&
    //   it.rate !== "" &&
    it.tax_id !== undefined &&
    it.tax_id !== "" //&&
    //   it.tax_type !== undefined &&
    //   it.tax_type !== ""
  ) {
    const rate = allTax.filter((it1) => it1.id == it.tax_id)[0].rate;
    const cess = allTax.filter((it1) => it1.id == it.tax_id)[0].cess;
    const proTax = parseInt(rate) + parseInt(cess);
    if (it.tax_type === "Inclusive") {
      it.CESS =
        (it.price - it.price / (1 + parseInt(cess) / 100)) * it.quantity;
      it.CGST =
        (it.price - it.price / (1 + parseInt(cess) / 100)) * it.quantity;

      it.tax_amount = it.price - it.price / (1 + proTax / 100);
      it.total_price = it.price * it.quantity;
      it.taxTotal = it.price * it.quantity;
    } else {
      it.tax_amount = it.price * (proTax / 100) * it.quantity;
      it.total_price = it.price * it.quantity;
      it.taxTotal = it.tax_amount + it.price * it.quantity;
    }
    it.tax_amount = Math.round(it.tax_amount);
    it.stock_tax = Math.round(it.tax_amount);
    it.total = Math.round(it.total);
    it.taxTotal = Math.round(it.taxTotal);
  } else {
    it.tax_amount = "";
    it.total = "";
    it.taxTotal = "";
  }
  form.total_amount = 0;
  form.totalTax = 0;
  form.totalAmount = 0;
  form.balance_amount = 0;
  for (let i = 0; i < form?.items.length; i++)
    if (form?.items[i]?.tax_amount !== "") {
      form.total_amount += form.items[i].taxTotal;
      form.totalTax += form.items[i].tax_amount;
      form.totalAmount += form.items[i].total;
      form.balance_amount += form.items[i].total;
    }
  setState(form);
}
