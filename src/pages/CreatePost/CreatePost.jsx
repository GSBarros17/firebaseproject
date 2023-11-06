import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useAuthentication } from "../../hooks/useAuthentication"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import styles from "./CreatePost.module.css"

export default function CreatePost(){

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    const {insertDocument, response} = useInsertDocument("posts")
    const {user} = useAuthValue()

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError("")

        //validar a URL da imagem

        //array de tags

        //checar todos os valores   

        insertDocument({
            title,
            image,
            body,
            tags,
            uid: user.uid,
            createdBy: user.displayName,
        })
        
        //redirect to home page
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
                <label>
                    <span>Tags:</span>
                    <input 
                        type="text" 
                        name="tags" 
                        required 
                        placeholder="Insira as tags separadas por virgulas"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </label>
                {!response.loading && <button className="btnForm">Cadastrar</button>}
                {response.loading && <button className="btnForm">Aguarde...</button>}
            </form>
            {response.error && <p className="err">{response.error}</p>}
        </div>
    )
}