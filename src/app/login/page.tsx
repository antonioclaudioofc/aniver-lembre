"use client";

import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { Header } from "@/components/Header";
import Link from "next/link";
import { REGISTER } from "../constants/routes";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthController } from "@/controllers/auth.controller";
import { Toast } from "@/components/Toast";
import {
  CalendarDots,
  CircleNotch,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    setError("");

    const controller = await AuthController.getInstance();
    const isOk = await controller.signIn(email, password);
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
    <div className="flex flex-col justify-center items-center">
      <CalendarDots
        weight="fill"
        className="text-pink-300 h-16 w-16"
        size={24}
      />
      <Header
        title="Bem vindo(a) de Volta"
        subtitle="Preencha as informações abaixo"
      />
      <form className="mt-10" onSubmit={onSubmit}>
        <fieldset className="grid gap-6 grid-cols-1 w-80 max-w-80">
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
                  <Eye onClick={handleTogglePassword} size={24} weight="fill" />
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
        <span className="text-pink-300 text-sm cursor-pointer block mt-2 mb-5 text-right hover:text-pink-400">
          Esqueceu a senha?
        </span>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <CircleNotch size={24} className="text-pink-200 animate-spin" />
            </div>
          ) : (
            "Entrar"
          )}
        </Button>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <p className="text-gray-400 mt-4 text-sm text-center">
          Não possui uma conta?{" "}
          <Link
            href={REGISTER}
            className="text-pink-300 cursor-pointer hover:text-pink-400"
          >
            Cadastre-se agora.
          </Link>
        </p>
      </form>
      {showToast && (
        <Toast typeAlert={alertType} onClose={() => setShowToast(false)}>
          {toastMessage}
        </Toast>
      )}
    </div>
  );
}
