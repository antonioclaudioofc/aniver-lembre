import { twMerge } from "tailwind-merge";
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  typeStyle?: "primary" | "secondary";
}

export default function CustomButton({
  typeStyle = "primary",
  children,
  ...props
}: CustomButtonProps) {
  return (
    <>
      <button
        {...props}
        className={twMerge(
          "whitespace-nowrap px-4 py-2 rounded-lg font-semibold duration-300 text-sm",
          typeStyle === "primary" &&
            "bg-violet-300 text-gray-100 hover:bg-violet-500",
          typeStyle === "secondary" &&
            "bg-transparent border border-gray-200 text-red-700 hover:bg-red-50",

          props.className,
          props.disabled && "bg-gray-400 cursor-not-allowed"
        )}
      >
        {children}
      </button>
    </>
  );
}
