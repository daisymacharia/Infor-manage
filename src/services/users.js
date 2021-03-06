// import axios from "axios";
import jwt from "jsonwebtoken";
import nodemon from "nodemon";
import UserSchema from "../models/users.js";

function login(req, res) {
  const { email, password } = req.body;
  UserSchema.findOne({ email }).exec((err, user) => {
    if (err) return res.status(500).send({ data: "An error occured" });
    if (!user) {
      return res.status(400).send({ data: "The username does not exist" });
    }
    user.comparePassword(password, (error, match) => {
      if (error) {
        return res.status(400).send({ data: "The password is invalid" });
      } else if (match) {
        let payload = { email: email, username: user.name };

        let token = jwt.sign(payload, process.env.APP_SECRET, {});

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
          secure: true,
          sameSite: "None",
        });
        res.status(200).send({
          data: { email },
          token: token,
        });
      }
    });
  });
}

function register(req, res) {
  const user = new UserSchema();
  const { username, email, password } = req.body;
  UserSchema.findOne({ $or: [{ username }, { email }] }).exec(
    (err, existing_user) => {
      if (err) return res.status(400).send({ message: "An error occured" });
      else if (existing_user) {
        return res
          .status(400)
          .send({ message: `username: ${username} already exists` });
      } else {
        user.name = username;
        user.email = email;
        user.password = password;
      }

      user
        .save()
        .then((item) => {
          let payload = { email: email, username: username };

          let token = jwt.sign(payload, process.env.APP_SECRET, {});
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
          });
          res.status(200).send({
            username: item.name,
            email: item.email,
            token: token,
          });
        })
        .catch((err) => {
          res.status(400).send(err.message);
        });
    }
  );
}

function signout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    secure: true,
    sameSite: "None",
  });
  res.status(200).send({
    message: "Goodbye!",
  });
}

function getUser(req, res) {
  let email = req.email;
  if (!email) {
    return res.status(400).send({ data: "The user is not loggedIn" });
  }

  UserSchema.findOne({ email }).exec((err, user) => {
    if (err) return res.status(500).send({ data: "An error occured" });
    if (!user) {
      return res.status(400).send({ data: "The user is not loggedIn" });
    }
    if (user) {
      res.status(200).send({ email: user.email, username: user.name });
    }
  });
}

export { login, register, signout, getUser };
