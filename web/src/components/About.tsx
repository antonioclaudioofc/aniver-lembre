import imgAbout from "../assets/about.jpg";
import Image from 'next/image'
import { ArrowRight } from "lucide-react";

export function About() {
    return (
        <section className=" mt-[40%] pt-32 px-16 flex justify-between">
            <Image
                src={imgAbout}
                width={496}
                height={384}
                alt={""}
            />
            <div className="flex flex-col justify-center ml-32">
                <h2 className="text-4xl">Sobre</h2>
                <h3 className="text-xl my-5">Torne cada aniversário uma celebração inesquecível!</h3>
                <p className="text-base">
                    Nossa aplicação de lembrete de aniversário é a solução definitiva para nunca mais esquecer datas especiais. Diga adeus aos esquecimentos constrangedores e abrace a oportunidade de surpreender seus entes queridos em seu dia especial.
                </p>
                <a
                    className="text-primary flex gap-x-10 mt-5 hover:opacity-70"
                    href="/register">
                    Cadastre-se já
                    <ArrowRight
                        size={24}
                    />
                </a>
            </div>
        </section>
    )
}