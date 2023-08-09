import { CalendarDays, Home, Settings, UserCircle2 } from "lucide-react";
import { Link } from "./Link";
import { Logo } from "./Logo";

interface Auth {
    name: string,
}

export function NavbarDashboard(props: Auth) {
    return (
        <div
            className="px-32 bg-green_900 py-9 flex justify-between items-center"
        >
            <Logo />
            <ul
                className="text-base flex gap-x-12 text-gray_400"
            >
                <div className="flex items-center justify-center gap-x-3">
                    <Home />
                    <Link text="Mural" />
                </div>
                <div className="flex items-center justify-center gap-x-3">
                    <CalendarDays />
                    <Link text="Calendário" />
                </div>
                <div className="flex items-center justify-center gap-x-3">
                    <Settings />
                    <Link text="Configurações" />
                </div>

            </ul>
            <div className="flex items-center justify-center gap-x-3 text-white">
                <UserCircle2 size={36} />
                <h4>{props.name}</h4>
            </div>
        </div>
    )
}