const fuzzySearch = (product, searchTerm) => {
	let i = 0
	for (const char of product) {
		if (char === searchTerm[i]) i++
		if (i === searchTerm.length) return true
	}
	return false
}

const filterProducts = (products, searchQuery = '', activeCategory, sortOrder) => {
	return products
	.filter(p => activeCategory === 'Alla' || p.category === activeCategory)
	.filter (p => {
		const searchTerm = searchQuery.toLowerCase()
		const product = p.name.toLowerCase()
		const category = p.category.toLowerCase()

		return(
			product.includes(searchTerm) ||
			category.includes(searchTerm) ||
			fuzzySearch(product, searchTerm) ||
			fuzzySearch(category, searchTerm)
		)
	})

	.sort((a, b) => {
		if (sortOrder === 'price-asc') return a.price - b.price
		if (sortOrder === 'price-desc') return b.price - a.price
		if (sortOrder === 'name-asc') return a.name.localeCompare(b.name)
		if (sortOrder === 'name-desc') return b.name.localeCompare(a.name)
		return 0
	})
}

export default filterProducts