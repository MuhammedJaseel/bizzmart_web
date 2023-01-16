import { getHttp, postHttp } from "../module/api_int";
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
  // await postHttp("stockAcknowledged", productPaging)
  //   .then((res) => setState({ allStockAcknowledged: res }))
  //   .catch((error) => setState({ error }));
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
export async function inventorySetSearchProductStockIssue(id, setCost) {
  await getHttp("getProduct/" + id).then((res) => {
    setCost({
      price: res.data?.selling_price,
      selling_price: res.data?.selling_price,
      actual_price: res.data?.selling_price,
      product_type: res.data?.product_type,
      unit: res.data?.primary_unit,
      variant: res.data?.variant,
    });
  });
  return;
}
