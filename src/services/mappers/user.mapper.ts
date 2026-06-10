import type { IUser } from "@/shared/interfaces/user.interface";
import type { ApiUserResponseDto } from "../dtos/users";

const mapUser = (user: ApiUserResponseDto): IUser => {
    return {
        id: user.id,
        company: user.company,
        email: user.email,
        name: user.name,
        phone: user.phone,
        username: user.username,
        website: user.website,
        address: user.address,

    }
}

export const userMapper = {
    mapUser: mapUser
}