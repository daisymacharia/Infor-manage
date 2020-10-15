import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Routes from "./routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import jwt from "jsonwebtoken";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 8080;

const app = express();
const corsOptions = {
  origin: process.env.REACT_APP_URL,
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, X-Requested-With",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  let { token } = req.cookies;
  // if (!token) return res.status(403).send({ message: "No token provided." });
  if (token) {
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (decoded) {
        req.email = decoded.email;
      }
    });
  }
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.REACT_APP_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(Routes);

app.get("/", (req, res, next) => {
  res.send("Welcome to the Information Manager");
});

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);
const uri = `mongodb+srv://macharia:${process.env.MONGO_PASSWORD}@alxcluster.n1mxs.gcp.mongodb.net/information-manager?retryWrites=true&w=majority`;

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
