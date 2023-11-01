import { Link } from "react-router-dom"
import useAuthentication from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"
import styles from "./Navbar.module.css"
import ImgLogo from "../img/Logo_nome.png"



export default function Navbar () {

  const {user} = useAuthValue()

  return (
    <nav className={styles.navbar}>
        <Link to="/">
            <img src={ImgLogo} alt="" />
        </Link>
        <ul className={styles.NavItens}>
            <li>
                <Link to="/">Home</Link>
            </li>
            {!user && (
             <>
                <li>
                    <Link to="/login">Entrar</Link>
                </li>
                <li>
                    <Link to="/register">Cadastro</Link>
                </li>
             </>
            )}
            <li>
                <Link to="/about">Sobre</Link>
            </li>
        </ul>
    </nav>
  )
}
