"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/Dialog";
import { eventSchema } from "@/models/event.model";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FirestoreController } from "@/controllers/firestore.controller";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/Form";
import { Input } from "../components/Input";
import React from "react";

export default function FormEvent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const formEvent = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      nomeEvento: "",
    },
  });

  async function onSubmitEvent(values: z.infer<typeof eventSchema>) {
    try {
      setIsLoading(true);

      const event = eventSchema.parse(values);
      const controller = await FirestoreController.getInstance();
      await controller.register({
        ...event,
        type: "event",
      });
      setIsLoading(false);

      toast.success("Inscrição realizada com sucesso!");
      router.push("/");
    } catch (error) {
      setIsLoading(false);

      let message = "Erro ao realizar inscrição, tente novamente.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    }
  }

  const closeDialog = () => {
    router.push("/");
  };

  return (
    <Dialog open={true} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-md max-h-[90%] overflow-y-auto overflow-x-hidden text-black">
        <DialogHeader>
          <DialogTitle>Adicionar Evento</DialogTitle>
          <DialogDescription>Preencha as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...formEvent}>
          <form
            id="form"
            onSubmit={formEvent.handleSubmit(onSubmitEvent)}
            className="space-y-4"
          >
            <FormField
              control={formEvent.control}
              name="nomeEvento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo do evento *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="
                          Insira o nome do evento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                form="form"
                className="bg-green-500 text-white hover:bg-green-600"
                type="submit"
                disabled={isLoading}
              >
                Salvar
              </Button>
              <DialogClose onClick={closeDialog} asChild>
                <Button>Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
