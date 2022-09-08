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

export async function salesSearchProduct(v, setData) {
  if (v === "") setData([]);
  else
    await postHttp("getSearchProducts", { serach: v }).then((res) =>
      setData(res.data)
    );
}

export const postInvoice = async (state, setState) => {
  const { form, succesPop } = state;
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addOrder", form)
    .then(async () => {
      await salesGetSales(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Sales list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};

export const postEstimate = async (state, setState) => {
  const { form, succesPop } = state;
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addOrder", form)
    .then(async () => {
      await salesGetSales(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Sales list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};
