// Import the 'fs' module
import fs from "fs/promises";
import path from "path";

// Define the path to your JSON file
const dataFilePath = path.join(process.cwd(), "data", "data.json");

export default async (req, res) => {
  try {
    // Read data from the JSON file
    let jsonData = [];
    try {
      const data = await fs.readFile(dataFilePath, "utf-8");
      jsonData = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is empty, continue with an empty array
      return res.status(500).json({
        error: "Server Error",
        message: "Database Connection error",
      });
    }
    // Extract words and meanings from all alphabets
    const allWords = jsonData.reduce((words, alphabetData) => {
      const alphabetWords = alphabetData.words;
      for (const word in alphabetWords) {
        words[word] = alphabetWords[word];
      }
      return words;
    }, {});

    res.status(200).json(allWords);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve words" });
  }
};
