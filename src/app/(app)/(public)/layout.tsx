import Image from "next/image";
import moments from "@/assets/moments.svg";
import { Toaster } from "sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Toaster richColors position="bottom-center" duration={3000} />
      <section className="w-full min-h-screen grid grid-cols-2">
        <div className="bg-indigo-500 flex justify-center items-center flex-col gap-4">
          <Image
            src={moments}
            className="max-w-96 w-full max-h-[32rem]"
            alt="Imagens retirada do unDraw mostrando uma camera com três imagens ao lado"
          />
          <header className=" max-w-96 text-center">
            <h2 className="text-4xl font-bold mb-2 text-white">
              Nunca esqueça um aniversário!
            </h2>
            <p className="text-gray-200">
              Receba lembretes e celebre seus amigos e familiares com
              pontualidade.
            </p>
          </header>
        </div>
        <div className="flex justify-center items-center">{children}</div>
      </section>
    </div>
  );
}
