import { createContext, useContext } from "react";
import CommentStore from "./commentStore";
import CommonStore from "./commonStore";
import MeetingStore from "./meetingStore";
import ModalStore from "./modalStore";
import ProductStore from "./productStore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store{
    productStore: ProductStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    meetingStore: MeetingStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
}       
export const store: Store={
    productStore: new ProductStore(),
    userStore:new UserStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    meetingStore:new MeetingStore(),
    profileStore:new ProfileStore(),
    commentStore: new CommentStore(),
}

export const StoreContext=createContext(store);
export function useStore(){
    return useContext(StoreContext)
}
