import { DashboardLayout } from "@/layouts/DashboardLayout";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";


const PostsPage = lazy(() => import("@/pages/Posts/PostsPage"));
const PostPage = lazy(() => import("@/pages/Post/PostPage"));

export const AppRouter = () => {
    return (
        <Suspense fallback={null}>
            <Routes>
                <Route
                    path="/posts" 
                    element={<DashboardLayout />}
                > 
                    <Route index element={<PostsPage/>} />
                    <Route path=":postId" element={<PostPage/>} />
                </Route>
                <Route path="/" element={<Navigate to="posts" />} />
            </Routes>

        </Suspense>
    )
}