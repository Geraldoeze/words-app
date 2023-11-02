// components/Modal.js
import { useState } from "react";
import Edit from "../pages/edit";

export default function Modal({ header, meaning, onClose }) {
  const [init, setInit] = useState(true);
  const [remove, setRemove] = useState(false);
  const [newData, setNewData] = useState({
    name: header,
    meaning: meaning,
    description: "",
  });
  const submitHandler = async () => {
    setIsLoading(true);
    setError((prev) => ({ bool: false, response: "" }));
    const details = {
      alphabet: selectedAlphabet,
      words: {
        name: newData?.name.toLowerCase(),
        meaning: newData?.meaning,
        description: newData?.description,
      },
    };

    try {
      // Send a PUT/PATCH request to the API route
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

  const deleteHandler = () => {
    setRemove(true);
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {init && (
            <div>
              {" "}
              <h2>{header}</h2>
              <h4>{meaning}</h4>
              <button
                style={{ background: "skyblue" }}
                onClick={() => setInit(false)}
              >
                Edit
              </button>
              <button onClick={onClose}>Close Modal</button>
              <button style={{ background: "red" }} onClick={deleteHandler}>
                Delete
              </button>{" "}
            </div>
          )}
          {!init && (
           <Edit header={header} meaning={meaning} onClose={onClose} />
          )}
          {remove && (
            <div>
              <h4>Are you sure you want to delete {header}</h4>
              <button onClick={() => setRemove(false)}>Close</button>
              <button style={{ background: "red" }} onClick={() => {}}>
                Delete
              </button>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
