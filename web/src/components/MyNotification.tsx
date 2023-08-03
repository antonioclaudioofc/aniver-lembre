import { Pencil, Trash2 } from "lucide-react";

export function MyNotification() {
    return (
        <div
            className="flex items-center gap-x-4 text-gray-300"
        >
            <span>23/04</span>
            <span>23:23</span>
            <div
                className="flex ml-4 gap-x-4"
            >
                <Pencil
                    size={16}
                    className="text-yellow-500 cursor-pointer hover:opacity-70"
                />
                <Trash2
                    size={16}
                    className="text-red-600 cursor-pointer hover:opacity-70"
                />
            </div>
        </div>
    )
}