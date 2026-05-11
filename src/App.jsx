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
  // searchQuery håller texten användaren skriver i sökfältet
  const [searchQuery, setSearchQuery] = useState('')
  // products håller alla produkter som hämtas från Firestore
  const [products, setProducts] = useState([])

  // useEffect körs en gång när appen startar (tom dependency array [])
  // och hämtar alla produkter från Firestore-samlingen "products"
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'))
      // Varje dokument omvandlas till ett objekt med firestoreId + all produktdata
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
      {/* Navbar får searchQuery och setSearchQuery så att sökfältet fungerar */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Routes>
        {/* Varje Route kopplar en URL-sökväg till en sida */}
        <Route path="/" element={<HomePage products={products} searchQuery={searchQuery} />} />
        <Route path="/cart" element={<CartPage />} />
        {/* setProducts skickas till AdminPage så att produktlistan uppdateras efter ändringar */}
        <Route path="/admin" element={<AdminPage setProducts={setProducts} />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App