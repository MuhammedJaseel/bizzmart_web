import { postHttp } from "../module/api_int";

export async function getBussinessSettings(state, setState) {
  await postHttp("businessSettings", {}).then((res) => {
    setState({ bussinessSettings: res.data });
  });
}

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
////////////////////////    BUSSINESS SETTINGS    /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
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
