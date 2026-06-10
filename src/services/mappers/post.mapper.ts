import type { IPost, IPostComment } from "@/shared/interfaces";
import type { ApiPostCommentResponseDto, ApiPostResponseDto } from "../dtos/posts";
import type { ApiUserResponseDto } from "../dtos/users";
import { userMapper } from "./user.mapper";


const mapPost = (post: ApiPostResponseDto, { comments, user }: { comments?: ApiPostCommentResponseDto[], user?: ApiUserResponseDto }): IPost => {
    return {
        id: post.id,
        title: post.title,
        userId: post.userId,
        body: post.body,
        comments: (comments && comments?.length > 0) ? comments?.map(mapComment) : [],
        user: user ? userMapper.mapUser(user) : undefined
    }
}

const mapComment = (comment: ApiPostCommentResponseDto): IPostComment => {
    return {
        id: comment.id,
        body: comment.body,
        email: comment.email,
        name: comment.name,
        postId: comment.postId
    }
}

const mapPostList = (posts: ApiPostResponseDto[]): IPost[] => {
    return posts.map(p => mapPost(p, {}));
}


export const postMapper = {
    mapPost: mapPost,
    mapPostList: mapPostList
}