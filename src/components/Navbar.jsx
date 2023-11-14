import { Link } from "react-router-dom"
import { FaBars } from "react-icons/fa";
import { useState } from "react"
import useAuthentication from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"
import styles from "./Navbar.module.css"
import ImgLogo from "../img/Logo_nome.png"



export default function Navbar () {

  const {user} = useAuthValue()
  const {logout} = useAuthentication()
  const { hideNavbar, setHideNavbar} = useState("false")

  const hideNavbar = () => {}

  return (
    <div className={styles.navContainer}>
        <section className={styles.headerMenu}>
            <Link to="/">
                <img src={ImgLogo} alt="logo zenblog" />
            </Link>
            <button className={styles.menuBtn}>
                <FaBars/>
            </button>
        </section>
        <nav className={styles.navbar}>
            <ul className={styles.navItens}>
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
                {user && (
                <>
                    <li>
                        <Link to="/dashboard">Painel</Link>
                    </li>
                    <li>
                        <Link to="/createpost">Novo Post</Link>
                    </li>
                </>
                )}
                <li>
                    <Link to="/about">Sobre</Link>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}  
            </ul>
        </nav>
    </div>
  )
}
