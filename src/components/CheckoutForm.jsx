import { useState } from 'react'
import { checkoutSchema } from '../utils/CheckoutFormSchema.js'

// CheckoutForm hanterar leverans- och betalningsinformation i kundvagnen
// onConfirm anropas från CartPage när köpet är bekräftat och validerat
function CheckoutForm({ onConfirm }) {
// State för varje formulärfält
const [paymentMethod, setPaymentMethod] = useState('card')
const [address, setAddress] = useState('')
const [postalCode, setPostalCode] = useState('')
const [cardNumber, setCardNumber] = useState('')
const [email, setEmail] = useState('')
// errors håller felmeddelanden per fält, t.ex. errors.address
const [errors, setErrors] = useState({})

const handleConfirm = () => {
// Samlar ihop alla fältvärden i ett objekt för validering
const formData = { address, postalCode, paymentMethod, cardNumber, email }

// Validerar hela formuläret med Joi-schemat
// abortEarly: false gör att alla fel samlas in, inte bara det första
const { error } = checkoutSchema.validate(formData, { abortEarly: false })

if (error) {
	// Bygger upp ett errors-objekt med fältnamn som nyckel
	const newErrors = {}
	error.details.forEach(detail => {
	newErrors[detail.path[0]] = detail.message
	})
	setErrors(newErrors)
	return
}

setErrors({})
// Anropar onConfirm i CartPage som visar orderbekräftelsen
onConfirm()
}

return (
<div className="cart-summary-card">
	<div className="cart-form-section">
	<h3 className="cart-form-heading">Leverans:</h3>
	<div className="cart-form-group">
		<label>Adress</label>
		<input
		type="text"
		value={address}
		onChange={e => setAddress(e.target.value)}
		/>
		{errors.address && <p className="login-error">{errors.address}</p>}
	</div>
	<div className="cart-form-group">
		<label>Postnummer</label>
		<input
		type="text"
		value={postalCode}
		onChange={e => setPostalCode(e.target.value)}
		/>
		{errors.postalCode && <p className="login-error">{errors.postalCode}</p>}
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
		<>
		<input
			type="text"
			placeholder="Kortnummer"
			className="cart-payment-input"
			value={cardNumber}
			onChange={e => setCardNumber(e.target.value)}
		/>
		{errors.cardNumber && <p className="login-error">{errors.cardNumber}</p>}
		</>
	)}
	{paymentMethod === 'invoice' && (
		<>
		<input
			type="text"
			placeholder="E-postadress"
			className="cart-payment-input"
			value={email}
			onChange={e => setEmail(e.target.value)}
		/>
		{errors.email && <p className="login-error">{errors.email}</p>}
		</>
	)}
	</div>

	<button className="cart-confirm-btn" onClick={handleConfirm}>
	Bekräfta köp
	</button>
</div>
)
}

export default CheckoutForm
