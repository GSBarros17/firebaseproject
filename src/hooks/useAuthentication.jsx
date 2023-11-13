import {db} from "../firebase/config"
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth"


import {useState, useEffect} from "react"

export default function useAuthentication (){
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [message, setMessage] = useState(null)

    //cleanup
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled) {
            return
        }
    }
    
    //register

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.name
            })

            setLoading(false)

            return user


        } catch (error) {

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente em alguns minutos."
            }
            setLoading(false)
            setError(systemErrorMessage)

        }
    }

    //login - sing in

    const login = async(data) =>{

        checkIfIsCancelled()

        setLoading(true)
        setError(false)
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(true)
        } catch (error) {
            let systemErrorMessage;

            if(error.message.includes("invalid")){
                systemErrorMessage = "Usuário não cadastrado ou senha incorreta."
            } else if(error.message.includes("password")) {
                systemErrorMessage = "Senha não informada, digite a senha por favor!"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente mais tarde."
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    //recover - password
    const recoverPassword = async(data) =>{

        checkIfIsCancelled()

        setLoading(true)
        setError(false)
        setMessage(false)
        try {
           
            await sendPasswordResetEmail(auth, data.email)
            setLoading(true)
            setMessage("Recuperação de senha encaminhada para o e-mail.")
        } catch (error) {
            let systemErrorMessage;

            if(data.email === ("")){
                systemErrorMessage = "Digite o e-mail para redefinir a senha"
            }else if(error.message.includes("invalid")){
                systemErrorMessage = "E-mail não cadastrado"
            }else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde."
            }
            setLoading(false)
            setError(systemErrorMessage) 
            console.log(systemErrorMessage) 
        }
        setLoading(false)
    }

    //logout - sing out

    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)

    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return{
        auth,
        createUser,
        error,
        loading,
        message,
        logout,
        login,
        recoverPassword
    }
}