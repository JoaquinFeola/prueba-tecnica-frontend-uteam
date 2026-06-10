import {
    forwardRef,
    type InputHTMLAttributes,
    type TextareaHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

interface BaseProps {
    label?: string;
    error?: string;
    helperText?: string;
    containerClassName?: string;
}

type Props =
    | (BaseProps & InputProps & { as?: "input" })
    | (BaseProps & TextareaProps & { as: "textarea" });

export const TextField = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    Props
>(
    (
        {
            as = "input",
            label,
            error,
            helperText,
            className,
            containerClassName,
            ...props
        },
        ref
    ) => {
        const classes = twMerge(
            clsx(
                `
                w-full
                rounded-lg
                border
                border-slate-300
                bg-white
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-200
                disabled:cursor-not-allowed
                disabled:bg-slate-100
                `,
                error &&
                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                className
            )
        );

        return (
            <div
                className={twMerge(
                    clsx("flex flex-col gap-1", containerClassName)
                )}
            >
                {label && (
                    <label className="text-sm font-medium text-slate-700">
                        {label}
                    </label>
                )}

                {as === "textarea" ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        className={classes}
                        {...(props as TextareaProps)}
                    />
                ) : (
                    <input
                        ref={ref as React.Ref<HTMLInputElement>}
                        className={classes}
                        {...(props as InputProps)}
                    />
                )}

                {error ? (
                    <span className="text-xs text-red-500">
                        {error}
                    </span>
                ) : (
                    helperText && (
                        <span className="text-xs text-slate-500">
                            {helperText}
                        </span>
                    )
                )}
            </div>
        );
    }
);

TextField.displayName = "TextField";