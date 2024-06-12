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
import { birthdaySchema } from "@/models/birthday.model";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FirestoreController } from "@/controllers/firestore.controller";
import { uploadImage } from "@/utils/uploadImage";
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
import { Textarea } from "../components/Textarea";
import { Images } from "lucide-react";
import Image from "next/image";

export default function FormBirth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const formBirth = useForm<z.infer<typeof birthdaySchema>>({
    resolver: zodResolver(birthdaySchema),
    defaultValues: {
      birthDate: "",
      description: "",
      email: "",
      imageLinkURL: "",
      name: "",
      notificationDate: "",
      notificationTime: "",
    },
  });

  async function onSubmitBirth(values: z.infer<typeof birthdaySchema>) {
    try {
      setIsLoading(true);

      if (selectedImage) {
        const imageUrl = await uploadImage(selectedImage);
        values.imageLinkURL = imageUrl;
      }

      const birth = birthdaySchema.parse(values);

      const controller = await FirestoreController.getInstance();
      await controller.register({
        ...birth,
        type: "birth",
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
          <DialogTitle>Adicionar Aniversário</DialogTitle>
          <DialogDescription>Preencha as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...formBirth}>
          <form
            id="form"
            onSubmit={formBirth.handleSubmit(onSubmitBirth)}
            className="space-y-4"
          >
            <FormField
              control={formBirth.control}
              name="imageLinkURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="cursor-pointer mx-auto flex items-center justify-center w-40 h-40 bg-gray-200 rounded-full hover:bg-gray-300">
                    {selectedImage ? (
                      <Image
                        className="w-full h-full object-cover rounded-full"
                        src={URL.createObjectURL(selectedImage)}
                        width={120}
                        height={123}
                        alt="Imagem selecionada"
                      />
                    ) : (
                      <Images className="h-12 w-12" />
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      placeholder="
                          Insira o nome do aniversariante"
                      onChange={(event) => {
                        field.onChange(event);
                        handleFileChange(event);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formBirth.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="
                          Insira o nome do aniversariante"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formBirth.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Insira a data de nascimento"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formBirth.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insira uma descrição"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formBirth.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Insira o email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={formBirth.control}
                name="notificationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de notificação</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Insira a data de notificação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formBirth.control}
                name="notificationTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário da notificação</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder="Insira a hora de notificação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button className="bg-green-600 hover:bg-green-700" form="form" type="submit" disabled={isLoading}>
                Salvar
              </Button>
              <DialogClose onClick={closeDialog} asChild>
                <Button className="bg-yellow-600 hover:bg-yellow-700 ">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
