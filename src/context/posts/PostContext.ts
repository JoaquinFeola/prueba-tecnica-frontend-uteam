import type { PostCreateDto, PostPatchDto } from "@/services/dtos/posts";
import type { IPost } from "@/shared/interfaces";
import { createContext } from "react";

interface IPostContext {
    isLoading: boolean;
    error: string | null;
    posts: IPost[];
    
    /* Actions */
    getPostsAsync(): Promise<void>;
    createPostAsync(body: PostCreateDto): Promise<void>;
    deletePostAsync(postId: IPost["id"]): Promise<void>;
    patchPostAsync(postId: IPost["id"], body: PostPatchDto): Promise<void>;
    clearPosts(): void;
    searchPost(search: string): IPost[];
}


export const PostContext = createContext({} as IPostContext);