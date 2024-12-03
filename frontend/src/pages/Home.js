import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import '../style/Home.css';
import Button from '../shared/Button'

/**
 * A Home component containing navigations to Dashboard, Login, and Signup.
 * It automatically redirects user to Dashboard after 1 minute.
 */
function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/user-dashboard');
		}, 60000); // after 1 minute, redirect user to dashboard

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="Home">
			<AppHeader />
			<div className="Dashboard-container">
				<h1>ARE YOU REALLY COOKED?</h1>
				<Button theme="primary" onClick={() => navigate("/user-dashboard")}>Check Now</Button>
				<p>We offer safety tools where you can view tips, and check your privacy.</p>
				<h3>- OR -</h3>
			</div>

			<div className="Account-container">
				<h2>Join the amicooked® community to protect yourself from privacy risks.</h2>
				<p>You will get access to educational materials, and your own privacy point tracker.</p>
				<div className="Btn-container">
					<Button theme="primaryInverse" onClick={() => navigate("/login")}>Log in</Button>
					<Button theme="primaryOutline" onClick={() => navigate("/signup")}>Sign up</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
