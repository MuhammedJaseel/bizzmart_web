import { postHttp } from "../module/api_int";

export const getAllBranches = async (state, setState) => {
  await postHttp("allBranchLists", {})
    .then((res) => setState({ allBranches: res.data }))
    .catch();
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

  console.log(addBranch);

  // --START-- Validation starts from here
  if (addBranch?.branch_name === undefined || addBranch?.branch_name === "") {
    setState({ error: "Enter branch name" });
    return;
  }
  if (addBranch?.phone === undefined || addBranch?.phone === "") {
    setState({ error: "Enter phone number" });
    return;
  }
  if (addBranch?.country === undefined) {
    setState({ error: "Select business contry" });
    return;
  }
  if (addBranch?.state_id === undefined) {
    setState({ error: "Select state" });
    return;
  }
  if (addBranch?.industry_type_id === undefined) {
    setState({ error: "Select industry type" });
    return;
  }
  if (addBranch?.business_type_id === undefined) {
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

// {
//   "ref_code_expired": true,
//   "referral_by_code": "",
//   "id": 260,
//   "employee_id": 257,
//   "name": "Ubaid NK",
//   "phone": "9895745813",
//   "email": "ubaid.qbytez@gmail.com",
//   "address": "Rio,calicut",
//   "api_token": "jllFGWa9kSCUvOIF47abTweYGiMiiTXsE0rE73vSrlABRh622gCIuxF40jyc",
//   "session_id": "63ac2364333981672225636",
//   "image": "https://drops.bizzsmart.in/assets/custom/img/profile.png",
//   "thumbnail_image": "https://drops.bizzsmart.in/assets/custom/img/profile.png",
//   "system_user": true,
//   "role": "Admin",
//   "opening_balance": "500.00",
//   "previous_opening_time": "25-12-2022 13:29:47",
//   "day_closed_time": "",
//   "yesterDay_sale": "0.00",
//   "last_invoice_no": 2,
//   "invoice_prefix": "INV22",
//   "invoice_start_count": "000",
//   "is_first_time": false,
//   "plan_name": "BLOSSOM",
//   "plan_tag": "REOMMENDED",
//   "plan_id": 4,
//   "plan_start_date": "25-12-2022 14:08:06",
//   "plan_end_date": "24-12-2023 14:08:06",
//   "total_amount": "1.18",
//   "gst": "0.18",
//   "expired": false,
//   "plan_permissions": {
//       "inventory_count": -1,
//       "online_order_count": 1000,
//       "report": [
//           101,
//           102,
//           103,
//           104,
//           105,
//           106,
//           107,
//           108,
//           109,
//           110,
//           111,
//           112,
//           113,
//           114,
//           115,
//           116,
//           117,
//           118,
//           119,
//           120,
//           121,
//           122,
//           123,
//           124,
//           125,
//           126
//       ],
//       "dashboard": "Yes",
//       "pos": "Yes",
//       "printer_support": "ALL",
//       "delivary_app": "Yes",
//       "pay_run": "Yes",
//       "storage": "-1",
//       "system_user_count": 5,
//       "branch_limit": 15
//   }
// }
