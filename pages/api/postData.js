import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "POST") {
    // Connect to the database first
    const client = await clientPromise;
    const db = client.db("words");

    // Extract the alphabet and words from req.body
    const { alphabet, words } = req.body;

    try {
      const existingAlphabet = await db
        .collection("alphabets")
        .findOne({ alphabet: alphabet.toUpperCase() });

      if (existingAlphabet) {
        // Alphabet exists, check if the word exists in 'words'
        if (!existingAlphabet.words[words.name]) {
          // Word does not exist, add the new word to 'words'
          existingAlphabet.words[words.name] = words.meaning;

          // Update the existing alphabet document in the collection
          await db
            .collection("alphabets")
            .updateOne(
              { alphabet: alphabet.toUpperCase() },
              { $set: { words: existingAlphabet.words } }
            );

          // Respond with success message
          return res.status(200).json({
            message: "Word added successfully.",
          });
        } else {
          // Word already exists, handle as needed (e.g., update or ignore)
          console.log("Word already exists:");
          return res.status(404).json({
            error: "Error",
            message: "This word already exists in the database",
          });
        }
      } else {
        // Alphabet doesn't exist, create a new alphabet document
        const newAlphabet = {
          alphabet: alphabet,
          words: { [words.name]: words.meaning },
        };

        // Insert the new alphabet document into the collection
        await db.collection("alphabets").insertOne(newAlphabet);

        // Respond with success message
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
    // Close the database connection
  } else {
    res.status(405).end(); // Method not allowed
  }
};
