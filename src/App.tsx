import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './auth/Login'
import Create from './pages/Create'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/addTask" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
