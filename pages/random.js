import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import Spinner from "../component/spinner";

const Random = () => {
  const [data, setData] = useState(null);
  const [randomPair, setRandomPair] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({
    bool: false,
    response: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API route
    fetch("/api/getAllWords")
      .then((response) => {
        if (response.status != 200) {
          setIsLoading(false);
          setError(() => ({ bool: true, response: response?.message }));
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        console.log(responseData);
        getRandomPair(responseData);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data, randomPair);

  const getRandomPair = (wordData) => {
    const wordKeys = Object.keys(wordData);
    const randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
    setRandomPair({ key: randomKey, value: wordData[randomKey] });
  };
  const handleOpen = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);
  return (
    <div style={{ textAlign: "center" }}>
      {openModal && (
        <Modal
          onClose={closeModal}
          header={randomPair?.key}
          meaning={randomPair?.value}
        />
      )}
      <h1>Random Word</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading && <Spinner />}
        {!!data && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: "rgb(215, 224, 230)",
                borderRadius: "8px",
                minWidth: "80px",
                margin: "0 auto",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  padding: "10px 14px",
                  fontWeight: 700,
                  color: "rgba(76, 132, 235, 0.801)",
                }}
              >
                {randomPair?.key}
              </h3>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "1rem",
              }}
            >
              <button onClick={handleOpen}>Reveal</button>
              <button onClick={() => getRandomPair(data)}>Next</button>
            </div>
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

export default Random;
