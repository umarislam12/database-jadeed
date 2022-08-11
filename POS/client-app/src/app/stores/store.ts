import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";
import UserStore from "./userStore";

interface Store{
    productStore: ProductStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}       
export const store: Store={
    productStore: new ProductStore(),
    userStore:new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore,
}

export const StoreContext=createContext(store);
export function useStore(){
    return useContext(StoreContext)
}
