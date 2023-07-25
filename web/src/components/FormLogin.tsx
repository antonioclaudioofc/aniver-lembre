import { User2, Lock } from "lucide-react";
import { Input } from "./Input";

export function FormLogin() {
    return (
        <form
            action=""
            className="text-gray_400"
            method="post"
        >
            <label
                className="text-white text-base mb-2"
                htmlFor="username"
            >
                Username
            </label>
            <div className="relative mb-4">
                <Input
                    name="username"
                    type="text"
                    placeholder="Digite seu username"
                />
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                >
                    <User2 />
                </span>
            </div>

            <label
                className="text-white text-base mb-2"
                htmlFor="password"
            >
                Senha
            </label>
            <div className="relative mb-4">
                <Input
                    name="password"
                    type="password"
                    placeholder="**********"
                />
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                >
                    <Lock />
                </span>
            </div>

            <div className="flex items-center gap-x-3 mb-4">
                <input type="checkbox" className="inline-block" />
                <label htmlFor="remembrer">Lembrar de mim</label>
            </div>

            <a
                href="/api/auth/login"
                className="w-full block text-center text-text bg-second py-2 rounded mt-5 hover:opacity-70"
            >
                Entrar
            </a>

        </form>
    )
}