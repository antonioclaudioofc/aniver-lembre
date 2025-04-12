"use client";

import { CalendarDots, ArrowLeft, CircleNotch } from "@phosphor-icons/react";
import clsx from "clsx";
import { HOME } from "../../constants/routes";
import Link from "next/link";
import { updateUserSchema } from "@/models/user.model";
import { Button } from "@/components/Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/Form";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, startTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { formatDateToBR } from "@/utils/validation";
import { Label } from "@/components/Label";

type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export default function Profile() {
  const { user, isLoadingUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const formUpdateUser = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    formUpdateUser.reset({
      name: user?.name,
    });
  }, [user]);

  const onSubmitUpdateProfile = (values: UpdateUserSchema) => {
    setIsLoading(true);
    startTransition(async () => {
      console.log(values);
    });
  };

  return (
    <section>
      <div
        className={clsx("bg-indigo-500 w-full", "max-xl:px-16", "max-md:px-6")}
      >
        <div className="flex justify-between mx-auto max-w-7xl items-center max-h-20 py-4">
          <Link
            className="flex flex-row items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity "
            href={HOME}
          >
            <CalendarDots weight="fill" className="text-white h-11 w-11" />
            <h2 className="text-white font-bold text-xl">AniverLembre</h2>
          </Link>
        </div>
      </div>
      <div className={clsx("mx-auto max-w-7xl", "max-xl:px-16", "max-md:px-6")}>
        <Link
          className="flex items-center cursor-pointer hover:opacity-50 transition-opacity font-bold gap-2 p-4 mb-12"
          href={HOME}
        >
          <ArrowLeft className="w-6 h-6" />
          <h4 className="text-lg">Voltar</h4>
        </Link>
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center">Perfil</h2>
          <p className=" text-gray-500 text-center">
            Atualize as informações do seu perfil
          </p>
          {isLoadingUser ? (
            "Caregando informações ..."
          ) : (
            <Form {...formUpdateUser}>
              <form
                method="post"
                onSubmit={formUpdateUser.handleSubmit(onSubmitUpdateProfile)}
                className="grid grid-cols-1 gap-6 mt-8"
              >
                <FormField
                  control={formUpdateUser.control}
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
                <div className="space-y-6 text-sm">
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input value={user?.email} disabled />
                    </FormControl>
                  </FormItem>
                  <div>
                    <Label>Criado em</Label>
                    <p className="text-gray-500 max-h-12">
                      {formatDateToBR(user?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <Label>Atualizado em</Label>
                    <p className="text-gray-500 max-h-12">
                      {formatDateToBR(user?.updatedAt)}
                    </p>
                  </div>
                </div>
                <Button disabled={isLoading} className="mt-4 h-16 w-max">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <CircleNotch
                        weight="bold"
                        className="text-white w-6 h-6 animate-spin"
                      />
                    </div>
                  ) : (
                    "Atualizar"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
}
