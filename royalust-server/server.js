// This code starts a server on port 8080 that listens for requests and responds to them.

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./src/models");
const app = express();
const port = 8080;

connectToDb().catch((err) => console.log(err));

async function connectToDb() {
  let connection = await mongoose.connect(
    "mongodb://127.0.0.1:27017/royalust_demo"
  );
  console.log("connection established with db");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "100mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./src/routes/Credentials.routes")(app);
require("./src/routes/Users.routes")(app);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Royalust server listening on port ${port}!`)
);
