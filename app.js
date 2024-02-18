const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require("path"); // Import path module

// Import routes
const userroutes = require("./routes/userResisterRoute");
const resturantRoutes = require("./routes/resturantRoutes");

// Middleware
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Serve uploaded images from the resturantPhotograhs directory
app.use( express.static('resturantPhotograhs'));
app.use('/resturantPhotograhs', express.static('resturantPhotograhs'));   ///plse note
// Routes
app.use("/api/v1", userroutes);
app.use("/api/v1", resturantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
