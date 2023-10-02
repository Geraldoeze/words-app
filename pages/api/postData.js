import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "data.json");

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      // Read existing data from the JSON file, if it exists
      let jsonData = [];
      try {
        const data = await fs.readFile(dataFilePath, "utf-8");
        jsonData = JSON.parse(data);
      } catch (error) {
        // File doesn't exist or is empty, continue with an empty array
      }

      // Extract the alphabet and words from req.body
      const { alphabet, words } = req.body;

      // Check if the alphabet already exists in the data
      const existingAlphabet = jsonData.find(
        (item) => item.alphabet === alphabet
      );

      if (existingAlphabet) {
        // Alphabet exists, check if the word exists in 'words'
        if (!existingAlphabet.words[words.name]) {
          // Word does not exist, add the new word to 'words'
          existingAlphabet.words[words.name] = words.meaning;
        } else {
          // Word already exists, handle as needed (e.g., update or ignore)
          console.log("Word already exists:");
          return res.status(404).json({
            error: "Error",
            message: "This word already exist on the database",
          });
        }
      } else {
        // Alphabet doesn't exist, create a new entry for it with a unique ID
        const newAlphabet = {
          id: jsonData.length + 1,
          alphabet: alphabet,
          words: {
            [words.name]: words.meaning, // Use the word name as the key
          },
        };
        jsonData.push(newAlphabet);
      }

      // Write the updated data back to the JSON file
      await fs.writeFile(
        dataFilePath,
        JSON.stringify(jsonData, null, 2),
        "utf-8"
      );

      res.status(200).json(jsonData); // Respond with the updated data
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({
        error: "An error occurred while saving data.",
        message: error.message,
      });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
