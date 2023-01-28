import { postHttp } from "../module/api_int";

export const getAllBranches = async (state, setState) => {
  await postHttp("allBranchLists", {}).then((res) =>
    setState({ allBranches: res.data })
  );
};

export const getFormListes = async (state, setState) => {
  postHttp("getCountries", {}).then((res) =>
    setState({ allCountry: res.data })
  );
  postHttp("getIndustryTypeLists", {}).then((res) =>
    setState({ allIndustryType: res.data })
  );
  postHttp("getBusinessTypeLists", {}).then((res) =>
    setState({ allBusinessType: res.data })
  );
};

export const getAllStates = async (country_name, setState) => {
  setState({ loading: true });
  await postHttp("getStates", { country_name }).then((res) =>
    setState({ allState: res.data })
  );
  setState({ loading: false });
};

export const getAllDistricts = async (state_id, setState) => {
  setState({ loading: true });
  await postHttp("getDistrictLists", { state_id }).then((res) =>
    setState({ allDistrict: res.data })
  );
  setState({ loading: false });
};

export const postNewBranch = async (state, setState) => {
  const { loading, addBranch } = state;
  if (loading) return;

  // --START-- Validation starts from here
  if (addBranch?.branch_name === undefined || addBranch?.branch_name === "") {
    setState({ error: "Enter branch name" });
    return;
  }
  if (addBranch?.phone === undefined || addBranch?.phone === "") {
    setState({ error: "Enter phone number" });
    return;
  }
  if (addBranch?.country === undefined || addBranch?.country === "") {
    setState({ error: "Select business contry" });
    return;
  }
  if (addBranch?.state_id === undefined || addBranch?.state_id === "") {
    setState({ error: "Select state" });
    return;
  }
  if (
    addBranch?.industry_type_id === undefined ||
    addBranch?.industry_type_id === ""
  ) {
    setState({ error: "Select industry type" });
    return;
  }
  if (
    addBranch?.business_type_id === undefined ||
    addBranch?.business_type_id === ""
  ) {
    setState({ error: "Select business type" });
    return;
  }
  if (addBranch?.password === undefined || addBranch?.password === "") {
    setState({ error: "Enter password" });
    return;
  }
  // --END-- Validation endfrom here

  setState({ loading: true, error: null });

  const formData = new FormData();
  formData.append("branch_id", window.localStorage.getItem("branchId"));
  formData.append("branch_name", addBranch?.branch_name || "");
  formData.append("business_legal_name", addBranch?.business_legal_name || "");
  formData.append("address", addBranch?.address || "");
  formData.append("phone", addBranch?.phone || "");
  formData.append("email", addBranch?.email || "");
  formData.append("pin_code", addBranch?.pin_code || "");
  formData.append("gst_status", addBranch?.gst_status || "");
  formData.append("business_type_id", addBranch?.business_type_id || "");
  formData.append("industry_type_id", addBranch?.industry_type_id || "");
  formData.append("country", addBranch?.country || "");
  formData.append("state_id", addBranch?.state_id || "");
  formData.append("district_id", addBranch?.district_id || "");
  formData.append("latitude", addBranch?.latitude || "");
  formData.append("longitude", addBranch?.longitude || "");
  formData.append("whatsApp_number", addBranch?.whatsApp_number || "");
  formData.append("sales_number", addBranch?.sales_number || "");
  formData.append("support_number", addBranch?.support_number || "");
  formData.append("web_site", addBranch?.web_site || "");
  formData.append("password", addBranch?.password || "");

  if (typeof addBranch.image === "object")
    formData.append("image[]", addBranch.image, "[PROXY]");

  setState({ loading: true, error: null });
  await postHttp("addSubBranch", formData, true)
    .then(async (res) => {
      await getAllBranches(state, setState);
      setState({ addBranch: null });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
};
