const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwf.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  //Mock user
  const user = {
    id: 1,
    username: "cahit",
    email: "cahit@gmail.com",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({ token: token });
  });
});

app.listen(3000, () => {
  console.log("Server is live");
});

//Format of Token
//Authorization: Bearer <access_token>

//Verify Token
function verifyToken(req, res, next) {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];

  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //Split at the space
    const bearer = bearerHeader.split(" ");

    //Get token from array
    const bearerToken = bearer[1];

    //Set the token
    req.token = bearerToken;

    //Next middleware
    next();

    console.log("authorized");
  } else {
    //Forbidden
    console.log("unauthorized");

    res.sendStatus(403);
  }
}
