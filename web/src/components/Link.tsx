type linkProps = {
    text: string
}

export function Link(props: linkProps) {
    return (
        <li
            className="cursor-pointer hover:text-second hover:transition duration-700 ease-linear"
        >
            <a href="">{props.text}</a>
        </li>
    )
}