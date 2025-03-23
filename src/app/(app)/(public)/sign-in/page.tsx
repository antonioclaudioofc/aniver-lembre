"use client";

import Image from "next/image";
import logo from "@/assets/logo.svg";
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
import { HOME, SIGNUP } from "../../constants/routes";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { signIn } from "../../actions/user";
import { toast } from "sonner";
import { CircleNotch } from "@phosphor-icons/react";

type AuthSchema = z.infer<typeof authSchema>;

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formAuth = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitSignIn = async (values: AuthSchema) => {
    setIsLoading(true);
    startTransition(async () => {
      const isOk = await signIn(values);

      setIsLoading(false);
      if (isOk === true) {
        router.push(HOME);
      } else if (typeof isOk === "string") {
        toast.error(isOk);
      } else {
        toast.error("Erro ao registrar, Tente novamente!");
      }
    });
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
          <Button disabled={isLoading} className="mt-4">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <CircleNotch
                  weight="bold"
                  className="text-white w-6 h-6 animate-spin"
                />
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
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
