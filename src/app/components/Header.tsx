import { twMerge } from "tailwind-merge";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function Header({ children, title, subtitle, ...props }: HeaderProps) {
  return (
    <header
      {...props}
      className={twMerge("text-center max-w-64", props.className)}
    >
      <h2 className="text-pink-900 text-2xl font-bold mb-2 mt-6">{title}</h2>
      <h4 className="text-pink-900 text-sm font-medium">{subtitle}</h4>
    </header>
  );
}
