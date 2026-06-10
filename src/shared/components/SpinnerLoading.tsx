
interface Props {
    size?: number;
}

export const SpinnerLoading = ({ size = 20 }: Props) => {
    return (
        <div style={{ width: size, height: size }} className=" border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    )
}
