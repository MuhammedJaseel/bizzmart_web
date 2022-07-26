import axios from "axios";

export const baseApi = "https://drops.bizzsmart.in/api/isWebAppApi/V1/";

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   HERE IT IS USING SOME DYNAMIC TOKEN   //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
const header = {
  headers: {
    Authorization: "Bearer " + window.localStorage.getItem("bearerToken"),
    sessionId: window.localStorage.getItem("sessionId"),
  },
};
export const getHttp = async (path, prams) => {
  return await axios
    .get(baseApi + path, header)
    .then((res) => {
      if (res.data.statusCode === 700) {
        window.localStorage.setItem("bearerToken", "");
        window.localStorage.setItem("sessionId", "");
        window.location.href = "/login";
        Promise.reject(res.data.message);
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210)
        return Promise.resolve(res.data);
      return Promise.reject(res.data.message);
    })
    .catch((e) => Promise.reject("Error on loading"));
};

export const postHttp = async (path, body) => {
  body.branch_id = window.localStorage.getItem("branchId");
  return await axios
    .post(baseApi + path, body, header)
    .then((res) => {
      if (res.data.statusCode === 700) {
        window.localStorage.setItem("bearerToken", "");
        window.localStorage.setItem("sessionId", "");
        window.location.href = "/login";
        Promise.reject(res.data.message);
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210)
        return Promise.resolve(res.data);
      return Promise.reject(res.data.message);
    })
    .catch((e) => Promise.reject("Error on loading"));
};

export const putHttp = () => {};
export const deleteHttp = () => {};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   HERE IT IS USING SOME STATIC TOKEN   ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
const header1 = {
  headers: {
    Authorization: "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=",
  },
};
export const postHttpStatic = async (path, body) => {
  return await axios
    .post(baseApi + path, body, header1)
    .then((res) => {
      if (res.data.statusCode === 200 || res.data.statusCode === 801)
        return Promise.resolve(res.data);
      else return Promise.reject(res.data.message);
    })
    .catch((e) => Promise.reject("Error on loading"));
};
