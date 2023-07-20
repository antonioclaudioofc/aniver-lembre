import imgContent from "../assets/bg-home.jpg";
import Image from 'next/image';

export function Services() {
    return (
        <section className="bg-second absolute top-[88%] left-0 right-0 rounded-[4rem]">
            <div className="text-text text-center pt-24">
                <h2 className="text-4xl">
                    Serviços
                </h2>
                <h3 className="text-base mt-3 mb-24">
                    Explore as vantagens exclusivas do nosso serviço
                </h3>
            </div>
            <div className="flex justify-center pb-7">
                <div className="bg-gray-100 w-96 h-96">
                    <h4 className="text-2xl">
                        Notificação por email
                    </h4>
                    <p className="text-justify">
                        Nunca esqueça um aniversário importante! Receba lembretes por e-mail e surpreenda seus entes queridos.
                    </p>
                </div>
                <Image
                    className="w-96 h-96 object-cover"
                    src={imgContent}
                    alt={""}
                />
            </div>
        </section>
    )
}