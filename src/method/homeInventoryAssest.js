import { postHttp } from "../module/api_int";
import { assetPurchaseStruct } from "../module/homeInventoryAssets";

export const getAllAssetsList = async (state, setState) => {
  const { allFixedAssets, allAssignedAssets } = state;
  setState({ loading: true });
  await postHttp("getAsserLists", allFixedAssets?.page ?? {}).then((res) =>
    setState({ allFixedAssets: res })
  );
  await postHttp("getassignedAssetLists", allAssignedAssets?.page ?? {}).then(
    (res) => setState({ allAssignedAssets: res })
  );
  setState({ loading: false });
};

export const getAllassets = async (state, setState) => {
  await postHttp("getSuppliersLists", {}).then((res) =>
    setState({ allSuppliers: res.data })
  );
  await postHttp("getAsset", {}).then((res) =>
    setState({ allAssets: res.data })
  );
  await postHttp("getCustodianLists", {}).then((res) =>
    setState({ allCustodian: res.data })
  );
  await postHttp("allBranchLists", {}).then((res) =>
    setState({ allBranches: res.data })
  );
  await postHttp("getPaymentModeLsist", {}).then((res) =>
    setState({ allPaymenyMode: res.data })
  );
};

export const getAllAssetsCategory = async (state, setState) => {
  setState({ loading: true, allAssetsCategory: [] });
  await postHttp("getAssetCategories", {})
    .then((res) => setState({ allAssetsCategory: res.data }))
    .catch(() => setState({ error: "Error on loading asset category" }));
  setState({ loading: false });
};

export const getAssetStockLists = async (body, setAssetStock, setState) => {
  setState({ loading: true, allAssetsCategory: [] });
  await postHttp("getAssetStockLists", body)
    .then((res) => setAssetStock(res.data))
    .catch(() => setState({ error: "Error on loading asset stock list" }));
  setState({ loading: false });
};

export const postAsset = async (state, setState) => {
  const { loading, addAsset, succesPop } = state;
  if (loading) return 0;
  setState({ error: null, loading: true });

  await postHttp("addAsset", addAsset)
    .then(async () => {
      succesPop({
        active: true,
        title: "Asset added successfully",
        desc: "Updated Successfully",
      });
      setState({ addAsset: undefined });
      await getAllassets(state, setState);
    })
    .catch(() => setState({ error: "Errro on adding asset" }));
  setState({ loading: false });
};

export const postExistingAsset = (state, setState, close) => {
  const { loading, addExistingAsset, succesPop } = state;
  if (loading) return 0;
  const body = JSON.parse(JSON.stringify(addExistingAsset));
  body.items.pop();
  postHttp("addExistingAsset", body)
    .then(() => {
      succesPop({
        active: true,
        title: "Asset added successfully",
        desc: "Updated Successfully",
      });
      if (close) setState({ page: null });
      else
        setState({
          addExistingAsset: {
            asset_note: "",
            items: [
              {
                asset_id: "",
                asset_category_id: "",
                quantity: 0,
                current_value: 0,
                branch_id: "",
                user_id: "",
                total: 0,
              },
            ],
          },
        });
    })
    .catch(() => setState({ error: "Error On adding asset" }));
  setState({ loading: false });
};

export const postAssetPurchase = async (state, setState, close) => {
  const { loading, addAssetPurchase, succesPop } = state;
  if (loading) return 0;

  const body = JSON.parse(JSON.stringify(addAssetPurchase));
  body.items.pop();

  // --START-- Form validation
  if (body.supplier_id === "") {
    setState({ error: "Select supplier" });
    return;
  }
  if (body.purchase_date === "") {
    setState({ error: "Select purchase date" });
    return;
  }
  if (body.payment_mode === "") {
    setState({ error: "Select payment mode" });
    return;
  }
  if (body.due_date === "") {
    setState({ error: "Select due date" });
    return;
  }
  // --END-- Form validation end
  setState({ loading: true, error: null });

  await postHttp("addAssetPurchase", body)
    .then(() => {
      succesPop({
        active: true,
        title: "Asset purchase added successfully",
        desc: "Updated Successfully",
      });
      if (close) setState({ page: null });
      else setState({ addAssetPurchase: assetPurchaseStruct });
    })
    .catch(() => setState({ error: "Error On adding asset purchase" }));
  setState({ loading: false });
};

export const postTransferAsset = async (state, setState) => {
  const { loading, assetTransfer, succesPop } = state;
  if (loading) return 0;

  // --START-- Form validation
  if (assetTransfer.from_branch_id === undefined) {
    setState({ error: "Select transfer from branch" });
    return;
  }
  if (assetTransfer.asset_id === undefined) {
    setState({ error: "Select asset" });
    return;
  }
  if (assetTransfer.to_branch_id === undefined) {
    setState({ error: "Select transfer to branch" });
    return;
  }
  // --END-- Form validation end

  setState({ error: null, loading: true });
  await postHttp("addAssetTransfer", assetTransfer)
    .then(async () => {
      succesPop({
        active: true,
        title: "Asset transfered successfully",
        desc: "Updated Successfully",
      });
      setState({ assetTransfer: undefined });
    })
    .catch(() => setState({ error: "Errro on transfered asset" }));
  setState({ loading: false });
};

export const postWriteOffAsset = async (state, setState) => {
  const { loading, assetWriteoff, succesPop } = state;
  if (loading) return 0;

  console.log(assetWriteoff);

  // --START-- Form validation
  if (assetWriteoff.branch_id === undefined) {
    setState({ error: "Select branch" });
    return;
  }
  if (assetWriteoff.asset_id === undefined) {
    setState({ error: "Select asset" });
    return;
  }
  if (assetWriteoff.custodian_user_id === undefined) {
    setState({ error: "Select the custodian" });
    return;
  }
  // --END-- Form validation end

  setState({ error: null, loading: true });
  await postHttp("addAssetWriteoff", assetWriteoff)
    .then(async () => {
      succesPop({
        active: true,
        title: "Asset Writeoff successfully",
        desc: "Updated Successfully",
      });
      setState({ assetWriteoff: undefined });
    })
    .catch(() => setState({ error: "Errro on Writeoff asset" }));
  setState({ loading: false });
};
