"use client";

import { Icon } from "@/components/Icon";
import { useAuth } from "./context/AuthContext";
import { FormEvent, useState } from "react";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import clsx from "clsx";
import { AuthController } from "@/controllers/auth.controller";
import dayjs from "dayjs";
import { BirthdaysController } from "@/controllers/birthdays.controller";
import { BirthdayCard } from "@/components/BirthdayCard";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  const togglePopover = () => {
    setIsOpenPopover(!isOpenPopover);
  };

  const toggleDialog = () => {
    setIsOpenDialog(!isOpenDialog);
  };

  async function logout() {
    const controller = await AuthController.getInstance();
    const isOk = await controller.signOut();

    if (isOk === true) {
      router.push("/login ");
    } else if (typeof isOk === "string") {
      toast(isOk);
    } else {
      toast("Erro ao registrar! Tente novamente.");
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50 m-auto">
        <div className="w-max flex items-center gap-2">
          <Icon
            className="text-blue-400 animate-spin"
            size="2rem"
            name="progress_activity"
          />
          <span className="font-bold text-xl text-gray-400">Carregando...</span>
        </div>
      </div>
    );

  if (user?.uid === undefined) redirect("/login");

  return (
    <>
      <nav
        className={clsx("bg-pink-300 w-full", "max-xl:px-24", "max-md:px-6")}
      >
        <div className="flex justify-between mx-auto items-center h-20 max-w-7xl">
          <h2 className="color-pink-900 font-bold text-2xl">Eventos</h2>
          <div className="flex items-center">
            <Icon
              fill="0"
              name="notifications_unread"
              color="color-yellow-300"
              className="mr-4"
            />
            <div className="relative">
              <div
                className="cursor-pointer flex items-center hover:opacity-80 relative"
                onClick={togglePopover}
              >
                <div className="h-11 w-11 bg-slate-400 rounded-full"></div>
                <h4
                  className={clsx("mr-2 font-semibold ml-3", "max-md:hidden")}
                >
                  {user?.displayName}
                </h4>
                <Icon name="keyboard_arrow_down" className="cursor-pointer" />
              </div>
              {isOpenPopover && (
                <div className="bg-pink-200 rounded-lg absolute top-20 z-50 right-0 hover:bg-none max-w-60">
                  <div className="flex flex-col border-pink-300 w-full">
                    <a
                      className="flex rounded-r-lg rounded-l-lg gap-3 w-full items-center font-bold p-4 hover:bg-pink-100"
                      href="#"
                    >
                      <Icon name="settings" />
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600">
                          Minha Conta
                        </span>
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
            </div>
          </div>
        </div>
      </nav>
      <div className={clsx("w-full", "max-xl:px-24", "max-md:px-6")}>
        <div
          className={clsx(
            "flex items-center justify-between max-w-7xl mx-auto py-5 border-b border-gray-50",
            "max-md:px-6 max-md:flex-wrap max-md:gap-y-6 max-md:justify-center",
            "max-sm:px-0"
          )}
        >
          <div
            className={clsx(
              "flex items-center gap-6",
              "max-lg:gap-2 max-md:justify-center"
            )}
          >
            <Input
              className={clsx("w-96", "max-md:w-60")}
              type="text"
              icon={<Icon size="1.25rem" name="search" />}
              id="search"
              placeholder="Pesquisar..."
            />
            <Icon name="filter_list" />
          </div>
          <Button
            onClick={toggleDialog}
            className="flex items-center w-max bg-green-300 text-white-50 hover:bg-green-200 p-3"
          >
            <Icon size="1.25rem" name="add" />
            Adicionar evento
          </Button>
        </div>
      </div>
      {isOpenDialog && (
        <Dialog
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          userId={user.uid}
        />
      )}
      <div
        className={clsx(
          "w-full py-6",
          "max-xl:px-24",
          "max-md:px-6 max-md:mx-auto",
          "max-lg:flex"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-5 gap-6 m-auto max-w-7xl",
            "max-xl:grid-cols-3",
            "max-lg:grid-cols-2 max-lg:mx-auto",
            "max-md:grid-cols-1",
            "max-sm:p-0"
          )}
        >
          <BirthdayCard userId={user.uid} />
        </div>
      </div>
    </>
  );
}

interface DialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
  userId: string;
}

function Dialog(props: DialogProps) {
  if (!props.isOpenDialog) return null;

  function isValidBirthdayDate(): boolean {
    const isDateValid = dayjs(birthdayDate, "YYYY-MM-DD");

    if (!isDateValid.isValid()) {
      return false;
    }

    const today = dayjs().startOf("day");

    if (isDateValid.isAfter(today)) {
      return false;
    }

    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const birthdayDateValid = isValidBirthdayDate();

    if (!birthdayDateValid) {
      toast("Data inválida.");
      setIsLoading(false);
      return;
    }

    const controllerBirthday = await BirthdaysController.getInstance();
    const isOk = await controllerBirthday.registerBirthday(
      name,
      birthdayDate,
      notificationTime,
      props.userId
    );
    setIsLoading(false);

    if (isOk === true) {
      toast("Adicionado com sucesso");
      props.setIsOpenDialog(false);
    } else {
      toast("Erro ao adicionar! Tente novamente");
    }
  }

  const [name, setName] = useState("");
  const [birthdayDate, setBirthdayDate] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-6 ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-96 w-full bg-pink-100">
        <div className="flex items-center justify-between text-pink-900 mb-10">
          <h3 className="text-xl font-bold">Adicionar Aniversário</h3>
          <Icon
            className="hover:opacity-50 transition-all ease-in cursor-pointer"
            onClick={() => props.setIsOpenDialog(false)}
            name="close"
          />
        </div>
        <form onSubmit={onSubmit} className="flex flex-col max-w-80 gap-4">
          <div className="grid w-full items-center gap-1">
            <label className="text-gray-300 font-bold text-sm" htmlFor="email">
              Nome
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Insira o nome"
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label className="text-gray-300 font-bold text-sm" htmlFor="email">
              Data de nascimento
            </label>
            <Input
              type="date"
              name="birthdayDate"
              id="birthdayDate"
              required
              value={birthdayDate}
              onChange={(e) => setBirthdayDate(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label className="text-gray-300 font-bold text-sm" htmlFor="email">
              Horário de notificação
            </label>
            <Input
              type="time"
              name="notificationTime"
              id="notificationTime"
              value={notificationTime}
              required
              onChange={(e) => setNotificationTime(e.target.value)}
            />
          </div>
          <Button
            disabled={isLoading}
            className="font-bold text-base mt-6 p-3 bg-green-300 hover:bg-green-200 transition-all ease-linear"
            type="submit"
          >
            {isLoading ? (
              <Icon
                size="0.75rem"
                className="animate-spin"
                name="progress_activity"
              />
            ) : (
              "Salvar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
