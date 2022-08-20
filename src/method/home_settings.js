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
  var getCat = postHttp("categoryLists", {});
  var getKot = postHttp("getKOT", {});
  await Promise.all([getCat, getKot])
    .then((res) => {
      setState({ allCategory: res[0].data });
      setState({ allKot: res[1].data });
    })
    .catch((error) => setState({ error }));
}
export async function submitKots(state, setState) {
  const { deleteKot, addKot } = state;
  var error = null;
  setState({ loading: true });
  if (addKot.length !== 0)
    await postHttp("addKOT", { title: addKot }).catch((e) => (error = e));
  for (let i = 0; i < deleteKot.length; i++)
    await postHttp("deleteKOT", { kot_id: deleteKot[i] }).catch(
      (e) => (error = e)
    );
  if (error === null) {
    await getMasterData(state, setState);
    setState({ deleteKot: [], addKot: [] });
  }
  setState({ loading: false, error });
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
  const { addPayment, addPaymentPop } = state;
  const url =
    addPaymentPop === "Edit" ? "updatePaymentMethod" : "addPaymentMethod";
  setState({ loading: true, error: null });
  await postHttp(url, addPayment)
    .then(async () => {
      await getAllPayments(state, setState);
      setState({ addPaymentPop: null });
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
