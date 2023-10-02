// Import the 'fs' module
import fs from "fs/promises";
import path from "path";

// Define the path to your JSON file
const dataFilePath = path.join(process.cwd(), "data", "data.json");

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      // Extract the alphabet parameter from the request
      const { alphabet } = req.query;
      console.log( "GETT", alphabet, req.url)

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
      // Filter data based on the provided alphabet
      const filteredData = jsonData.filter(
        (item) => item.alphabet === alphabet.toUpperCase()
      );

      // If data is found, send it as a JSON response
      if (filteredData.length > 0) {
        res.status(200).json(filteredData);
      } else {
        res.status(404).json({ message: "Alphabet not found!!" });
      }
    } catch (error) {
      console.error("Error reading data from file:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching data." });
    }
  }
};
