import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
