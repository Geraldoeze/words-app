import React, { useState } from "react";
import Spinner from "../component/spinner";
import { apiPostData } from "../api/fetchData";
import Header from "../component/heder";

const Edit = ({data}) => {
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
      description: ""
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
          description: newData?.description
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
            height: "60vh",
            flexDirection: "column",
          }}
        >
        
        
  
          
            <div style={{ marginTop: "10px" }}>
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
                value={newData?.meaning}
                onChange={(e) =>
                  setNewData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
              <button type="submit" onClick={submitHandler}>
                SUBMIT
              </button>
            </div>
          
          
          {isLoading && <Spinner />}
        </div>
      </div>
      </>
    );
}
 
export default Edit;



