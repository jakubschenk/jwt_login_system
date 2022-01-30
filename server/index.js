require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const utils = require("./utils/utils");
const db = require("./utils/initDb");

const app = express();

const SALT = 12;
const PORT = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// letsgo
app.listen(PORT, function () {
  console.log(`Server runing without problem - Running on port: ${PORT}`);
  utils.recreateConnection(); // Start session
});

app.post("/register", (req, res) => {
  const loginName = req.body.loginName;
  const password = req.body.password;

  const existenceQuery = "SELECT * FROM Users WHERE login_name = ?";
  const insertationQuery =
    "INSERT INTO users(login_name, password) VALUES (?, ?)";

  db.query(existenceQuery, loginName, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    if (result.length !== 0) {
      res.send({ error: true, message: "Username is already used" });
      return;
    }

    bcrypt.hash(password, SALT, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return;
      }

      db.query(insertationQuery, [loginName, hashedPassword], (err) => {
        if (err) {
          console.log(err);
          return;
        }

        res.send({ error: false, message: "Successfuly registered!!!" });
      });
    });
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
    return;
  }
  res.send({ loggedIn: false });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return;
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.json({
        isAuthorized: false,
        message: "Editing token is not allowed",
      });
      return;
    }
    req.userId = decoded.id;
    next();
  });
};

app.get("/isAuthenticated", verifyJWT, (res) => {
  res.send("You are Authenticated");
});

app.post("/login", (req, res) => {
  const loginName = req.body.loginName;
  const password = req.body.password;

  const existence = "SELECT * FROM Users WHERE login_name = ?";
  db.query(existence, loginName, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);

    if (result.length !== 1) {
      res.send({
        isAuthorized: false,
        message: "Username does not match any account",
      });
      return;
    }

    const id = result[0].id_u;

    bcrypt.compare(password, result[0].password, (err, isMatching) => {
      if (!isMatching) {
        res.send({ isAuthorized: false, message: "Wrong password" });
        return;
      }

      const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 300,
      });
      req.session.user = id;
      res.send({ isAuthorized: true, token: token, userId: id });
    });
  });
});
