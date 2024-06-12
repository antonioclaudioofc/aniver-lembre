import Link from "next/link";
import CustomButton from "./components/Button";
import { CalendarPlus } from "lucide-react";
import BirthCard from "./components/BirthCard";

export default function Home() {
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
        <BirthCard />
      </main>
      <div>
        <Link href="/add-birth">
          <CustomButton className="fixed right-16 bottom-16 w-14 h-14 rounded-full">
            <CalendarPlus />
          </CustomButton>
        </Link>
      </div>
    </>
  );
}
