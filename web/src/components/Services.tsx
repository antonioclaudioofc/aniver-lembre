import { ChevronLeft, ChevronRight } from "lucide-react";
import imgContent from "../assets/bg-home.jpg";
import Image from 'next/image';

export function Services() {
    return (
        <section className="bg-second absolute top-[90%] left-0 right-0 rounded-[4rem] py-16">
            <div className="text-text text-center">
                <h2 className="text-4xl">
                    Serviços
                </h2>
                <h3 className="text-xl mt-5 mb-16">
                    Explore as vantagens exclusivas do nosso serviço
                </h3>
            </div>
            <div className="flex items-center justify-center pb-7">
                <ChevronLeft
                    size={40}
                    className="mr-16 cursor-pointer hover:text-text hover:transition duration-200 ease-in"
                />
                <div className="flex justify-center items-center w-96 h-96">
                    <div className="bg-gray-100 flex justify-center flex-col items-center w-full h-full">
                        <h4 className="text-3xl text-center mb-5">
                            Notificação por email
                        </h4>
                        <p className="text-base text-justify max-w-[18rem]">
                            Nunca esqueça um aniversário importante! Receba lembretes por e-mail e surpreenda seus entes queridos.
                        </p>
                    </div>
                </div>
                <Image
                    className="w-96 h-96 object-cover"
                    src={"https://images.unsplash.com/photo-1665686308707-419a10042d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"}
                    alt={""}
                />
                <ChevronRight
                    size={40}
                    className="ml-16 cursor-pointer hover:text-text hover:transition duration-200 ease-in"
                />
            </div>
        </section>
    )
}