import "../style/CheckEmail.css"

import { useState } from "react";
import Button from "../shared/Button"
import AppHeader from "../shared/AppHeader";
import ReactJson from "react-json-view";

function CheckEmail() {
	const url = "http://127.0.0.1:5000/api/breachedaccount/";
	const [email, setEmail] = useState("");
	const [result, setResult] = useState(null);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(url + email, {
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
		<div className="CheckEmail">
			<AppHeader />
			<div className="Body">
				<form onSubmit={(e) => e.preventDefault()}>
					<label className="form-element">Enter your email:</label>
					<input className="form-element" type="email" id="email" name="email" value={email} onChange={handleEmailChange}></input>
					<Button className="form-element" theme="primary" onClick={handleSubmit}>Submit</Button>
				</form>
				<div id="check-email-result">
					{result && <ReactJson src={result} />}
				</div>
			</div>
		</div>
	);
}

export default CheckEmail;