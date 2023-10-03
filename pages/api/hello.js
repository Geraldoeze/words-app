// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("words");
    const { alphabet, words } = req.body;
    try {
      const existingAlphabet = await db
        .collection("alphabets")
        .findOne({ alphabet: alphabet.toUpperCase() });
      if (existingAlphabet) {
        if (!existingAlphabet.words[words.name]) {
          existingAlphabet.words[words.name] = words.meaning;
          await db
            .collection("alphabets")
            .updateOne(
              { alphabet: alphabet.toUpperCase() },
              { $set: { words: existingAlphabet.words } }
            );
          return res.status(200).json({
            message: "Word added successfully.",
          });
        } else {
          console.log("Word already exists:");
          return res.status(404).json({
            error: "Error",
            message: "This word already exists in the database",
          });
        }
      } else {
        const newAlphabet = {
          alphabet: alphabet,
          words: { [words.name]: words.meaning },
        };
        await db.collection("alphabets").insertOne(newAlphabet);
        return res.status(200).json({
          message: "Alphabet and word added successfully.",
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({
        error: "An error occurred while saving data.",
        message: error.message,
      });
    }
    res.status(200).json({ name: "John Doe" });
  
}
