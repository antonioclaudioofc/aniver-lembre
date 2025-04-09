"use client";

import { Button } from "@/components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/Card";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import {
  BellRinging,
  Cake,
  CalendarDots,
  CaretDown,
  CircleNotch,
  MagnifyingGlass,
  NotePencil,
  Trash,
  SignOut,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { startTransition, useEffect, useState } from "react";
import { signOut } from "../../actions/user";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/Dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Contact,
  contactSchema,
  RelationshipEnum,
} from "@/models/contact.model";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/Form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/Select";
import {
  createContact,
  updateContact,
  removeContact,
} from "../../actions/contact";
import { toast } from "sonner";
import { useContact } from "@/hooks/useContact";
import {
  calculateAge,
  formatDateToBR,
  formatDateToInput,
} from "@/utils/validation";

export default function Home() {
  const { user, isLoadingUser } = useAuth();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogRemove, setIsOpenDialogRemove] = useState(false);
  const { contacts, isLoadingContact } = useContact();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const logout = async () => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        await signOut();

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    });
  };

  const handleAdd = () => {
    setSelectedContact({
      name: "",
      birthdate: "",
      relationship: "Amigo(a)",
    });
    setIsOpenDialog(true);
  };

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsOpenDialog(true);
  };

  const handleDelete = (contact: Contact) => {
    setSelectedContact(contact);
    setIsOpenDialogRemove(true);
  };

  return (
    <section>
      <div
        className={clsx("bg-indigo-500 w-full", "max-xl:px-16", "max-md:px-6")}
      >
        <div className="flex justify-between mx-auto max-w-7xl items-center max-h-20 py-4 mb-16">
          <div className="flex flex-row items-center gap-2">
            <CalendarDots weight="fill" className="text-white h-11 w-11" />
            <h2 className="text-white font-bold text-xl">AniverLembre</h2>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <div
                className="cursor-pointer flex items-center gap-3 text-white hover:opacity-80 relative"
                onClick={toggleDropdown}
              >
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                <h4 className={clsx("font-medium text-base", "max-md:hidden")}>
                  {isLoadingUser ? "Carregando..." : user?.name}
                </h4>
                <CaretDown className="w-4 h-4" />
              </div>
              {isOpenDropdown && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full mt-2">
                  <ul className="py-2 text-sm text-gray-700">
                    <li
                      className="px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                      onClick={logout}
                    >
                      {isLoading ? (
                        <div className="mx-auto">
                          <CircleNotch
                            weight="bold"
                            className="text-indigo-400 w-5 h-5 animate-spin"
                          />
                        </div>
                      ) : (
                        <>
                          <SignOut className="w-4 h-4" weight="fill" />
                          <span className="font-bold max-md:hidden">
                            Sair da conta
                          </span>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={clsx("max-w-7xl mx-auto", "max-xl:px-16", "max-md:px-5")}>
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 my-4 ">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Pesquise o nome do contato"
                  className="ps-10"
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlass
                    weight="bold"
                    className="h-5 w-5 text-gray-700"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Button
                className="flex gap-3"
                variant="secondary"
                onClick={() => handleAdd()}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        <hr className="text-gray-200 mb-4" />
        <div
          className={clsx(
            "flex gap-3 flex-wrap pb-16",
            "max-md:justify-center"
          )}
        >
          {isLoadingContact ? (
            "Carregando..."
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <Card
                key={contact.id}
                className="w-72 h-96 shadow bg-white cursor-pointer hover:bg-gray-50 transition-colors relative"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{contact.name}</CardTitle>
                  <CardDescription className="flex gap-2">
                    <Cake className="w-4 h-4 text-pink-300" weight="fill" />
                    <span>{formatDateToBR(contact.birthdate)}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="mb-2">
                    Completará{" "}
                    <span className="font-bold">
                      {calculateAge(contact.birthdate)}
                    </span>{" "}
                    anos
                  </h3>
                  <p>
                    Relacionamento:
                    <span className="font-bold"> {contact.relationship}</span>
                  </p>
                  <div className="h-24 overflow-hidden">
                    Messagem: Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Harum sit explicabo atque ad quas voluptatem ipsum eum
                    sequi pariatur tenetur officiis quaerat facere, molestiae
                    corrupti!
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="flex gap-2 items-center">
                    <BellRinging
                      className="w-4 h-4 text-indigo-500"
                      weight="fill"
                    />{" "}
                    <span>00/00/0000</span>
                  </p>
                </CardFooter>
                <div className="absolute right-4 bottom-6">
                  <div className="flex flex-row gap-4 items-center">
                    <Trash
                      onClick={() => handleDelete(contact)}
                      weight="fill"
                      className="w-8 h-8 text-red-500 cursor-pointer transition-all hover:text-red-300"
                    />
                    <NotePencil
                      onClick={() => handleEdit(contact)}
                      weight="fill"
                      className="w-8 h-8 text-yellow-500 cursor-pointer transition-all hover:text-yellow-300"
                    />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p>Nenhum contato cadastrado.</p>
          )}
        </div>
        <DialogContact
          open={isOpenDialog}
          onOpenChange={setIsOpenDialog}
          contact={selectedContact}
        />
        {selectedContact && (
          <DialogConfirmRemoveContact
            open={isOpenDialogRemove}
            onOpenChange={setIsOpenDialogRemove}
            contact={selectedContact}
          />
        )}
      </div>
    </section>
  );
}

interface DialogContactProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
}

type ContactSchema = z.infer<typeof contactSchema>;

function DialogContact(props: DialogContactProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formContact = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      birthdate: "",
      relationship: "Amigo(a)",
    },
  });

  useEffect(() => {
    formContact.reset({
      name: props.contact?.name ?? "",
      birthdate: props.contact?.birthdate
        ? formatDateToInput(props.contact?.birthdate)
        : "",
      relationship: props.contact?.relationship ?? "Amigo(a)",
    });
  }, [props.open, props.contact]);

  const onSubmitContact = (values: ContactSchema) => {
    setIsLoading(true);
    startTransition(async () => {
      let isOk;

      if (props.contact?.id) {
        isOk = await updateContact(props.contact.id, values);
      } else {
        isOk = await createContact(values);
      }

      if (isOk === true) {
        formContact.reset();
        toast.success(
          props.contact?.id
            ? "Aniversariante atualizado com sucesso!"
            : "Aniversariante criado com sucesso!"
        );
        props.onOpenChange(false);
      } else if (typeof isOk === "string") {
        toast.error(isOk);
      } else {
        toast.error("Erro ao registrar, Tente novamente!");
      }
      setIsLoading(false);
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Aniversariante</DialogTitle>
          <DialogDescription>Preencha as informações abaixo</DialogDescription>
        </DialogHeader>
        <Form {...formContact}>
          <form
            method="post"
            onSubmit={formContact.handleSubmit(onSubmitContact)}
            className="grid grid-cols-1 gap-2 mt-8"
          >
            <FormField
              control={formContact.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContact.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de nascimento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Selecione a data"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formContact.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relacionamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione tipo de relação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(RelationshipEnum.Values).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className={clsx(
                "mt-4 h-16",
                props.contact?.id
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-indigo-500 hover:bg-indigo-600"
              )}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <CircleNotch
                    weight="bold"
                    className="text-white w-6 h-6 animate-spin"
                  />
                </div>
              ) : props.contact?.id ? (
                "Atualizar"
              ) : (
                "Adicionar"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface PropsDialogConfirmRemoveContact {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact;
}

function DialogConfirmRemoveContact(props: PropsDialogConfirmRemoveContact) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitRemoveContact = () => {
    setIsLoading(true);
    startTransition(async () => {
      if (props.contact.id) {
        const isOk = await removeContact(props.contact?.id);
        setIsLoading(false);
        if (isOk === true) {
          props.onOpenChange(false);
          toast.success("Usuário removido com sucesso!");
        } else if (typeof isOk === "string") {
          toast.error(isOk);
        } else {
          toast.error("Erro ao registrar, Tente novamente!");
        }
      } else {
        toast.error("Usuário não encontrado!");
      }
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Aniversariante</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja excluir esse pessoa?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Nome:</span> {props.contact.name}
          </p>
          <p>
            <span className="font-semibold">Nascimento:</span>{" "}
            {formatDateToBR(props.contact.birthdate)}
          </p>
          <p>
            <span className="font-semibold">Relacionamento:</span>{" "}
            {props.contact.relationship}
          </p>
        </div>
        <DialogFooter className="grid grid-cols-2">
          <Button
            disabled={isLoading}
            variant={"outline"}
            className="mt-4 h-16"
            onClick={() => props.onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            variant={"destructive"}
            className="mt-4 h-16"
            onClick={() => onSubmitRemoveContact()}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <CircleNotch
                  weight="bold"
                  className="text-white w-6 h-6 animate-spin"
                />
              </div>
            ) : (
              "Excluir"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
