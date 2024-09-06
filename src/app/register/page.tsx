"use client";

import Image from "next/image";
import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { Header } from "@/components/Header";
import partying from "@/assets/partying.svg";
import { signup } from "@/actions/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function Register() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();

  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="bg-pink-100 flex justify-center">
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
        <form className="mt-10" action={action}>
          <fieldset className="grid gap-4 w-72">
            <div className="grid w-full items-center gap-1">
              <label className="text-gray-300 font-bold text-sm" htmlFor="name">
                Nome
              </label>
              <Input type="text" name="name" id="name" placeholder="Insira seu nome" />
            </div>
            {state?.errors?.name && <p>{state.errors.name}</p>}
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
                placeholder="Insira seu e-mail"
              />
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}
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
                name="password"
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
                type="password"
                icon={
                  <Icon
                    className="text-gray-200 cursor-pointer hover:text-gray-300"
                    name="visibility_off"
                    size="1.25rem"
                  />
                }
                id="password"
                name="password"
                placeholder="Insira sua senha novamente"
              />
            </div>
            {state?.errors?.password && (
              <div>
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}> - {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </fieldset>
          <Button disabled={pending} type="submit" className="mt-6">
            Cadastrar
          </Button>
          <p className="text-gray-400 mt-4 text-sm text-center">
            Já possui conta?{" "}
            <span className="text-pink-700 cursor-pointer hover:text-pink-600">
              Entrar.
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}
