import { Link } from "./Link";
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
                <Link text="Inicio"/>
                <Link text="Serviços"/>
                <Link text="Sobre"/>
                <Link text="Contato"/>
                
            </ul>
            <a href=""
                className="text-[#1F2654] bg-second px-8 py-2 rounded-lg hover:bg-primary hover:transition duration-700 ease-linear"
            >Entrar</a>
        </div>
    )
}