import { FormLogin } from "@/components/FormLogin";
import { ChevronLeft } from "lucide-react";

export default function Login() {
    return (
        <section className="relative h-screen bg-green_900 flex justify-center">
            <a
                href="/"
                className="absolute top-6 left-20 flex items-center gap-x-5 text-xl text-text hover:opacity-70"
            >
                <ChevronLeft size={28} />
                Pagina inicial
            </a>
            <div className="max-w-sm w-[22rem] m-auto">
                <div className="mb-12 text-center">
                    <div className="text-3xl cursor-pointer">
                        <span className="text-primary">Aniver</span>
                        <span className="text-text">Lembre</span>
                    </div>
                </div>

                <FormLogin />
                <div className="text-gray_400 underline text-center text-base flex flex-col mt-6">
                    <a href="">Esqueceu sua senha?</a>
                    <a href="/register">Não possui uma conta? Crie agora!</a>
                </div>
            </div>

        </section >
    )
}