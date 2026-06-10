import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { SpinnerLoading } from "../SpinnerLoading";

type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    size?: Size;
}

const sizes: Record<Size, string> = {
    sm: "h-12 min-w-12 px-4",
    md: "h-14 min-w-14 px-5",
    lg: "h-16 min-w-16 px-6",
};

export const FAB = ({
    className,
    children,
    isLoading = false,
    size = "md",
    disabled,
    ...attr
}: Props) => {
    return (
        <button
            {...attr}
            disabled={disabled || isLoading}
            className={twMerge(
                clsx(
                    `
                    fixed
                    bottom-6
                    right-6
                    z-50

                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    rounded-full

                    bg-blue-600
                    text-white

                    font-medium

                    shadow-lg
                    hover:bg-blue-700
                    hover:shadow-xl

                    transition-all
                    duration-200

                    active:scale-[.98]

                    cursor-pointer

                    disabled:opacity-60
                    disabled:pointer-events-none
                    disabled:cursor-not-allowed
                    `,
                    sizes[size]
                ),
                className
            )}
        >
            {isLoading ? (
                <>
                    <SpinnerLoading />
                </>
            ) : (
                children
            )}
        </button>
    );
};