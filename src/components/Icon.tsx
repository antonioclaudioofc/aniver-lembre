import { twMerge } from "tailwind-merge";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  size?: string;
  fill?: string;
}

export function Icon({ size, fill, ...props }: IconProps) {
  return (
    <span
      {...props}
      className={twMerge("material-symbols-outlined", props.className)}
      style={{
        fontSize: size ?? "1.5rem",
        fontVariationSettings: `'FILL' ${fill ?? "1"}`,
      }}
    >
      {props.name}
    </span>
  );
}
