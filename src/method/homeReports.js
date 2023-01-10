import { getHttp, postHttp } from "../module/api_int";
import { getTodayType1 } from "../module/simple";

var pathStore = "";

export const getReport = async (path, state, setState) => {
  const { selectedDate, selectedProdect } = state;
  if (path === null) path = pathStore;
  else pathStore = path;

  setState({ report: { items: [] }, loading: true });
  const body = {
    from_date: "01-01-2022",
    // from_date: selectedDate?.from || getTodayType1(), //"01-01-2022",
    to_date: selectedDate?.to || getTodayType1(), //"26-12-2022",
    //
    order_by: "count",
    //
    group_by: "category",
    current_from_date: "01-01-2022",
    current_to_date: "26-12-2022",
    previous_from_date: "01-01-2021",
    previous_to_date: "31-12-2021",
  };
  await postHttp(path, body)
    .then((res) => {
      if (path === "report/sales/salesInvoices") {
        var total = 0;
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].cash =
            Number(res.data[i].total_amount) -
            Number(res.data[i].balance_amount);
          total += Number(res.data[i].total_amount);
        }
        setState({ report: { items: res.data, total } });
        return;
      }

      if (path === "report/sales/saleRank") {
        var total = 0;
        for (let i = 0; i < res.data.length; i++)
          total += Number(res.data[i].sales_amount);
        setState({ report: { items: res.data, total } });
        return;
      }

      // //////////////////////////////////////////////////////////////
      // //////////////////////////////////////////////////////////////
      // //////////////////////////////////////////////////////////////
      // //////////////////////////////////////////////////////////////

      setState({ report: res.data });
    })
    .catch(() => {});
  setState({ loading: false });
};

export async function reportSearchProduct(v, setData) {
  if (v === "") setData([]);
  else
    await postHttp("getSearchProducts", { serach: v }).then((res) =>
      setData(res.data)
    );
}

export const reportGetSingleProdect = async (id) => {
  return await getHttp("getProduct/" + id);
};
