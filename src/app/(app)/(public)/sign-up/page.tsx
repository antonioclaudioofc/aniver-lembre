import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function SignUp() {
  return (
    <div className="max-w-96">
      <div className="max-w-24 max-h-24 bg-gray-100 shadow p-2 rounded-full mx-auto mb-2">
        <Image
          src={logo}
          className="w-full h-full "
          alt="Logo do site, que é um calendário com cor roxo"
        />
      </div>
      <h1 className="text-5xl font-bold text-center">AniverLembre</h1>
      <p className="text-gray-500 text-center">
        Preencha as informações abaixo!
      </p>
      <form action="#" method="post" className="grid grid-cols-1 gap-2 mt-4">
        <div>
          <Label>E-mail</Label>
          <Input placeholder="Digite seu e-mail" />
        </div>
        <div>
          <Label>Senha</Label>
          <Input placeholder="Digite sua senha" />
        </div>
        <span className="text-right text-sm text-indigo-400 font-medium cursor-pointer transition-colors hover:text-indigo-500">
          Esqueceu a senha?
        </span>
        <Button>Entrar</Button>
      </form>
    </div>
  );
}
