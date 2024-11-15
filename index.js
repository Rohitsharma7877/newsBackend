const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "*", // You can also specify specific domains if needed
};
app.use(cors(corsOptions));
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
  res.send("Welcome to NEWS App");
});

app.get("/news", async (req, res) => {
  console.log(res, "ressss");
  const { country = "us", category } = req.query;

  let apiUrl = `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=${API_KEY}`;

  if (category) {
    apiUrl = `https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${API_KEY}`;
  }
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (err) {
    console.error(
      "Error fetching news:",
      err.response ? err.response.data : err.message
    );
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
