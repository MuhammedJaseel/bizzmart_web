import axios from "axios";
import { baseApi } from "../module/api_int";

export async function getLoginPageData(props) {
  const Authorization = "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=";
  await axios
    .post(baseApi + "backgroundImage", {}, { headers: { Authorization } })
    .then((res) => props.setState({ pageData: res.data.data }))
    .catch((e) => {});
  props.setState({ pageloading: false });
}

export async function branchFind(props, e) {
  props.setState({ loading: true, error: null });
  const Authorization = "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=";
  await axios
    .post(
      baseApi + "branchLogin",
      { terminal_id: e.target.br_code.value },
      { headers: { Authorization } }
    )
    .then((res) => {
      if (res.data.statusCode === 200) {
        window.localStorage.setItem("branch_id", res.data.data.branch_id);
        props.setState({
          logintitle: res.data.data.name,
          branch_id: res.data.data.branch_id,
          logintype: "branchlogin",
          brcode: e.target.br_code.value,
        });
      } else props.setState({ error: res.data.message });
    })
    .catch((e) => props.setState({ error: "Something's wrong here" }));
  props.setState({ loading: false });
}

var force_login = 0;
export async function branchLogin(props, e) {
  props.setState({ loading: true, error: null });
  const Authorization = "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=";
  await axios
    .post(
      baseApi + "branchUserLogin",
      {
        branch_id: props.state.branch_id,
        username: e.target.br_li_username.value,
        password: e.target.br_li_password.value,
        force_login,
      },
      { headers: { Authorization } }
    )
    .then((res) => {
      if (res.data.statusCode === 200) {
        window.localStorage.setItem("bearer_token", res.data.data.api_token);
        window.localStorage.setItem("session_id", res.data.data.session_id);
        window.localStorage.setItem("profile_pic", res.data.data.image);
        window.localStorage.setItem("user_name", res.data.data.phone);
        props.state.setScreen("/dashboard");
      } else if (res.data.statusCode === 801) {
        force_login = 1;
        const error = `Warning : You are already logged in somewhere, Click login again if you want a force login.`;
        props.setState({ error });
      } else props.setState({ error: res.data.message });
    })
    .catch((e) =>
      props.setState({ loading: false, error: "Something's wrong here" })
    );
  props.setState({ loading: false });
}

export async function hosLogin(props, e) {
  props.setState({ loading: true });
  //   const Authorization = "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=";
  //   await axios
  //     .post(
  //       baseApi + "branchLogin",
  //       { terminal_id: e.target.br_code.value },
  //       { headers: { Authorization } }
  //     )
  //     .then((res) =>
  //       props.setState({
  //         logintitle: res.data.data.name,
  //         logintype: "branchlogin",
  //       })
  //     )
  //     .catch((e) => props.setState({ loading: false, erro: "error" }));
  props.setState({ loading: false });
}
export async function forgetOtp(e, props, forget, setForget) {
  e.preventDefault();
  props.setState({ loading: true });
  if (forget === 1) setForget(2);
  else setForget(0);
  //   const Authorization = "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=";
  //   await axios
  //     .post(
  //       baseApi + "branchLogin",
  //       { terminal_id: e.target.br_code.value },
  //       { headers: { Authorization } }
  //     )
  //     .then((res) =>
  //       props.setState({
  //         logintitle: res.data.data.name,
  //         logintype: "branchlogin",
  //       })
  //     )
  //     .catch((e) => props.setState({ loading: false, erro: "error" }));
  props.setState({ loading: false });
}
