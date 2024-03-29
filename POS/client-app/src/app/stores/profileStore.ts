import { makeAutoObservable, reaction, runInAction } from "mobx";
import React, { Component } from "react";
import agent from "../api/agent";
import { Meeting } from "../models/meeting";
import { Photo, Profile, UserMeeting } from "../models/profile";
import { AboutFormValues } from "../models/user";
import { store } from "./store";
import UserStore from "./userStore";

export default class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;
  uploading = false;
  loading = false;
  updating = false;
  followings: Profile[] = [];
  loadingFollowings = false;
  activeTab = 0;
  userMeetings: UserMeeting[] = [];
  loadingMeetings: boolean = false;
  //predicate= new Map().set('past', true)
  /**
   *
   */
  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    );
    // reaction(
    //   ()=>this.predicate.keys(),
    //   ()=>{

    //       this.userMeetings=[];
    //       this.loadProfileMeetings(this.profile!.username, this.predicate.get('past'));
    //   }

    // )
  }
  //   setPredicate=(predicate:string, value : string | Date)=>{
  //     const resetPredicate=()=>{
  //          this.predicate.forEach((value,key)=>{
  //              if(key !== 'startDate')this.predicate.delete(key);

  //          })
  //      }
  //      switch(predicate){
  //                  case 'past':
  //                      resetPredicate()
  //                      this.predicate.set('past', true);
  //                      break;
  //                  case 'future':
  //                      resetPredicate();
  //                      this.predicate.set('future', true);
  //                      break;  
  //                  case 'isHost':
  //                      resetPredicate();
  //                      this.predicate.set('isHost', true);
  //                      break;

  //      }
  //  }
  //when its value changes in meetingsdashboard it automatically gets calculated and passed to loadmeetings
  //computed property
  //  get axiosParams(){
  //      const params= new URLSearchParams();

  //      this.predicate.forEach((value,key)=>{
  //          if(key === 'startDate'){
  //              params.append(key,(value as Date).toISOString())
  //          }else{
  //              params.append(key, value)
  //          }
  //      })
  //      return params;

  //  }
  setActiveTab = (activeTab: any) => {
    this.activeTab = activeTab
  }
  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.username === this.profile.username;
    }
    return false;
  }
  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };
  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      const response = await agent.Profiles.uploadPhoto(file);
      const photo = response.data;
      runInAction(() => {
        if (this.profile) {
          this.profile.photos!.push(photo);
          if (photo.isMain && store.userStore.user)
            store.userStore.setImage(photo.url);
          this.profile.image = photo.url;
        }
        this.uploading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.uploading = false;
      });
    }
  };
  setMainPhoto = async (photo: Photo) => {
    this.loading = true;

    try {
      await agent.Profiles.setMainPhoto(photo.id);
      store.userStore.setImage(photo.url);
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.photos.find((x) => x.isMain)!.isMain = false;
          this.profile.photos.find((p) => p.id === photo.id)!.isMain = true;
          this.profile.image = photo.url;
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        console.log(error);
      });
    }
  };
  deletePhoto = async (photo: Photo) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos = this.profile.photos!.filter(
            (p) => p.id !== photo.id
          );
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => (this.loading = false));
      console.log(error);
    }
  };
  updateProfile = async (profile: Partial<Profile>) => {
    this.loading = true;
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (profile.displayName && profile.displayName !==
          store.userStore.user!.displayName) {
          store.userStore.setDisplayName(profile.displayName);
        }
        this.profile = { ...this.profile, ...profile as Profile };
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => this.loading = false);
    }
  }
  //we get the status of what we are about to do in the following parameter
  updateFollowing = async (username: string, following: boolean) => {
    this.loading = true;
    try {
      await agent.Profiles.updateFollowing(username);
      store.meetingStore.updateAttendeeFollowing(username);
      runInAction(() => {
        if (
          this.profile &&
          this.profile.username !== store.userStore.user!.username && this.profile.username === username
        ) {
          following
            ? this.profile.followersCount++
            : this.profile.followersCount--;
          this.profile.following = !this.profile.following;
        }
        if (this.profile && this.profile.username === store.userStore.user!.username) {
          following ? this.profile.followingCount++ : this.profile.followingCount--;
        }
        this.followings.forEach((profile) => {
          if (profile.username === username) {
            profile.following
              ? profile.followersCount--
              : profile.followersCount++;
            profile.following = !profile.following;
          }
        });
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading = false));
    }
  };
  loadFollowings = async (predicate: string) => {
    this.loadingFollowings = true;
    try {
      console.log(predicate);
      const followings = await agent.Profiles.listFollowings(
        this.profile!.username,
        predicate
      );

      runInAction(() => {
        this.followings = followings;
        this.loadingFollowings = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingFollowings = false));
    }
  };
  private setUserMeeting = (meeting: UserMeeting) => {
    // console.log(meeting);
    this.userMeetings.push(meeting);

  }
  loadProfileMeetings = async (username: string, predicate?: string) => {
    console.log(predicate);
    this.loadingMeetings = true;
    try {
      const userMeetings = await agent.Profiles.listMeetings(username, predicate!);
      console.log(userMeetings);
      // userMeetings.forEach((meeting:any)=>{
      //   this.setUserMeeting(meeting)
      // })
      runInAction(() => {
        this.userMeetings = userMeetings;
        this.loadingMeetings = false;
      })
      console.log(this.userMeetings);
      return Meeting;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMeetings = false;
      })

    }

  }


}


