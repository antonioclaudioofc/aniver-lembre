"use client";

import { useAuth } from "./context/AuthContext";
import { FormEvent, useState } from "react";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { redirect, useRouter } from "next/navigation";
import clsx from "clsx";
import { AuthController } from "@/controllers/auth.controller";
import dayjs from "dayjs";
import { BirthdaysController } from "@/controllers/birthdays.controller";
import { BirthdayCard } from "@/components/BirthdayCard";
import { Toast } from "@/components/Toast";
import {
  CaretDown,
  CaretUp,
  CircleNotch,
  MagnifyingGlass,
  Plus,
  SignOut,
  X,
} from "@phosphor-icons/react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [alertType, setAlertType] = useState<"check" | "error">("check");

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  function showToastMessage(message: string, type: "check" | "error") {
    setToastMessage(message);
    setAlertType(type);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  async function logout() {
    const controller = await AuthController.getInstance();
    const isOk = await controller.signOut();

    if (isOk === true) {
      router.push("/login");
    } else if (typeof isOk === "string") {
      showToastMessage(isOk, "error");
    } else {
      showToastMessage("Erro ao registrar! Tente novamente.", "error");
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-50 m-auto">
        <div className="w-max flex items-center gap-2">
          <CircleNotch className="text-blue-600 animate-spin" size={64} />
        </div>
      </div>
    );

  if (!user?.uid) redirect("/login");

  return (
    <>
      <nav
        className={clsx("bg-pink-300 w-full", "max-xl:px-24", "max-md:px-6")}
      >
        <div className="flex justify-between mx-auto items-center h-20 max-w-7xl">
          <h2 className="color-pink-900 font-bold text-2xl">Eventos</h2>
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer transition-all ease-linear hover:opacity-75"
              onClick={toggleDropdown}
            >
              <div className="h-11 w-11 rounded-full bg-gray-200"></div>
              <h3 className="font-medium">
                {loading ? "Carregando ..." : user?.displayName}
              </h3>
              {!isOpenDropdown ? (
                <CaretDown size={16} />
              ) : (
                <CaretUp size={16} />
              )}
            </div>

            {isOpenDropdown && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full mt-2">
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li
                    className="px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                    onClick={logout}
                  >
                    {loading ? (
                      <div className="mx-auto">
                        <CircleNotch
                          weight="bold"
                          size={20}
                          className="text-green-300 animate-spin"
                        />
                      </div>
                    ) : (
                      <>
                        <SignOut size={24} weight="fill" />
                        <span className="font-bold">Sair da conta</span>{" "}
                      </>
                    )}
                  </li>
                </ul>
              </div>
            )}
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
          <form className="max-w-md w-96">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Pesquisar
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <MagnifyingGlass className="text-gray-400" size={20} />
              </div>
              <Input
                className=" ps-10"
                id="search"
                name="search"
                type="search"
                placeholder="Pesquisar ..."
              />
            </div>
          </form>

          <Button
            onClick={() => setIsOpenDialog(true)}
            className="flex items-center w-max bg-green-300 gap-3 text-white-50 hover:bg-green-200 p-3"
          >
            <Plus size={20} />
            Adicionar evento
          </Button>
        </div>
      </div>
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
      {isOpenDialog && (
        <Dialog
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
          userId={user.uid}
          showToastMessage={showToastMessage}
        />
      )}

      {showToast && <Toast typeAlert={alertType}>{toastMessage}</Toast>}
    </>
  );
}

interface DialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
  userId: string;
  showToastMessage: (message: string, type: "check" | "error") => void;
}

function Dialog({
  isOpenDialog,
  setIsOpenDialog,
  userId,
  showToastMessage,
}: DialogProps) {
  const [name, setName] = useState("");
  const [birthdayDate, setBirthdayDate] = useState("");
  const [notificationTime, setNotificationTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpenDialog) return null;

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
      showToastMessage("Data inválida", "error");

      setIsLoading(false);
      return;
    }

    const controllerBirthday = await BirthdaysController.getInstance();
    const isOk = await controllerBirthday.registerBirthday(
      name,
      birthdayDate,
      notificationTime,
      userId
    );
    setIsLoading(false);

    if (isOk === true) {
      showToastMessage("Adicionado com sucesso", "check");

      setIsOpenDialog(false);
    } else {
      showToastMessage("Erro ao adicionar! Tente novamente", "error");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-6 ">
      <div className="rounded-lg shadow-lg p-8 max-w-96 w-full bg-white">
        <div className="flex items-center justify-between text-pink-950 mb-10">
          <h3 className="text-xl font-bold">Adicionar Aniversário</h3>
          <X
            className="hover:opacity-50 transition-all ease-in cursor-pointer"
            size={24}
            onClick={() => setIsOpenDialog(false)}
          />
        </div>
        <form onSubmit={onSubmit} className="flex flex-col max-w-80 gap-4">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="birthdayDate">Data de Nascimento</label>
            <Input
              type="date"
              id="birthdayDate"
              name="birthdayDate"
              value={birthdayDate}
              onChange={(e) => setBirthdayDate(e.target.value)}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="notificationTime">Horário de Notificação</label>
            <Input
              type="time"
              id="notificationTime"
              name="notificationTime"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircleNotch size={24} className="animate-spin" />
            ) : (
              "Adicionar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
