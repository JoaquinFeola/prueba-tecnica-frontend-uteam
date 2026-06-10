import { PostContext } from "@/context/posts/PostContext";
import { use, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { ListPosts } from "./components/ListPosts";
import { MdAdd } from "react-icons/md";
import { useModal } from "@/shared/hooks/useModal";
import { CreatePostModal } from "./components/CreatePostModal";
import type { ICreatePostSchema } from "./schemas/createPost.schema";
import { toast } from "react-toastify";
import { PostError } from "./components/PostError";
import { FAB, PageLoader, TextField } from "@/shared/components";

const PostsPage = () => {
    const { error, getPostsAsync, isLoading, clearPosts, posts: fetchedPosts, createPostAsync, searchPost } = use(PostContext);
    const { modal, handleCloseModal, handleOpenModal } = useModal({
        isCreateModalOpen: false,
    });
    const [search, setSearch] = useState<string>("");
    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };


    const posts = useMemo(() => searchPost(search), [search, fetchedPosts, searchPost])

    useEffect(() => {
        getPostsAsync();

        return () => {
            clearPosts()
        };
    }, []);

    const handleCreatePost = async (data: ICreatePostSchema) => {
        try {
            await createPostAsync({ body: data.body, title: data.title, userId: 1 });
            toast.success("Post creado correctamente");
            handleCloseModal("isCreateModalOpen")
        } catch (error) {
            console.log(error)
            toast.error("Ocurrió un error al intentar crear el post")
        }
    }

    if (error) return <PostError onRetry={getPostsAsync} />
    if (isLoading) return <PageLoader />

    return (
        <>
            <div className=" sticky top-2 transition-all rounded-2xl bg-slate-200/50 backdrop-blur-lg w-full px-10   py-4 shadow-sm z-50">
                <TextField
                    value={search}
                    onChange={onChangeSearch}
                    label="Buscar los posts"
                    placeholder="Escribe aquí para buscar..."
                />

            </div>
            <div className="pt-6 px-10">
                <ListPosts posts={posts} />
            </div>
            <FAB
                size="sm"
                onClick={() => handleOpenModal("isCreateModalOpen")}
            >
                <MdAdd size={18} /> Crear Post
            </FAB>

            {modal.isCreateModalOpen && (
                <CreatePostModal
                    isOpen={modal.isCreateModalOpen}
                    onClose={() => handleCloseModal("isCreateModalOpen")}
                    onCreate={handleCreatePost}
                />
            )}
        </>
    )
}

export default PostsPage;