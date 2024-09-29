import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  typeStyle?: "primary" | "secondary";
}

export default function Button({
  typeStyle = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        {...props}
        className={twMerge(
          "whitespace-nowrap px-5 py-3 rounded-md font-bold w-full text-md text-white transition-all ease-linear",
          typeStyle === "primary" && "bg-pink-300 hover:bg-pink-400",
          typeStyle === "secondary" && "bg-green-500 border hover:bg-green-700",
          props.className,
          props.disabled && "bg-gray-400 cursor-not-allowed hover:bg-gray-300"
        )}
      >
        {children}
      </button>
    </>
  );
}
