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
        "flex justify-center items-center sticky top-0 h-20 max-xl:h-20 bg-violet-300 transition-all duration-300",
        scrollPosition > 0
          ? "backdrop-filter backdrop-blur-lg bg-opacity-90 bg-gray-600 "
          : ""
      )}
    >
      <div
        className={clsx(
          "flex justify-between px-24 w-full max-w-7xl items-center  ",
          "max-xl:px-5 max-xl:w-full"
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
      </div>
    </nav>
  );
}
