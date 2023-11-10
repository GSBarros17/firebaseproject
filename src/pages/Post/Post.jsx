import styles from "./Post.module.css"
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"


export default function Post(){

    const { id } = useParams()
    const {document: post, loading} =useFetchDocument("posts", id)   
    
    return (
        <div className={styles.postContainer}>
            {loading && <p>carregando post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title}/>
                    <p className={styles.createdBy}>{post.createdBy}</p>
                    <p>{post.body}</p>
                    <div className={styles.postTags}>
                        {post.tagsArray.map((tag) => <p key={tag}><span>#</span>{tag}</p> )}
                    </div>
                </>
            )}
        </div>
    )
}