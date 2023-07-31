import { getUser } from "@/lib/auth"

export default function Dashboard() {
    const { sub, name, username } = getUser()   
    return (
        <div>{`Id:${sub} Name:${name} Username:${username}`}</div>
    )
}