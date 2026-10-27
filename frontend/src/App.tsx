import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import GameHome from './pages/GameHome'
import GameSetup from './pages/GameSetup'
import GamePlay from './pages/GamePlay'

function App() {
  return (
    <Routes>
      {/* Website institucional da MenteLab (one-page). */}
      <Route path="/" element={<Home />} />

      {/* Autenticação. */}
      <Route path="/login" element={<Login />} />
      <Route path="/registo" element={<Register />} />
      <Route path="/recuperar-password" element={<ForgotPassword />} />

      {/* Aplicação de jogos CruzaMente. */}
      <Route path="/jogar" element={<GameHome />} />
      <Route path="/jogar/configurar" element={<GameSetup />} />
      <Route path="/jogar/partida" element={<GamePlay />} />
    </Routes>
  )
}

export default App
