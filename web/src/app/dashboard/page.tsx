import { Card } from "@/components/Card"
import { NavbarDashboard } from "@/components/NavbarDashboard"
import { getUser } from "@/lib/auth"
import { Plus } from "lucide-react"

export default function Dashboard() {
    const { sub, name, avatarUser } = getUser()
    return (
        <div>
            <NavbarDashboard name={name} img={avatarUser} />
            <section className="mx-32 mt-6 flex items-center justify-between">
                <h2 className="text-4xl">Meus Eventos</h2>

                <div className="flex items-center gap-x-4 border p-2 rounded-xl cursor-pointer hover:bg-second">
                    <Plus className=" text-primary" />
                    <span>Adicionar Evento</span>
                </div>
            </section>
            <hr className="mx-32 mt-4 " />
            <div className="mx-32 mt-4">
                <Card />
            </div>
        </div>
    )
}