import { useEffect, useState } from "react";
import { BirthdaysController } from "@/controllers/birthdays.controller";
import { Alarm, CalendarDots, NotePencil, Trash } from "@phosphor-icons/react";
import { Birthday } from "@/models/birthday.model";
import { Modal } from "./Modal";

export function BirthdayCard({ userId }: { userId: string }) {
  const [birthdayData, setBirthdayData] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = await BirthdaysController.getInstance();

        const unsubscribe = controller.listenToBirthdayChanges(
          userId,
          (data) => {
            setBirthdayData(data || []);
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleEdit = (birthday: Birthday) => {
    setSelectedBirthday(birthday);
    setIsOpenModal(true);
  };

  const handleUpdateBirthday = (updatedBirthday: Birthday) => {
    setBirthdayData((prevData) =>
      prevData.map((item) =>
        item.id === updatedBirthday.id ? updatedBirthday : item
      )
    );
    setIsOpenModal(false);
    setSelectedBirthday(null);
  };

  if (loading) return <div>Loading...</div>;

  if (birthdayData.length === 0) {
    return <div>Nenhum dado de aniversário disponível.</div>;
  }

  return (
    <>
      {birthdayData.map((data) => (
        <div
          key={data.id}
          className="w-56 h-56 bg-pink-50 border-pink-100 rounded-xl text-xl font-bold text-pink-950 relative"
        >
          <h2 className="text-center mt-6 mb-4">{data.name}</h2>
          <div className="ml-4 mb-3 flex items-center gap-2 text-gray-800">
            <CalendarDots weight="bold" size={24} />
            <p>{data.birthdayDate}</p>
          </div>
          <div className="ml-4 flex items-center gap-2 text-gray-800">
            <Alarm size={24} weight="fill" />
            <p>{data.notificationTime}</p>
          </div>
          <div className="ml-4 mt-4 flex items-center gap-1">
            <h4>Status:</h4>
            <span className="text-green-500">Concluído</span>
          </div>
          <Trash
            className="absolute bottom-2 right-4 text-red-600 cursor-pointer hover:opacity-55 transition-all ease-in"
            size={24}
            onClick={() => {
              console.log("Delete:", data);
            }}
          />
          <NotePencil
            className="absolute bottom-2 right-12 text-yellow-300 cursor-pointer hover:opacity-55 transition-all ease-in"
            size={24}
            onClick={() => handleEdit(data)}
          />
        </div>
      ))}

      {selectedBirthday && (
        <Modal
          isOpenModal={isOpenModal}
          onCloseModal={() => setIsOpenModal(false)}
          onSubmitModal={handleUpdateBirthday}
          userId={userId}
          showToastMessage={(message: string, type: "check" | "error") =>
            console.log(message, type)
          }
          birthdayData={selectedBirthday}
        />
      )}
    </>
  );
}
