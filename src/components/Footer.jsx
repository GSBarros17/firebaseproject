import styles from "./Footer.module.css"
import Logo from "../img/Logo.png"

export default function Footer () {
  
  let dateYear = new Date()
  let currentYear = dateYear.getFullYear()
  
  return (
    <footer className={styles.footerContainer}>
        <h3>Escreva sobre rotinas e qualidade de vida!</h3>
        <img src={Logo} alt="" /><p>ZenBlog <span>©️</span> {currentYear}</p>
    </footer>
  )
}
