import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarPlus } from "lucide-react";
import { AddForm } from "./AddForm";

export function DialogForm() {
  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-6 right-6" asChild>
        <Button className="bg-violet-500 text-white" variant="ghost">
          <CalendarPlus size={32} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Evento</DialogTitle>
          <DialogDescription>Preencha as informações abaixo</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddForm />
        </div>
       
      </DialogContent>
    </Dialog>
  );
}
