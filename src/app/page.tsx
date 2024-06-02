import CustomButton from "./components/Button";
import Navbar from "./components/Navbar";
import { CalendarPlus } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CustomButton className="fixed right-16 bottom-16 w-14 h-14 rounded-full">
        <CalendarPlus />
      </CustomButton>
    </div>
  );
}
