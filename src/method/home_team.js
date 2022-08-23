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
  const { loading, addPartner, isEdit, succesPop } = state;
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

export async function deletePartner(id, state, setState) {
  const { loading, succesPop } = state;
  if (loading) return;
  setState({ loading: true, error: null });
  await postHttp("deletePartner", { id })
    .then(async (res) => {
      await getAllPartners(state, setState);
      setState({ deletePartnerConfirmPop: null, addPartner: {} });
      succesPop({
        active: true,
        title: "Succesfully Deleted",
        desc: "The partner has been succesfully deleted",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function updatedPartner(item, state, setState) {
  const { loading, succesPop } = state;
  if (loading) return;
  const status = item.status === "ACTIVE" ? 0 : 1;
  setState({ loading: true, error: null });
  await postHttp("updatePartnerStatus", { status, id: item.id })
    .then(async () => {
      await getAllPartners(state, setState);
      setState({ deletePartnerConfirmPop: null, addPartner: {} });
      succesPop({
        active: true,
        title: "Succesfully Updated",
        desc: "The partner has been succesfully updated",
      });
    })
    .catch((desc) =>
      succesPop({
        active: true,
        title: "Error On Updating",
        desc,
        type: "error",
      })
    );
  setState({ loading: false });
}
