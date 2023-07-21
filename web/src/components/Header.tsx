import { NavBar } from "./Navbar";

export function Header() {
    return (
        <header className="h-screen bg-home bg-cover bg-center">
        <NavBar />
        <div className="ml-32 mt-20 max-w-md text-text">
          <h1 className="text-5xl">
            Celebre com estilo: seu <span className="text-primary">assistente</span> de aniversários.
          </h1>
          <h2 className="text-base mt-6">
            Receba lembretes personalizados para nunca mais esquecer de um aniversário especial. O seu calendário de aniversários personalizado, sempre à mão.
          </h2>
        </div>
      </header>
    )
}