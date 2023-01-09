import { postHttp } from "../module/api_int";

export async function getAllMembers(state, setState) {
  const { memberPaging } = state;
  await postHttp("getTeam", memberPaging).then((res) => {
    setState({ allMember: res.data, memberPaging: res.page });
  });
}
export async function getAllPartners(state, setState) {
  const { partnerPaging } = state;
  await postHttp("getPartners", partnerPaging).then((res) => {
    setState({ allPartner: res.data, partnerPaging: res.page });
  });
}

export async function getAllTeamData(state, setState) {
  await postHttp("getRoles", {}).then((res) => {
    setState({ allRols: res.data });
  });
  await postHttp("getSalaryTypes", {}).then((res) => {
    setState({ allSalatyTypes: res.data });
  });
}

export async function postMember(state, setState) {
  const { loading, addMember } = state;
  if (loading) return;
  const url = addMember.hasOwnProperty("employee_id")
    ? "updateTeam"
    : "addTeam";

  setState({ loading: true, error: null });

  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("employee_id", addMember?.employee_id);
  formData.append("name", addMember.name);
  formData.append("phone", addMember.phone);
  formData.append("email", addMember.email);
  formData.append("address", addMember.address);
  formData.append("role_id", addMember.role_id);
  formData.append("permission", JSON.stringify(addMember.permission));
  formData.append("salary", addMember.salary);
  formData.append("salary_type_id", addMember.salary_type_id);
  formData.append("system_user", addMember.system_user);
  formData.append("pin", addMember.pin);
  formData.append("password", addMember.password);
  formData.append("join_date", addMember.join_date);
  formData.append("dob", addMember.dob);

  console.log(typeof addMember.image);

  if (typeof addMember.image === "object") {
    formData.append("image", addMember.image);
    formData.append("thumbnail", addMember.image);
  }

  await postHttp(url, formData)
    .then(async (res) => {
      await getAllMembers(state, setState);
      setState({ addPage: false, addMember: {} });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
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
