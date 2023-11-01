import styles from "./About.module.css"
import imgLogo from "../../img/Logo.png"

export default function About () {
  return (
    <div className={styles.about}>
      <h1>Sobre o <span>ZEN BLOG</span></h1>
      <p>O blog surgiu a partir de um curso de react do professor Matheus Battisti.</p>
      <p>O projeto possui React no Front-end e Firebase no Back-end.</p>
      <img src={imgLogo} alt="" />
    </div>
  )
}
