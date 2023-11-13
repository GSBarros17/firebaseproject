import { useState, useEffect } from "react"
import useAuthentication from "../../hooks/useAuthentication"
import styles from "./Login.module.css"

export default function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const {login, recoverPassword, error: authError, loading} = useAuthentication()
    
    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError("")

        const user = {
            email,
            password
        }

        const res = await login(user)

    }

    const recoverPasswordUser = async (e) =>{
        e.preventDefault()

        setError("")

        const user = {
            email
        }

        const res = await recoverPassword(user)

    }

    

    useEffect(() => {
      
        if(authError){
            setError(authError)
        }
    
    }, [authError])
    


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
                        required 
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
            {error && <p className="err">{error}</p>}
        </div>
    )
}