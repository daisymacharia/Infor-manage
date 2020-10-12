// import * as dotenv from "dotenv";
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const Routes = require("./routes");
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Routes from "./routes.js";
// const MongoClient = require("mongodb").MongoClient;

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(Routes);

app.get("/", (req, res) => {
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

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   console.log("Connected successfully to server");
//   const collection = client.db("information-manager").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
