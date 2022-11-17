
import { format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx";

import agent from "../api/agent";
import { Meeting, MeetingFormValues } from "../models/meeting";
import { Pagination, PagingParams } from "../models/pagination";
import { Profile } from "../models/profile";
import { store } from "./store";
export default class MeetingStore {
    // products: Product[] = [];
    meetingRegistry = new Map<string, Meeting>();
    loadingInitial = false;
    editMode = false;
    loading = false;
    selectedMeeting: Meeting | undefined = undefined;
    
    pagination:Pagination | null= null;
    pagingParams= new PagingParams();
    predicate= new Map().set('all', true)
    
    constructor() {
        makeAutoObservable(this);
        reaction(()=>this.predicate.keys(),
        ()=>{
            this.pagingParams= new PagingParams();
            this.meetingRegistry.clear();
            this.loadMeetings();
        }
    )
}
    setPagingParams=(pagingParams: PagingParams)=>{
        this.pagingParams=pagingParams;
    }
    setPredicate=(predicate:string, value : string | Date)=>{
       const resetPredicate=()=>{
            this.predicate.forEach((value,key)=>{
                if(key !== 'startDate')this.predicate.delete(key);

            })
        }
        switch(predicate){
                    case 'all':
                        resetPredicate()
                        this.predicate.set('all', true);
                        break;
                    case 'isGoing':
                        resetPredicate();
                        this.predicate.set('isGoing', true);
                        break;  
                    case 'isHost':
                        resetPredicate();
                        this.predicate.set('isHost', true);
                        break;
                     case 'startDate':
                            this.predicate.delete('startDate');
                            this.predicate.set('startDate', value);
        }
    }
    //when its value changes in meetingsdashboard it automatically gets calculated and passed to loadmeetings
    //computed property
    get axiosParams(){
        const params= new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value,key)=>{
            if(key === 'startDate'){
                params.append(key,(value as Date).toISOString())
            }else{
                params.append(key, value)
            }
        })
        return params;

    }
    loadMeetings = async () => {
        this.setloadingInitial(true);
        try {
            const result = await agent.meetings.lists(this.axiosParams)
            console.log(result.data);
            result.data.forEach(meeting => {
                this.setMeeting(meeting);
                // this.products.push(product)
            });
            this.setPagination(result.pagination);
            this.setloadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setloadingInitial(false);

        }
    }
    setPagination=(pagination: Pagination)=>{
        this.pagination=pagination
    }
    get MeetingsByDate() {
        return Array.from(this.meetingRegistry.values()).sort((a, b) =>
           a.meetingDate!.getTime() - b.meetingDate!.getTime())
    }
    get groupedMeetings() {
        return Object.entries(
            this.MeetingsByDate.reduce((meetings, meeting) => {
                const meetingDate = format(meeting.meetingDate!, 'dd MMM yyyy')
                // const modified = product.modified!. toISOString().split('T')[0];
                meetings[meetingDate] = meetings[meetingDate] ?
                    [...meetings[meetingDate], meeting] : [meeting];
                return meetings
            }, {} as { [key: string]: Meeting[] })
        )
    }
   
    loadMeeting = async (id: string) => {
        let meeting = this.getMeeting(id)
        if (meeting) {
            this.selectedMeeting = meeting;
            return meeting;
        } else {
            this.loadingInitial = true;
            try {
                meeting = await agent.meetings.deatails(id);
                console.log(meeting);
                this.setMeeting(meeting);
                runInAction(() => this.selectedMeeting = meeting)

                this.setloadingInitial(false);
                return meeting;

            } catch (error) {
                console.log(error);
                this.setloadingInitial(false);
            }
        }
    }
    private getMeeting = (id: string) => {
        return this.meetingRegistry.get(id);
    }
    private setMeeting = (meeting: Meeting) => {
        const user=store.userStore.user;
       if(user){
            meeting.isGoing=meeting.attendees!.some(
                a=>a.username===user!.username
                )
            meeting.isHost= meeting.hostUsername === user.username;
            meeting.host=meeting.attendees && meeting.attendees.find(x=>x.username===meeting.hostUsername);
       }
       
        
        
        
        meeting.meetingDate = new Date(meeting.meetingDate!);
        //product.modified.split('T')[0];
        this.meetingRegistry.set(meeting.id, meeting);
        
    }
    setloadingInitial = (state: boolean) => {
        this.loadingInitial = state;

    }
    // selectProduct = (id: string) => {
    //     this.selectedProduct = this.productRegistry.get(id);
    //     //this.selectedProduct=this.products.find(p=>p.id===id)
    // }
    // cancelSelectedProduct = () => {
    //     this.selectedProduct = undefined;
    // }
    // openForm = (id?: string) => {
    //     id ? this.selectProduct(id) : this.cancelSelectedProduct();
    //     this.editMode = true;
    // }
    // closeForm = () => {
    //     this.editMode = false;
    // }
    createMeeting = async (meeting: MeetingFormValues) => {
        var user=store.userStore.user;
        const attendee=new Profile(user!);
        
        try {
            await agent.meetings.create(meeting);
             const newMeeting=new Meeting(meeting);
             newMeeting.hostUsername=user!.username;
             newMeeting.attendees=[attendee];
             this.setMeeting(newMeeting);
            runInAction(() => {
                // this.meetingRegistry.set(meeting.id, meeting);
                //this.products.push(product);
                this.selectedMeeting = newMeeting
               
            })
        } catch (error) {
            console.log(error);
           
        }
    }
    updateMeeting = async (meeting: MeetingFormValues) => {
       
        try {
            await agent.meetings.update(meeting);
            runInAction(() => {
                if(meeting.id){
                    let updatedMeeting={...this.getMeeting(meeting.id), ...meeting}
                    this.meetingRegistry.set(meeting.id, updatedMeeting as Meeting);
                    this.selectedMeeting = updatedMeeting as Meeting;
                }
                // this.products=[...this.products.filter(p=>p.id !==product.id),product];
                // this.editMode = false;
                // this.loading = false;

            })

        } catch (error) {
            console.log(error);
          
        }

    }
    deleteMeeting = async (id: string) => {
        this.loading = true;
        try {
            await agent.meetings.delete(id);
            runInAction(() => {
                this.meetingRegistry.delete(id);
                //this.products=[...this.products.filter(p=>p.id !=id)];
                //if product is being desplayed
                // if (this.selectedProduct !== undefined) {
                //     if (this.selectedProduct.id === id) this.cancelSelectedProduct();
                // }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateAttendence= async ()=>{
        const user=store.userStore.user;
        this.loading=true;
        console.log(this.selectedMeeting);
        try {
            await agent.meetings.attend(this.selectedMeeting!.id);
            runInAction(()=>{
               if( this.selectedMeeting!.isGoing){
                this.selectedMeeting!.attendees= this.selectedMeeting!.attendees!.
                filter(x=>x.username !==  user!.username);
                this.selectedMeeting!.isGoing=false;
               }else{
                const attendee= new Profile(user!);
                this.selectedMeeting!.attendees!.push(attendee);
                this.selectedMeeting!.isGoing=true;
               }
               this.meetingRegistry.set(this.selectedMeeting!.id, this.selectedMeeting!)
            })
        } catch (error) {
            console.log(error);
        }finally{
            runInAction(()=>this.loading=false)
        }
    }
    cancelMeetingToggle=async () =>{
        this.loading=true;
        try {
            await agent.meetings.attend(this.selectedMeeting!.id)
            
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(()=>this.loading=false);
        }
    }
    clearSelectedMeeting=()=>{
        this.selectedMeeting=undefined;
    }
    updateAttendeeFollowing=(username: string)=>{
        this.meetingRegistry.forEach(meeting=>{
            meeting.attendees.forEach(attendee=>{
                if(attendee.username=== username){
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
    }
}