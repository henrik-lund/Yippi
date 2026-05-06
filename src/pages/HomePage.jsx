import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import '../styles/HomePage.css'

const categories = ['Alla', 'Vattenlek', 'Strandlek', 'Utomhus', 'Sport']

function HomePage({ products }) {
	const [activeCategory, setActiveCategory] = useState('Alla')
	const [searchQuery, setSearchQuery] = useState('')
	const [sortOrder, setSortOrder] = useState('')
	
	const filtered = products
	.filter(p => activeCategory === 'Alla' || p.category === activeCategory)
	.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
	.sort((a, b) => {
		if (sortOrder === 'price-asc') return a.price - b.price
		if (sortOrder === 'price-desc') return b.price - a.price
		if (sortOrder === 'name-asc') return a.name.localeCompare(b.name)
			if (sortOrder === 'name-desc') return b.name.localeCompare(a.name)
				return 0
	})
	
	return (
		<main className="home">
			<input type="text"
			className='home-search-mobile'
			placeholder='Sök sommarleksaker...'
			value={searchQuery}
			onChange={e => setSearchQuery(e.target.value)}
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
		<option value="">Sortera</option>
		<option value="price-asc">Pris: Lägst först</option>
		<option value="price-desc">Pris: Högst först</option>
		<option value="name-asc">Namn: A–Ö</option>
		<option value="name-desc">Namn: Ö–A</option>
		</select>
		</div>
		
		<div className="product-list">
		{filtered.map(product => (
			<ProductCard key={product.id} product={product} />
		))}
		</div>
		</main>
	)
}

export default HomePage