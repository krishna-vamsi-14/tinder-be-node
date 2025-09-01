const express = require("express");

const app = express();



// This is a middleware that will be executed for all the routes that start with /test
// /test/hello will also give the same response because it is matching the /test route.

// But /test123 will not give the same response because it is not matching the /test route.
app.use("/test", (req, res) => {
    res.send("Hello from the test route")
})

// This is a middleware that will be executed for all the routes that start with /test2
// /test2/hello will also give the same response because it is matching the /test2 route.
// But /test2123 will not give the same response because it is not matching the /test2 route.
app.use("/test2", (req, res) => {
    res.send("Hello from the test2 route")
})

// If you add this route at the top, it will override the other routes. 
// Because it is like a wildcard that matches all the routes because of the /
// So, it will match all the routes and send the response. 
// So, it is important to add the routes in the order of their priority. 
app.use("/",(req, res) => {
    res.send("Hello from the server")
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});