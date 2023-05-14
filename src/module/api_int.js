import axios from "axios";

const ENV = "development";

const envVar = {
  development: {
    baseApi: "https://drops.bizzsmart.in/api/isWebAppApi/V1/",
    staticAccessToken: "Bearer 6Ufw7bS+7yElKQJtvUCM3vNfOZsqQmMjmHZ8cdbMBuQ=",
  },
  smartservices: {
    baseApi: "https://smartservices.bizzsmart.in/api/isWebAppApi/V1/",
    staticAccessToken: "Bearer wcXuHh8TBDVNbn8NQ9acMro4ysrMESZxG94pGfioomM=",
  },
};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   HERE IT IS USING SOME DYNAMIC TOKEN   //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getHttp = async (path, prams, isForm) => {
  const header = {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("bearerToken"),
      sessionId: window.localStorage.getItem("sessionId"),
    },
  };
  if (isForm) header.headers["Content-type"] = "multipart/form-data";
  return await axios
    .get(envVar[ENV].baseApi + path, header)
    .then((res) => {
      if (res.data.statusCode === 700 || res.data.statusCode === 500) {
        window.localStorage.setItem("bearerToken", "");
        window.localStorage.setItem("sessionId", "");
        window.location.href = "/login";
        Promise.reject(res.data.message);
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210)
        return Promise.resolve(res.data);
      return Promise.reject(new Error(res.data.message));
    })
    .catch((e) => Promise.reject(e?.message));
};

export const postHttp = async (path, body, isForm) => {
  const header = {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("bearerToken"),
      sessionId: window.localStorage.getItem("sessionId"),
    },
  };
  if (isForm) header.headers["Content-type"] = "multipart/form-data";

  if (body?.branch_id === undefined)
    body.branch_id = window.localStorage.getItem("branchId");
  return await axios
    .post(envVar[ENV].baseApi + path, body, header)
    .then((res) => {
      if (res.data.statusCode === 700 || res.data.statusCode === 500) {
        window.localStorage.setItem("bearerToken", "");
        window.localStorage.setItem("sessionId", "");
        window.location.href = "/login";
        Promise.reject(res.data.message);
      }
      if (res.data.statusCode === 200 || res.data.statusCode === 210) {
        if (res.data.hasOwnProperty("page")) {
          res.data.page.page_number = body?.page_number || 1;
        }
        return Promise.resolve(res.data);
      }
      return Promise.reject(new Error(res.data.message));
    })
    .catch((e) => Promise.reject(e?.message));
};

export const putHttp = () => {};
export const deleteHttp = () => {};

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   HERE IT IS USING SOME STATIC TOKEN   ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

export const postHttpStatic = async (path, body) => {
  const header = {
    headers: {
      Authorization: envVar[ENV].staticAccessToken,
      "Content-type": "multipart/form-data",
    },
  };
  return await axios
    .post(envVar[ENV].baseApi + path, body, header)
    .then((res) => {
      if (res.data.statusCode === 200 || res.data.statusCode === 801)
        return Promise.resolve(res.data);
      return Promise.reject(new Error(res.data.message));
    })
    .catch((e) => Promise.reject(e?.message));
};
