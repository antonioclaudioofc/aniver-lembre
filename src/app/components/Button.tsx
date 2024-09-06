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
          "whitespace-nowrap px-4 py-2 rounded-md font-semibold w-full duration-300 text-sm",
          typeStyle === "primary" && "bg-pink-300 text-white-50 hover:bg-pink-500",
          typeStyle === "secondary" &&
            "bg-green-500 border text-white hover:bg-green-700",

          props.className,
          props.disabled && "bg-gray-400 cursor-not-allowed"
        )}
      >
        {children}
      </button>
    </>
  );
}
