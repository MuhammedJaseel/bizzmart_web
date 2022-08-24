import { postHttp } from "../module/api_int";

export const salesGetSales = async (state, setState) => {
  const { invoicePaging, estimatePaging } = state;
  setState({ loading: true, error: null });
  await postHttp("orderLastInvoiceNo", invoicePaging).then((res) => {
    setState({ allInvoice: res.data, invoicePaging: res.page });
  });
  await postHttp("orderLastInvoiceNo", estimatePaging).then((res) => {
    setState({ allEstimate: res.data, estimatePaging: res.page });
  });
  setState({ loading: false });
};
