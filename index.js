const express = require("express");
const Router = require("./controllers/userController");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use("/api", Router);

const port = 2000;

const connectdb = require("./config/db");
connectdb();

app.listen(port, () => {
  console.log(`server run this ${port}`);
});
