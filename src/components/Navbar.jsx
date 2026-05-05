import { Link } from "react-router"
import useAuthStore from "../store/authStore.js"
import useCartStore from "../store/cartStore.js"
import '../styles/Navbar.css'

function Navbar() {
	const items = useCartStore(state => state.items)
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

	return(
		<nav className="navbar">
			<Link to="/" className="navbar-logo">Yippi!</Link>

			<input type="text"
			className="navbar-search"
			placeholder="Sök sommarleksaker..."/>

			<div className="navbar-links">
				<Link to="/cart" className="navbar-cart">
					🛒Kundvagn{totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
				</Link>
				{isLoggedIn && <Link to="/admin" className="navbar-admin">Admin</Link>}
				{isLoggedIn ?
				<Link to="/logout" className="navbar-logout">Logga ut</Link>
				:
				<Link to="/login" className="navbar-login">Logga in</Link>
				}
			</div>
		</nav>
	)
}

export default Navbar