import {BrowserRouter as Router, Routes, Route,BrowserRouter, Navigate} from 'react-router-dom'
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import './App.css';
function App() {
  return (
    <div className="container">
     <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
            </Routes>
          </div>
        <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;
