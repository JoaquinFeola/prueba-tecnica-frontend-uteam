import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { PostProvider } from "./context/posts/PostProvider";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import "@/shared/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <StrictMode>
        <ToastContainer />
        <BrowserRouter>
            <PostProvider>
                <App />
            </PostProvider>
        </BrowserRouter>
    </StrictMode>
)
