import { FormRegister } from "@/components/FormRegister";
import { ChevronLeft } from "lucide-react";

export default function Register() {
    return (
        <section className="relative bg-green_900 flex justify-center">
             <a
                href="/login"
                className="absolute top-6 left-20 flex items-center gap-x-5 text-xl text-text hover:opacity-70"
            >
                <ChevronLeft size={28} />
                Voltar
            </a>
            <div className="max-w-sm w-[22rem] m-auto">
                <div className="my-12 text-center">
                    <div className="text-3xl cursor-pointer">
                        <span className="text-primary">Aniver</span>
                        <span className="text-text">Lembre</span>
                    </div>
                </div>
                <FormRegister />
                <div className="text-gray_400 underline text-center text-base mb-6">
                    <a href="/login">Já tenho conta! Entrar</a>
                </div>
            </div>
        </section >
    )
}