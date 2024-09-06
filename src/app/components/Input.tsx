import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {icon && <span className="absolute right-3 top-[10px]">{icon}</span>}
        <input
          type={type}
          className={cn(
            "flex text-gray-400 bg-white-50 text-sm h-10 w-full outline-none rounded-md border border-gray-50 p-4 placeholder:text-gray-200 focus:bg-pink-50 focus:border-pink-100 focus:text-black disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };