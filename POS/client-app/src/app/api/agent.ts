import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { history } from "../..";
import { Meeting } from "../models/meeting";

import { Product } from "../models/product";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config=>{
  const token=store.commonStore.token;
  if(token) config.headers!.Authorization=`Bearer ${token}`
  return config;
})
// axios.interceptors.response.use(
//   async (response) => {
//     // try {
//     await sleep(1000);
//     return response;
//     // } catch (error) {
//     // console.log(error);
//     // return await Promise.reject(error);
//     // }
//   },
//   (error: AxiosError) => {
//     const { data, status, config } = error.response!;
//     console.log(data);
//     switch (status) {
//       case 400:
//         if (typeof data === "string") {
//           toast.error(data);
//         }
//         if (config.method === "get" && data.errors.hasOwnProperty("id")) {
//           history.push("/not-found");
//         }
//         if (data.errors) {
//           const modalStateErrors = [];
//           for (const key in data.errors) {
//             if (data.errors[key]) {
//               modalStateErrors.push(data.errors[key]);
//             }
//           }
//           throw modalStateErrors.flat();
//         }
//         // toast.error('bad request');
//         break;
//       case 401:
//         toast.error("unauthorised");
//         break;
//       case 404:
//         history.push("/not-found");
//         toast.error("not found");
//         break;
//       case 500:
//         store.commonStore.setServerError(data);
//         history.push("/server-error");
//         break;
//     }
//     return Promise.reject(error);
//   }
// );
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.put<T>(url).then(responseBody),
};
const products = {
  lists: () => requests.get<Product[]>("/products"),
  deatails: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: Product) => axios.post<void>("/products", product),
  update: (product: Product) =>
    axios.put<void>(`/products/${product.id}`, product),
  delete: (id: string) => axios.delete<void>(`/products/${id}`),
};
const meetings = {
  lists: () => requests.get<Meeting[]>("/meetings"),
  deatails: (id: string) => requests.get<Meeting>(`/meetings/${id}`),
  create: (meeting: Meeting) => axios.post<void>("/meetings", meeting),
  update: (meeting: Meeting) =>
    axios.put<void>(`/meetings/${meeting.id}`, meeting),
  delete: (id: string) => axios.delete<void>(`/meetings/${id}`),
};
const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("account/register", user),
};
const agent = {
  products,
  Account,
  meetings
};
export default agent;
