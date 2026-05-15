import '../styles/ConfirmDialog.css'

function ConfirmDialog({ message, onConfirm, onCancel}) {
	return (
		<div className="confirm-overlay">
			<div className="confirm-dialog">
				<p className="confirm-message">{message}</p>
				<div className="confirm-buttons">
					<button className="confirm-cancel-btn" onClick={onCancel}>Avbryt</button>
					<button className="confirm-delete-btn" onClick={onConfirm}>Ta bort</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmDialog