const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// API key from environment variable
const API_KEY = process.env.NEWS_API_KEY || "c003f70919aa4fc4bb23071b5c77755e";

app.get("/", (req, res) => {
  res.send("Welcome to NEWS App");
});

// News endpoint
app.get("/news", async (req, res) => {
    console.log(res,"ressss")
  const { country = "us", category } = req.query; // Get optional query params
  let apiUrl = `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=${API_KEY}`;
  
  if (category) {
    apiUrl = `https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${API_KEY}`;
  }

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data); // Return the fetched data
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
