"use server";

import Button from "./Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import Image from "next/image";
import clsx from "clsx";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/services/firestore.service";

export default async function EventCard() {
  const { data } = await getData();

  return (
    <div className="px-24 w-full max-w-7xl mx-auto">
      <div
        className={clsx(
          "flex items-center gap-4 flex-wrap",
          "max-xl:px-5 max-xl:w-full"
        )}
      >
        {data.map((birth: any) => (
          <Card key={birth.id} className="w-[350px] h-[524px] bg-violet-200">
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
            <CardFooter className="flex justify-between">
              <Button className="bg-red-700">Excluir</Button>
              <Button className="bg-yellow-600">Editar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function getData() {
  const querySnapshot = await getDocs(collection(firestore, "births"));
  const data: { id: string; data: DocumentData }[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, data: doc.data() });
  });
  return { data };
}
