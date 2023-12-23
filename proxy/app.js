const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	next();
});

app.get("/api/grant/v1/solana_breakdown", async (req, res) => {
	const identity = req.query.identity || "defaultIdentity";

	try {
		const response = await axios.get(
			`https://airdrop.pyth.network/api/grant/v1/solana_breakdown?identity=${identity}`
		);
		res.json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
});
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
