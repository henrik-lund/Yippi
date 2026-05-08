import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase/firebase'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'))
      const data = snapshot.docs.map(doc => ({
        firestoreId: doc.id,
        ...doc.data()
      }))
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<HomePage products={products} searchQuery={searchQuery} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<AdminPage setProducts={setProducts} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App