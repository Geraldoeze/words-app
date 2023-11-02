import React, { useState } from "react";
import Spinner from "../component/spinner";
import { apiEditData } from "../api/fetchData";
import Header from "../component/heder";

const Edit = ({ header, meaning, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState({
    name: header,
    meaning: meaning,
    description: "",
  });

  const handleAlphabetSelect = (alphabet) => {
    setSelectedAlphabet(alphabet);
    setShowDropdown(true);
  };

  const handleEditButton = async () => {
    setIsLoading(true);
    const alpha_value = newData?.name[0].toUpperCase();

    const details = {
      alphabet: alpha_value,
      word: {
        name: newData?.name.toLowerCase(),
        meaning: newData?.meaning,
        description: newData?.description,
      },
    };

    try {
      // Send a POST request to the API route
      let result = await apiEditData(details);
      if (result.status == "200") {
        console.log("Data saved successfully.");
      } else {
        alert("Error occured while editing word..");
        console.log("Error saving data.");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      alert("Error occured while editing word..");
    }
  };

  return (
    <div
      style={{
        marginTop: "10px",
        background: "skyblue",
        padding: "1rem 3rem",
        borderRadius: "16px",
      }}
    >
      <h4>Edit Word</h4>
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
      <textarea
        placeholder="Description"
        style={{ width: "100%" }}
        value={newData?.description}
        onChange={(e) =>
          setNewData((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <button onClick={onClose}>Close</button>
      <button style={{ background: "blue" }} onClick={handleEditButton}>
        Submit
      </button>{" "}
    </div>
  );
};

export default Edit;
