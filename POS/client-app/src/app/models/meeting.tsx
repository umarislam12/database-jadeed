import {Profile} from "./profile";

export interface Meeting{
id:string;
agenda: string;
meetingDate: Date | null;
hostUsername?:string;
isCancelled?:boolean;
attendees?: Profile[];

isGoing?:boolean;
isHost?:boolean;
host?: Profile;
}