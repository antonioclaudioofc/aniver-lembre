import { Event } from "@/model/EventModel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Card className="w-[350px]">
      <Image
        src={event.urlImage!}
        width={80}
        height={320}
        alt={`Imagem do evento ${event.eventName}`}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
        <CardDescription>{event.frequency}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col space-y-1.5">
            <h4>Data: {new Date(event.eventDate).toLocaleDateString()}</h4>
            <h4>Localização: {event.location}</h4>
            <h4>Frequência: {event.frequency}</h4>
            <h4>Descrição: {event.description}</h4>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Excluir</Button>
        <Button>Editar</Button>
      </CardFooter>
    </Card>
  );
}
