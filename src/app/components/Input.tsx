import React from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        autoComplete="off"
        className={twMerge(
          "flex h-10 w-full rounded-md border border-gray-200 bg-transparent",
          " px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent",
          "file:text-sm file:font-medium placeholder:text-gray-600 focus-visible:outline-none",
          "focus-visible:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
