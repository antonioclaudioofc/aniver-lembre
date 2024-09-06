import Button from "@/components/Button";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";

export default function CheckEmail() {
  return (
    <section className="flex flex-col justify-center items-center">
      <Icon className="text-yellow-200 " name="mail" size="4rem" />
      <Header
        title="Verifique seu e-mail"
        subtitle="Por favor, verifique sua caixa de entrada para redefinir sua senha"
      />
      <div className="w-72">
        <Button className="mt-6">Abrir Gmail</Button>
        <p className="text-gray-400 mt-4 text-sm text-center">
          Não recebeu o e-mail?{" "}
          <span className="text-pink-700 cursor-pointer hover:text-pink-600">
            Reenviar.
          </span>
        </p>
      </div>
    </section>
  );
}
