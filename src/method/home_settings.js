import { postHttp } from "../module/api_int";

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
////////////////////////    BUSSINESS SETTINGS    /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getBussinessSettings(state, setState) {
  await postHttp("businessSettings", {}).then((res) => {
    setState({ bussinessSettings: res.data });
  });
  await postHttp("getBusinessTypeLists", {}).then((res) => {
    setState({ allBusinessType: res.data });
  });
}

export function bussinessSettingsValidator(e, state, setState) {
  const { bussinessSettings } = state;
  bussinessSettings[e.target.id] = e.target.value;
  setState({ bussinessSettings });
}
export function postBusinessDay(body, state, setState, setAllDay) {
  const { succesPop } = state;
  postHttp("updateBusinessDays", body)
    .then(async (res) => {
      if (body.flag === 2) setAllDay(body.from, body.to, body.active_status);
      await getBussinessSettings(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Updated days",
        desc: "Your Business Settings is Succesfully Updated",
      });
    })
    .catch((e) => {
      succesPop({
        active: true,
        title: "Error On Updating",
        desc: e,
        type: "error",
      });
    });
}
export async function postBussinessSettings(state, setState) {
  const { bussinessSettings, succesPop } = state;
  setState({ error: null, loading: true });
  await postHttp("updateBusinessSettings", bussinessSettings)
    .then(async (res) => {
      await getBussinessSettings(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: "Your Business Settings is Succesfully Updated",
      });
    })
    .catch((error) => {
      setState({ error });
      succesPop({
        active: true,
        title: "Error On Updating",
        desc: error,
        type: "error",
      });
    });
  setState({ loading: false });
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
////////////////////////    MASTERDATA SETTINGS    ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getMasterData(state, setState) {
  var getCat = postHttp("getCategories", {});
  var getKot = postHttp("getKOT", {});
  var getAssetCat = postHttp("getAssetCategories", {});
  await Promise.all([getCat, getKot, getAssetCat])
    .then((res) => {
      setState({ allCategory: res[0].data });
      setState({ allKot: res[1].data });
      setState({ allAssetCategory: res[2].data });
    })
    .catch((error) => setState({ error }));
}
export async function getAllSalesTaxes(state, setState) {
  setState({ loading: true });
  await postHttp("taxLists", {})
    .then((res) => setState({ allTax: res.data }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function postCategory(e, state, setState) {
  e.preventDefault();
  const { succesPop, loading } = state;
  if (loading) return;
  var v = e.target.stationName.value.split(",");
  const category = [];
  for (let i = 0; i < v.length; i++)
    category.push({ name: v[i].replace(/^\s+|\s+$/gm, "") });

  setState({ loading: true, error: null });
  await postHttp("addCategory", { category })
    .then(async () => {
      await getMasterData(state, setState);
      e.target.reset();
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Category list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function postAssetCategory(e, state, setState) {
  e.preventDefault();
  const { succesPop, loading } = state;
  if (loading) return;
  var v = e.target.stationName.value.split(",");
  const body = { title: [] };
  for (let i = 0; i < v.length; i++)
    body.title.push(v[i].replace(/^\s+|\s+$/gm, ""));

  setState({ loading: true, error: null });
  await postHttp("addAssetCategory", body)
    .then(async () => {
      await getMasterData(state, setState);
      e.target.reset();
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Category list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function updateCategory(k, state, setState) {
  const { succesPop, loading, allCategory } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("updateCategory", allCategory[k])
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Category list was succesfully updated",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function updateAssetCategory(k, state, setState) {
  const { succesPop, loading, allAssetCategory } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("updateAssetCategory", allAssetCategory[k])
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Category list was succesfully updated",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function deleteCategory(k, state, setState) {
  const { succesPop, loading, allCategory } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("deleteCategory", allCategory[k])
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Deleted",
        desc: "Your Category was succesfully deleted",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function deleteAssetCategory(k, state, setState) {
  const { succesPop, loading, allAssetCategory } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("deleteAssetCategory", allAssetCategory[k])
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Deleted",
        desc: "Your Category was succesfully deleted",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function updateCategoryModifier(state, setState) {
  const { succesPop, loading, addCategoryModifier } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("updateModifier", addCategoryModifier)
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: "Your Category was succesfully Updated",
      });
      setState({ addCategoryModifier: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function postTax(state, setState) {
  const { succesPop, loading, addTax } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("addTax", addTax)
    .then(async () => {
      await getAllSalesTaxes(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "New tax is succesfully added",
      });
      setState({ addTax: {} });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function updateOrDeleateTax(it, state, setState) {
  const { succesPop, loading, addTax } = state;
  if (loading) return;
  setState({ loading: true, error: null });

  const body = {
    tax_id: it.id,
    title: it.title,
    gst: it.rate,
    css: it.cess,
  };

  await postHttp(it.edited ? "updateTax" : "deleteTax", body)
    .then(async () => {
      it.edited = false;
      await getAllSalesTaxes(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: "Tax list is succesfully updated",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
export async function postKots(e, state, setState) {
  e.preventDefault();
  const { succesPop, loading } = state;
  if (loading) return;
  var v = e.target.stationName.value.split(",");
  for (let i = 0; i < v.length; i++) v[i] = v[i].replace(/^\s+|\s+$/gm, "");
  setState({ loading: true, error: null });
  await postHttp("addKOT", { title: v })
    .then(async () => {
      await getMasterData(state, setState);
      e.target.reset();
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your KOT list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function deleteKots(id, state, setState) {
  const { succesPop, loading } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("deleteKOT", { kot_id: id })
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Deleted",
        desc: "Your KOT was succesfully deleted",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function updateKots(body, state, setState) {
  const { succesPop, loading } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("updateKOT", body)
    .then(async () => {
      await getMasterData(state, setState);
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your KOT list was succesfully updated",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
////////////////////////       CASH AND BANK       ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getAllPayments(state, setState) {
  await postHttp("getPaymentMethod", {}).then((res) =>
    setState({ allPayments: res.data })
  );
}
export async function addPayments(state, setState) {
  const { addPayment } = state;
  console.log(addPayment);
  const url = addPayment?.hasOwnProperty("id")
    ? "updatePaymentMethod"
    : "addPaymentMethod";
  setState({ loading: true, error: null });
  await postHttp(url, addPayment)
    .then(async () => {
      await getAllPayments(state, setState);
      setState({ addPayment: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function deletePayments(id, state, setState) {
  setState({ loading: true, error: null });
  await postHttp("deletePaymentMethod", { payment_method_id: id })
    .then(async () => {
      await getAllPayments(state, setState);
      setState({ addPaymentConfirmPop: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
////////////////////////////    OTHER SETTINGS    /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getAllAssetAndRecExpense(state, setState) {
  setState({ loading: true });
  await postHttp("getAssetAndRecExpense", {}).then((res) => {
    setState({ assetAndRecExpense: res.data });
  });
  setState({ loading: false });
}
export async function getAllEquity(state, setState) {
  setState({ loading: true });
  await postHttp("getEquity", {}).then((res) => {
    setState({ allEquity: res.data });
  });
  setState({ loading: false });
}
export async function updateAssetAndRecExpense(state, setState) {
  const { succesPop, assetAndRecExpense } = state;
  setState({ loading: true });
  await postHttp("updateAssetAndRecExpense", assetAndRecExpense)
    .then((res) =>
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: "Your asset and Expence is succesfully updated",
      })
    )
    .catch(() => setState({ error: "Error on updating " }));
  setState({ loading: false });
}

export async function updateEquity(state, setState) {
  const { succesPop, allEquity } = state;
  setState({ loading: true });
  await postHttp("updateEquity", { equity: allEquity })
    .then((res) =>
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: "Your asset and Expence is succesfully updated",
      })
    )
    .catch(() => setState({ error: "Error on updating " }));
  setState({ loading: false });
}
