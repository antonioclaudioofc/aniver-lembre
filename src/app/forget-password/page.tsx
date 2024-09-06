import Button from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";

export default function ForgetPassword() {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="">
        <div className="flex gap-4 self-start text-gray-200 hover:text-gray-300 cursor-pointer">
          <Icon name="arrow_back" />
          <span className="font-semibold">Voltar</span>
        </div>
        <Header
          className="mx-auto"
          title="Esqueceu sua senha?"
          subtitle="Um e-mail será enviado com um link para redefinir sua senha."
        />
        <form className="mt-5 w-72" action="#">
          <div className="grid w-full items-center gap-1">
            <label className="text-gray-300 font-bold text-sm" htmlFor="email">
              Email
            </label>
            <Input type="email" id="email" placeholder="Insira seu e-mail" />
          </div>
          <Button className="mt-6">Enviar</Button>
        </form>
      </div>
    </section>
  );
}
