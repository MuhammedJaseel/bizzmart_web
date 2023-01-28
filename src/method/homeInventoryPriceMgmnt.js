import { postHttp } from "../module/api_int";

// //////////////////////
export async function getAllPriceLookupList(state, setState) {
  const { priceLookupList } = state;
  setState({ loading: true });
  await postHttp("getPriceLookupLists", priceLookupList?.page ?? {})
    .then((res) => setState({ priceLookupList: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function getAllStockLookupList(state, setState) {
  const { stockLookupList } = state;
  setState({ loading: true });
  await postHttp("getStockLookupLists", stockLookupList?.page ?? {})
    .then((res) => setState({ stockLookupList: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function getAllPriceChangeList(state, setState) {
  const { priceChangeList } = state;
  setState({ loading: true });
  await postHttp("products", priceChangeList?.page ?? {})
    .then((res) => setState({ priceChangeList: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
}
export async function getAllMaslLookupList(state, setState) {
  const { maslLookupList } = state;
  setState({ loading: true });
  await postHttp("getMSLLookupLists", maslLookupList?.page ?? {})
    .then((res) => setState({ maslLookupList: res }))
    .catch((error) => setState({ error }));
  setState({ loading: false });
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
      setState({ addPriceChange: null });
      getAllPriceChangeList(state, setState);
    })
    .catch(() => setState({ error: "Error On changing price" }));
  setState({ loading: false });
}
