import type { AxiosResponse } from "axios";
import { api } from "@/api/apiConfig";
import type { ApiPostCommentResponseDto, ApiPostResponseDto, PostCreateDto, PostPatchDto } from "./dtos/posts";
import type { ApiUserResponseDto } from "./dtos/users";


const getPostByIdAsync = async (postId: ApiPostResponseDto["id"]): Promise<{ post: ApiPostResponseDto, comments: ApiPostCommentResponseDto[]; user: ApiUserResponseDto }> => {
    const postResp: AxiosResponse<ApiPostResponseDto> = await api.get<ApiPostResponseDto>(`/posts/${postId}`);
    const commentsResp: AxiosResponse<ApiPostCommentResponseDto[]> = await api.get<ApiPostCommentResponseDto[]>(`/posts/${postId}/comments`);
    const userPostedResp: AxiosResponse<ApiUserResponseDto> = await api.get<ApiUserResponseDto>(`/users/${postResp.data.userId}`);

    return {
        comments: commentsResp.data,
        post: postResp.data,
        user: userPostedResp.data,
    }
}

const getPostsAsync = async (): Promise<AxiosResponse<ApiPostResponseDto[]>> => {
    const data: AxiosResponse<ApiPostResponseDto[]> = await api.get<ApiPostResponseDto[]>("/posts");

    return data;
};

const createPostAsync = async (body: PostCreateDto): Promise<AxiosResponse<ApiPostResponseDto>> => {
    const data: AxiosResponse<ApiPostResponseDto> = await api.post<ApiPostResponseDto>("/posts", body);
    return data;
};

const patchPostAsync = async (postId: ApiPostResponseDto["id"], body: PostPatchDto): Promise<AxiosResponse<ApiPostResponseDto>> => {
    const data: AxiosResponse<ApiPostResponseDto> = await api.patch<ApiPostResponseDto>(`/posts/${postId}`, body);
    return data;
};

const deletePostAsync = async (postId: ApiPostResponseDto["id"]): Promise<void> => {
    await api.delete(`/posts/${postId}`);
}


export const postService = {
    getPostsAsync: getPostsAsync,
    createPostAsync: createPostAsync,
    patchPostAsync: patchPostAsync,
    deletePostAsync: deletePostAsync,
    getPostByIdAsync: getPostByIdAsync
};