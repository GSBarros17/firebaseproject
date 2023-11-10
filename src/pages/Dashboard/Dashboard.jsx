import styles from "./Dashboard.module.css"
import { Link } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"


export default function Dashboard(){

    const {user} = useAuthValue()
    const uid = user.uid
    const name = user.displayName
    const firstName = name.split(" ")[0]
   
    const posts = []

    return(
        <div>
            <h1>Painel</h1>
            <p><spam>{firstName}</spam>, gerencie o seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noPosts}>
                    <p>Você não possui post ainda</p>
                    <Link to="/posts/create">Criar primeiro post</Link>
                </div>
            ) : (
                <div>
                    <p>tem post!</p>
                </div>
            )}
        </div>
    )
}