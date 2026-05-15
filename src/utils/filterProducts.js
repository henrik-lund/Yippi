// fuzzySearch kontrollerar om alla tecken i searchTerm finns i product i rätt ordning
// t.ex. "van" matchar "vattenpistol" eftersom v, a, n finns i den ordningen
const fuzzySearch = (product, searchTerm) => {
	let i = 0
	for (const char of product) {
		if (char === searchTerm[i]) i++
		if (i === searchTerm.length) return true
	}
	return false
}

// filterProducts filtrerar, söker och sorterar produktlistan
// Den tar emot hela produktlistan, söktext, vald kategori och sorteringsordning
const filterProducts = (products, searchQuery = '', activeCategory, sortOrder) => {
	return products
	// Steg 1: filtrera på kategori (om "Alla" är valt visas alla produkter)
	.filter(p => activeCategory === 'Alla' || p.category === activeCategory)
	// Steg 2: filtrera på söktext — söker i namn och kategori med både includes och fuzzy
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
	// Steg 3: sortera resultatet baserat på valt sorteringsalternativ
	.sort((a, b) => {
		if (sortOrder === 'price-asc') return a.price - b.price
		if (sortOrder === 'price-desc') return b.price - a.price
		if (sortOrder === 'name-asc') return a.name.localeCompare(b.name)
		if (sortOrder === 'name-desc') return b.name.localeCompare(a.name)
		return 0
	})
}

export default filterProducts