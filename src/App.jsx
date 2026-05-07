import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import localProducts from './data/database'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<HomePage products={localProducts} searchQuery={searchQuery} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

