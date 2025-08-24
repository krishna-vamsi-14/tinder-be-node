const express = require("express");

const app = express();


app.use("/test", (req, res) => {
    res.send("Hello from the test route")
})

app.use("/test2", (req, res) => {
    res.send("Hello from the test2 route")
})

app.use("/",(req, res) => {
    res.send("Hello from the server")
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});