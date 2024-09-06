import Image from "next/image";
import moments from "@/assets/moments.svg";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {children}
      <div className="bg-pink-100 flex justify-center">
        <Image
          className="max-w-xl w-full"
          src={moments}
          alt="Moments"
          width={500}
          height={500}
        />
      </div>
    </main>
  );
}
