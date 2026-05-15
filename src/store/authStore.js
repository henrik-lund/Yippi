import { create } from 'zustand'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'

// Zustand-store som hanterar inloggningsstatus för admin
const useAuthStore = create ((set) => ({
	// isLoggedIn håller reda på om admin är inloggad eller inte
	isLoggedIn: false,

	// login försöker logga in med Firebase, returnerar true om det lyckas
	login: async (username, password) => {
		try{
			await signInWithEmailAndPassword(auth, username, password)
			set({isLoggedIn: true})
			return true
		} catch (error) {
			// Om inloggningen misslyckas (fel lösenord etc.) returneras false
			return false
		}
	},

	// logout loggar ut från Firebase och återställer isLoggedIn till false
	logout: async() => {
		await signOut(auth)
		set({isLoggedIn: false})
	}
}))

export default useAuthStore