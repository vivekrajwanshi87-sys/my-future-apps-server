const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("My Future Apps Server is Running!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "My Future Apps API is working!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
