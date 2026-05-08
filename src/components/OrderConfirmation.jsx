import { useState } from 'react'
import '../styles/OrderConfirmation.css'
import yippilogo from '../assets/yippilogo.png'
import { Link } from 'react-router'
function OrderConfirmation( { totalPrice, onClose}) {
	const [orderNumber] = useState (() =>{
		const randomNum = Math.floor(Math.random() * 9000) + 1000
		return `#YP-${randomNum}`
	})

	return(
		<div className="overlay">
			<div className="order-modal">
				<img src={yippilogo} alt="Yippi Logo" className="footer-logo" />
				<div className="order-modal-check">✓</div>
				<h2 className="order-modal-title">Tack för din beställning!</h2>
				<p className="order-modal-text">Din order är bekräftad och är på väg till dig. Vi ses i solen! 😊</p>
				<div className="order-modal-divider" />
				<div className="order-modal-box">
					<span className="order-modal-label">Ordernummer:</span>
					<span className="order-modal-value">{orderNumber}</span>
				</div>
				<div className="order-modal-box">
					<span className="order-modal-label">Belopp:</span>
					<span className="order-modal-value order-modal-price">{totalPrice} kr</span>
				</div>
				<div className="order-modal-divider">
					<Link to="/" className='order-modal-btn' onClick={onClose}>
						Fortsätt shoppa! 🛍️
					</Link>
				</div>
			</div>
		</div>
	)
}

export default OrderConfirmation