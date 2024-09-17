"use client";

import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { Header } from "@/components/Header";
import partying from "@/assets/partying.svg";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { LOGIN } from "../constants/routes";
import { useRouter } from "next/navigation";
import { signUpWithEmailAndPassword } from "@/lib/firebase/auth";
import { toast } from "sonner";
import clsx from "clsx";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      toast("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    const isOk = await signUpWithEmailAndPassword(name, email, password);
    setIsLoading(false);

    if (isOk === true) {
      router.push("/");
    } else if (typeof isOk === "string") {
      toast(isOk);
    } else {
      toast("Erro ao registrar! Tente novamente.");
    }
  }

  return (
    <main
      className={clsx("grid min-h-screen grid-cols-2", "max-md:grid-cols-1")}
    >
      <div
        className={clsx(
          "bg-pink-100 flex justify-center px-6",
          "max-md:hidden"
        )}
      >
        <Image
          className="max-w-xl w-full"
          src={partying}
          alt="Moments"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Icon className="text-pink-500" size="4rem" name="today" fill="1" />
        <Header
          title="Cadastre-se agora"
          subtitle="Preencha as informações abaixo"
        />
        <form className="mt-10" onSubmit={onSubmit}>
          <fieldset className="grid gap-4 w-72">
            <div className="grid w-full items-center gap-1">
              <label className="text-gray-300 font-bold text-sm" htmlFor="name">
                Nome
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Insira seu nome"
              />
            </div>
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Insira seu e-mail"
              />
            </div>
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="password"
              >
                Senha
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                icon={
                  showPassword ? (
                    <Icon
                      className="text-gray-200 cursor-pointer hover:text-gray-300"
                      name="visibility_off"
                      size="1.25rem"
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <Icon
                      className="text-gray-200 cursor-pointer hover:text-gray-300"
                      name="visibility"
                      size="1.25rem"
                      onClick={handleTogglePassword}
                    />
                  )
                }
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha"
              />
            </div>
            <div className="grid w-full items-center gap-1">
              <label
                className="text-gray-300 font-bold text-sm"
                htmlFor="password"
              >
                Confirmação de senha
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                icon={
                  showPassword ? (
                    <Icon
                      className="text-gray-200 cursor-pointer hover:text-gray-300"
                      name="visibility_off"
                      size="1.25rem"
                      onClick={handleTogglePassword}
                    />
                  ) : (
                    <Icon
                      className="text-gray-200 cursor-pointer hover:text-gray-300"
                      name="visibility"
                      size="1.25rem"
                      onClick={handleTogglePassword}
                    />
                  )
                }
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Insira sua senha novamente"
              />
            </div>
          </fieldset>
          <Button disabled={isLoading} className="font-bold mt-6" type="submit">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 ">
                <Icon
                  size="1.25rem"
                  className="animate-spin"
                  name="progress_activity"
                />
                <span className="text-sm font-bold">Carregando ...</span>
              </div>
            ) : (
              "Cadastrar"
            )}
          </Button>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <p className="text-gray-400 mt-4 text-sm text-center">
            Já possui conta?{" "}
            <Link
              href={LOGIN}
              className="text-pink-700 cursor-pointer hover:text-pink-600"
            >
              Entrar.
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
