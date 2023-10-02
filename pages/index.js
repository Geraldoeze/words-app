import React, { useState } from "react";

const Index = () => {
  const [selectedAlphabet, setSelectedAlphabet] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState({
    bool: false,
    response: "",
  });
  const [newData, setNewData] = useState({
    name: "",
    meaning: "",
  });

  const handleAlphabetSelect = (alphabet) => {
    setSelectedAlphabet(alphabet);
    setShowDropdown(true);
  };

  const submitHandler = async () => {
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
      const response = await fetch("/api/postData", {
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
      }
    } catch (error) {
      setError((prev) => ({
        bool: true,
        response: `Error sending POST request, ${responseData?.message}`,
      }));
      console.log("Error:", responseData);
    }
    setNewData(() => ({ name: "", meaning: "" }));
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
      </div>
    </div>
  );
};

export default Index;
