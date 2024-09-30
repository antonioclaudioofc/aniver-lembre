"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { Header } from "@/components/Header";
import partying from "@/assets/partying.svg";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { LOGIN } from "../constants/routes";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AuthController } from "@/controllers/auth.controller";
import { Toast } from "@/components/Toast";
import { Input } from "@/components/Input";
import {
  CalendarDots,
  CircleNotch,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [alertType, setAlertType] = useState<"check" | "error">("error");

  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  function showToastMessage(message: string, type: "check" | "error") {
    setToastMessage(message);
    setAlertType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      showToastMessage("As senhas não coincidem", "error");
      setIsLoading(false);
      return;
    }
    const controller = await AuthController.getInstance();
    const isOk = await controller.signUpWithEmailAndPassword(
      name,
      email,
      password
    );
    setIsLoading(false);

    if (isOk === true) {
      router.push("/");
    } else if (typeof isOk === "string") {
      showToastMessage(isOk, "error");
    } else {
      showToastMessage("Erro ao registrar! Tente novamente.", "error");
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
        <CalendarDots
          weight="fill"
          className="text-pink-300 h-16 w-16"
          size={24}
        />
        <Header
          title="Cadastre-se agora"
          subtitle="Preencha as informações abaixo"
        />
        <form className="mt-10" onSubmit={onSubmit}>
          <fieldset className="grid gap-6 grid-cols-1 w-80 max-w-80 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nome
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Insira seu nome"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
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
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="password"
              >
                Senha
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insira sua senha"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-gray-500 cursor-pointer transition-all ease-linear">
                  {showPassword ? (
                    <Eye
                      onClick={handleTogglePassword}
                      size={24}
                      weight="fill"
                    />
                  ) : (
                    <EyeSlash
                      onClick={handleTogglePassword}
                      size={24}
                      weight="fill"
                    />
                  )}
                </div>
              </div>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="confirmPassword"
              >
                Confirmação de Senha
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Insira sua senha"
                />
                <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-400 hover:text-gray-500 cursor-pointer transition-all ease-linear">
                  {showPassword ? (
                    <Eye
                      onClick={handleTogglePassword}
                      size={24}
                      weight="fill"
                    />
                  ) : (
                    <EyeSlash
                      onClick={handleTogglePassword}
                      size={24}
                      weight="fill"
                    />
                  )}
                </div>
              </div>
            </div>
          </fieldset>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <CircleNotch size={24} className="text-pink-200 animate-spin" />
              </div>
            ) : (
              "Cadastrar"
            )}
          </Button>
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
      {showToast && (
        <Toast typeAlert={alertType} onClose={() => setShowToast(false)}>
          {toastMessage}
        </Toast>
      )}
    </main>
  );
}
