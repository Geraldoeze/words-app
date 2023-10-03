

import connectToDatabase from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      // Connect to the database first
      const { db, client } = await connectToDatabase();

      // Perform database-related operations
      const dataFromDb = await db.collection("alphabets").find({}).toArray();
      res.status(200).json(dataFromDb);

      // Close the database connection
      client.close();
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching data." });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
