"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { userSchema } from "@/models/user.model";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";
import Link from "next/link";
import { SIGNIN } from "../../constants/routes";
import { createUser } from "../../actions/user";
import { startTransition, useState } from "react";
import { CircleNotch } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserSchema = z.infer<typeof userSchema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const formUser = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitSignUp = (values: UserSchema) => {
    setIsLoading(true);
    startTransition(async () => {
      const isOk = await createUser(values);

      setIsLoading(false);
      if (isOk === true) {
        toast.success("Conta criada com sucesso!");
        router.push(SIGNIN);
      } else if (typeof isOk === "string") {
        toast.error(isOk);
      } else {
        toast.error("Erro ao registrar, Tente novamente!");
      }
    });
  };

  return (
    <div className="max-w-96">
      <h2 className="text-4xl font-bold text-center">Crie sua conta</h2>
      <p className="text-gray-500 text-center">
        Preencha as informações abaixo!
      </p>
      <Form {...formUser}>
        <form
          method="post"
          onSubmit={formUser.handleSubmit(onSubmitSignUp)}
          className="grid grid-cols-1 gap-2 mt-8"
        >
          <FormField
            control={formUser.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formUser.control}
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
            control={formUser.control}
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
          <FormField
            control={formUser.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmação de senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Insira sua senha novamente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} className="mt-4 h-16">
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
        href={SIGNIN}
      >
        Já possui conta? <span className="text-indigo-500">Entrar</span>
      </Link>
    </div>
  );
}
