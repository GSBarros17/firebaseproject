import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import './App.css';
function App() {
  return (
    <div className="container">
     <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
