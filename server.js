const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("Backend Server is Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});