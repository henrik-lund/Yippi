import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import filterProducts from '../utils/filterProducts'
import '../styles/HomePage.css'

const categories = ['Alla', 'Vattenlek', 'Strandlek', 'Utomhus', 'Sport']

function HomePage({ products, searchQuery }) {
const [activeCategory, setActiveCategory] = useState('Alla')
const [sortOrder, setSortOrder] = useState('')

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