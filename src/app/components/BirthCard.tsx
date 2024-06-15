"use client";

import React from "react";
import Button from "./Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import Image from "next/image";
import clsx from "clsx";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { firestore } from "@/services/firestore.service";

interface PropsBirth {
  initialData: { id: string; data: DocumentData }[];
}
export default function BirthCard(props: PropsBirth) {
  const [data, setData] = React.useState<{ id: string; data: DocumentData }[]>(
    props.initialData
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(firestore, "births"), (snapshot) => {
      const newData: { id: string; data: DocumentData }[] = [];
      snapshot.forEach((doc) => {
        newData.push({ id: doc.id, data: doc.data() });
      });
      setData(newData);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-24 w-full max-w-7xl mx-auto">
      <div
        className={clsx(
          "flex items-center gap-4 flex-wrap",
          "max-xl:px-5 max-xl:w-full max-lg:justify-center"
        )}
      >
        {data.map((birth: any) => (
          <Card key={birth.id} className="w-[350px] h-[600px] bg-violet-200 relative -z-10">
            <Image
              src={birth.data.imageLinkURL}
              width={80}
              height={320}
              alt={`Imagem do evento `}
              className="w-full h-64 object-cover rounded-se rounded-ss"
            />
            <CardHeader>
              <CardTitle>{birth.data.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <h4>Data de nascimento: {birth.data.birthDate}</h4>
                <h4>Descrição: {birth.data.description}</h4>
                <h4>Email: {birth.data.email}</h4>
                <h4>
                  Notificação: {birth.data.notificationDate} às{" "}
                  {birth.data.notificationTime}
                </h4>
              </div>
            </CardContent>
            <CardFooter className="absolute bottom-4 right-4">
              <Button className="bg-red-700 mr-32">Excluir</Button>
              <Button className="bg-yellow-600">Editar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
