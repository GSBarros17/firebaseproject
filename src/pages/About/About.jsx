import styles from "./About.module.css"
import { BsPaperclip , BsGlobe2 , BsGithub , BsWhatsapp , BsLinkedin } from "react-icons/bs"
import Devimg from "../../img/devimg.jpg"
import Docdev from "../../docs/curriculoGuilherme.docx"

export default function About () {
  return (
    <div className={styles.about}>
      <h1>Sobre o <span>ZEN BLOG</span></h1>
      <p>O blog surgiu a partir de um curso de react do professor Matheus Battisti.</p>
      <p>O projeto possui React no Front-end e Firebase no Back-end.</p>
      <div className={styles.sectionContact}>
        <img src={Devimg} alt="imagem do desenvolvedor"/>
        <div className={styles.sectionTexts}>
            <h2>Olá, me chamo Guilherme Barros.</h2>
            <p>Sou o responsável por desenvolver esta página!</p>
            <h3>Caso você tenha interesse no meu trabalho,
            entre em contato comigo pelas minhas redes sociais:</h3>
            <div className={styles.socialMidia}>
                <a aria-label="currículo do desenvolvedor" href={Docdev}><BsPaperclip/></a>
                <a aria-label="link do site do desenvolvedor" href="https://www.devguilhermebarros.com.br"><BsGlobe2/></a>
                <a aria-label="link para whatsapp" href="https://wa.me/5561999767446"><BsWhatsapp/></a>
                <a aria-label="link do github do desenvolvedor" href="https://github.com/GSBarros17"><BsGithub/></a>
                <a aria-label="link do linkedin desenvolvedor" href="https://www.linkedin.com/in/guilherme-barros-b05632294"><BsLinkedin/></a>
            </div>
        </div>
      </div>
    </div>
  )
}
