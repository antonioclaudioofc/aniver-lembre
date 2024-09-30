import { useState } from "react";
import { Alarm, CalendarDots, NotePencil, Trash } from "@phosphor-icons/react";
import { Birthday } from "@/models/birthday.model";
import { Modal } from "./Modal";

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

  const handleEdit = (birthday: Birthday) => {
    setSelectedBirthday(birthday);
    setIsOpenModal(true);
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
    </>
  );
}
