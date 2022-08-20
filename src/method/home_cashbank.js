import { postHttp } from "../module/api_int";

export async function getAllCashandBank(state, setState) {
  await postHttp("getAccounts", {}).then((res) =>
    setState({ allAccounts: res.data })
  );
  await postHttp("getBankWithAggregateLists", {}).then((res) =>
    setState({ allBanks: res.data.banks })
  );
}
export async function addCashandBank(state, setState) {
  const { addAccount } = state;
  setState({ loading: true, error: null });
  await postHttp("addAccount", addAccount)
    .then(async () => {
      await getAllCashandBank(state, setState);
      setState({ addAccountPopup: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function deleteAccount(id, state, setState) {
  setState({ loading: true, error: null });
  await postHttp("deleteAccount", { account_id: id })
    .then(async () => {
      await getAllCashandBank(state, setState);
      setState({ accountConfirmPop: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
