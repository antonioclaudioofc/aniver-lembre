import { Icon } from "./components/Icon";
import { Input } from "./components/Input";
import Button from "./components/Button";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Icon className="text-pink-500" size="4rem" name="today" fill="1" />
      <Header
        title="Bem vindo(a) de Volta"
        subtitle="Preencha as informações abaixo"
      />
      <form className="mt-10" action="#">
        <fieldset className="grid gap-4 w-72">
          <div className="grid w-full items-center gap-1">
            <label className="text-gray-300 font-bold text-sm" htmlFor="email">
              Email
            </label>
            <Input type="email" id="email" placeholder="Insira seu e-mail" />
          </div>
          <div className="grid w-full items-center gap-1">
            <label
              className="text-gray-300 font-bold text-sm"
              htmlFor="password"
            >
              Senha
            </label>
            <Input
              type="password"
              icon={
                <Icon
                  className="text-gray-200 cursor-pointer hover:text-gray-300"
                  name="visibility_off"
                  size="1.25rem"
                />
              }
              id="password"
              placeholder="Insira sua senha"
            />
          </div>
        </fieldset>
        <span className="text-pink-700 text-sm cursor-pointer block mt-2 mb-5 text-right hover:text-pink-600">
          Esqueceu a senha?
        </span>
        <Button>Entrar</Button>
        <p className="text-gray-400 mt-4 text-sm text-center">
          Não possui uma conta?{" "}
          <span className="text-pink-700 cursor-pointer hover:text-pink-600">
            Cadastre-se agora.
          </span>
        </p>
      </form>
    </div>
  );
}
