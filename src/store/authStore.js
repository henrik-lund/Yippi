import { create } from 'zustand'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'

const useAuthStore = create ((set) => ({
	isLoggedIn: false,

	login: async (username, password) => {
		try{
			await signInWithEmailAndPassword(auth, username, password)
			set({isLoggedIn: true}
			)
			return true
		} catch (error) {
			return false
		}
	},

	logout: async() => {
		await signOut(auth)
		set({isLoggedIn: false})
	}
}))

export default useAuthStore