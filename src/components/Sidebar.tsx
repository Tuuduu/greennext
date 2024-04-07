import Link from "next/link";


export default function Sidebar() {
    return (
        <nav>
            <Link href="/profile">Profile</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/users">Users</Link>
            <Link href="/order">Ажлын захиалга</Link>

        </nav>
    )
}
