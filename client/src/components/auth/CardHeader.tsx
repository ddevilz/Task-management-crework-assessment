import { cn } from "@/lib/utils";
import { poppins } from "@/utils/fonts";

export const Header = () => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-4xl font-semibold", poppins.className)}>
        Welcome to <span className="text-[#4534AC]">Workflo</span>!
      </h1>
    </div>
  );
};
