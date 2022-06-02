require("dotenv").config();
require("./thingspeak.js");
const mongodb = require("./mongodb.js");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/vagas", async (_, res) => {
  const { client, collection } = await mongodb();
  const find = await collection.find({}).toArray();

  return res.json(find);
});

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
