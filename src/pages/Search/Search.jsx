import styles from "./Search.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
import { Link } from "react-router-dom"
import PostsDetails from "../../components/PostsDetails"


export default function Search(){
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts, loading} = useFetchDocuments("posts", search)
    
    return (
        <div className={styles.searchContainer}>
            <h1>Pesquisa</h1>
            <div className={styles.searchPosts}>
                {posts && posts.length === 0 && (
                    <div className={styles.noPosts}>
                        <p>Não foram encontrados posts na sua perquisa.</p>
                        <Link to="/">Voltar</Link>
                    </div>
                )}
                {loading && <p>Carregando...</p>}
                {posts && posts.map((post) => (
                    <PostsDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}