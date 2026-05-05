import { create } from 'zustand'

const useAuthStore = create((set) => ({
	isLoggedIn: false,
	
	login: (username, password) => {
		if (username === 'admin' && password === 'password') {
			set({ isLoggedIn: true })
			return true
		}
		return false
	},
	
	logout: () => set({ isLoggedIn: false })
}))

export default useAuthStore