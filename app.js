const express = require("express");
const app = express();
// *import json
app.use(express.json());

// !root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// ?import user routers
const userRouters = require("./routers/user.route");

app.use("/api/user", userRouters);

app.listen("3000", () => {
  console.log("Server start on port 3000");
});
