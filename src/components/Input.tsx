import * as React from "react";
import clsx from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
  return (
    <input
      type={props.type}
      {...props}
      className={clsx(
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-pink-300 block w-full p-3",
        props.className
      )}
      autoComplete="off"
      placeholder={props.placeholder}
      required
    />
  );
}
