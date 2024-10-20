import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './auth/Login'
import Create from './pages/Create'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './auth/Auth'

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route 
            path="/" 
            element={<Login/>} 
            />

            <Route
              path='/Dashboard'
              element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
            }
            />

            <Route 
            path="/Home" 
            element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
            />

            <Route 
            path="/addTask" 
            element={
            <PrivateRoute>
              <Create/>
            </PrivateRoute>
            } 
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
