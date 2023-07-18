import { Logo } from "./Logo";

export function NavBar() {
    return (
        <div
            className="mx-32 py-8 flex justify-between items-center"
        >
            <Logo />
            <ul
                className="text-base flex gap-x-12 text-text"
            >
                <li
                    className="cursor-pointer hover:text-second hover:transition duration-700 ease-linear"
                >
                    <a href="">Home</a>
                </li>
                <li
                    className="cursor-pointer hover:text-second hover:transition duration-500 ease-linear"
                >
                    <a href="">Serviços</a>
                </li>
                <li
                    className="cursor-pointer hover:text-second hover:transition duration-700 ease-linear"
                >
                    <a href="">Sobre</a>
                </li>
                <li
                    className="cursor-pointer hover:text-second hover:transition duration-700 ease-linear"
                >
                    <a href="">Contato</a>
                </li>
            </ul>
            <a href=""
                className="text-black bg-second px-5 py-1 rounded-sm hover:bg-primary hover:transition duration-700 ease-linear"
            >Entrar</a>
        </div>
    )
}