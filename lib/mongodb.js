import { MongoClient } from 'mongodb';


async function connectToDatabase() {
  
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();
  const db = client.db();
  return { client, db };
}

export default connectToDatabase;
 