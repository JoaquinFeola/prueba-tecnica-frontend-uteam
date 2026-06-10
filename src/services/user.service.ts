import type { AxiosResponse } from "axios";
import type { ApiUserResponseDto } from "./dtos/users";
import { api } from "@/api/apiConfig";

const getUsersAsync = async(): Promise<AxiosResponse<ApiUserResponseDto[]>> => {
    const data: AxiosResponse<ApiUserResponseDto[]> = await api.get<ApiUserResponseDto[]>("/users");
    return data;
}
const getUserByIdAsync = async(userId: ApiUserResponseDto["id"]): Promise<AxiosResponse<ApiUserResponseDto>> => {
    const data: AxiosResponse<ApiUserResponseDto> = await api.get<ApiUserResponseDto>(`/users/${userId}`);
    return data;
}


export const userService = {
    getUsersAsync: getUsersAsync,
    getUserByIdAsync: getUserByIdAsync
}