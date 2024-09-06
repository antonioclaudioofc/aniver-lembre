import Image from "next/image";
import moments from "./assets/moments.svg";
import { Icon } from "./components/Icon";
import { Input } from "./components/Input";
import Button from "./components/Button";

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="flex flex-col justify-center items-center">
        <Icon name="today" color="text-pink-500" fill="1" size="4rem" />
        <h2 className="text-pink-900 text-2xl font-bold mb-2 mt-6">
          Bem vindo(a) de Volta
        </h2>
        <h4 className="text-pink-900 text-sm font-medium">
          Preencha as informações abaixo
        </h4>
        <form className="mt-10" action="#">
          <fieldset className="flex flex-col gap-4 w-72">
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="email"
              >
                Email
              </label>
              <Input type="email" id="email" placeholder="Insira seu e-mail" />
            </div>
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="email"
              >
                Senha
              </label>
              <Input
                type="email"
                icon={<Icon name="visibility_off" />}
                id="email"
                placeholder="Insira sua senha"
              />
            </div>
          </fieldset>
          <Button>Entrar</Button>
        </form>
      </div>
      <div className="bg-pink-100 flex justify-center">
        <Image
          className="max-w-xl w-full"
          src={moments}
          alt="Moments"
          width={500}
          height={500}
        />
      </div>
    </main>
  );
}
