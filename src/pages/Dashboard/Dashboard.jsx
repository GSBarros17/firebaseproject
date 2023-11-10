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

    return(
        <div className={styles.dashboardContainer}>
            <h1>Painel</h1>
            <p><spam>{firstName}</spam>, gerencie o seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noPosts}>
                    <p>Você não possui post ainda...</p>
                    <Link to="/createPost">Criar primeiro post</Link>
                </div>
            ) : (
                <div>
                    <p>tem post!</p>
                </div>
            )}
            {posts && posts.map((post) => 
                <h3>{post.title}</h3>
            )}
        </div>
    )
}