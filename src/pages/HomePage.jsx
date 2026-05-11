import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import filterProducts from '../utils/filterProducts'
import '../styles/HomePage.css'

// Tillgängliga kategorier som visas som filterknappar
const categories = ['Alla', 'Vattenlek', 'Strandlek', 'Utomhus', 'Sport']

// HomePage tar emot produktlistan och söktext som props från App.jsx
function HomePage({ products, searchQuery }) {
// activeCategory håller den valda kategorin, standard är "Alla"
const [activeCategory, setActiveCategory] = useState('Alla')
// sortOrder håller den valda sorteringen (t.ex. "price-asc")
const [sortOrder, setSortOrder] = useState('')

// filtered är den filtrerade och sorterade produktlistan som visas
const filtered = filterProducts(products, searchQuery, activeCategory, sortOrder)

return (
<main className="home">
	<input type="text"
	className='home-search-mobile'
	placeholder='Sök sommarleksaker...'
	value={searchQuery}
	readOnly
	/>
	<div className="category-bar">
	{categories.map(cat => (
		<button
		key={cat}
		className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
		onClick={() => setActiveCategory(cat)}
		>
		{cat}
		</button>
	))}
	</div>

	<div className="sort-row">
	<span className="product-count">{filtered.length} produkter</span>
	<select
		className="sort-select"
		value={sortOrder}
		onChange={e => setSortOrder(e.target.value)}
	>
		<option value="" disabled hidden>Sortera</option>
		<option value="price-asc">Pris: Lägst först</option>
		<option value="price-desc">Pris: Högst först</option>
		<option value="name-asc">Namn: A–Ö</option>
		<option value="name-desc">Namn: Ö–A</option>
	</select>
	</div>

	<div className="product-list">
	{filtered.map(product => (
		<ProductCard key={product.firestoreId || product.id} product={product} />
	))}
	</div>
</main>
)
}

export default HomePage