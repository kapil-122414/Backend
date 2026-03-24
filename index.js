const express = require("express");
const Router = require("./controllers/userController");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);

const port = 2000;

const connectdb = require("./config/db");
connectdb();

app.listen(port, () => {
  console.log(`server run this ${port}`);
});
