import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import { useState } from 'react'
import CartItem from '../components/CartItem.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'
import OrderConfirmation from '../components/OrderConfirmation.jsx'
import '../styles/CartPage.css'

function CartPage() {
// Hämtar kundvagnens innehåll och funktioner från cartStore
const { items, removeItem, updateQuantity, clearCart } = useCartStore()
// Räknar ut totalpriset genom att summera pris * antal för varje produkt
const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)
// orderDone styr om orderbekräftelsen visas
const [orderDone, setOrderDone] = useState(false)

// Om kundvagnen är tom visas ett tomt-läge med länk tillbaka till butiken
if (items.length === 0) {
return (
	<main className="cart-empty">
	<div className='cart-empty-icon'>🛒</div>
	<h2 className='cart-empty-title'>Oj, här var det tomt!</h2>
	<p className='cart-empty-text'>Din kundvagn gråter - dags att fylla den med sommarkul!</p>
	<Link to="/" className="cart-back-link">⬅ Shoppa nu! 🌞</Link>
	</main>
)
}

return (
<main className="cart">
	{orderDone && (
	<OrderConfirmation
		totalPrice={totalPrice}
		onClose={() => {
		setOrderDone(false)
		clearCart()
		}}
	/>
	)}

	<Link to="/" className="cart-back-btn">← Fortsätt handla</Link>

	<div className="cart-layout">
	<div className="cart-left">
		<h2 className="cart-section-title">Dina varor</h2>
		<div className="cart-items">
		{items.map(item => (
			<CartItem
			key={item.id}
			item={item}
			onRemove={removeItem}
			onUpdateQuantity={updateQuantity}
			/>
		))}
		<div className="cart-items-total">
			<span>Totalt</span>
			<span>{totalPrice} kr</span>
		</div>
		</div>
	</div>

	<div className="cart-right">
		<h2 className="cart-section-title">Leverans & betalning</h2>
		<CheckoutForm onConfirm={() => setOrderDone(true)} />
	</div>
	</div>
</main>
)
}

export default CartPage