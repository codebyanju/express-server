const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs");

// Middleware to log request headers (already provided in your example)
app.use(function (req, res, next) {
  // Set the appropriate CORS headers
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin); // Use dynamic origin
  res.setHeader("Access-Control-Allow-Credentials", true); // Allow credentials (cookies, etc.)
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers

  // Handle preflight requests for CORS (OPTIONS method)
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Send a 204 status for preflight checks
  }

  next(); // Continue to the next middleware/route handler
});

// Route to get paginated posts
app.get("/posts", (req, res) => {
  // Load mock data from JSON file
  const posts = JSON.parse(fs.readFileSync("posts.json", "utf-8"));

  // Extract pagination parameters from query string
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate start and end indices for the current page
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // Paginated data
  const paginatedPosts = posts.slice(startIndex, endIndex);

  // Total number of posts
  const totalPosts = posts.length;

  // Pagination response
  const response = {
    page,
    limit,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
    posts: paginatedPosts,
  };

  // Send response
  res.json(response);
});

app.get("/", (req, res) => {
  res.send("Hello World! slash");
});

app.get("/hello/abc", (req, res) => {
  res.send("Hello World! /abc");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
