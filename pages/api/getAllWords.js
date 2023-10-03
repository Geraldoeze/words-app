import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  // Connect to the database first
  const client = await clientPromise;
  const db = client.db("words");

  try {
    const dataFromDb = await db.collection("alphabets").find({}).toArray();
    // Extract words and meanings from all alphabets
    const allWords = dataFromDb.reduce((words, alphabetData) => {
      const alphabetWords = alphabetData.words;
      for (const word in alphabetWords) {
        words[word] = alphabetWords[word];
      }
      
      return words;
    }, {});

    res.status(200).json(allWords);
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve words" });
  }
};
