import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import crypto from "crypto";

dotenv.config();

const app = express();
const port = 5555;

// Configure CORS to allow requests from specific origins
app.use(cors({
	origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
}));

// Route to check if an email has been breached
app.get("/api/hibp/email/:email", async (req, res) => {
	const email = req.params.email;
	try {
		const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}/?truncateResponse=false`, {
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

// Route to check if a password has been breached
// Hash the password using SHA-1 and convert to uppercase
// Send the first 5 characters of the hash to the API
// Find the matching hash suffix in the response
app.get("/api/hibp/password/:password", async (req, res) => {
	const password = req.params.password;
	const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
	const prefix = hash.slice(0, 5);
	const suffix = hash.slice(5);
	try {
		const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
			method: "GET",
			headers: {
				"hibp-api-key": process.env.HIBP_API_KEY,
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			const data = await response.text();
			const lines = data.split('\n');
			const match = lines.find(line => line.startsWith(suffix));
			if (match) {
				const [hashSuffix, count] = match.split(':');
				res.json({ breached: true, count: parseInt(count, 10) });
			} else {
				res.json({ breached: false });
			}
		} else {
			res.status(response.status).json({ error: "Error fetching data" });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// Route to check if a domain has been breached
app.get("/api/hibp/domain/:domain", async (req, res) => {
	const domain = req.params.domain;
	try {
		const response = await fetch(`https://haveibeenpwned.com/api/v3/breaches/?Domain=${domain}`, {
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
});
