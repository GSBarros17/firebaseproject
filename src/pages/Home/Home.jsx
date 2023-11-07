import styles from "./Home.module.css"
import { BsSearch } from "react-icons/bs"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useAuthValue } from "../../context/AuthContext"



export default function Home () {
  
  const {user} = useAuthValue()
  const [query, setQuery] = useState("")
  const [posts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefalt()
  }

  return (
    <div className={styles.homeContainer}>
      <h1>Bem vindo, <span>user.displayName</span></h1>
      <h2>Veja nossos posts mais recentes</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Ou busque por tags...." 
          onChange={(e) => setQuery(e.target.value)}  
        />
        <button type="button"><BsSearch/></button>
      </form>
      <div className={styles.postsContainer}>
        <h2>Posts...</h2>
        {posts && posts.length === 0 && (
          <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to="/createPost">Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}
