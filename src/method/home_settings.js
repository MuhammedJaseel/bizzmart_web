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
export function postBusinessDay(body) {
  postHttp("updateBusinessDays", body)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
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
////////////////////////    BUSSINESS SETTINGS    /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
export async function getKots(state, setState) {
  await postHttp("getKOT", {}).then((res) => {
    setState({ allKot: res.data });
  });
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
    await getKots(state, setState);
    setState({ deleteKot: [], addKot: [] });
  }
  setState({ loading: false, error });
}
