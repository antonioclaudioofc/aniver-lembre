"use client";

import CustomButton from "./components/Button";
import { CalendarPlus } from "lucide-react";
import BirthCard from "./components/BirthCard";
import FormEvent from "./components/FormEvent";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./components/Dialog";
import Button from "./components/Button";
import React from "react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <section className="mx-auto px-24 max-w-7xl">
        <header className="mt-16 mb-10">
          <h2 className="text-4xl font-bold">Meu Calendário de Destaque</h2>
          <h3 className="text-xl font-medium text-gray-700 mt-1 mb-5">
            Tenha sempre à mão as datas que realmente importam
          </h3>
          <hr className="text-gray-200" />
        </header>
      </section>
      <main>
        <BirthCard initialData={[]} />
      </main>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <CustomButton className="fixed right-16 bottom-16 w-14 h-14 rounded-full">
              <CalendarPlus />
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[90%] overflow-y-auto overflow-x-hidden text-black">
            <DialogHeader>
              <DialogTitle>Adicionar Aniversário</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo
              </DialogDescription>
            </DialogHeader>
            <FormEvent isLoading={isLoading} setIsLoading={setIsLoading} />
            <DialogFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                form="form"
                type="submit"
                disabled={isLoading}
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
