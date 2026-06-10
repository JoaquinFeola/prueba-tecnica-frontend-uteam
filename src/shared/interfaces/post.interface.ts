import type { IUser } from "./user.interface";

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
    
    user?: IUser;
    comments?: IPostComment[];
};

export interface IPostComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}