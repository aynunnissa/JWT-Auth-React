import axios from "axios";

export const bashUrl = "http://localhost:8080";

axios.interceptors.request.use(
  function (config) {
    const dataUser = localStorage.getItem("hai");
    let dataToken;
    if (dataUser) {
      dataToken = JSON.parse(localStorage.getItem("hai"));
    }
    const token = dataToken?.token;
    if (token) {
      (config.headers.Authorization = `Bearer ${token}`),
        (config.headers["Access-Control-Allow-Origin"] = "*");
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function client(url, { method, data }) {
  return axios({
    method: method,
    url: `${bashUrl}${url}`,
    data: data,
  }).catch(function (error) {
    return error.toJSON();
  });
}

client.get = (url, data) => client(url, { method: "GET", data: data });
client.post = (url, data) => client(url, { method: "POST", data: data });
