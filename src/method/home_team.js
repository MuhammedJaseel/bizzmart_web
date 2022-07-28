import { postHttp } from "../module/api_int";

export async function getAllMembers(state, setState) {
  await postHttp("getCustomers", {}).then((res) => {
    // console.log(res.data);
    setState({ allMember: res.data });
  });
}
export async function getAllPartners(state, setState) {
  await postHttp("getPartners", {}).then((res) => {
    console.log(res.data);
    setState({ allPartner: res.data });
  });
}

export async function postMember(body, state, setState) {
  const { loading } = state;
  if (loading) return;
  console.log(body);
  // setState({ loading: true, error: null });
  // await postHttp("addMember", body)
  //   .then(async (res) => {
  //     await getAllMembers(state, setState);
  //     setState({ addPage: false, addMember: {} });
  //   })
  //   .catch((error) => setState({ error }));
  // setState({ loading: false });
}

export async function postPartner(state, setState) {
  const { loading, addPartner, isEdit,succesPop } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp(isEdit ? "updatePartner" : "addPartner", addPartner)
    .then(async (res) => {
      await getAllPartners(state, setState);
      setState({ addPage: false, addPartner: {} });
      succesPop({
        active: true,
        title: "Succesfully updated",
        desc: "The partner has been succesfully updated",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
