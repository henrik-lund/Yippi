import { Link } from "react-router"
import useAuthStore from "../store/authStore.js"
import useCartStore from "../store/cartStore.js"
import yippilogo from '../assets/yippilogo.png'
import '../styles/Navbar.css'

function Navbar({ searchQuery, setSearchQuery }) {
	const items = useCartStore(state => state.items)
	const isLoggedIn = useAuthStore(state => state.isLoggedIn)
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

	return(
		<nav className="navbar">
			<Link to="/" >
				<img src={yippilogo} alt="Yippi Logo" className="navbar-logo" />
			</Link>

			<input type="text"
			className="navbar-search"
			placeholder="Sök sommarleksaker..."
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)} />

			<div className="navbar-links">
			<Link to="/cart" className="navbar-cart">
				🛒<span className="cart-text">Kundvagn</span>
				{totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
			</Link>
			</div>
		</nav>
	)
}

export default Navbar