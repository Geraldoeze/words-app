// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";
export default function handler(req, res) {
  if (req.method === "POST") {
    const client = clientPromise;
    const db = client.db("words");
    const dataFromDb = db.collection("alphabets").find({}).toArray();
    res.status(200).json({ message: "test POST", res: dataFromDb });
  } else {
    const client = clientPromise;
    const db = client.db("words");
    const dataFromDb = db.collection("alphabets").find({}).toArray();

    res
      .status(200)
      .json({ message: "test working for other methods", res: dataFromDb });
  }
}
