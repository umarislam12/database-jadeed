import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { history } from "../..";
import { Meeting, MeetingFormValues } from "../models/meeting";
import { PaginatedResult } from "../models/pagination";

import { Product, ProductFormValues } from "../models/product";
import { Photo, Profile, UserMeeting } from "../models/profile";

import { AboutFormValues, User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(axios.defaults.baseURL)
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config=>{
  const token=store.commonStore.token;
  if(token) config.headers!.Authorization=`Bearer ${token}`
  return config;
})
axios.interceptors.response.use(
  async (response) => {
    // try {
      if(process.env.NODE_ENV === 'development') await sleep(1000);
    const pagiation=response.headers['pagination'];
    if(pagiation){
      response.data= new PaginatedResult(response.data, JSON.parse(pagiation));
     
      return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
    // } catch (error) {
    // console.log(error);
    // return await Promise.reject(error);
    // }
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    console.log(error.response);
    console.log(data);
    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && (data as any).errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if ((data as any).errors) {
          const modalStateErrors = [];
          for (const key in (data as any).errors) {
            if ((data as any).errors[key]) {
              modalStateErrors.push((data as any).errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }
        // toast.error('bad request');
        break;
      case 401:
        toast.error("unauthorised");
        break;
      case 404:
        history.push("/not-found");
        toast.error("not found");
        break;
      case 500:
        store.commonStore.setServerError(data as any);
        history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
const products = {
  lists: () => requests.get<Product[]>("/products"),
  deatails: (id: string) => requests.get<Product>(`/products/${id}`),
  create: (product: ProductFormValues) => requests.post<void>("/products", product),
  update: (product: ProductFormValues) =>
    requests.put<void>(`/products/${product.id}`, product),
  delete: (id: string) => axios.delete<void>(`/products/${id}`),
};
const meetings = {
  lists: (params:URLSearchParams) => axios.get<PaginatedResult<Meeting[]>>("/meetings",{params}).then(responseBody),
  deatails: (id: string) => requests.get<Meeting>(`/meetings/${id}`),
  create: (meeting: MeetingFormValues) => requests.post<void>("/meetings", meeting),
  update: (meeting: MeetingFormValues) =>
    axios.put<void>(`/meetings/${meeting.id}`, meeting),
  delete: (id: string) => requests.del<void>(`/meetings/${id}`),
  attend:(id:string)=>requests.post<void>(`/meetings/${id}/attend`, {})

};
const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("account/register", user),
};
const Profiles={
  get:(username:string)=>requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto:(file:Blob)=>{
    let formData=new FormData();
    formData.append('File',file);
    return axios.post<Photo>('photos',formData,{
      headers:{'Content-type':'multipart/form-data'}
    })
  },
  setMainPhoto:(id: string)=>requests.post(`/photos/${id}/setMain`,{}),
  deletePhoto:(id:string)=>requests.del(`/photos/${id}`),
  updateProfile:(profile: Partial<Profile>) => requests.put(`/profiles`,
  profile),
  updateFollowing:(username: string)=>requests.post(`/follow/${username}`, {}),
  listFollowings:(username:string, predicate: string)=>requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
  listMeetings:(username:string, predicate:string)=>requests.get<UserMeeting[]>(`/profiles/${username}/meetings?predicate=${predicate}`)
}
const agent = {
  products,
  Account,
  meetings,
  Profiles
};
export default agent;
