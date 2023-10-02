// Import the 'fs' module
import fs from "fs/promises";
import path from "path";


// Define the path to your JSON file
const dataFilePath = path.join(process.cwd(), "data", "data.json");

export default async (req, res) => {
  if (req.method === "GET") {
    
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

      // Send the data as a JSON response
      res.status(200).json(jsonData);
    } catch (error) {
      console.error("Error reading data from file:", error);
      res.status(500).json({ message: "An error occurred while fetching data." });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
