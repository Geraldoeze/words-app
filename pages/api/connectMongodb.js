// pages/api/connectMongo.js

const { MongoClient } = require('mongodb');


// const MONGODB_URI = `mongodb+srv://gerald:GZ3r0pV0toPBWmCV@node-cluster.uktzq.mongodb.net/words?retryWrites=true&w=majority`;

async function connectToDatabase() {
  
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();
  const db = client.db();
  return { client, db };
}

export default connectToDatabase;
 