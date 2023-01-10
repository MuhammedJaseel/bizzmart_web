import { postHttp } from "../module/api_int";
import { getTodayType1 } from "../module/simple";

export const expenseGetExpenses = async (state, setState) => {
  const { expensesPaging } = state;
  setState({ loading: true, error: null });
  await postHttp("getExpense", expensesPaging).then((res) => {
    setState({ allExpense: res.data, expensesPaging: res.page });
  });

  setState({ loading: false });
};
export const expenseGetAllDetails = async (state, setState) => {
  const { expensesPaging } = state;
  setState({ loading: true, error: null });
  await postHttp("expenseLastInvoiceNumber", expensesPaging).then((res) => {
    setState({ invoiceNumber: res.data.invoice_no });
  });
  await postHttp("expenseHeadLists", expensesPaging).then((res) => {
    setState({ allExpenseHead: res.data });
  });
  await postHttp("getAccounts", {}).then((res) =>
    setState({ allAccounts: res.data })
  );
  await postHttp("fundTransferTypeLists", {}).then((res) =>
    setState({ allTransferType: res.data })
  );
  await postHttp("taxLists", {}).then((res) => setState({ allTax: res.data }));
  setState({ loading: false });
};

export const postExpense = async (state, setState) => {
  const { form, succesPop } = state;
  form.date = getTodayType1();
  form.user_id = window.localStorage.getItem("userId");
  setState({ loading: true, error: null });
  await postHttp("addExpense", form)
    .then(async () => {
      await expenseGetExpenses(state, setState);
      setState({ form: null });
      succesPop({
        active: true,
        title: "Succesfully Added",
        desc: "Your Expense list was succesfully added",
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};
