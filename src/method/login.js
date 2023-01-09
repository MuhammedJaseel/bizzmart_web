import { postHttp, postHttpStatic } from "../module/api_int";

export async function getLoginPageData(state, setState) {
  await postHttpStatic("backgroundImage", {})
    .then((res) => setState({ pageData: res.data }))
    .catch((e) => console.log(e));
  setState({ pageloading: false });
}

export async function branchFind(e, state, setState) {
  setState({ loading: true, error: null });
  const body = { terminal_id: e.target.br_code.value };
  await postHttpStatic("branchLogin", body)
    .then((res) => {
      window.localStorage.setItem("branchId", res.data.branch_id);
      window.localStorage.setItem(
        "idDefaultBranch",
        res.data.is_default_branch ? "yes" : "no"
      );
      window.localStorage.setItem("branchName", res.data?.name ?? "");
      window.localStorage.setItem("branchCurrency", res.data?.currency ?? "");
      var buisnessName = res.data?.legal_buisness_name;
      if (buisnessName?.length < 1) var buisnessName = res.data?.business_name;
      window.localStorage.setItem("buisnessName", buisnessName);
      setState({
        logintitle: res.data.name,
        branch_id: res.data.branch_id,
        logintype: "branchlogin",
        brcode: e.target.br_code.value,
      });
    })
    .catch((error) => setState({ error }));
  setState({ loading: false });
}

var forceLogin = 0;
export async function branchLogin(e, state, setState) {
  setState({ loading: true, error: null });
  const body = {
    branch_id: state.branch_id,
    username: e.target.br_li_username.value,
    password: e.target.br_li_password.value,
    force_login: forceLogin,
  };
  await postHttpStatic("branchUserLogin", body)
    .then((res) => {
      if (res.statusCode === 801) {
        forceLogin = 1;
        const error = `Warning : You are already logged in somewhere, Click login again if you want a force login.`;
        setState({ error });
      } else {
        // console.log(res.data.api_token);
        // console.log(res.data.session_id);
        window.localStorage.setItem("bearerToken", res.data.api_token);
        window.localStorage.setItem("sessionId", res.data.session_id);
        window.localStorage.setItem("profilePic", res.data.image);
        window.localStorage.setItem("userName", res.data.phone);
        window.localStorage.setItem("userId", res.data.id);
        window.localStorage.setItem("address", res.data.address);
        if (window.localStorage.getItem("idDefaultBranch") === "yes")
          state.setScreen("/branches");
        else state.setScreen("/calendar");
      }
    })
    .catch((error) => setState({ error }));

  setState({ loading: false });
}

export async function hosLogin(e, state, setState) {}

export async function forgetOtp(e, state, setState) {}

export async function onClickUserLogout(state) {
  postHttp("logout", {
    user_id: window.localStorage.getItem("userId"),
  }).then(() => state.setScreen("/login"));
}
