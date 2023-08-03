import { Cake, Pencil, Plus, Trash2 } from "lucide-react";
import { MyNotification } from "./MyNotification";

export function Card() {
    return (
        <div
            className="w-80 h-[22rem] bg-second p-8 relative rounded-lg shadow-2xl"
        >
            <aside
                className="flex items-center justify-between gap-x-2"
            >
                <div
                    className="w-20 h-20 bg-gray-300 rounded-full"
                >
                    Lorem ipsum, dolor
                </div>
                <div
                    className="text-xl"
                >
                    <h3
                        className="text-gray-300"
                    >38 - 39</h3>
                    <h4
                        className="text-base text-green_900 mt-3 mb-2"
                    >12 de janeiro de 2023</h4>
                    <h4
                        className="text-white"
                    >Antonio</h4>
                </div>
            </aside>
            <h4
                className="text-green_900 mt-3"
            >Tipo de Evento</h4>
            <div
                className="flex gap-x-2 items-center"
            >
                <span
                    className="text-gray-300"
                >Aniversário
                </span>
                <Cake
                    size={20}
                    className="text-sky-700"
                />
            </div>
            <div
                className="mt-3">
                <div
                    className="flex items-center gap-x-2"
                >
                    <h4
                        className="text-green_900"
                    >
                        Minhas Notificações
                    </h4>
                    <Plus
                        size={16}
                        className="text-orange-600 cursor-pointer hover:opacity-75"
                    />
                </div>
                <div
                    className="flex flex-col"
                >
                    <MyNotification />
                    <MyNotification />
                    <MyNotification />
                    <MyNotification />

                </div>
            </div>
            <Pencil
                className="text-yellow-500 absolute top-2 right-2 cursor-pointer hover:opacity-70"
            />
            <Trash2
                className="text-red-600 absolute bottom-2 right-2 cursor-pointer hover:opacity-70"
            />
        </div>
    )
}