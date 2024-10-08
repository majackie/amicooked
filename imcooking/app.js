const express = require("express");
const cors = require("cors");
const path = require("path");
const pg = require("pg");

const app = express();
const port = 3000;

const pool = new pg.Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.get("/check-password", async (req, res) => {
	const { text } = req.query;

	if (!text) {
		return res.status(400).json({ error: "Text query parameter is required" });
	}

	try {
		const client = await pool.connect();
		const result = await client.query(
			"SELECT * FROM pwnedpasswords WHERE hash_range = $1",
			[text]
		);
		client.release();

		if (result.rows.length > 0) {
			res.json({ exists: true });
		} else {
			res.json({ exists: false });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
