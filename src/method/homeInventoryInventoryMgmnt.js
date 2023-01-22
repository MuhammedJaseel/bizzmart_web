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
  await postHttp("getStockTakingLists", productPaging)
    .then((res) => {
      setState({ allStockTaking: res });
      console.log(res.data);
    })
    .catch((error) => setState({ error }));
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
  await postHttp("getStockIssueItem", { stock_issued_id: id })
    .then((res) => setState({ addIssueStock: { ...res.data, _IsEdit: true } }))
    .catch(() => setState({ error: "Error On feching data" }));
  setState({ loading: false });
}

export async function getSingleStockRecived(id, state, setState) {
  setState({ loading: true });
  await postHttp("getStockItemDetails", { stock_issued_id: id })
    .then((res) =>
      setState({ addIssueStock: { ...res.data, _IsAcknowledging: true, id } })
    )
    .catch(() => setState({ error: "Error On feching data" }));
  setState({ loading: false });
}

export async function makeStockAcnowledged(id, state, setState) {
  setState({ loading: true });
  await postHttp("stockAcknowledged", { stock_issued_id: id })
    .then((res) => {
      getInventoryManagment(state, setState);
      setState({ page: null, addIssueStock: null });
    })
    .catch(() => setState({ error: "Error On feching data" }));
  setState({ loading: false });
}

export async function getStockTrailList(state, setState) {
  const { stockTrailProdect, loading } = state;

  if (loading) return;
  setState({ loading: true });
  await postHttp("report/getStockTril", stockTrailProdect)
    .then((res) => {
      stockTrailProdect.selected = true;
      setState({ allStockTrails: res.data, stockTrailProdect });
    })
    .catch(() => setState({ error: "Error On feching data" }));
  setState({ loading: false });
}

export async function postInventoryCountRequest(state, setState) {
  const { newInventoryCount, loading, succesPop } = state;

  newInventoryCount.from_branch_id = window.localStorage.getItem("branchId");

  if (loading) return;
  setState({ loading: true });
  await postHttp("createStockTaking", newInventoryCount)
    .then((res) => {
      getInventoryManagment(state, setState);
      succesPop({
        active: true,
        title: "Request Created Succesfully",
        desc: "Updated Successfully",
      });
      setState({ newInventoryCount: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function getCategoryForInventoryCountRequest(
  branch_id,
  state,
  setState
) {
  var { newInventoryCount } = state;
  newInventoryCount.category = [];
  setState({ loading: true, newInventoryCount });
  await postHttp("getCategories", { branch_id })
    .then((res) => {
      newInventoryCount.allCategory = res.data;
      setState({ newInventoryCount });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function onClickStartCount(state, setState) {
  var { newInventoryCount, page } = state;
  setState({ loading: true });
  await postHttp("countingStart", { stock_taking_id: page?.stock_taking_id })
    .then(async (res) => {
      setState({ newInventoryCount });
      await getStockTakingProdectList(page?.stock_taking_id, state, setState);
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function getStockTakingProdectList(id, state, setState) {
  var { countingProductList } = state;
  setState({ loading: true });
  await postHttp("getReviewProductLists", { stock_taking_id: id })
    .then((res) => setStockTakingProdectCount({ items: res.data }, setState))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export function setStockTakingProdectCount(data, setState) {
  const counted = [];
  const notCounted = [];
  for (let i = 0; i < data?.items.length; i++)
    if (Number(data?.items[i].counted) > 0) counted.push(data?.items[i]);
    else notCounted.push(data?.items[i]);
  setState({
    countingProductList: {
      ...data,
      counted: counted,
      notCounted: notCounted,
    },
  });
}

export async function postInventoryCountedItems(state, setState) {
  var { countingProductList, succesPop, page } = state;
  setState({ loading: true });
  await postHttp("getReviewProductLists", {
    stock_taking_id: page?.stock_taking_id,
    counted_items: countingProductList?.items,
  })
    .then((res) =>
      succesPop({
        active: true,
        title: "Updated Successfully",
        desc: "Prodect counted up to this is succesfully saved",
      })
    )
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function postInventoryCountedAsSubmit(state, setState) {
  var { countingProductList, succesPop, page } = state;
  setState({ loading: true });
  await postHttp("submitReview", {
    stock_taking_id: page?.stock_taking_id,
    counted_items: countingProductList?.items,
  })
    .then((res) => {
      succesPop({
        active: true,
        title: "Updated Successfully",
        desc: "Prodect counted up to this is succesfully saved",
      });
      setState({ page: null });
      getInventoryManagment(state, setState);
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

export async function getAllInventoryCountingReivew(state, setState) {
  var { allReviewItems, page } = state;
  setState({ loading: true });
  await postHttp("AllReviewedLists", { stock_taking_id: page?.stock_taking_id })
    .then((res) => setState({ allReviewItems: { all: res.data } }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
