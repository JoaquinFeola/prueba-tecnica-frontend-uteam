import { Sidebar } from "@/shared/components";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};