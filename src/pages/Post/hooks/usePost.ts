import { postMapper } from '@/services/mappers/post.mapper';
import { postService } from '@/services/post.service';
import type { IPost } from '@/shared/interfaces';
import { AxiosError } from 'axios';
import { useState } from 'react'

export const usePost = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [post, setPost] = useState<IPost | null>(null);

    const getPostByIdAsync = async (postId: IPost["id"]): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);

            const resp = await postService.getPostByIdAsync(postId);
            const post: IPost = postMapper.mapPost(resp.post, { comments: resp.comments, user: resp.user });
            setPost(post);

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

    const clearPost = () => {
        setPost(null);
    }

    return {
        post: post,
        isLoading: isLoading,
        error: error,
        clearPost: clearPost,
        getPostByIdAsync: getPostByIdAsync
    }
}
