import { postHttp } from "../module/api_int";

export const purchaseGetPurchase = async (state, setState) => {
  const { purchasePaging, estimatePaging } = state;
  setState({ loading: true, error: null });
  await postHttp("getPurchase", purchasePaging).then((res) => {
    setState({ allPurchaseList: res.data, purchasePaging: res.page });
  });
  await postHttp("purchaseLastInvoiceNumber", estimatePaging).then((res) =>
    setState({ lastInvoice: "API Pending" })
  );
  setState({ loading: false });
};

export const postPurchaseList = async (state, setState) => {
  const { form, succesPop } = state;
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addPurchase", form)
    .then(async () => {
      await purchaseGetPurchase(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Purchase list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};

export const postPurchaseOrder = async (state, setState) => {
  const { form, succesPop } = state;
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addPurchase", form)
    .then(async () => {
      await purchaseGetPurchase(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Purchase list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};
