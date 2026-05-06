import useCartStore from '../store/cartStore'
import { getImage } from '../utils/getImage'
import '../styles/ProductCard.css'

function ProductCard({ product }) {
	const addItem = useCartStore(state => state.addItem)
	
	return (
		<div className="product-card" onClick={() => addItem(product)}>
		<img
		src={getImage(product.image)}
		alt={product.name}
		className="product-card-img"
		/>
		<div className="product-card-info">
		<span className="product-card-category">{product.category}</span>
		<h3 className="product-card-name">{product.name}</h3>
		<p className="product-card-price">{product.price} kr</p>
		</div>
		<button
		className="product-card-btn"
		onClick={() => addItem(product)}
		>
		<span className="btn-desktop">Lägg till i kundvagn</span>
		<span className="btn-mobile">+</span>
		</button>
		</div>
	)
}

export default ProductCard