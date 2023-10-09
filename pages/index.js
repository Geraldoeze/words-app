import React, { useState } from "react";
import Spinner from "../component/spinner";
import { apiPostData } from "../api/fetchData";
import Header from "../component/heder";

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
      let result = await apiPostData(details);
      if (result.status == "200") {
        console.log("Data saved successfully.");
      } else {
        setError((prev) => ({ bool: true, response: result.message }));
        console.log("Error saving data.");
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
    <>
    <Header />
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
    </>
  );
};

export default Index;
