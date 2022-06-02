require("dotenv").config();
require("./thingspeak.js");
const mongodb = require("./mongodb.js");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/vagas", async (_, res) => {
  const { client, collection } = await mongodb();
  const find = await collection.find({}).toArray();
  client.close();

  return res.json(find);
});

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`);
});
