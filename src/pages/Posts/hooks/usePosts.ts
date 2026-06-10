import type { PostCreateDto, PostPatchDto } from "@/services/dtos/posts";
import { postMapper } from "@/services/mappers/post.mapper";
import { postService } from "@/services/post.service";
import type { IPost } from "@/shared/interfaces";
import { AxiosError } from "axios";
import { useState } from "react";

export const usePosts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPostsAsync = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const resp = await postService.getPostsAsync();
            const posts: IPost[] = postMapper.mapPostList(resp.data);

            setPosts(posts);

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.message);
            } else if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido, por favor vuelve a intentarlo");
            }
        } finally {
            setIsLoading(false);
        }
    };

   

    const searchPost = (search: string) => {
        if (search == "") return posts;

        return posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    }

    const deletePostAsync = async (postId: IPost["id"]) => {
        try {
            await postService.deletePostAsync(postId);
            setPosts(prev => prev.filter(post => post.id !== postId));
        } catch (error) { }
    }

    const patchPostAsync = async (postId: IPost["id"], body: PostPatchDto) => {
        try {
            await postService.patchPostAsync(postId, body);

            setPosts(prev => prev.map(post => {

                if (post.id == postId) {
                    return {
                        ...post,
                        ...body,
                    }
                }

                return post;
            }))
        } catch (err) { }

    }

    const createPostAsync = async (body: PostCreateDto) => {
        try {
            const resp = await postService.createPostAsync(body);
            const postCreated = postMapper.mapPost(resp.data);

            setPosts(prev => [postCreated, ...prev])
        } catch (error) {

        }
    }

    const clearPosts = () => {
        setPosts([]);
    };

    return {
        posts: posts,
        error: error,
        isLoading: isLoading,
        clearPosts: clearPosts,
        getPostsAsync: getPostsAsync,
        createPostAsync: createPostAsync,
        patchPostAsync: patchPostAsync,
        deletePostAsync: deletePostAsync,
        searchPost: searchPost,
    };
}
