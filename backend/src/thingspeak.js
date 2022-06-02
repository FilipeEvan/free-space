const mongodb = require("./mongodb.js");
const ThingSpeakClient = require("thingspeakclient");
const client = new ThingSpeakClient();

const channel = Number(process.env.CHANNEL_ID);
client.attachChannel(channel, {
  readKey: process.env.READ_KEY,
});

const minutes = 0.1;
const interval = minutes * 60 * 1000;
setInterval(() => {
  client.getLastEntryInChannelFeed(channel, {}, async (err, res) => {
    if (err) return;
    console.log("ThingSpeak =>", res);

    const { client, collection } = await mongodb();
    const find = await collection.findOne();
    if (find.entry_id === res.entry_id) {
      console.log("MongoDB =>", {});
      return;
    }

    const create = await collection.insertOne(res);
    console.log("MongoDB =>", create);

    client.close();
  });
}, interval);
