"use client";

import { Icon } from "@/components/Icon";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "@/lib/firebase/auth";

export default function Home() {
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (user?.uid === undefined) redirect("/login");

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  async function logout() {
    const isOk = await signOut();

    if (isOk === true) {
      router.push("/login ");
    } else if (typeof isOk === "string") {
      console.log(isOk);
    } else {
      console.log("Erro ao registrar! Tente novamente.");
    }
  }

  if (loading)
    return (
      <div className="grid min-h-screen m-auto">
        <Icon className="animate-spin" name="progress_activity" />
        Carregando...
      </div>
    );

  return (
    <>
      <nav className="bg-pink-300 flex justify-between items-center h-20 px-24">
        <h2 className="color-pink-900 font-bold text-2xl">Eventos</h2>
        <div className="flex items-center">
          <Icon
            fill="0"
            name="notifications_unread"
            color="color-yellow-300"
            className="mr-4"
          />
          <div
            className="cursor-pointer flex items-center hover:opacity-80"
            onClick={togglePopover}
          >
            <div className="h-11 w-11 bg-slate-400 rounded-full"></div>
            <h4 className=" mr-2 font-semibold ml-3">{user?.displayName}</h4>
            <Icon name="keyboard_arrow_down" className="cursor-pointer" />
          </div>
        </div>
      </nav>
      <div className="flex items-center justify-between px-24 py-5 border-b border-gray-50">
        <div className="flex items-center gap-6">
          <Input
            className="w-96"
            type="text"
            icon={<Icon size="1.25rem" name="search" />}
            id="search"
            placeholder="Pesquisar..."
          />
          <Icon name="filter_list" />
        </div>
        <Button className="flex items-center w-max bg-green-300 text-white-50 hover:bg-green-200 p-3">
          <Icon size="1.25rem" name="add" />
          Adicionar evento
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-24 py-3">
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
        <div className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl"></div>
      </div>

      {isOpen && (
        <div className="bg-pink-200 rounded-lg absolute top-24 right-24 ">
          <div className="flex flex-col border-pink-300">
            <a
              className="flex rounded-r-lg rounded-l-lg gap-3 w-full items-center font-bold p-4 hover:bg-pink-100"
              href="#"
            >
              <Icon name="settings" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-600">Minha Conta</span>
                <span className="text-xs text-gray-300">
                  Gerenciar dados e preferências
                </span>
              </div>
            </a>
            <a
              className="flex rounded-l-lg rounded-b-lg gap-3 text-sm items-center text-red-600 font-bold p-4 hover:bg-pink-100"
              href="#"
              onClick={logout}
            >
              <Icon name="logout" />
              <span>Sair da conta</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
