import { postHttp } from "../module/api_int";

export const gerReport = (path, state, setState) => {
  setState({ report: { items: [] } });
  const body = {
    from_date: "01-01-2022",
    to_date: "26-12-2022",
    //
    order_by: "count",
    //
    group_by: "category",
    current_from_date: "01-01-2022",
    current_to_date: "26-12-2022",
    previous_from_date: "01-01-2021",
    previous_to_date: "31-12-2021",
  };
  postHttp(path, body)
    .then((res) => {
      if (path === "report/sales/salesInvoices")
        setState({ report: { items: res.data } });
      else setState({ report: res.data });
    })
    .catch(() => {});
};
