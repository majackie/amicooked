import "../style/CheckDomain.css"

import { useState } from "react";
import Button from "../shared/Button"
import Navbar from "../shared/Navbar";

function CheckDomain() {
	const url = "http://127.0.0.1:5555/api/hibp/domain/";
	// const url = "http://localhost:5555/api/hibp/domain/";
	const [domain, setDomain] = useState("");
	const [result, setResult] = useState(null);

	const handleDomainChange = (event) => {
		setDomain(event.target.value);
	};

	const handleSubmit = async () => {
		try {
			const response = await fetch(url + domain, {
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
		<div className="CheckDomain">
			<Navbar type={"default"} />
			<div className="Body">
				<form onSubmit={(e) => e.preventDefault()}>
					<label className="form-element">Enter domain:</label>
					<input className="form-element" type="text" id="domain" name="domain" value={domain} onChange={handleDomainChange}></input>
				</form>
				<Button className="form-element" theme="primary" onClick={handleSubmit}>Submit</Button>
				<div id="check-domain-result">
					{result && (
						result.length > 0 ? (
							result.map((breach, index) => (
								<div key={index} className="breach">
									<h2>{breach.Title}</h2>
									<p><strong>Breach Date:</strong> {breach.BreachDate}</p>
									<p><strong>Affected Accounts:</strong> {breach.PwnCount ? breach.PwnCount.toLocaleString() : "N/A"}</p>
									<p><strong>Description:</strong> <span dangerouslySetInnerHTML={{ __html: breach.Description }} /></p>
									<p><strong>Compromised Data:</strong> {breach.DataClasses ? breach.DataClasses.join(', ') : "N/A"}</p>
									<img src={breach.LogoPath} alt={`${breach.Title} logo`} />
								</div>
							))
						) : (
							<p>No breaches found for this domain.</p>
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default CheckDomain;