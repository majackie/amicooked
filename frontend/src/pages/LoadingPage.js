import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../asset/logo.png';
import "../style/LoadingPage.css"

function LoadingPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			// update route to login/signup
			navigate('/home');
		}, 2000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="Home">
			<header className="Home-header">
				<img src={logo} className="logo-spin" alt="logo" />
				<p className="App-name">
					amicooked
				</p>
			</header>
		</div>
	);
}

export default LoadingPage;