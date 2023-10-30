import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import ImgLogo from "../img/Logo_nome.png"

export default function Home () {
  return (
    <nav>
        <Link to="/">
            <img src={ImgLogo} alt="" />
        </Link>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">Sobre</Link>
            </li>
        </ul>
    </nav>
  )
}
