import connectToDatabase from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    const { db, client } = await connectToDatabase();
    try {
      // Extract the alphabet parameter from the request
      const { alphabet } = req.query;
      console.log("GETT", alphabet, req.url);
      const fetched_data = await db
        .collection("alphabets")
        .findOne({ alphabet: alphabet.toUpperCase() });
      console.log(fetched_data);

      // If data is found, send it as a JSON response

      if (
        typeof fetched_data === "object" &&
        Object.keys(fetched_data).length > 2
      ) {
        res.status(200).json(fetched_data);

        // End connection
        client.close();
      } else {
        res.status(404).json({ message: "Alphabet not found!!" });
      }
    } catch (error) {
      console.error("Error fetching", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching data." });
    }
  }
};
