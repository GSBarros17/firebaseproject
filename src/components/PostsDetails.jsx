import styles from "./PostsDetails.module.css"
import { Link } from "react-router-dom"

export default function PostsDetails({post}){
   return(
    <div className={styles.postsCard}>
        <img src={post.image} alt={post.title}/>
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>{post.createdBy}</p>
        <div className={styles.cardTags}>
            {post.tagsArray.map((tag) => <p key={tag}><span>#</span>{tag}</p> )}
        </div>
        <Link to={`/posts/${post.id}`} className="btnForm">ler mais...</Link>
    </div>
   ) 
}