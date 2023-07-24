
import { Input } from "@/components/Input";
import { Lock, User2 } from "lucide-react";

export default function Login() {
    return (
        <section className="h-screen bg-green_900 flex justify-center">
            <div className="max-w-sm w-[22rem] m-auto">
                <div className="mb-12 text-center">
                    <div className="text-3xl cursor-pointer">
                        <span className="text-primary">Aniver</span>
                        <span className="text-text">Lembre</span>
                    </div>
                </div>
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

                    <button
                        className="w-full mx-auto text-text bg-second py-2 rounded mt-5"
                    >
                        Entrar
                    </button>

                </form>
                <div className="text-gray_400 underline text-center text-base flex flex-col mt-6">
                    <a href="">Esqueceu sua senha?</a>
                    <a href="/register">Não possui uma conta? Crie agora!</a>
                </div>
            </div>

        </section >
    )
}