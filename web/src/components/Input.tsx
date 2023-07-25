interface InputProps {
    name: string,
    type: string,
    placeholder: string,
}


export function Input(props: InputProps) {
    return (
        <input
            name={props.name}
            className="bg-black_600 w-full pl-12 py-2 relative focus:text-white outline-none"
            type={props.type}
            placeholder={props.placeholder}
        />
    )
}