import { useState, useEffect } from 'react'
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import AdminStats from '../components/AdminStats'
import AdminAddRow from '../components/AdminAddRow'
import AdminProductRow from '../components/AdminProductRow'
import '../styles/AdminPage.css'

function AdminPage({ setProducts }) {
// products är den lokala kopian av produkterna som visas i tabellen
const [products, setLocalProducts] = useState([])
// showAddForm styr om formuläret för att lägga till produkt visas
const [showAddForm, setShowAddForm] = useState(false)
// editingProduct håller den produkt som håller på att redigeras (eller null)
const [editingProduct, setEditingProduct] = useState(null)
// newProduct håller värdena för det nya produktformuläret
const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '' })
const isLoggedIn = useAuthStore(state => state.isLoggedIn)
const logout = useAuthStore(state => state.logout)
const navigate = useNavigate()

// Körs när isLoggedIn ändras — om admin inte är inloggad skickas de till /login
useEffect(() => {
if (!isLoggedIn) {
	navigate('/login')
	return
}
fetchProducts()
}, [isLoggedIn])

// Hämtar alla produkter från Firestore och uppdaterar både lokal och global state
const fetchProducts = async () => {
const snapshot = await getDocs(collection(db, 'products'))
const data = snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }))
setLocalProducts(data)
setProducts(data)
}

// handleDelete tar bort en produkt från Firestore och uppdaterar listan
const handleDelete = async (firestoreId) => {
await deleteDoc(doc(db, 'products', firestoreId))
const updated = products.filter(p => p.firestoreId !== firestoreId)
setLocalProducts(updated)
setProducts(updated)
}

// handleAdd lägger till en ny produkt i Firestore och uppdaterar listan
const handleAdd = async () => {
if (!newProduct.name || !newProduct.category || !newProduct.price) return
const added = await addDoc(collection(db, 'products'), {
	name: newProduct.name,
	category: newProduct.category,
	price: Number(newProduct.price),
	image: 'flamingo.avif'
})
const updated = [...products, { firestoreId: added.id, ...newProduct, price: Number(newProduct.price), image: 'flamingo.avif' }]
setLocalProducts(updated)
setProducts(updated)
setNewProduct({ name: '', category: '', price: '' })
setShowAddForm(false)
}

// handleEdit sparar ändringar på en redigerad produkt i Firestore
const handleEdit = async (product) => {
await updateDoc(doc(db, 'products', product.firestoreId), {
	name: editingProduct.name,
	category: editingProduct.category,
	price: Number(editingProduct.price)
})
const updated = products.map(p => p.firestoreId === product.firestoreId ? { ...p, ...editingProduct, price: Number(editingProduct.price) } : p)
setLocalProducts(updated)
setProducts(updated)
setEditingProduct(null)
}

// Räknar ut unika kategorier från produktlistan för att visa i statistiken
const categories = [...new Set(products.map(p => p.category))]

return (
<div className="admin-layout">
	<aside className="admin-sidebar">
	<button className="admin-logout-btn" onClick={() => { logout(); navigate('/') }}>
		Logga ut
	</button>
	</aside>

	<main className="admin-main">
	<AdminStats productCount={products.length} categoryCount={categories.length} />

	<div className="admin-header">
		<h2 className="admin-title">Alla produkter</h2>
		<button className="admin-add-btn" onClick={() => setShowAddForm(!showAddForm)}>
		+ Lägg till produkt
		</button>
	</div>

	<table className="admin-table">
		<thead>
		<tr>
			<th></th>
			<th>Namn</th>
			<th>Kategori</th>
			<th>Pris</th>
			<th>Åtgärder</th>
		</tr>
		</thead>
		<tbody>
		{showAddForm && (
			<AdminAddRow
			newProduct={newProduct}
			setNewProduct={setNewProduct}
			onSave={handleAdd}
			onCancel={() => {
				setShowAddForm(false)
				setNewProduct({ name: '', category: '', price: '' })
			}}
			/>
		)}
		{products.map(product => (
			<AdminProductRow
			key={product.firestoreId}
			product={product}
			editingProduct={editingProduct}
			setEditingProduct={setEditingProduct}
			onEdit={handleEdit}
			onDelete={handleDelete}
			/>
		))}
		</tbody>
	</table>
	</main>
</div>
)
}

export default AdminPage