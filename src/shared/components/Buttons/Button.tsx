import { type ButtonHTMLAttributes } from "react";
import { SpinnerLoading } from "../SpinnerLoading";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    loadingText?: string;
    variant?: Variant;
    size?: Size;
}

const variants: Record<Variant, string> = {
    primary: `
        bg-blue-600
        text-white
        hover:bg-blue-700
        shadow-sm
        hover:shadow-md
    `,
    secondary: `
        bg-slate-100
        text-slate-800
        border
        border-slate-200
        hover:bg-slate-200
    `,
    tertiary: `
        bg-transparent
        text-slate-700
        hover:bg-slate-100
    `,
};

const sizes: Record<Size, string> = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
};

export const Button = ({
    className,
    children,
    isLoading = false,
    loadingText = "Cargando...",
    variant = "primary",
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
                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    rounded-lg
                    font-medium

                    transition-all
                    duration-200

                    cursor-pointer
                    active:scale-[.98]

                    disabled:opacity-60
                    disabled:pointer-events-none
                    disabled:cursor-not-allowed
                    `,
                    variants[variant],
                    sizes[size]
                ),
                className
            )}
        >
            {isLoading ? (
                <>
                    <SpinnerLoading />
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};