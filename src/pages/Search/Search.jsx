import styles from "./Search.module.css"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"

export default function Search(){
    return (
        <div>
            <h2>Search</h2>
            <p>{search}</p>
        </div>
    )
}