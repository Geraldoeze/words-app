import connectToDatabase from "../../lib/mongodb";

export default async (req, res) => {
  // Connect to the database first
  const { db, client } = await connectToDatabase();
  try {
    const dataFromDb = await db.collection("alphabets").find({}).toArray();
    // Extract words and meanings from all alphabets
    const allWords = dataFromDb.reduce((words, alphabetData) => {
      const alphabetWords = alphabetData.words;
      for (const word in alphabetWords) {
        words[word] = alphabetWords[word];
      }
      console.log(words)
      return words;
    }, {});

    res.status(200).json(allWords);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve words" });
    client.close();
  }
};
