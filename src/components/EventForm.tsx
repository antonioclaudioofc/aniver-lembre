"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-react";
import { string, z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "./ui/label";
import { uploadEvent } from "@/utils/uploadEvent";
import { EventModel } from "@/model/EventModel";
import { storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import NextNProgress from "nextjs-progressbar";

export function EventForm({ closeDialog }: { closeDialog: () => void }) {
  const form = useForm<z.infer<typeof EventModel>>({
    resolver: zodResolver(EventModel),
    defaultValues: {
      eventName: "",
      eventDate: new Date(),
      category: "",
      location: "",
      description: "",
      frequency: "",
      urlImage: "",
    },
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const [fileImage, setFileImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileImage(file);
      field.onChange(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof EventModel>) => {
    try {
      setIsLoading(true);
      if (fileImage) {
        const now = new Date();
        const formattedDateTime = now.toISOString().replace(/:/g, "-");
        const fileNameWithDateTime = `${formattedDateTime}_${fileImage.name}`;
        const storageRef = ref(storage, `images/${fileNameWithDateTime}`);

        await uploadBytes(storageRef, fileImage);

        const downloadUrl = await getDownloadURL(storageRef);
        values.urlImage = downloadUrl;

        await uploadEvent(values);

        toast({
          title: "Evento adicionado com sucesso!",
        });

        closeDialog();
      } else {
        console.log("Nenhuma imagem selecionada para upload");
      }
    } catch (error) {
      console.error("Erro ao lidar com o formulário:", error);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Evento*</FormLabel>
                  <FormControl>
                    <Input placeholder="Reunião na empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data do Evento*</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Selecione a data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Será incrível"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua treze de maio, 776, Volta Redonda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              variant={"secondary"}
              onClick={handleNextStep}
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        )}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="aniversario">Aniversário</SelectItem>
                      <SelectItem value="trabalho">Trabalho</SelectItem>
                      <SelectItem value="evento">Evento</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequência*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nenhuma">Nenhum</SelectItem>
                      <SelectItem value="diariamente">Diariamente</SelectItem>
                      <SelectItem value="mensalmente">Mensalmente</SelectItem>
                      <SelectItem value="anualmente">Anualmente</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fileImage"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="fileImage">Imagem</Label>
                  <FormControl>
                    <Input
                      id="fileImage"
                      type="file"
                      onChange={(e) => handleChange(e, field)}
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <Button
                className="w-full"
                variant={"secondary"}
                onClick={handlePreviousStep}
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
              <Button className="w-full" type="submit" variant={"default"}>
                {isLoading ? (
                  <NextNProgress
                    color="#fff"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                  />
                ) : (
                  "Adicionar"
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
