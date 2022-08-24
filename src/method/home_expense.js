import { postHttp } from "../module/api_int";

export const expenseGetExpenses = async (state, setState) => {
  const { expensesPaging } = state;
  setState({ loading: true, error: null });
  await postHttp("getPurchase", expensesPaging).then((res) => {
    setState({ allExpense: res.data, expensesPaging: res.page });
  });

  setState({ loading: false });
};
