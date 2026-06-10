import { Button } from "@/shared/components";
import { MdErrorOutline, MdRefresh } from "react-icons/md";

interface Props {
    message?: string;
    onRetry?(): void;
}

export const PostError = ({
    message = "Ocurrió un error al cargar los posts.",
    onRetry,
}: Props) => {
    return (
        <div className="flex justify-center items-center h-dvh">
            <div
                className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4

                    rounded-xl
                    border
                    border-red-200

                    bg-red-50

                    p-8
                    text-center
                "
            >
                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center

                        rounded-full

                        bg-red-100
                        text-red-600
                    "
                >
                    <MdErrorOutline size={32} />
                </div>

                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Algo salió mal
                    </h2>

                    <p className="max-w-md text-sm text-slate-600">
                        {message}
                    </p>
                </div>

                {onRetry && (
                    <Button onClick={onRetry}>
                        <MdRefresh size={18} />
                        Reintentar
                    </Button>
                )}

            </div>
        </div>
    );
};