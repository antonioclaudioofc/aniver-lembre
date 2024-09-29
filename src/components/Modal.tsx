import { CircleNotch, X } from "@phosphor-icons/react";
import { Input } from "./Input";
import { useEffect, useState, FormEvent } from "react";
import { BirthdaysController } from "@/controllers/birthdays.controller";
import dayjs from "dayjs";
import { Birthday } from "@/models/birthday.model";

interface ModalProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
  onSubmitModal: (item: Birthday) => void;
  userId: string | undefined;
  showToastMessage: (message: string, type: "check" | "error") => void;
  birthdayData?: Birthday;
}

export function Modal({
  isOpenModal,
  onCloseModal,
  onSubmitModal,
  userId,
  showToastMessage,
  birthdayData,
}: ModalProps) {
  const [birthday, setBirthday] = useState<Birthday>({
    name: "",
    birthdayDate: "",
    notificationTime: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpenModal && birthdayData) {
      setBirthday(birthdayData);
    } else {
      setBirthday({ name: "", birthdayDate: "", notificationTime: "" });
    }
  }, [isOpenModal, birthdayData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday({
      ...birthday,
      [e.target.name]: e.target.value,
    });
  };

  function isValidBirthdayDate(): boolean {
    const isDateValid = dayjs(birthday.birthdayDate, "YYYY-MM-DD");

    if (!isDateValid.isValid() || isDateValid.isAfter(dayjs().startOf("day"))) {
      return false;
    }
    return true;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    if (!isValidBirthdayDate()) {
      showToastMessage("Data inválida", "error");
      setIsLoading(false);
      return;
    }

    const controller = await BirthdaysController.getInstance();

    try {
      console.log("Submitting Birthday Data:", birthday);
      if (birthday.id) {
        await controller.updateBirthday(
          birthday.id,
          birthday.name,
          birthday.birthdayDate,
          birthday.notificationTime,
          userId!
        );
        showToastMessage("Atualizado com sucesso", "check");
      } else {
        await controller.registerBirthday(
          birthday.name,
          birthday.birthdayDate,
          birthday.notificationTime,
          userId!
        );
        showToastMessage("Adicionado com sucesso", "check");
      }
    } catch (error) {
      console.error("Erro ao atualizar o aniversário:", error);
      showToastMessage("Erro ao salvar! Tente novamente", "error");
    } finally {
      setIsLoading(false);
      onCloseModal();
    }
  }

  if (!isOpenModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-6">
      <div className="rounded-lg shadow-lg p-8 max-w-96 w-full bg-white">
        <div className="flex items-center justify-between text-pink-950">
          <h3 className="text-xl font-bold">
            {birthdayData ? "Atualizar" : "Adicionar"} Aniversário
          </h3>
          <X
            className="hover:opacity-50 transition-all ease-in cursor-pointer"
            size={24}
            onClick={onCloseModal}
          />
        </div>
        <p className="text-base font-medium text-gray-400 mb-6">
          Preencha as informações abaixo
        </p>
        <form onSubmit={onSubmit} className="flex flex-col max-w-80 gap-4">
          <div className="grid w-full items-center gap-1">
            <label htmlFor="name">Nome</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={birthday.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="birthdayDate">Data de Nascimento</label>
            <Input
              type="date"
              id="birthdayDate"
              name="birthdayDate"
              value={birthday.birthdayDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1">
            <label htmlFor="notificationTime">Horário de Notificação</label>
            <Input
              type="time"
              id="notificationTime"
              name="notificationTime"
              value={birthday.notificationTime}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`${
              isLoading
                ? "bg-gray-400"
                : birthdayData
                ? "bg-yellow-300"
                : "bg-green-700"
            } text-white rounded-lg px-5 py-3 flex items-center justify-center`}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircleNotch size={24} className="animate-spin" />
            ) : birthdayData ? (
              "Atualizar"
            ) : (
              "Adicionar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
