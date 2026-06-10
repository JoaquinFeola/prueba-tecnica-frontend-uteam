import type { IPost } from "@/shared/interfaces";
import { ListPostItem } from "./ListPostItem";
import React from "react";

interface Props {
    posts: IPost[];
}

export const ListPosts = React.memo(({ posts }: Props) => {
    return (
        <div className="
                grid
                gap-6
                w-full
                grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
            ">
            {posts.length == 0 && <h3 className="text-lg text-center">No se encontraron elementos</h3>}
            {
                posts.map(post => <ListPostItem key={post.id} post={post} />)
            }
        </div>
    )
});
