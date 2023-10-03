// import { MongoClient } from 'mongodb';


// async function connectToDatabase() {
  
//   const client = new MongoClient(process.env.MONGODB_URI);

//   await client.connect();
//   const db = client.db();
//   return { client, db };
// }

// export default connectToDatabase;
 
// mongodb.js

import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI
const uri = "mongodb+srv://gerald:GZ3r0pV0toPBWmCV@node-cluster.uktzq.mongodb.net?retryWrites=true&w=majority"

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {

  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise