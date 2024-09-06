interface IconProps {
  name: string;
  color?: string;
  size?: string;
  fill?: string;
}

export function Icon(props: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${props.color ?? "text-gray-400"}`}
      style={{
        fontSize: props.size ?? "24px",
        fontVariationSettings: `'FILL' ${props.fill ?? "1"}`,
      }}
    >
      {props.name}
    </span>
  );
}
