import {
    MdArticle,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const menuItems = [
    {
        label: "Posts",
        path: "/posts",
        icon: MdArticle,
    },
];

export const Sidebar = () => {
    return (
        <aside
            className="
                flex
                h-screen
                sticky
                top-0
                w-64
                flex-col

                border-r
                border-slate-200

                bg-white
            "
        >
            <div
                className="
                    border-b
                    border-slate-200
                    p-6
                "
            >
                <h1
                    className="
                        text-xl
                        font-bold
                        text-slate-900
                    "
                >
                    Posts App
                </h1>
            </div>

            <nav
                className="
                    flex-1
                    p-4
                "
            >
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `
                                        flex
                                        items-center
                                        gap-3

                                        rounded-lg
                                        px-4
                                        py-3

                                        transition-colors

                                        ${
                                            isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }
                                    `
                                    }
                                >
                                    <Icon size={22} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div
                className="
                    border-t
                    border-slate-200
                    p-4
                "
            >
                <p
                    className="
                        text-sm
                        text-slate-500
                    "
                >
                    Versión 1.0.0
                </p>
            </div>
        </aside>
    );
};