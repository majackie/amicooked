require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors({
	origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/api/breachedaccount/:email", async (req, res) => {
	const email = req.params.email;
	try {
		const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}`, {
			method: "GET",
			headers: {
				"hibp-api-key": process.env.HIBP_API_KEY,
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			const data = await response.json();
			res.json(data);
		} else {
			res.status(response.status).json({ error: "Error fetching data" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	console.log(process.env.HIBP_API_KEY);
});