"use client";

import profile from "@/../public/profile.jpg";
import { useScrollPosition } from "@/utils/useScrollPosition";
import clsx from "clsx";
import Image from "next/image";

export default function Navbar() {
  const scrollPosition = useScrollPosition();

  return (
    <nav
      className={clsx(
        "flex justify-between items-center sticky top-0 h-20 max-xl:h-20 bg-fuchsia-600 transition-all duration-300 z-10 px-24",
        scrollPosition > 0
          ? "backdrop-filter backdrop-blur-lg bg-opacity-90 bg-zinc-900 "
          : ""
      )}
    >
      <h2 className="text-3xl font-semibold text-white">Logo</h2>
      <Image
        className="w-14 h-14 rounded-full object-cover cursor-pointer hover:opacity-40"
        src={profile}
        width={120}
        height={123}
        alt="home"
      />
    </nav>
  );
}
