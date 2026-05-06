import { getImage } from "../utils/getImage.js";

function CartItem ({ item, onRemove, onUpdateQuantity }) {

	return(
		<div className="cart-item">
			<img src={getImage(item.image)} 
			alt={item.name}
			className="cart-item-img" />

			<div className="cart-item-info">
				<h3 className="cart-item-name">{item.name}</h3>
				<p className="cart-item-unit">{item.price} kr / st</p>
				<div className="cart-item-qty">
					<button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
					<span className="cart-item-qty-value">{item.quantity}</span>
					<button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
				</div>
			</div>
			<p className="cart-item-total">{item.price * item.quantity} kr</p>
			<button className="cart-item-remove" onClick={() => onRemove(item.id)}>✕</button>
		</div>
	)
}

export default CartItem