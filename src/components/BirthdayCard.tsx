"use client";

import { useEffect, useState } from "react";
import { BirthdaysController } from "@/controllers/birthdays.controller";

interface BirthdayData {
  name: string;
  birthdayDate: string;
  notificationTime: string;
}

export function BirthdayCard({ userId }: { userId: string }) {
  const [birthdayData, setBirthdayData] = useState<BirthdayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = await BirthdaysController.getInstance();

        const unsubscribe = controller.listenToBirthdayChanges(
          userId,
          (data) => {
            if (data) {
              setBirthdayData(data);
            } else {
              setBirthdayData([]);
            }
            setLoading(false);
          }
        );

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (birthdayData.length === 0) {
    return <div>Nenhum dado de aniversário disponível.</div>;
  }

  return (
    <>
      {birthdayData.map((data, index) => (
        <div
          key={index}
          className="w-56 h-52 bg-pink-100 border-pink-200 rounded-xl text-xl font-bold text-pink-900"
        >
          <h2 className="text-center mt-6 mb-4">{data.name}</h2>
          <p className="ml-4 mb-6">{data.birthdayDate}</p>
          <p className="ml-4 mb-6">{data.notificationTime}</p>
        </div>
      ))}
    </>
  );
}
