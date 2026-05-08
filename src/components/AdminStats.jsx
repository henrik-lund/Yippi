function AdminStats({ productCount, categoryCount }) {
return (
<div className="admin-stats">
	<div className="admin-stat-card">
	<div className="admin-stat-label">Produkter</div>
	<div className="admin-stat-value">{productCount}</div>
	</div>
	<div className="admin-stat-card">
	<div className="admin-stat-label">Kategorier</div>
	<div className="admin-stat-value">{categoryCount}</div>
	</div>
</div>
)
}

export default AdminStats