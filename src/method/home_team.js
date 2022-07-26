import { postHttp } from "../module/api_int";

export async function getAllMembers(state, setState) {
  await postHttp("getCustomers", {}).then((res) => {
    // console.log(res.data);
    setState({ allTeamMember: res.data });
  });
}
export async function getAllPartners(state, setState) {
  await postHttp("getPartners", {}).then((res) => {
    console.log(res.data);
    setState({ allTeamPartner: res.data });
  });
}
