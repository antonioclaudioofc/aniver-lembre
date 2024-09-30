import { useState } from "react";
import {
  Alarm,
  CalendarDots,
  Info,
  NotePencil,
  Trash,
} from "@phosphor-icons/react";
import { Birthday } from "@/models/birthday.model";
import { Modal } from "./Modal";
import Button from "./Button";
import { BirthdaysController } from "@/controllers/birthdays.controller";

interface BirthdayCardsProp {
  data: Birthday[];
  userId: string;
  showToastMessage: (message: string, type: "check" | "error") => void;
}

export function BirthdayCards({
  data,
  userId,
  showToastMessage,
}: BirthdayCardsProp) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(
    null
  );
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [birthdayToDelete, setBirthdayToDelete] = useState<Birthday | null>(
    null
  );

  const handleEdit = (birthday: Birthday) => {
    setSelectedBirthday(birthday);
    setIsOpenModal(true);
  };

  const handleDeleteConfirmation = (birthday: Birthday) => {
    setBirthdayToDelete(birthday); 
    setIsOpenDialog(true); 
  };

  const handleDelete = async () => {
    if (birthdayToDelete) {
      const controller = await BirthdaysController.getInstance();
      const success = await controller.deleteBirthday(
        birthdayToDelete.id!,
        userId
      );

      if (success) {
        showToastMessage("Aniversário deletado com sucesso", "check");
      } else {
        showToastMessage("Erro ao deletar o aniversário", "error");
      }

      setIsOpenDialog(false);
      setBirthdayToDelete(null);
    }
  };

  if (data.length === 0) {
    return <div>Nenhum dado de aniversário disponível.</div>;
  }

  return (
    <>
      {data.map((birthday) => (
        <div
          key={birthday.id}
          className="w-56 h-56 bg-pink-50 border-pink-100 rounded-xl text-xl font-bold text-pink-950 relative"
        >
          <h2 className="text-center mt-6 mb-4">{birthday.name}</h2>
          <div className="ml-4 mb-3 flex items-center gap-2 text-gray-800">
            <CalendarDots weight="bold" size={24} />
            <p>{birthday.birthdayDate}</p>
          </div>
          <div className="ml-4 flex items-center gap-2 text-gray-800">
            <Alarm size={24} weight="fill" />
            <p>{birthday.notificationTime}</p>
          </div>
          <div className="ml-4 mt-4 flex items-center gap-1">
            <h4>Status:</h4>
            <span className="text-green-500">Concluído</span>
          </div>
          <Trash
            className="absolute bottom-2 right-4 text-red-600 cursor-pointer hover:opacity-55 transition-all ease-in"
            size={24}
            onClick={() => handleDeleteConfirmation(birthday)}
          />
          <NotePencil
            className="absolute bottom-2 right-12 text-yellow-300 cursor-pointer hover:opacity-55 transition-all ease-in"
            size={24}
            onClick={() => handleEdit(birthday)}
          />
        </div>
      ))}

      {selectedBirthday && (
        <Modal
          isOpenModal={isOpenModal}
          onCloseModal={() => setIsOpenModal(false)}
          birthdayData={selectedBirthday}
          userId={userId}
          showToastMessage={showToastMessage}
        />
      )}

      {isOpenDialog && birthdayToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Info className="mx-auto mb-4 text-gray-400 w-12 h-12" size={48} />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Você tem certeza que deseja deletar o aniversário de{" "}
              {birthdayToDelete.name}?
            </h3>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-800 "
              >
                Sim, eu confirmo
              </Button>
              <Button
                onClick={() => setIsOpenDialog(false)} 
                className="border bg-white hover:bg-gray-100 hover:text-pink-300 border-gray-200 text-gray-700"
              >
                Não, cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
