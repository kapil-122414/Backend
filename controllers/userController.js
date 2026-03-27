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
    res.status(500).json({ message: "not register" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const Emailfind = await usermodel.findOne({ Email: Email });

    if (!Emailfind) {
      return res.status(400).json({ message: "email not regiser" });
    }

    const Passwordcheck = await bcrypt.compare(Password, Emailfind.Password);

    if (!Passwordcheck) {
      return res.status(400).json({ message: "enter correct password" });
    }

    const Role = Emailfind.Role;
    const Token = jwt.sign(
      {
        Email: Email,
      },
      "secretkey",
      { expiresIn: "1m" },
    );

    //cookie me store karo
    res.cookie("token", Token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
      path: "/",
    });
    if (Role === "user") {
      return res
        .status(200)
        .json({ message: "login successfly", token: Token, Role: Role });
    }
    if (Role === "admin") {
      return res
        .status(200)
        .json({ message: "login successfly", token: Token, Role: Role });
    }
  } catch (error) {
    res.status(500).json({ message: "not login try error" });
  }
});
//token routes

router.get("/profile", (req, res) => {
  const tokens = req.cookies.token;

  if (!tokens) {
    return res.status(400).json("token not valid");
  }

  try {
    const decoded = jwt.verify(tokens, "secretkey");

    res.json({
      message: "Profile fetched successfully",
      user: {
        Email: decoded.Email,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});
//user router
router.get("/user", (req, res) => {
  const token = req.cookies.token;

  const findrole = usermodel.find();
  console.log(findrole);
});
module.exports = router;
