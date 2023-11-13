import { useState, useEffect } from "react"
import { useNavigate, useParams} from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import styles from "./EditPost.module.css"

export default function EditPost(){

    const {id} = useParams()
    const {document: post} = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if(post){
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")

            setTags(textTags)
        }

    }, [post])

    const {insertDocument, response} = useInsertDocument("posts")
    const {user} = useAuthValue()
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError("")

        //validar a URL da imagem
        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisar ser uma url")
        }
        //array de tags
        const tagsArray = tags.split(",").map((tag) =>  tag.trim().toLowerCase())
        //checar todos os valores   
        if(!title || !image || !body || !tags){
            setFormError("Por favor, preencha todos os campos!")
        }
        if(formError){
            return
        }
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        })
        
        //redirect to home page
        navigate("/")
    }

    return(
        <div className={styles.editPostContainer}>
            {post && (
                <>
                    <h1>Editar o post: {post.title}</h1>
                    <p className={styles.textEditPostContainer}>Edite o seu post de maneira simples!</p>
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
                        <p className={styles.textPreviewImage}>Pré-vizualização da imagem atual:</p>
                        <img className={styles.previewImage} src={post.image} alt={post.title} />
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
                        {!response.loading && <button className="btnForm">Editar</button>}
                        {response.loading && <button className="btnForm">Aguarde...</button>}
                    </form>
                    {response.error && <p className="err">{response.error}</p>}
                    {formError && <p className="err">{formError}</p>}
                </>
            )}
        </div>
    )
}