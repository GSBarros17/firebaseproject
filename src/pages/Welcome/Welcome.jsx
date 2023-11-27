import styles from "./Welcome.module.css"
import { Link } from "react-router-dom"
import imgLogo from "../../img/Logo.png"

export default function Welcome(){
    return(
        <div className={styles.welcomeContainer}>
            <div className={styles.welcomeCard}>
                <img src={imgLogo} alt="Logo"/>
                <h1>Cadastro realizado com sucesso!</h1>
                <h2>Seja bem-vindo(a) ao nosso blog.</h2>
                <p>Compartilhe suas experiências com nossa comunidade.</p>
                <p>Acesse nossa Home ou crie o seu primeiro post;</p>
                <div className={styles.linksContainer}>
                    <Link to="/" className="btnForm">Home</Link>
                    <Link to="/createpost" className="btnForm">Criar Post</Link> 
                </div>
            </div>
        </div>
    )
}