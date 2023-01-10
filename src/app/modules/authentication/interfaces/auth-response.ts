import { ResponseApi } from "src/app/shared/interfaces/response";

export interface AuthResponse extends ResponseApi <{
    token: string;
    expiration: string,
    name: string,
    email: string,
}> {}