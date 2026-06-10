
export interface ApiPostResponseDto {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface ApiPostCommentResponseDto {
    id: number;
    name: string;
    email: string;
    body: string;
    postId: number;
}