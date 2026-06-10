import { type ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    backgroundCanClose?: boolean;
    children: ReactNode;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    backgroundCanClose
}: Props) => {
    if (!isOpen) return null;

    return (
        <div
            className="
                fixed inset-0 z-100
                flex items-center justify-center
                bg-black/50
                backdrop-blur-sm
                p-4
            "
            {...(backgroundCanClose) && {
                onClick: onClose
            }}
        >
            <div
                className="
                    w-full max-w-lg
                    rounded-xl
                    bg-white
                    shadow-xl
                    animate-in fade-in zoom-in
                "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-slate-200 p-4">
                    <h2 className="text-lg font-semibold text-slate-800">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            rounded-md
                            p-1
                            text-slate-500
                            transition-colors
                            hover:bg-slate-100
                            cursor-pointer
                        "
                    >
                        <MdClose size={22} />
                    </button>
                </div>

                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};