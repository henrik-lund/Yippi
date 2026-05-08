import { getImage } from '../utils/getImage'

function AdminProductRow({ product, editingProduct, setEditingProduct, onEdit, onDelete }) {
const isEditing = editingProduct?.firestoreId === product.firestoreId

return (
<tr className="admin-row">
	{isEditing ? (
	<>
		<td><img src={getImage(product.image)} alt={product.name} className="admin-product-img" /></td>
		<td>
		<input
			value={editingProduct.name}
			onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
		/>
		</td>
		<td>
		<input
			value={editingProduct.category}
			onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
		/>
		</td>
		<td>
		<input
			value={editingProduct.price}
			onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
		/>
		</td>
		<td>
		<button className="admin-save-btn" onClick={() => onEdit(product)}>Spara</button>
		<button className="admin-cancel-btn" onClick={() => setEditingProduct(null)}>Avbryt</button>
		</td>
	</>
	) : (
	<>
		<td><img src={getImage(product.image)} alt={product.name} className="admin-product-img" /></td>
		<td>{product.name}</td>
		<td><span className="admin-category-tag">{product.category}</span></td>
		<td>{product.price} kr</td>
		<td>
		<button className="admin-edit-btn" onClick={() => setEditingProduct({ ...product })}>Redigera</button>
		<button className="admin-delete-btn" onClick={() => onDelete(product.firestoreId)}>Ta bort</button>
		</td>
	</>
	)}
</tr>
)
}

export default AdminProductRow