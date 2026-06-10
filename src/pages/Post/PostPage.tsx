import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack, MdComment, MdPerson } from "react-icons/md";

import { usePost } from "./hooks/usePost";
import { SpinnerLoading } from "@/shared/components";
import { PostError } from "../Posts/components/PostError";

const PostPage = () => {
    const { postId } = useParams();

    const {
        clearPost,
        post,
        isLoading,
        error,
        getPostByIdAsync,
    } = usePost();

    useEffect(() => {
        if (postId) {
            getPostByIdAsync(Number(postId));
        }

        return () => {
            clearPost();
        };
    }, [postId]);

    if (isLoading) {
        return (
            <div className="flex h-dvh items-center justify-center">
                <SpinnerLoading />
            </div>
        );
    }

    if (error) {
        return (
            <PostError
                message={error}
                onRetry={() => getPostByIdAsync(Number(postId))}
            />
        );
    }

    if (!post) return null;

    return (
        <div className="mx-auto max-w-5xl p-6">
            <div>
                <Link to="/posts" className="flex gap-2 items-center text-lg mb-4 hover:text-primary transition-all hover:underline"><MdArrowBack/> Volver a los posts</Link>
            </div>
            <article className="space-y-6">
                <header
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                        <MdPerson size={18} />
                        <span>{post.user?.username}</span>
                    </div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            leading-tight
                            text-slate-900
                        "
                    >
                        {post.title}
                    </h1>
                </header>

                <section
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >
                    <h2
                        className="
                            mb-4
                            text-lg
                            font-semibold
                            text-slate-900
                        "
                    >
                        Contenido
                    </h2>

                    <p
                        className="
                            whitespace-pre-wrap
                            leading-8
                            text-slate-700
                        "
                    >
                        {post.body}
                    </p>
                </section>

                <section
                    className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-8
                        shadow-sm
                    "
                >
                    <div className="mb-6 flex items-center gap-2">
                        <MdComment
                            size={24}
                            className="text-blue-600"
                        />

                        <h2
                            className="
                                text-xl
                                font-semibold
                                text-slate-900
                            "
                        >
                            Comentarios ({post.comments?.length ?? 0})
                        </h2>
                    </div>

                    {post.comments?.length ? (
                        <div className="space-y-4">
                            {post.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-200
                                        p-5
                                        transition-colors
                                        hover:bg-slate-50
                                    "
                                >
                                    <div className="mb-3">
                                        <h3
                                            className="
                                                font-semibold
                                                text-slate-900
                                            "
                                        >
                                            {comment.name}
                                        </h3>

                                        <p
                                            className="
                                                text-sm
                                                text-slate-500
                                            "
                                        >
                                            {comment.email}
                                        </p>
                                    </div>

                                    <p
                                        className="
                                            leading-7
                                            text-slate-700
                                        "
                                    >
                                        {comment.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="
                                rounded-xl
                                border
                                border-dashed
                                border-slate-300
                                p-8
                                text-center
                                text-slate-500
                            "
                        >
                            No hay comentarios para este post.
                        </div>
                    )}
                </section>
            </article>
            <div className="flex justify-end w-full">
                <Link to="/posts" className="flex gap-2 items-center text-lg mt-4 text-muted  hover:text-primary transition-all hover:underline"><MdArrowBack/> Volver a los posts</Link>
            </div>
        </div>
    );
};

export default PostPage;