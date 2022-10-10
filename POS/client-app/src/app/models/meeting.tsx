import {Profile} from "./profile";

export interface Meeting{
id:string;
agenda: string;
meetingDate: Date | null;
hostUsername:string;
isCancelled:boolean;
attendees: Profile[];

isGoing:boolean;
isHost:boolean;
host?: Profile;
}
export class Meeting implements Meeting{
    /**
     *
     */
    constructor(init? : MeetingFormValues) {
     Object.assign(this, init)
        
    }
}
export class MeetingFormValues
{
    id?:string=undefined;
    agenda:string='';
    meetingDate:Date | null=null;
    /**
     *
     */
    constructor(meeting?: MeetingFormValues) {
       if(meeting){
        this.id=meeting.id;
        this.agenda=meeting.agenda;
        this.meetingDate=meeting.meetingDate;
       }
        
    }
}