import { NavBar } from "./Navbar";

export function Header() {
  return (
    <header className="w-full max-w-screen-[320px] h-screen mx-auto bg-home bg-cover bg-center">
      <NavBar />
      <div className="ml-12 mt-[10%] max-w-xs text-text mx-auto">
        <h1 className="text-2xl">
          Celebre com estilo: seu <span className="text-primary">assistente</span> de aniversários.
        </h1>
        <h2 className="text-base mt-6">
          Receba lembretes personalizados para nunca mais esquecer de um aniversário especial. O seu calendário de aniversários personalizado, sempre à mão.
        </h2>
      </div>
    </header> 
  )
}