import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

const Loader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex items-center justify-center h-[100vh]", className)}
      {...props}>
      <AiOutlineLoading3Quarters
        size={30}
        color="purple"
        className="animate-spin"
      />
    </div>
  );
};

export default Loader;
