interface InputProps {
    type: string,
    placeholder: string,
}


export function Input(props: InputProps) {
    return (
        <input
            className="bg-black_600 w-full pl-12 py-2 relative"
            type={props.type}
            placeholder={props.placeholder}
        />
    )
}