import { getHttp, postHttp } from "../module/api_int";
import { setAddStockIssueItemStruct } from "../module/homeInventoryInventoryMgmnt";
import { getProducts } from "./homeInventory";

// //////////////////////

export async function getInventoryManagment(state, setState) {
  const { productPaging } = state;
  await postHttp("getStockIssueLists", productPaging)
    .then((res) => setState({ allStockIssue: res }))
    .catch((error) => setState({ error }));
  await postHttp("stockReceivedLists", productPaging)
    .then((res) => setState({ allStockRecevied: res }))
    .catch((error) => setState({ error }));
  await postHttp("stockAcknowledgesLists", productPaging)
    .then((res) => setState({ allStockAcknowledged: res }))
    .catch((error) => setState({ error }));
  await postHttp("getMSLLookupLists", productPaging)
    .then((res) => setState({ allStockReturn: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
  return;
}
// //////////////////////

export async function postPriceChange(state, setState) {
  const { loading, addPriceChange, succesPop } = state;
  if (loading) return 0;

  // --START-- Form validation
  //   if (addPriceChange.supplier_id === undefined) {
  //     setState({ error: "Select supplier" });
  //     return;
  //   }
  // --END-- Form validation end

  postHttp("priceChange", addPriceChange)
    .then(() => {
      succesPop({
        active: true,
        title: "Price successfully changed",
        desc: "Updated Successfully",
      });
      setState({ addPriceChange: undefined });
      getProducts(state, setState);
    })
    .catch(() => setState({ error: "Error On changing price" }));
  setState({ loading: false });
}

export async function inventorySearchProductStockIssue(v, setData) {
  if (v === "") setData([]);
  else
    await postHttp("getSearchProducts", { serach: v }).then((res) =>
      setData(res.data)
    );
}

export const getStockIssueSingleProdect = async (id) => {
  return await getHttp("getProduct/" + id);
};

export const postStockIssue = async (state, setState, back) => {
  const { addIssueStock, loading } = state;
  if (loading || addIssueStock?._IsEdit) return false;

  // --START-- Form validation
  if (addIssueStock.main_branch_id === "") {
    setState({ error: "Select main branch" });
    return;
  }
  if (addIssueStock.issue_date === "") {
    setState({ error: "Select issue date" });
    return;
  }
  if (addIssueStock.to_branch_id === "") {
    setState({ error: "Select transfering to branch" });
    return;
  }
  // --END-- Form validation end

  const body = JSON.parse(JSON.stringify(addIssueStock));
  // body.cashier_id = window.localStorage.getItem("userId");
  body.items.pop();

  setState({ error: null, loading: true });
  await postHttp("addStockIssue", body)
    .then(() => {
      getInventoryManagment(state, setState);
      if (back) setState({ page: null, addIssueStock: null });
      else setState({ addIssueStock: setAddStockIssueItemStruct() });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};

export async function getSingleStockIssue(id, state, setState) {
  setState({ loading: true });
  postHttp("getStockIssueItem", { stock_issued_id: id })
    .then((res) => setState({ addIssueStock: { ...res.data, _IsEdit: true } }))
    .catch(() => setState({ error: "Error On feching data" }));
  setState({ loading: false });
}

export async function getSingleStockRecived(id, state, setState) {
  setState({ loading: true });
  postHttp("stockAcknowledged", { stock_issued_id: id })
    .then((res) => setState({ addIssueStock: { ...res.data, _IsEdit: true } }))
    .catch(() => setState({ error: "Error On feching data" }));
  setState({ loading: false });
}
