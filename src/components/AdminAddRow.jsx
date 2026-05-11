import { useState } from 'react'
import { productSchema } from '../utils/productSchema'

// AdminAddRow är en tabellrad med ett formulär för att lägga till en ny produkt
function AdminAddRow({ newProduct, setNewProduct, onSave, onCancel }) {
const [errors, setErrors] = useState({})

const handleSave = () => {
// Validerar formulärdata med Joi innan produkten sparas
// price konverteras till nummer eftersom input alltid ger en sträng
const { error } = productSchema.validate(
	{ ...newProduct, price: Number(newProduct.price) },
	{ abortEarly: false }
)

if (error) {
	// Bygger upp ett errors-objekt med fältnamn som nyckel och felmeddelande som värde
	const newErrors = {}
	error.details.forEach(detail => {
	newErrors[detail.path[0]] = detail.message
	})
	setErrors(newErrors)
	return
}

setErrors({})
// Anropar onSave i AdminPage som sparar produkten till Firestore
onSave()
}

return (
<tr className="admin-add-row">
	<td><div className="admin-img-placeholder">🖼</div></td>
	<td>
	<input
		placeholder="Ange namn"
		value={newProduct.name}
		onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
		className={errors.name ? 'input-error' : ''}
	/>
	{errors.name && <p className="admin-error">{errors.name}</p>}
	</td>
	<td>
	<input
		placeholder="Ange kategori"
		value={newProduct.category}
		onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
		className={errors.category ? 'input-error' : ''}
	/>
	{errors.category && <p className="admin-error">{errors.category}</p>}
	</td>
	<td>
	<input
		placeholder="Ange pris"
		value={newProduct.price}
		onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
		className={errors.price ? 'input-error' : ''}
	/>
	{errors.price && <p className="admin-error">{errors.price}</p>}
	</td>
	<td>
	<button className="admin-save-btn" onClick={handleSave}>Spara</button>
	<button className="admin-cancel-btn" onClick={onCancel}>Avbryt</button>
	</td>
</tr>
)
}

export default AdminAddRow