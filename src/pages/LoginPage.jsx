import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import { loginSchema } from '../utils/loginSchema.js'
import '../styles/LoginPage.css'

function LoginPage() {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [errors, setErrors] = useState({})
const login = useAuthStore(state => state.login)
const navigate = useNavigate()

const handleSubmit = async () => {
const { error } = loginSchema.validate(
{ username, password },
{ abortEarly: false }
)
if (error) {
setErrors({ general: 'Fyll i både användarnamn och lösenord' })
return
}

const success = await login(username, password)
if (success) {
setErrors({})
navigate('/admin')
} else {
setErrors({ general: 'Fel användarnamn eller lösenord' })
}
}
const handleKeyDown = (e) => {
	if (e.key === 'Enter') handleSubmit()
}

return (
<main className="login-page">
<div className="login-card">
<h2 className="login-title">Administratörsinloggning</h2>

<div className="login-form">
	<div className="login-group">
	<label>Användarnamn</label>
	<input
		type="text"
		value={username}
		onChange={e => setUsername(e.target.value)}
		onKeyDown={handleKeyDown}
	/>
	</div>

	<div className="login-group">
	<label>Lösenord</label>
	<input
		type="password"
		value={password}
		onChange={e => setPassword(e.target.value)}
		onKeyDown={handleKeyDown}
	/>
	</div>

	{errors.general && <p className="login-error">{errors.general}</p>}

	<button className="login-btn" onClick={handleSubmit} onKeyDown={handleKeyDown}>
	Logga in
	</button>
</div>
</div>
</main>
)
}

export default LoginPage