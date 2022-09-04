import { postHttp } from "../module/api_int";

export async function getAllCashandBank(state, setState) {
  await postHttp("getAccounts", {}).then((res) =>
    setState({ allAccounts: res.data })
  );
  await postHttp("getBankWithAggregateLists", {}).then((res) =>
    setState({ allBanks: res.data.banks })
  );
  await postHttp("fundTransferTypeLists", {}).then((res) =>
    setState({ allTransferType: res.data })
  );
  await postHttp("getContact", {}).then((res) =>
    setState({ allContact: res.data })
  );
  await postHttp("getPaymentModeLsist", {}).then((res) =>
    setState({ allPaymenyMode: res.data })
  );
}
export async function getAllContact(state, setState) {
  await postHttp("getContact", {}).then((res) =>
    setState({ allContact: res.data })
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
      setState({ confirmPop: null });
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

export async function postFundTransfer(state, setState) {
  const { fundTransfer, succesPop } = state;
  setState({ loading: true, error: null });
  await postHttp("fundTransfer", fundTransfer)
    .then(async () => {
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Yout transaction has been succesfully added.",
      });
      setState({ fundTransfer: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function getBankHistory(it, state, setState) {
  const { account } = state;
  setState({ account: it, page: 1, allHistory: [], error: null });
  await postHttp("accountTransactions", {
    account_id: it.id,
    from_date: "01-01-2021",
    to_date: "25-10-2022",
  }).then((res) =>
    setState({ account: { ...it, ...res.data }, historyPaging: res.page })
  );
}

export async function postReceiveMoney(state, setState) {
  const { receiveMoney, succesPop } = state;
  setState({ loading: true, error: null });
  await postHttp("addContactReceiveMoney", receiveMoney)
    .then(async () => {
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Yout transaction has been succesfully added.",
      });
      setState({ receiveMoney: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function postSpendMoney(state, setState) {
  const { spendMoney, succesPop } = state;
  setState({ loading: true, error: null });
  await postHttp("addContactSpendMoney", spendMoney)
    .then(async () => {
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Yout transaction has been succesfully added.",
      });
      setState({ spendMoney: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function postContact(state, setState) {
  const { spendMoney, receiveMoney } = state;
  setState({ loading: true, error: null });
  await postHttp("addContact", spendMoney ?? receiveMoney)
    .then(async (res) => {
      await getAllContact(state, setState);
      if (spendMoney !== null) spendMoney.contact_id = res.data.id;
      if (receiveMoney !== null) receiveMoney.contact_id = res.data.id;
    })
    .catch((error) => setState({ error }));
  setState({ loading: false, spendMoney, receiveMoney });
}
