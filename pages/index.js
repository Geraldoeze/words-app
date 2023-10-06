import React, { useState } from "react";
import Spinner from "../component/spinner";

const Index = ({ url }) => {
  const [selectedAlphabet, setSelectedAlphabet] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState({
    bool: false,
    response: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState({
    name: "",
    meaning: "",
  });

  const handleAlphabetSelect = (alphabet) => {
    setSelectedAlphabet(alphabet);
    setShowDropdown(true);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    setError((prev) => ({ bool: false, response: "" }));
    const details = {
      alphabet: selectedAlphabet,
      words: {
        name: newData?.name.toLowerCase(),
        meaning: newData?.meaning,
      },
    };

    try {
      // Send a POST request to the API route
      const response = await fetch(`${url}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      // Parse the response data if it exists
      const responseData = await response.json();

      if (response.ok) {
        // Data was successfully saved
        console.log("Data saved successfully.", responseData);
      } else {
        // Handle error if necessary
        setError((prev) => ({ bool: true, response: responseData?.message }));
        console.log("Error saving data.", responseData);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError((prev) => ({
        bool: true,
        response: `Error sending POST request`,
      }));
    }
    setNewData(() => ({ name: "", meaning: "" }));
    setIsLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "2rem 2rem 0 2rem",
        minHeight: "100vh",
      }}
    >
      <h1>Wordings</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <h4>Select an Alphabet</h4>
        <select
          onChange={(e) => handleAlphabetSelect(e.target.value)}
          value={selectedAlphabet}
        >
          <option value="">Select an alphabet</option>
          {Array.from({ length: 26 }, (_, i) =>
            String.fromCharCode(65 + i)
          ).map((alphabet) => (
            <option key={alphabet} value={alphabet}>
              {alphabet}
            </option>
          ))}
        </select>

        {showDropdown && (
          <div style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Enter something"
              style={{ marginBottom: "10px" }}
              value={newData?.name}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <textarea
              placeholder="Enter some text"
              style={{ width: "100%" }}
              value={newData?.meaning}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, meaning: e.target.value }))
              }
            />
            <button type="submit" onClick={submitHandler}>
              SUBMIT
            </button>
          </div>
        )}
        {error?.bool && (
          <div>
            <h2 style={{ color: "red" }}>An Error Occured.</h2>
            <h3 style={{ color: "red" }}>{error.response}</h3>
          </div>
        )}
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  const url = process.env.BACKEND_SERVER;
  return {
    props: {
      url: url,
    },
  };
}
