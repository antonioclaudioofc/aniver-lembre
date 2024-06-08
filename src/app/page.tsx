import Link from "next/link";
import CustomButton from "./components/Button";
import { CalendarPlus } from "lucide-react";

export default function Home() {
  return (
    <div>
      <Link href="/add-birth">
        <CustomButton className="fixed right-16 bottom-16 w-14 h-14 rounded-full">
          <CalendarPlus />
        </CustomButton>
      </Link>
    </div>
  );
}
