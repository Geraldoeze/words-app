import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      // Connect to the database first
      const client = await clientPromise;
      const db = client.db("words");

      // Perform database-related operations
      const dataFromDb = await db.collection("alphabets").find({}).toArray();
      res.status(200).json(dataFromDb);

      // Close the database connection
    } catch (err) {
      res
        .status(500)
        .json({ message: "An error occurred while fetching data." });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
};
