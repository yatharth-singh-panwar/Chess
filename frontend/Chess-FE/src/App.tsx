import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from "../src/Pages/Landing"
import Arena from "./Pages/Arena"
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/arena' element={<Arena/>}/>
        {/* <Route path="/play" element={<Game/>}/> */}
      </Routes>
    </BrowserRouter> 
  )
}

export default App
