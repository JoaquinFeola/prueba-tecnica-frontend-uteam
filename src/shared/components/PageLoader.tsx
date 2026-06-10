import { SpinnerLoading } from "./SpinnerLoading";

export const PageLoader = () => {
  return (
    <div className="h-dvh flex justify-center items-center fixed top-0 w-full left-0"><SpinnerLoading size={64}/></div>
  )
}
