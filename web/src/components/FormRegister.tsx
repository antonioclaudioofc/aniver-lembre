'use client'

import { Pencil, User2, Mail, Lock } from "lucide-react";
import { Input } from "./Input";
import { FormEvent } from "react";
import { MediaPicker } from "./MediaPicker";
import { api } from "@/lib/api";

export function FormRegister() {
    async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const fileToUpload = formData.get("avatarUser")

        if (fileToUpload) {
            const uploadFormData = new FormData()

            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('/upload', uploadFormData)


            console.log(uploadResponse.data)
        }
    }

    return (
        <form
            onSubmit={handleCreateUser}
            className="text-gray_400"
        >
            <MediaPicker />
            <label
                className="text-white text-base mb-2"
                htmlFor="name"
            >
                Nome
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
            </label>

            <label
                className="text-white text-base mb-2"
                htmlFor="username"
            >
                Username
                <div className="relative mb-4">
                    <Input
                        name="username"
                        type="text"
                        placeholder="ex: ZeDaManga123"
                    />
                    <span
                        className="absolute top-1/2 left-3 transform -translate-y-1/2"
                    >
                        <User2 />
                    </span>
                </div>
            </label>

            <label
                className="text-white text-base mb-2"
                htmlFor="email"
            >
                Email
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
            </label>

            <label
                className="text-white text-base mb-2"
                htmlFor="password"
            >
                Senha
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
            </label>


            <label className="flex items-center gap-x-4 text-base" htmlFor="">
                <input type="checkbox" />
                Li e aceito os termos de uso.
            </label>

            <button
                type="submit"
                className="w-full mx-auto text-text bg-second py-2 rounded my-5 hover:opacity-70"
            >
                Cadastrar e entrar
            </button>

        </form>
    )
}