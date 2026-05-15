import { create } from 'zustand'

// Zustand-store som hanterar kundvagnens innehåll
const useCartStore = create((set, get) => ({
	// items är en lista med alla produkter som lagts till i kundvagnen
	items: [],

	// addItem lägger till en produkt i kundvagnen
	// Om produkten redan finns ökas antalet med 1, annars läggs den till som ny rad
	addItem: (product) => {
		const existing = get().items.find(item => item.id === product.id)
		if (existing) {
			set({
				items: get().items.map(item =>
					item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
				)
			})
		} else {
			set({ items: [...get().items, { ...product, quantity: 1 }] })
		}
	},

	// removeItem tar bort en produkt från kundvagnen baserat på id
	removeItem: (id) => {
		set({ items: get().items.filter(item => item.id !== id) })
	},

	// updateQuantity ändrar antalet av en specifik produkt
	// Om quantity är mindre än 1 händer ingenting (man kan inte ha 0 st)
	updateQuantity: (id, quantity) => {
		if (quantity < 1) return
		set({
			items: get().items.map(item =>
				item.id === id ? { ...item, quantity } : item
			)
		})
	},

	// clearCart tömmer hela kundvagnen, används efter att en order lagts
	clearCart: () => set({ items: [] }),

	// getTotalPrice räknar ut totalpriset för alla produkter i kundvagnen
	getTotalPrice: () => {
		return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
	}
}))

export default useCartStore