import { Menu } from "lucide-react";
import { Link } from "./Link";
import { Logo } from "./Logo";

export function NavBar() {
    return (
        <nav className="py-6 container mx-auto flex justify-between items-center">
            <div className="flex items-center justify-between w-full mx-6">
                <Logo />
                <Menu
                    size={36}
                    className="text-white cursor-pointer md:hidden hover:opacity-75 focus:outline-none"
                />
            </div>
            <ul className="hidden text-white md:flex md:space-x-4 md:justify-end md:items-center">
                <Link text="Inicio" />
                <Link text="Serviços" />
                <Link text="Sobre" />
                <Link text="Contato" />
                <a
                    href="/login"
                    className="text-[#1F2654] bg-second px-6 py-2 rounded-lg hover:bg-primary hover:transition duration-700 ease-linear"
                >
                    Entrar
                </a>
            </ul>
        </nav>



    )
}