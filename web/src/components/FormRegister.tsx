'use client'

import { Pencil, User2, Mail, Lock, Camera, Image } from "lucide-react";
import { Input } from "./Input";
import { FormEvent } from "react";

export function FormRegister() {
    function handleCreateUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        console.log(Array.from(formData.entries()))
    }

    return (
        <form
            onSubmit={handleCreateUser}
            className="text-gray_400"
        >
            <label className="relative mx-auto mb-6 flex items-center w-16 h-16 rounded-[50%] border border-second p-16 bg-none text-gray_400 cursor-pointer hover:opacity-75">
                <Image
                    size={40}
                    className="text-gray_400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <input type="file" className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer" />
                <div className="absolute bottom-1 -right-2 bg-primary_600 text-text rounded-full p-3">
                    <Camera size={24} />
                </div>
            </label>
            <label
                className="text-white text-base mb-2"
                htmlFor="name"
            >
                Nome
            </label>
            <div className="relative mb-4">
                <Input
                    name="name"
                    type="text"
                    placeholder="Digite seu nome"
                />
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                >
                    <Pencil />
                </span>
            </div>

            <label
                className="text-white text-base mb-2"
                htmlFor="username"
            >
                Username
            </label>
            <div className="relative mb-4">
                <Input
                    name="user"
                    type="text"
                    placeholder="ex: ZeDaManga123"
                />
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                >
                    <User2 />
                </span>
            </div>

            <label
                className="text-white text-base mb-2"
                htmlFor="email"
            >
                Email
            </label>
            <div className="relative mb-4">
                <Input
                    name="email"
                    type="email"
                    placeholder="Digite seu email"
                />

                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                >
                    <Mail />
                </span>
            </div>

            <label
                className="text-white text-base mb-2"
                htmlFor="password"
            >
                Senha
            </label>

            <div className="relative mb-4">
                <Input
                    name="password"
                    type="password"
                    placeholder="*********"
                />
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2"
                >
                    <Lock />
                </span>
            </div>

            <label className="flex items-center gap-x-4 text-base" htmlFor="">
                <input type="checkbox" />
                Li e aceito os termos de uso.
            </label>

            <button
                className="w-full mx-auto text-text bg-second py-2 rounded my-5"
            >
                Cadastrar e entrar
            </button>

        </form>
    )
}