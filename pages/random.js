import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import Spinner from "../component/spinner";
import { apiGetRandom } from "../api/fetchData";
import Header from "../component/heder";

const Random = () => {
  const [randomPair, setRandomPair] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({
    bool: false,
    response: "",
  });
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [usedData, setUsedData] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const result = await apiGetRandom();
      if (result?.status != 200) {
        setError({ bool: true, response: "An error Occured. Try again" });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setData(result?.data);
        setError({ bool: false, response: "" });
      }
      getWordPair(result?.data)
      setIsLoading(false);
    };
    fetch();
  }, []);
  
  const getWordPair = (wordData) => {
    if (usedData?.length <= Object.keys(wordData)?.length) {
      const wordKeys = Object.keys(wordData);
      let randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
      while (usedData.includes(randomKey)) {
        randomKey = wordKeys[Math.floor(Math.random() * wordKeys.length)];
      }
      setUsedData([...usedData, randomKey]);
      setRandomPair({ key: randomKey, value: wordData[randomKey] });
    }
  };

  const handleOpen = () => setOpenModal(true);
  const closeModal = () => setOpenModal(false);

  return (
    <>
      <Header />
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
          {!!data && !isLoading && (
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
                <button type="disable" onClick={() => {getWordPair(data)}}>
                  Next
                </button>
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
    </>
  );
};

export default Random;
