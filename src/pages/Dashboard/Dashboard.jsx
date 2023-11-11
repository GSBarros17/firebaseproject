import styles from "./Dashboard.module.css"
import { Link } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"


export default function Dashboard(){

    const {user} = useAuthValue()
    const uid = user.uid
    const name = user.displayName
    const firstName = name.split(" ")[0]
   
    const {documents: posts, loading} = useFetchDocuments("posts", null, uid)

    const deleteDocument = (id) => {

    }

    if(loading){
        return <p>Carregando...</p>
    }

    return(
        <div className={styles.dashboardContainer}>
            <h1>Painel</h1>
            <p><span>{firstName}</span>, gerencie o seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noPosts}>
                    <p>Você não possui post ainda...</p>
                    <Link to="/createPost">Criar primeiro post</Link>
                </div>
            ) : (
                <>
                    <div className={styles.postsInfo}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                    {posts && posts.map((post) => 
                        <div key={post.id} className={styles.postsDetails}>
                            <p>{post.title}</p>
                            <div className={styles.postAction}>
                                <Link to={`/posts/${post.id}`}>Ver</Link>
                                <Link to={`/edit/${post.id}`}>Editar</Link>
                                <button onClick={()=> deleteDocument(post.id)}>Excluir</button>
                            </div>
                        </div>
                    )}
                </>
            )}
            
        </div>
    )
}