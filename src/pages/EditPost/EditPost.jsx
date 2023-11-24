import { useState, useEffect } from "react"
import { useNavigate, useParams} from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { Link } from "react-router-dom"
import { BsArrowLeftSquare } from "react-icons/bs"
import styles from "./EditPost.module.css"

const MAX_FILE_SIZE_KB = 500

export default function EditPost(){

    const {id} = useParams()
    const {document: post} = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [fileImage, setFileImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if(post){
            setTitle(post.title)
            setBody(post.body)
            setFileImage(post.image)

            const textTags = post.tagsArray.join(", ")

            setTags(textTags)
        }

    }, [post])

    const {updateDocument, response} = useUpdateDocument("posts")
    const {user} = useAuthValue()
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setFormError("")
    
        if (file) {
            const fileSizeInKB = file.size / 1024
            if (fileSizeInKB > MAX_FILE_SIZE_KB) {
              setFormError(`O tamanho máximo do arquivo é ${MAX_FILE_SIZE_KB}KB`)
              return
            }
            const reader = new FileReader()
    
            reader.onload = (e) => {
                const imageDataUrl = e.target.result
                setFileImage(imageDataUrl)
            };
        
            reader.readAsDataURL(file)
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError("")

        //validar a URL da imagem
        try {
            new URL(fileImage)
        } catch (error) {
            setFormError("A imagem precisar ser uma url")
        }
        //array de tags
        const tagsArray = tags.split(",").map((tag) =>  tag.trim().toLowerCase())
        //checar todos os valores   
        if(!title || !fileImage || !body || !tags){
            setFormError("Por favor, preencha todos os campos!")
        }
        if(formError){
            return
        }

        const data = {
            title,
            image: fileImage,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        }
        
        updateDocument(id, data)
        
        //redirect to home page
        navigate("/dashboard")
    }

    return(
        <div className={styles.editPostContainer}>
            {post && (
                <>
                    <Link to="/dashboard">
                        <BsArrowLeftSquare />
                    </Link>
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
                            <span className={styles.textInfoImg}>*obs: adicione somente arquivo de imagem com até 500kb.</span>
                            <span className={styles.textInfoImg}>*obs2: aplicação não suporta fotos tiradas na camera do celular no ato do upload da imagem.</span>
                            <input 
                                type="file"
                                name="fileImage"
                                required
                                accept="image/*"
                                onChange={handleFileChange}
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
                        {!response.loading && <button className="btnForm">Salvar</button>}
                        {response.loading && <button className="btnForm">Aguarde...</button>}
                    </form>
                    {response.error && <p className="err">{response.error}</p>}
                    {formError && <p className="err">{formError}</p>}
                </>
            )}
        </div>
    )
}