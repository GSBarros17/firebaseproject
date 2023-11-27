import { useState, useEffect } from "react"
import useAuthentication from "../../hooks/useAuthentication"
import styles from "./Login.module.css"

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const {login, recoverPassword, error: authError, message: sendEmail, loading} = useAuthentication()
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError("")

        const user = {
            email,
            password
        }
        
        if (email.trim() === "" || password.trim() === "") {
            setError("Preencha todos os campos");
            return;
        }
        const res = await login(user)
        console.log(res)

    }

    const recoverPasswordUser = async (e) =>{
        e.preventDefault()

        setError("")
        setMessage("")
        const user = {
            email
        }

        const res = await recoverPassword(user)
        console.log(res)
    }

    

    useEffect(() => {
      
        if(authError){
            setError(authError)
        }
    
    }, [authError])
    
    useEffect(() => {
      
        if(sendEmail){
            setMessage(sendEmail)
        }
    
    }, [sendEmail])

    return(
        <div className={styles.containerLogin}>
            <h1>Área de login</h1>
            <form onSubmit={handleSubmit}>
                <h2>Entrar</h2>
                <p>Faça o login para acessar sua conta!</p>
                <label>
                    <span>E-mail:</span>
                    <input 
                        type="email" 
                        name="emailUser" 
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input 
                        type="password"
                        name="passwordUser"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {!loading && <button onClick={recoverPasswordUser} className={styles.recoverPassword}>Recuperar senha</button>}
                {!loading && <button className="btnForm">Entrar</button>}
                {loading && <button className="btnForm">Aguarde...</button>}
            </form>
            {message && <h4 className="success">{message}</h4>}
            {error && <h4 className="err">{error}</h4>}
        </div>
    )
}