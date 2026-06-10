import { Button } from "@/shared/components";
import { useModal } from "@/shared/hooks/useModal";
import type { IPost } from "@/shared/interfaces";
import { MdDelete, MdEdit } from "react-icons/md";
import { EditPostModal } from "./EditPostModal";
import { use, useCallback, useState } from "react";
import { PostContext } from "@/context/posts/PostContext";
import type { IEditPostSchema } from "../schemas/editPost.schema";
import { toast } from "react-toastify";
import { DeletePostModal } from "./DeletePostModal";
import { Link } from "react-router-dom";

interface Props {
    post: IPost;
}

export const ListPostItem = ({ post }: Props) => {
    const { patchPostAsync, deletePostAsync } = use(PostContext)
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const { handleCloseModal, handleOpenModal, modal } = useModal({
        isEditModalOpen: false,
        isDeleteModalOpen: false,
    })

    const handleUpdatePost = useCallback(async (data: IEditPostSchema) => {
        try {
            await patchPostAsync(post.id, data);
            toast.success("Post actualizado correctamente");
            handleCloseModal("isEditModalOpen")
        } catch (error) {
            toast.error("Ocurrió un error al actualizar el post");
        }
    }, [post]);

    const handleDeletePost = useCallback(async () => {
        setIsDeleting(true)
        try {
            await deletePostAsync(post.id);
            toast.success("Post eliminado correctamente");
            handleCloseModal("isDeleteModalOpen")
        } catch (error) {
            toast.error("Ocurrió un error al intentar eliminar el post");
        } finally {
            setIsDeleting(false)
        }
    }, [post]);

    return (
        <>

            <article
                className="
                    cursor-pointer
                    flex flex-col
                    h-full
                    rounded-xl
                    border border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-lg
                "
            >
                <h2 className="mb-3 text-xl font-semibold text-slate-800 line-clamp-2">
                    {post.title}
                </h2>

                <p className="grow text-sm leading-6 text-slate-600">
                    {post.body}
                </p>

                <div className="mt-5 border-t border-slate-100 pt-4 z-40 static">
                    <div className="flex justify-end gap-2">
                        <Button
                            className="
                                bg-blue-500
                                text-white
                                hover:bg-blue-600
                                px-3
                            "
                            onClick={() => handleOpenModal("isEditModalOpen")}
                        >
                            <MdEdit size={18} />
                        </Button>

                        <Button
                            onClick={() => handleOpenModal("isDeleteModalOpen")}
                            className="
                                bg-red-500
                                text-white
                                hover:bg-red-600
                                px-3
                            "
                        >
                            <MdDelete size={18} />
                        </Button>
                        <div className="w-full text-right  flex justify-end items-end">
                            <Link to={`/posts/${post.id}`} className="underline text-primary">Ver más</Link>
                        </div>
                    </div>
                </div>
            </article>

            {
                modal.isEditModalOpen && (
                    <EditPostModal
                        onSave={handleUpdatePost}
                        post={post}
                        isOpen={modal.isEditModalOpen}
                        onClose={() => handleCloseModal("isEditModalOpen")}
                    />
                )
            }
            {
                modal.isDeleteModalOpen && (
                    <DeletePostModal
                        isDeleting={isDeleting}
                        onConfirm={handleDeletePost}
                        post={post}
                        isOpen={modal.isDeleteModalOpen}
                        onClose={() => handleCloseModal("isDeleteModalOpen")}
                    />
                )
            }
        </>
    );
};