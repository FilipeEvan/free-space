const { MongoClient, ServerApiVersion } = require("mongodb");

const url = process.env.MONGODB_URL;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

module.exports = async () => {
  await client.connect();
  const collection = client.db("iot").collection("vagas");
  return { client, collection };
};
