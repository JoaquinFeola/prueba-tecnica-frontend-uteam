import { usePosts } from "@/pages/Posts/hooks/usePosts";
import { PostContext } from "./PostContext";
import type { PropsWithChildren } from "react";

export const PostProvider = ({ children }: PropsWithChildren) => {
    const { 
        error, 
        isLoading, 
        posts, 
        getPostsAsync,
        patchPostAsync, 
        deletePostAsync,
        createPostAsync,
        clearPosts, 
        searchPost,
    } = usePosts();
    return (
        <PostContext value={{
            posts,
            error,
            isLoading,
            getPostsAsync,
            patchPostAsync,
            deletePostAsync,
            createPostAsync,
            searchPost,
            clearPosts
        }}
        >
            {children}
        </PostContext>
    )
}