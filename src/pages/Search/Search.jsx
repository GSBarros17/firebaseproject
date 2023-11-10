import styles from "./Search.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
import { Link } from "react-router-dom"
import PostsDetails from "../../components/PostsDetails"


export default function Search(){
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocuments("posts", search)
    console.log(posts)
    return (
        <div>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div>
                        <p>Não foram encontrados posts na sua perquisa.</p>
                        <Link to="/" className="">Voltar</Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostsDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}