import { Cake } from "lucide-react";

export function Card() {
    return (
        <div className="w-64 bg-second p-6">
            <aside className="flex items-center justify-between gap-x-2">
                <div className="w-20 h-20 bg-gray-300 rounded-full">
                    Lorem ipsum, dolor
                </div>
                <div className="text-xl">
                    <h3>38 - 39</h3>
                    <h4 className="text-base mt-3 mb-2">12 de janeiro de 2023</h4>
                    <h4>Antonio</h4>
                </div>
            </aside>
            <h4>Tipo de Evento</h4>
            <div className="flex gap-x-2 items-center">
                <span>Aniversário</span>
                <Cake />
            </div>
            <div className="">
                <h4>Minhas Notificações</h4>
                <div className="flex gap-x-4">
                    <span>23/04</span>
                    <span>23:23</span>
                </div>
            </div>
        </div>
    )
}