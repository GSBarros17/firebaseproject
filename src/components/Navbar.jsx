import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"
import ImgLogo from "../img/Logo_nome.png"

export default function Home () {
  return (
    <nav className={styles.navbar}>
        <Link to="/">
            <img src={ImgLogo} alt="" />
        </Link>
        <ul className={styles.NavItens}>
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
