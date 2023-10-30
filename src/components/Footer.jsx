import styles from "./Footer.module.css"
import Logo from "../img/Logo.png"

export default function Footer () {
  return (
    <footer className={styles.footerContainer}>
        <h3>Escreva sobre rotinas e qualidade de vida!</h3>
        <img src={Logo} alt="" /><p>ZenBlog <span>©️</span> 2023</p>
    </footer>
  )
}
