import axios, { AxiosResponse } from "axios";
import { Product } from "../models/product";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:47210/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
axios.interceptors.response.use(async (response) => {
  try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.put<T>(url).then(responseBody),
};
const products = {
  lists: () => requests.get<Product[]>("/products"),
  deatails: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: Product) => axios.post<void>("/products",product),
  update: (product:Product) => axios.put<void>(`/products/${product.id}`,product),
  delete: (id:string) => axios.delete<void>(`/products/${id}`),
};
const agent = {
  products,
};
export default agent;
