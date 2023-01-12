import { getHttp, postHttp } from "../module/api_int";
import { newPurchaseStructure } from "../widget/widgetFormPurchase";

export const purchaseGetAllPurchase = async (state, setState) => {
  const { purchasePaging } = state;
  setState({ loading: true, error: null });
  await postHttp("getPurchase", purchasePaging).then((res) => {
    setState({ allPurchaseList: res.data, purchasePaging: res.page });
  });
  await postHttp("purchaseLastInvoiceNumber", {}).then((res) =>
    setState({ lastInvoice: "API Pending" })
  );
  postHttp("getSuppliersLists", {}).then((res) =>
    setState({ allSuppliers: res.data })
  );
  postHttp("taxLists", {}).then((res) => setState({ allTax: res.data }));
  postHttp("getAccounts", {}).then((res) => setState({ allAccount: res.data }));
  setState({ loading: false });
};

export const postPurchaseList = async (flag, state, setState) => {
  const { form, succesPop, loading } = state;
  if (loading) return;
  const body = JSON.parse(JSON.stringify(form));
  body.cashier_id = window.localStorage.getItem("userId");
  body.items.pop();
  setState({ loading: true, error: null });
  await postHttp("addPurchase", body)
    .then(async () => {
      await purchaseGetAllPurchase(state, setState);
      setState({ form: JSON.parse(JSON.stringify(newPurchaseStructure)) });
      if (flag === "save") setState({ form: null });

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
      await purchaseGetAllPurchase(state, setState);
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

export const getSingleProdect = async (id) => {
  return await getHttp("getProduct/" + id);
};

export const purchaseGetPurchase = async (k, state, setState) => {
  var { allPurchaseList, addPaymentRecord } = state;
  addPaymentRecord = {};
  setState({ selected: allPurchaseList[k], addPaymentRecord });
  await postHttp("getPurchaseDetails", { id: allPurchaseList[k].id }).then(
    (res) => {
      addPaymentRecord.purchase_id = res.data?.id;
      setState({ selected: { ...allPurchaseList[k], ...res.data } });
    }
  );
  postHttp("getPaymentMethod", {}).then((res) => {
    setState({ allPaymentMethod: res.data });
  });
};
