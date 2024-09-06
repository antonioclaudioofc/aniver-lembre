import Button from "@/components/Button";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";

export default function CreateNewPassword() {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="">
        <div className="flex gap-4 self-start text-gray-200 hover:text-gray-300 cursor-pointer">
          <Icon name="arrow_back" />
          <span className="font-semibold">Voltar</span>
        </div>
        <Header
          className="mx-auto"
          title="Criar nova senha"
          subtitle="Por favor, insira sua nova senha abaixo."
        />
        <form className="mt-5" action="#">
          <fieldset className="grid gap-4 w-72">
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="new_password"
              >
                Nova senha
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
                id="new_password"
                placeholder="Insira a nova senha"
              />
            </div>
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="confirmed_new_password"
              >
                Confirmação de nova senha
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
                id="confirmed_new_password"
                placeholder="Insira novamente a nova senha"
              />
            </div>
          </fieldset>
          <Button className="mt-6">Criar</Button>
        </form>
      </div>
    </section>
  );
}
