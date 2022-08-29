import Profile from "./profile";

export interface Meeting{
id:string;
agenda: string;
meetingDate: Date | null;
isCancelled?:boolean;
hostUsername?:string;
attendees?: Profile[];
}