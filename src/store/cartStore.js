import { create } from 'zustand'

const useCartStore = create((set, get) => ({
	items: [],
	
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
	
	removeItem: (id) => {
		set({ items: get().items.filter(item => item.id !== id) })
	},
	
	updateQuantity: (id, quantity) => {
		if (quantity < 1) return
		set({
			items: get().items.map(item =>
				item.id === id ? { ...item, quantity } : item
			)
		})
	},
	
	clearCart: () => set({ items: [] }),
	
	getTotalPrice: () => {
		return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
	}
}))

export default useCartStore