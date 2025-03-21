"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { z } from "zod";
import { authSchema } from "@/models/auth.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/Form";
import Link from "next/link";
import { SIGNUP } from "../../constants/routes";

type AuthSchema = z.infer<typeof authSchema>;

export default function SignIn() {
  const formAuth = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitSignIn = async (values: AuthSchema) => {
    console.log("SignIn");
  };

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
      <Form {...formAuth}>
        <form
          method="post"
          onSubmit={formAuth.handleSubmit(onSubmitSignIn)}
          className="grid grid-cols-1 gap-2 mt-8"
        >
          <FormField
            control={formAuth.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Insira seu e-mail"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formAuth.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="text-right text-sm text-indigo-400 font-medium cursor-pointer transition-colors hover:text-indigo-500">
            Esqueceu a senha?
          </span>
          <Button className="mt-4">Entrar</Button>
        </form>
      </Form>
      <Link
        className="font-medium text-black text-sm transition-opacity hover:opacity-75 mt-12 text-center block"
        href={SIGNUP}
      >
        Não possui conta?{" "}
        <span className="text-indigo-500">Cadastre-se agora!</span>
      </Link>
    </div>
  );
}
