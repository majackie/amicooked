import "../style/CheckPassword.css"

import { useState } from "react";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";

function CheckPassword() {
	const url = "https://amicooked.onrender.com/api/hibp/password/";
	const [password, setPassword] = useState("");
	const [result, setResult] = useState(null);

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(url + password, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				const data = await response.json();
				setResult(data);
				console.log(data);
			} else {
				console.error("Error fetching data");
				setResult({ error: "Error fetching data" });
			}
		} catch (error) {
			console.error("Error:", error);
			setResult({ error: "Internal Server Error" });
		}
	};

	return (
		<div className="CheckPassword">
			<Navbar type={"default"} />
			<div className="Body">
				<form onSubmit={(e) => e.preventDefault()}>
					<label className="form-element">Enter your password:</label>
					<input className="form-element" type="password" id="password" name="password" value={password} onChange={handlePasswordChange}></input>
					<Button className="form-element" theme="primary" onClick={handleSubmit}>Submit</Button>
					{/* <Button theme="primary" onClick={() => navigate('/user-dashboard/safety-tools/privacy-checker')}>Back</Button> */}
				</form>
				<div id="check-password-result">
					{result && (
						<p>Your password has been breached {result.count ? result.count : "0"} times.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default CheckPassword;