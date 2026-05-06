import { Link } from 'react-router';
import '../styles/Footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-content'>
				<div className='footer-logo'>Yippi!</div>
				<p className='footer-desc'>Din sommarbutik för glädje och lek - Vi säljer de roligaste sommarleksakerna för hela familjen!</p>
			</div>
			<div className='footer-bottom'>
				<div></div>
				<span>© 2026 <span className="footer-brand">Yippi!</span> – Alla rättigheter förbehållna</span>
				<Link to="/login" className="footer-login">Logga in</Link>
			</div>
		</footer>
	)
}
export default Footer