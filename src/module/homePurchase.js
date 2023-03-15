export function calculatePurchaseTax(it, state, setState) {
  const { form, allTax } = state;
  if (
    it.quantity !== undefined &&
    it.quantity !== "" &&
    it.tax_id !== undefined &&
    it.tax_id !== ""
  ) {
    const rate = allTax.filter((it1) => it1.id == it.tax_id)[0].rate;
    const cess = allTax.filter((it1) => it1.id == it.tax_id)[0].cess;
    const proTax = parseInt(rate) + parseInt(cess);
    if (it.tax_type === "Inclusive") {
      it.tax_amount = it.rate - (it.rate / (1 + proTax / 100)) * it.quantity;
      it.taxAmount = it.rate - it.rate / (1 + proTax / 100);
      it.price = it.rate - it.taxAmount;
    } else {
      it.tax_amount = it.rate * (proTax / 100) * it.quantity;
      it.taxAmount = it.rate * (proTax / 100);
      it.price = it.rate;
    }

    it.price = Math.round(it.price);

    it.total_price = it.price * it.quantity + it.tax_amount;
    it.taxTotal = it.tax_amount + it.rate * it.quantity;
    it.CESS = (it.rate - it.rate / (1 + parseInt(cess) / 100)) * it.quantity;

    it.SCGST = it.tax_amount / 2;
    it.CGST = it.tax_amount / 2;
    it.tax_amount = Math.round(it.tax_amount);
    it.stock_tax = Math.round(it.taxAmount);
    it.stock_price = Math.round(it.price);
    it.total = Math.round(it.total);
    it.taxTotal = Math.round(it.taxTotal);
    it.cost_with_tax = Number(it.stock_tax) + Number(it.stock_price);
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
      form.total_amount += form.items[i].total_price;
      form.totalTax += form.items[i].tax_amount;
    }
  form.total_amount = Math.round(form.total_amount);
  form.totalTax = Math.round(form.totalTax);
  form.balance_amount += form.total_amount;
  setState(form);
}
