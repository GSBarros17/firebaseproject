import styles from "./Post.module.css"
import { useParams } from "react-router-dom"


export default function Post(){

    const { id } = useParams()    
    
    return (
        <h1>Post {id}</h1>
    )
}