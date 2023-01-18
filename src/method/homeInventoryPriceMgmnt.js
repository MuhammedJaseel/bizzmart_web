import { postHttp } from "../module/api_int";
import { getProducts } from "./homeInventory";

// //////////////////////
export async function getPriceManagment(state, setState) {
  const { productPaging } = state;
  await postHttp("getPriceLookupLists", productPaging)
    .then((res) => setState({ priceLookupList: res }))
    .catch((error) => setState({ error }));
  await postHttp("getStockLookupLists", productPaging)
    .then((res) => setState({ stockLookupList: res }))
    .catch((error) => setState({ error }));
  await postHttp("getMSLLookupLists", productPaging)
    .then((res) => setState({ maslLookupList: res }))
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
