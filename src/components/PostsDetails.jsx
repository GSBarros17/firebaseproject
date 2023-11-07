import styles from "./PostsDetails.module.css"
import { Link } from "react-router-dom"

export default function PostsDetails({post}){
   return(
    <div>
        <img src={post.image} alt={post.title}/>
        <h2>{post.title}</h2>
        <p>{post.createdBy}</p>
        <div>
            {post.tags.map((tag) => <p key={tag}><span>#</span>{tag}</p> )}
        </div>
        <Link to={`/posts/$post.id`} className="btnForm">ler</Link>
    </div>
   ) 
}