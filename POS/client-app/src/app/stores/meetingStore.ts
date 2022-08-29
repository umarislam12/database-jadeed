
import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Meeting } from "../models/meeting";
export default class MeetingStore {
    // products: Product[] = [];
    meetingRegistry = new Map<string, Meeting>();
    loadingInitial = false;
    editMode = false;
    loading = false;
    selectedMeeting: Meeting | undefined = undefined;
    constructor() {
        makeAutoObservable(this)
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
    loadMeetings = async () => {
        this.setloadingInitial(true);
        try {
            const meetings = await agent.meetings.lists()
            console.log(meetings[0]);
            meetings.forEach(meeting => {
                this.setMeeting(meeting);
                // this.products.push(product)
            });
            this.setloadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setloadingInitial(false);

        }
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
    createMeeting = async (meeting: Meeting) => {
        this.loading = true;
        try {
            await agent.meetings.create(meeting);
            runInAction(() => {
                this.meetingRegistry.set(meeting.id, meeting);
                //this.products.push(product);
                this.selectedMeeting = meeting;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    updateMeeting = async (meeting: Meeting) => {
        this.loading = true;
        try {
            await agent.meetings.update(meeting);
            runInAction(() => {
                // this.products=[...this.products.filter(p=>p.id !==product.id),product];
                this.meetingRegistry.set(meeting.id, meeting);
                this.selectedMeeting = meeting;
                this.editMode = false;
                this.loading = false;

            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
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
}