import Link from "next/link"
import logo from "./dojo-logo.png"
import Image from "next/image"
export default function Navbar() {
  return (
    <nav>
        <Image src={logo} 
        alt='Dojo Helpdesk logo'
        width={70}
        placeholder='blur'
        quality={100}/>
        <h1>Dojo Helpdesk</h1>
        <Link href="/"> Dashborad</Link>
        <Link href="/tickets">Ticket</Link>
    </nav>
  )
}
