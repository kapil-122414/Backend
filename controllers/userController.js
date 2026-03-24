const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const usermodel = require("../Models/usermodel");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const Emailfind = await usermodel.findOne({ Email: Email });
    if (Emailfind) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log(hashedPassword);

    const newuser = await usermodel.create({
      Email: Email,

      Password: hashedPassword,
    });

    console.log(newuser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json("");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const Emailfind = await usermodel.findOne({ Email });
    if (!Emailfind) {
      res.status(400).json({ message: "email not regiser" });
    }
    const Passwordcheck = await bcrypt.compare(Password, Emailfind.Password);

    console.log(Emailfind.Password);
    if (!Passwordcheck) {
      json.status(300).json({ message: "enter correct password" });
    }

    const jwt=jwt.sign({

    },
  'secretkey',
{ExpiresIn:"1h"})
    res.status(200).json({ message: "login successfly" });
  } catch (error) {
    res.status(500).json({ message: "not login try error" });
  }
});

module.exports = router;
