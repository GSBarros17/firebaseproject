import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"
import styles from "./CreatePost.module.css"

const MAX_FILE_SIZE_KB = 500;

export default function CreatePost(){

    const [title, setTitle] = useState("")
    const [fileImage, setFileImage] = useState("null")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")

    const {insertDocument, response} = useInsertDocument("posts")
    const {user} = useAuthValue()
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormError("")
    
        if (file) {
            const fileSizeInKB = file.size / 1024;
            if (fileSizeInKB > MAX_FILE_SIZE_KB) {
              setFormError(`O tamanho máximo do arquivo é ${MAX_FILE_SIZE_KB}KB`);
              return;
            }
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                setFileImage(imageDataUrl);
            };
        
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        setFormError("")
        
        //validar a URL da imagem
        try {
            new URL(fileImage)
        } catch (error) {
            setFormError("O arquivo precisa ser uma imagem")
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
        insertDocument({
            title,
            image: fileImage,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        })
        
        //redirect to home page
        navigate("/")
    }

    return(
        <div className={styles.createPostContainer}>
            <h1>Criar post</h1>
            <p className={styles.textCreatePost}>Compartilhe suas experiências com outras pessoas!</p>
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
            {formError && <p className="err">{formError}</p>}
        </div>
    )
}