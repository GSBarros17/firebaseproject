import styles from "./Home.module.css"
import { BsSearch } from "react-icons/bs"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useAuthValue } from "../../context/AuthContext"
import PostsDetails from "../../components/PostsDetails"



export default function Home () {
  
  const [query, setQuery] = useState("")
  const {user} = useAuthValue()
  const firstName = user && user.displayName ? user.displayName.split(" ")[0] : "";
  const firstNameCapital = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const { documents: posts, loading } = useFetchDocuments("posts")
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query.toLowerCase()}`)
    } 
  }


  return (
    <div className={styles.homeContainer}>
      {firstNameCapital && <h1>Bem vindo(a), <span>{firstNameCapital}</span></h1>}
      {!firstName && <h1>Bem vindo(a) ao  <span>ZEN Blog</span></h1>}
      <h2>Veja nossos posts mais recentes</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Ou busque por tags...." 
          onChange={(e) => setQuery(e.target.value)}  
        />
        <button><BsSearch/></button>
      </form>
      <div className={styles.postsContainer}>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostsDetails key={post.id} post={post}/>
        ))}
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
