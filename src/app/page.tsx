import { DialogForm } from "@/components/DialogForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  console.log(process.env);
  return (
    <div>
      <Navbar />
      <DialogForm />
    </div>
  );
}
