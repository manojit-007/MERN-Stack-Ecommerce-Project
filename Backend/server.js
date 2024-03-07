const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Load environment variables from .env file
dotenv.config({ path: "./Backend/config/.env" });

// Importing app from ./app
const app = require("./app");

// Define the port to listen on
const port = process.env.PORT || 8080;

// Connect to the database
connectDatabase();

// Define routes
app.get("/", (req, res) => {
    res.send("Server and page is ready");
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
