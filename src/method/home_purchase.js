import { postHttp } from "../module/api_int";

export const purchaseGetPurchase = async (state, setState) => {
  const { purchasePaging, estimatePaging } = state;
  setState({ loading: true, error: null });
  await postHttp("getPurchase", purchasePaging).then((res) => {
    setState({ allPurchaseList: res.data, purchasePaging: res.page });
  });
  await postHttp("orderLastInvoiceNo", estimatePaging).then((res) => {
    setState({ allEstimate: res.data, estimatePaging: res.page });
  });
  setState({ loading: false });
};
