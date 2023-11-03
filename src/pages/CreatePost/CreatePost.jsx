import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import useAuthentication from "../../hooks/useAuthentication"
import styles from "./CreatePost.module.css"

export default function CreatePost(){

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")


    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(image)
    }

    return(
        <div className={styles.createPostContainer}>
            <h1>Criar post</h1>
            <p>Compartilhe suas experiências com outras pessoas!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo:</span>
                    <input 
                        type="text" 
                        name="title" 
                        required 
                        placeholder="Escreva um titulo para o seu post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <span>Imagem:</span>
                    <input 
                        type="text" 
                        name="imagemURL" 
                        required 
                        placeholder="Cole uma URL de imagem"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea 
                        name="body" 
                        placeholder="Escreva sobre o que você quer falar"
                        required 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </label>
                <button>Criar post</button>
            </form>
        </div>
    )
}