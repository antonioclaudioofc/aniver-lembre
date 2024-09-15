"use client";
import { Icon } from "@/components/Icon";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="bg-pink-300 flex justify-between items-center h-20 px-24">
      <h2 className="color-pink-900 text-2xl">Eventos</h2>
      <div className="flex items-center">
        <Icon
          fill="0"
          name="notifications_unread"
          color="color-yellow-300"
          className="mr-4"
        />
        <div className="h-11 w-11 bg-slate-400 rounded-full"></div>
        <h4 className=" mr-2 ml-3">{user?.displayName}</h4>
        <Icon name="keyboard_arrow_down" />
      </div>
    </nav>
  );
}
