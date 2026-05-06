import { useState } from 'react'

function CheckoutForm({ onConfirm }) {
const [paymentMethod, setPaymentMethod] = useState('card')

return (
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
		<input
			type="radio"
			name="payment"
			id="card"
			checked={paymentMethod === 'card'}
			onChange={() => setPaymentMethod('card')}
		/>
		<label htmlFor="card">
			<span className="cart-payment-icon">💳</span>
			Kort
		</label>
		</div>
		<div className="cart-payment-card-option">
		<input
			type="radio"
			name="payment"
			id="invoice"
			checked={paymentMethod === 'invoice'}
			onChange={() => setPaymentMethod('invoice')}
		/>
		<label htmlFor="invoice">
			<span className="cart-payment-icon">📄</span>
			Faktura
		</label>
		</div>
	</div>

	{paymentMethod === 'card' && (
		<input type="text" placeholder="Kortnummer" className="cart-payment-input" />
	)}
	{paymentMethod === 'invoice' && (
		<input type="text" placeholder="E-postadress" className="cart-payment-input" />
	)}
	</div>

	<button className="cart-confirm-btn" onClick={onConfirm}>
	Bekräfta köp
	</button>
</div>
)
}

export default CheckoutForm