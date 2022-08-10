import { postHttp } from "../module/api_int";

export async function getAllCashandBank(state, setState) {
  await postHttp("getAccounts", {}).then((res) => {
    console.log(res.data);
    setState({ allAccounts: res.data });
  });
}
