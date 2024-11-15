const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "*", // Allow all origins, adjust as needed for security
};
app.use(cors(corsOptions));
app.use(express.json());

// API key from environment variables
const API_KEY = process.env.API_KEY;

// app.get("/", (req, res) => {
//   res.send("Welcome to NEWS App");
// });

app.get("/news", async (req, res) => {
  const country = req.query.country || "us"; // Default country
  const category = req.query.category || ""; // Optional category
  const itemsPerPage = Number(req.query.itemsPerPage) || 10; // Optional pagination size
  const page = Number(req.query.page) || 1; // Optional page number

  // Construct the API URL dynamically
  let apiUrl = `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=${API_KEY}`;
  if (category) {
    apiUrl += `&category=${category}`;
  }

  try {
    const response = await axios.get(apiUrl);
    const allSources = response.data.sources || [];

    // Apply pagination manually
    const paginatedSources = allSources.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

    res.json({
      totalSources: allSources.length,
      totalPages: Math.ceil(allSources.length / itemsPerPage),
      currentPage: page,
      sources: paginatedSources,
    });
  } catch (error) {
    console.error("Error fetching news data:", error.message);
    res.status(500).json({ error: "Failed to fetch news data" });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
