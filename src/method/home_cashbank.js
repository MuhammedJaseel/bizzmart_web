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
  const { account_display_name, account_number } = addAccount;
  addAccount.account_display_name = `${account_display_name} ${account_number.substr(
    account_number.length - 4
  )}`;

  const url = addAccount.hasOwnProperty("id") ? "updateAccount" : "addAccount";
  setState({ loading: true, error: null });
  await postHttp(url, addAccount)
    .then(async () => {
      await getAllCashandBank(state, setState);
      setState({ addAccount: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function deleteAccount(id, state, setState) {
  const { succesPop } = state;
  setState({ loading: true, error: null });
  await postHttp("deleteAccount", { account_id: id })
    .then(async () => {
      await getAllCashandBank(state, setState);
      setState({ accountConfirmPop: null });
    })
    .catch((e) => {
      succesPop({
        active: true,
        title: "Error On Updating",
        desc: e,
        type: "error",
      });
    });
  setState({ loading: false });
}
