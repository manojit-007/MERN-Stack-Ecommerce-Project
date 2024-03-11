const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//handle uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log(`Shutting the server due to uncaughtException`)
        process.exit(1)
})

// Load environment variables from .env file

dotenv.config({ path: "Backend/config/config.env" });



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
const server = app.listen(port, () => {
    console.log(`Server listening on: ${port}`);
});

//Unhandled promise rejection like mongodb url error
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting the server due to some problem`)
    server.close(()=>{
        process.exit(1)
    })
})