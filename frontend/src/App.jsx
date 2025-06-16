import React from 'react'
import { Routes,Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import { GameProvider } from './context/GameContext'
import ProtectedRoutes from './ProtectedRoute'
import GameDetail from './pages/GameDetails'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <BrowserRouter>
        <AuthProvider>
          <GameProvider>
              <main className="container content-container mx-auto px-10 md:px-0">
              <NavBar />      
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route element={<ProtectedRoutes/>}>
                  <Route path='/game/:id' element={<GameDetail/>} />
                  <Route path='/profile' element={<Profile/>} />
                </Route>
              </Routes>
            </main>
          </GameProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App