import { Icon } from "@/components/Icon";
import { getUserProfile } from "@/lib/auth";

export default function Home() {
  const auth = getUserProfile();
  console.log(auth);
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
        <h4 className=" mr-2 ml-3">Erica Roberta</h4>
        <Icon name="keyboard_arrow_down" />
      </div>
    </nav>
  );
}
