import { User } from "./user";

export interface Session {
    token: string;
    user: User;
    expiration: string;
    
}