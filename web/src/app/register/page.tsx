
import { Input } from "@/components/Input";
import { Mail, Pencil, User2, Lock, FileUp } from "lucide-react";

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
                        htmlFor="name"
                    >
                        Nome
                    </label>
                    <div className="relative mb-4">
                        <Input
                            type="text"
                            placeholder="Digite seu nome"
                        />
                        <span
                            className="absolute top-1/2 left-3 transform -translate-y-1/2"
                        >
                            <Pencil />
                        </span>
                    </div>

                    <label
                        className="text-white text-base mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <div className="relative mb-4">
                        <Input
                            type="text"
                            placeholder="ex: ZeDaManga123"
                        />
                        <span
                            className="absolute top-1/2 left-3 transform -translate-y-1/2"
                        >
                            <User2 />
                        </span>
                    </div>

                    <label
                        className="text-white text-base mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <div className="relative mb-4">
                        <Input
                            type="email"
                            placeholder="Digite seu email"
                        />

                        <span
                            className="absolute top-1/2 left-3 transform -translate-y-1/2"
                        >
                            <Mail />
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
                            placeholder="*********"
                        />
                        <span
                            className="absolute top-1/2 left-3 transform -translate-y-1/2"
                        >
                            <Lock />
                        </span>
                    </div>

                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" className="block w-full text-sm text-slate-500
                            file:py-2 file:px-4
                            file:rounded file:border-0
                            file:text-sm file:font-semibold
                            file:bg-gray_400 file:text-text
                            hover:file:bg-black_600"
                        />
                    </label>

                    <button
                        className="w-full mx-auto text-text bg-second py-2 rounded mt-4"
                    >
                        Cadastrar e entrar
                    </button>

                </form>
            </div>

        </section >
    )
}