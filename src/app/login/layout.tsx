import Image from "next/image";
import moments from "@/assets/moments.svg";
import clsx from "clsx";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={clsx("grid min-h-screen grid-cols-2", "max-md:grid-cols-1")}
    >
      {children}
      <div
        className={clsx(
          "bg-pink-100 flex justify-center px-6",
          "max-md:hidden"
        )}
      >
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
