import { NavBar } from "@/components/Navbar";
import imgContent from "../assets/bg-home.jpg";
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <section className="h-screen bg-home bg-cover bg-center from-black">
        <NavBar />
        <div className="ml-32 mt-20 max-w-md text-text">
          <h1 className="text-5xl">
            Celebre com estilo: seu <span className="text-primary">assistente</span> de aniversários.
          </h1>
          <h2 className="mt-6">
            Receba lembretes personalizados para nunca mais esquecer de um aniversário especial. O seu calendário de aniversários personalizado, sempre à mão.
          </h2>
        </div>
      </section>
      <section className="bg-second">
        <div className="text-text text-center pt-24">
          <h2 className="text-4xl">
            Serviços
          </h2>
          <h3 className="text-base mt-3 mb-24">
            Explore as vantagens exclusivas do nosso serviço
          </h3>
        </div>
        <div className="flex justify-center pb-7">
          <div className="bg-white w-96 h-96">
            <h4 className="text-3xl mx-auto">
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
    </main>
  )
}
