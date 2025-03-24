"use client";

import { CalendarDots, CaretDown, UserCircle } from "@phosphor-icons/react";
import clsx from "clsx";

export default function Home() {
  return (
    <section>
      <div
        className={clsx("bg-indigo-500 w-full", "max-xl:px-16", "max-md:px-6")}
      >
        <div className="flex justify-between mx-auto items-center max-h-20 max-w-7xl py-4 mb-16">
          <div className="flex flex-row items-center gap-2">
            <CalendarDots
              weight="fill"
              className="text-white h-11 w-11"
              size={32}
            />
            <h2 className="text-white font-bold text-xl">AniverLembre</h2>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <div className="cursor-pointer flex items-center gap-3 text-white hover:opacity-80 relative">
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                <h4 className={clsx("font-medium text-base", "max-md:hidden")}>
                  Maria Rebeca
                </h4>
                <CaretDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
