"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/Card";
import {
  BellRinging,
  Cake,
  CalendarDots,
  CaretDown,
} from "@phosphor-icons/react";
import clsx from "clsx";

export default function Home() {
  return (
    <section>
      <div
        className={clsx("bg-indigo-500 w-full", "max-xl:px-16", "max-md:px-6")}
      >
        <div className="flex justify-between mx-auto max-w-7xl items-center max-h-20 py-4 mb-16">
          <div className="flex flex-row items-center gap-2">
            <CalendarDots weight="fill" className="text-white h-11 w-11" />
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
      <div className="max-w-7xl mx-auto">
        <Card className="w-72 h-96 shadow bg-white cursor-pointer hover:bg-gray-50 transition-colors">
          <CardHeader>
            <CardTitle className="text-3xl">Maria Rebeca</CardTitle>
            <CardDescription className="flex gap-2">
              <Cake className="w-4 h-4 text-pink-300" weight="fill" />{" "}
              <span>00/00/0000</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl mb-2">
              Completará <span className="font-bold">00</span> anos
            </h3>
            <p>
              Relacionamento: <span className="font-bold">Parente</span>
            </p>
            <div className="h-24 overflow-hidden">
              Messagem: Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Harum sit explicabo atque ad quas voluptatem ipsum eum sequi
              pariatur tenetur officiis quaerat facere, molestiae corrupti!
            </div>
          </CardContent>
          <CardFooter>
            <p className="flex gap-2 items-center">
              <BellRinging className="w-4 h-4 text-indigo-500" weight="fill" />{" "}
              <span>00/00/0000</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
