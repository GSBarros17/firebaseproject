import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthentication from "../../hooks/useAuthentication"
import styles from "./Register.module.css"


export default function Register(){
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const {createUser, error: authError, loading} = useAuthentication()
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        setError("")

        const user = {
            name,
            email,
            password
        }

        if(password !== confirmPassword){
            setError("As senhas precisam ser iguais!")
            return
        }

        const res = await createUser(user)
        console.log(res)

        navigate("/")

    }

    useEffect(() => {
      
        if(authError){
            setError(authError)
        }
    
    }, [authError])
    

    return(
        <div className={styles.registerContainer}>
            <h1>Cadastre-se e faça parte desta comunidade</h1>
            <p>Crie sua conta para realizar postagens</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input 
                        type="text" 
                        name="nameUser" 
                        required 
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
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
                        required 
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Confirmação de senha:</span>
                    <input 
                        type="password"
                        name="confirmPasswordUser" 
                        required 
                        placeholder="Confirme a sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {!loading && <button className="btnForm">Cadastrar</button>}
                {loading && <button className="btnForm">Aguarde...</button>}
            </form>
            {error && <p className="err">{error}</p>}
        </div>
        
    )
}