import Button from "../components/Button";
import { Header } from "../components/Header";
import { Icon } from "../components/Icon";

export default function SucessPassword() {
  return (
    <section className="flex flex-col justify-center items-center">
      <Icon
        className="text-green-200 "
        name="check_circle"
        size="4rem"
        fill="1"
      />
      <Header
        title="Senha Alterada com Sucesso"
        subtitle="Sua senha foi atualizada. Agora você pode fazer login com sua nova senha."
      />
      <Button className="mt-6 w-72">Volta para Login</Button>
    </section>
  );
}
