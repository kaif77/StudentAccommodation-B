const express = require("express");
const cors = require("cors");
const app = express();

// *common middlewares
app.use(cors());
app.use(express.json());

// ?import user routers
const userRouters = require("./routers/user.route");
const roomRouters = require("./routers/room.route");
const bookingRouters = require("./routers/booking.route");
const paymentRouters = require("./routers/payment.route");
const dashboardRouters = require("./routers/dashboard.route");

// !root route
app.get("/", (req, res) => {
  res.send("<h1><center>Welcome to Student Accommodation API</center></h1>");
});

app.use("/api/user", userRouters);
app.use("/api/room", roomRouters);
app.use("/api/booking", bookingRouters);
app.use("/api/payment", paymentRouters);
app.use("/api/dashboard", dashboardRouters);

//Middleware for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: { massage: "Not found!" } });
});

app.listen("3002", () => {
  console.log("Server start on port 3002");
});
