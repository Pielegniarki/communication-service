import { ChatUser } from "./ChatUser";

export type Message = {
    content: string;
    date: Date; 
    sender: ChatUser;
}