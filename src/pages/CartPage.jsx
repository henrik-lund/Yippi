import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import { getImage } from '../utils/getImage'
import '../styles/CartPage.css'

function CartPage() {
	const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  	const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

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
    		<Link to="/" className="cart-back-btn">← Fortsätt handla</Link>

		<div className="cart-layout">
			<div className="cart-left">
			<h2 className="cart-section-title">Dina varor</h2>
			<div className="cart-items">
				{items.map(item => (
				<div key={item.id} className="cart-item">
					<img
					src={getImage(item.image)}
					alt={item.name}
					className="cart-item-img"
					/>
					<div className="cart-item-info">
					<h3 className="cart-item-name">{item.name}</h3>
					<p className="cart-item-unit">{item.price} kr / st</p>
					<div className="cart-item-qty">
						<button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
						<span>{item.quantity}</span>
						<button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
					</div>
					</div>
					<p className="cart-item-total">{item.price * item.quantity} kr</p>
					<button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕</button>
				</div>
				))}
				<div className="cart-items-total">
				<span>Totalt</span>
				<span>{totalPrice} kr</span>
				</div>
			</div>
			</div>

			<div className="cart-right">
			<h2 className="cart-section-title">Leverans & betalning</h2>
			<div className="cart-summary-card">
				<div className="cart-form-section">
				<h3 className="cart-form-heading">Leverans:</h3>
				<div className="cart-form-group">
					<label>Adress</label>
					<input type="text" placeholder="" />
				</div>
				<div className="cart-form-group">
					<label>Postnummer</label>
					<input type="text" placeholder="" />
				</div>
				</div>

				<div className="cart-form-section">
					<h3 className="cart-form-heading">Betalningsmetod:</h3>
					<div className="cart-payment-cards">
						<div className="cart-payment-card-option">
						<input type="radio" name="payment" id="card" defaultChecked />
						<label htmlFor="card">
							<span className="cart-payment-icon">💳</span>
							Kort
						</label>
						</div>
						<div className="cart-payment-card-option">
						<input type="radio" name="payment" id="invoice" />
						<label htmlFor="invoice">
							<span className="cart-payment-icon">📄</span>
							Faktura
						</label>
						</div>
					</div>
					<input type="text" placeholder="Kortnummer" className="cart-payment-input" />
				</div>

				<button className="cart-confirm-btn">Bekräfta köp</button>
			</div>
			</div>
		</div>
    </main>
	)
}

export default CartPage