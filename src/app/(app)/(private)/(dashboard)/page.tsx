"use client";

import { Button } from "@/components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/Card";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import {
  BellRinging,
  Cake,
  CalendarDots,
  CaretDown,
  CircleNotch,
  MagnifyingGlass,
  SignOut,
} from "@phosphor-icons/react";
import clsx from "clsx";
import { startTransition, useState } from "react";
import { signOut } from "../../actions/user";

export default function Home() {
  const { user, loading } = useAuth();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };

  const logout = async () => {
    setIsLoading(true);
    startTransition(async () => {
      try {
        await signOut();

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    });
  };

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
              <div
                className="cursor-pointer flex items-center gap-3 text-white hover:opacity-80 relative"
                onClick={toggleDropdown}
              >
                <div className="w-9 h-9 rounded-full bg-gray-200"></div>
                <h4 className={clsx("font-medium text-base", "max-md:hidden")}>
                  {loading ? "Carregando..." : user?.name}
                </h4>
                <CaretDown className="w-4 h-4" />
              </div>
              {isOpenDropdown && (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full mt-2">
                  <ul className="py-2 text-sm text-gray-700">
                    <li
                      className="px-4 py-2 text-red-500 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                      onClick={logout}
                    >
                      {isLoading ? (
                        <div className="mx-auto">
                          <CircleNotch
                            weight="bold"
                            className="text-indigo-400 w-5 h-5 animate-spin"
                          />
                        </div>
                      ) : (
                        <>
                          <SignOut className="w-4 h-4" weight="fill" />
                          <span className="font-bold max-md:hidden">
                            Sair da conta
                          </span>
                        </>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 my-4">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Pesquise o nome do contato"
                  className="ps-10"
                />
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlass
                    weight="bold"
                    className="h-5 w-5 text-gray-700"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <Button className="flex gap-3" variant="secondary">
                Adicionar
              </Button>
            </div>
          </div>
        </div>
        <hr className="text-gray-200 mb-4" />
        <div className="flex justify-between flex-wrap items-center">
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
                Messagem: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Harum sit explicabo atque ad quas voluptatem ipsum eum
                sequi pariatur tenetur officiis quaerat facere, molestiae
                corrupti!
              </div>
            </CardContent>
            <CardFooter>
              <p className="flex gap-2 items-center">
                <BellRinging
                  className="w-4 h-4 text-indigo-500"
                  weight="fill"
                />{" "}
                <span>00/00/0000</span>
              </p>
            </CardFooter>
          </Card>
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
                Messagem: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Harum sit explicabo atque ad quas voluptatem ipsum eum
                sequi pariatur tenetur officiis quaerat facere, molestiae
                corrupti!
              </div>
            </CardContent>
            <CardFooter>
              <p className="flex gap-2 items-center">
                <BellRinging
                  className="w-4 h-4 text-indigo-500"
                  weight="fill"
                />{" "}
                <span>00/00/0000</span>
              </p>
            </CardFooter>
          </Card>
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
                Messagem: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Harum sit explicabo atque ad quas voluptatem ipsum eum
                sequi pariatur tenetur officiis quaerat facere, molestiae
                corrupti!
              </div>
            </CardContent>
            <CardFooter>
              <p className="flex gap-2 items-center">
                <BellRinging
                  className="w-4 h-4 text-indigo-500"
                  weight="fill"
                />{" "}
                <span>00/00/0000</span>
              </p>
            </CardFooter>
          </Card>
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
                Messagem: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Harum sit explicabo atque ad quas voluptatem ipsum eum
                sequi pariatur tenetur officiis quaerat facere, molestiae
                corrupti!
              </div>
            </CardContent>
            <CardFooter>
              <p className="flex gap-2 items-center">
                <BellRinging
                  className="w-4 h-4 text-indigo-500"
                  weight="fill"
                />{" "}
                <span>00/00/0000</span>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
