import { useState, useEffect } from "react"
import styles from "./Register.module.css"

export default function Register(){
    return(
        <div className={styles.registerContainer}>
            <h2>Cadastre-se e faça parte desta comunidade</h2>
            <p>Crie sua conta para realizar postagens</p>
            <form>
                <label htmlFor="">
                    <span>Nome:</span>
                    <input 
                        type="text" 
                        name="nameUser" 
                        required 
                        placeholder="Digite seu nome completo" 
                    />
                </label>
                <label htmlFor="">
                    <span>E-mail:</span>
                    <input 
                        type="email" 
                        name="emailUser" 
                        required 
                        placeholder="Digite seu e-mail" 
                    />
                </label>
                <label htmlFor="">
                    <span>Senha:</span>
                    <input 
                        type="password"
                        name="passwordUser" 
                        required 
                        placeholder="Digite sua senha" 
                    />
                </label>
                <label htmlFor="">
                    <span>Confirmação de senha:</span>
                    <input 
                        type="password"
                        name="confirmPasswordUser" 
                        required 
                        placeholder="Confirme a sua senha" 
                    />
                </label>
                <button className={styles.btnForm}>Cadastrar</button>
            </form>
        </div>
        
    )
}